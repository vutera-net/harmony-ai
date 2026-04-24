"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  profile: {
    fullName?: string;
    gender?: string;
    birthDate?: string;
    birthTime?: string;
    birthTimezone?: string;
    birthLocation?: string;
  } | null;
  subscription: {
    plan: string;
    status: string;
  } | null;
}

const inputClass =
  "w-full px-3 py-2 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    birthTime: "",
    birthTimezone: "Asia/Ho_Chi_Minh",
    birthLocation: "",
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        router.push("/auth/login");
        return;
      }
      const data = await response.json();
      setUser(data.user);
      if (data.user.profile) {
        setFormData({
          fullName: data.user.profile.fullName || "",
          gender: data.user.profile.gender || "",
          birthDate: data.user.profile.birthDate?.split("T")[0] || "",
          birthTime: data.user.profile.birthTime || "",
          birthTimezone: data.user.profile.birthTimezone || "Asia/Ho_Chi_Minh",
          birthLocation: data.user.profile.birthLocation || "",
        });
      }
    } catch (err) {
      setError("Không thể tải thông tin hồ sơ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Không thể lưu hồ sơ");
        return;
      }

      setError("");
      setEditing(false);
      fetchUserData();
    } catch (err) {
      setError("Đã xảy ra lỗi khi lưu");
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const planLabel: Record<string, string> = {
    FREE: "Miễn phí",
    AN_NHIEN: "An Nhiên",
    BINH_AN: "Bình An",
  };

  const genderLabel: Record<string, string> = {
    MALE: "Nam",
    FEMALE: "Nữ",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600">Không tìm thấy người dùng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Harmony AI — Tài khoản</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Thông tin tài khoản */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Thông tin tài khoản</h2>
          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Tên hiển thị:</span>{" "}
              {user.name || <span className="text-slate-400">Chưa cập nhật</span>}
            </p>
            {user.subscription && (
              <p>
                <span className="font-medium">Gói dịch vụ:</span>{" "}
                {planLabel[user.subscription.plan] || user.subscription.plan}
              </p>
            )}
          </div>
        </div>

        {/* Thông tin sinh */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Thông tin sinh</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          {editing ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Giới tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Chọn</option>
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Giờ sinh (HH:mm)
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) =>
                      setFormData({ ...formData, birthTime: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Múi giờ
                  </label>
                  <input
                    type="text"
                    value={formData.birthTimezone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        birthTimezone: e.target.value,
                      })
                    }
                    className={inputClass}
                    placeholder="Asia/Ho_Chi_Minh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nơi sinh
                </label>
                <input
                  type="text"
                  value={formData.birthLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, birthLocation: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Tỉnh/Thành phố"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saveLoading ? "Đang lưu..." : "Lưu"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700"
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Họ và tên:</span>{" "}
                {formData.fullName || <span className="text-slate-400">Chưa cập nhật</span>}
              </p>
              <p>
                <span className="font-medium">Giới tính:</span>{" "}
                {genderLabel[formData.gender] || <span className="text-slate-400">Chưa cập nhật</span>}
              </p>
              <p>
                <span className="font-medium">Ngày sinh:</span>{" "}
                {formData.birthDate || <span className="text-slate-400">Chưa cập nhật</span>}
              </p>
              <p>
                <span className="font-medium">Giờ sinh:</span>{" "}
                {formData.birthTime || <span className="text-slate-400">Chưa cập nhật</span>}
              </p>
              <p>
                <span className="font-medium">Múi giờ:</span>{" "}
                {formData.birthTimezone}
              </p>
              <p>
                <span className="font-medium">Nơi sinh:</span>{" "}
                {formData.birthLocation || <span className="text-slate-400">Chưa cập nhật</span>}
              </p>
            </div>
          )}
        </div>

        {/* Bước tiếp theo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">Bước tiếp theo</h3>
          <p className="text-blue-800 text-sm mb-3">
            Hồ sơ của bạn đã sẵn sàng. Bây giờ bạn có thể:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Dùng tài khoản này để đăng nhập vào các ứng dụng khác</li>
            <li>• Truy cập phân tích Master AI tại menhan.vutera.net</li>
            <li>• Theo dõi vận mệnh trong Nhật ký số phận</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
