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
      setError("Failed to load profile");
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
        setError(data.error || "Failed to save profile");
        return;
      }

      setError("");
      setEditing(false);
      fetchUserData();
    } catch (err) {
      setError("An error occurred while saving");
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Harmony AI Identity</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Account Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Display Name:</span>{" "}
              {user.name || "Not set"}
            </p>
            {user.subscription && (
              <p>
                <span className="font-medium">Plan:</span> {user.subscription.plan}
              </p>
            )}
          </div>
        </div>

        {/* Birth Data Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Birth Information</h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Birth Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Birth Time (HH:mm)
                  </label>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) =>
                      setFormData({ ...formData, birthTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timezone
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Asia/Ho_Chi_Minh"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Birth Location
                </label>
                <input
                  type="text"
                  value={formData.birthLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, birthLocation: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="City/Province"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={saveLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saveLoading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-slate-600">
              <p>
                <span className="font-medium">Full Name:</span>{" "}
                {formData.fullName || "Not set"}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {formData.gender || "Not set"}
              </p>
              <p>
                <span className="font-medium">Birth Date:</span>{" "}
                {formData.birthDate || "Not set"}
              </p>
              <p>
                <span className="font-medium">Birth Time:</span>{" "}
                {formData.birthTime || "Not set"}
              </p>
              <p>
                <span className="font-medium">Timezone:</span>{" "}
                {formData.birthTimezone}
              </p>
              <p>
                <span className="font-medium">Birth Location:</span>{" "}
                {formData.birthLocation || "Not set"}
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">Next Steps</h3>
          <p className="text-blue-800 text-sm mb-3">
            Your profile is set up. Now you can:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use your credentials to login from other apps</li>
            <li>• Access Master AI analysis at menhan.vutera.net</li>
            <li>• Track your destiny in the Journal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
