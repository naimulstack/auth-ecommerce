
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  // Get name and email from authenticated user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Profile picture preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Connect this function to your profile update API
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <h2 className="text-2xl font-bold">Please Sign In</h2>
        <p className="text-gray-500 mt-2">
          Sign in to view your profile information.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* Header */}
      <section className="bg-[#f7eee6] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5">

          <p className="text-orange-500 font-bold text-sm tracking-widest">
            MY ACCOUNT
          </p>

          <h1 className="text-3xl md:text-4xl font-black mt-3">
            My Profile
          </h1>

          <p className="text-gray-600 mt-3">
            Manage your personal information and delivery address.
          </p>

          <p className="text-sm text-gray-500 mt-4">
            Home <span className="mx-2">/</span>
            <span className="text-orange-500">My Profile</span>
          </p>

        </div>
      </section>

      {/* Profile Content */}
      <section className="max-w-7xl mx-auto px-5 py-10 md:py-14">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* Left Profile Card */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">

              <div className="flex flex-col items-center text-center">

                {/* Profile Picture */}
                <div className="relative w-32 h-32 rounded-full bg-orange-100 overflow-hidden border-4 border-white shadow-md">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-orange-500">
                      {formData.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                </div>

                <label className="mt-5 cursor-pointer bg-orange-50 text-orange-600 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-100 transition">
                  📷 Change Photo

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                <h2 className="text-xl font-black mt-5">
                  {formData.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1 break-all">
                  {formData.email}
                </p>

                <span className="mt-4 bg-green-50 text-green-600 text-xs font-semibold px-4 py-2 rounded-full">
                  ● Active Account
                </span>

              </div>

              <div className="border-t border-gray-100 mt-7 pt-6 space-y-3">

                <a
                  href="/profile"
                  className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 text-orange-600 font-semibold"
                >
                  <span>👤</span>
                  My Profile
                </a>

                <a
                  href="/orders"
                  className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                >
                  <span>📦</span>
                  My Orders
                </a>

                <a
                  href="/"
                  className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
                >
                  <span>🛍️</span>
                  Continue Shopping
                </a>

              </div>

            </div>

          </div>

          {/* Right Profile Form */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl p-6 md:p-9 shadow-sm border border-gray-100">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>
                  <h2 className="text-2xl font-black">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Update your personal details below.
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-orange-500 transition"
                  >
                    ✏️ Edit Profile
                  </button>
                )}

              </div>

              {saved && (
                <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl text-sm mb-6">
                  Profile information updated in this session.
                </div>
              )}

              <form onSubmit={handleSave}>

                {/* Personal Details */}
                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 disabled:text-gray-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-gray-500 outline-none"
                    />

                    <p className="text-xs text-gray-400 mt-2">
                      Email is linked to your account.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 transition"
                    />
                  </div>

                </div>

                {/* Address Section */}
                <div className="border-t border-gray-100 mt-9 pt-8">

                  <h3 className="text-xl font-black">
                    Delivery Address
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 mb-6">
                    Add your address for a smooth delivery experience.
                  </p>

                  <div className="space-y-5">

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Street Address
                      </label>

                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={3}
                        placeholder="House number, road, area..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 resize-none transition"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          City
                        </label>

                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Your city"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Postal Code
                        </label>

                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="Postal code"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 transition"
                        />
                      </div>

                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Country
                      </label>

                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-orange-500 disabled:bg-gray-50 transition"
                      />
                    </div>

                  </div>

                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-9">

                    <button
                      type="submit"
                      className="bg-orange-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-900 transition"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData((prev) => ({
                          ...prev,
                          name: user.name || "",
                          email: user.email || "",
                        }));
                      }}
                      className="border border-gray-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>

                  </div>
                )}

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}