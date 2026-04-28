'use client';

import React from 'react';
import { useAuthContext } from '@harmony/auth/context';

export default function AccountPage() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harmony-teal"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Tài khoản của tôi</h1>
        <p className="text-slate-600">Quản lý thông tin cá nhân và cài đặt bảo mật.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Thông tin cơ bản</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <span className="text-sm text-slate-500">Họ và Tên</span>
              <span className="text-sm font-medium text-slate-900">{user?.name || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <span className="text-sm text-slate-500">Email</span>
              <span className="text-sm font-medium text-slate-900">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Identity Management */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quản lý định danh</h2>
          <p className="text-sm text-slate-600 mb-6">
            Để thay đổi mật khẩu hoặc cập nhật thông tin bảo mật, vui lòng truy cập hệ thống định danh tập trung của Harmony AI.
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://id.vutera.net/profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cập nhật hồ sơ
            </a>
            <a 
              href="https://id.vutera.net/security" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Bảo mật tài khoản
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
