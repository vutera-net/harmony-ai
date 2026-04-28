'use client';

import React from 'react';
import { useAuthContext } from '@harmony/auth/context';

export default function AccountPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-harmony-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harmony-teal"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harmony-cream">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <div className="w-24 h-24 bg-harmony-teal rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và cài đặt bảo mật của bạn trong hệ sinh thái Harmony AI.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar/Quick Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-harmony-teal/10 rounded-3xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Thông tin nhanh</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 block">Email</label>
                  <span className="text-sm font-medium text-gray-900 truncate block">{user?.email}</span>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block">Tên hiển thị</label>
                  <span className="text-sm font-medium text-gray-900 block">{user?.name || 'Chưa cập nhật'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-white border border-harmony-teal/10 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-harmony-teal rounded-full"></span>
                Thông tin cơ bản
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">Họ và Tên</span>
                  <span className="text-sm font-semibold text-gray-900">{user?.name || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-500">Địa chỉ Email</span>
                  <span className="text-sm font-semibold text-gray-900">{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Identity Management */}
            <div className="relative overflow-hidden bg-white border border-harmony-teal/20 rounded-3xl p-8 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-harmony-teal/5 blur-3xl rounded-full -mr-16 -mt-16" />
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-harmony-teal rounded-full"></span>
                Quản lý định danh
              </h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Để bảo vệ quyền riêng tư và bảo mật, việc thay đổi mật khẩu hoặc cập nhật thông tin xác thực được thực hiện tập trung tại Hệ thống Định danh (Identity System).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://id.vutera.net/profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-2xl text-sm font-semibold hover:border-harmony-teal hover:text-harmony-teal transition-all active:scale-95"
                >
                  Cập nhật hồ sơ
                </a>
                <a 
                  href="https://id.vutera.net/security" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-2xl text-sm font-semibold hover:border-harmony-teal hover:text-harmony-teal transition-all active:scale-95"
                >
                  Bảo mật tài khoản
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
