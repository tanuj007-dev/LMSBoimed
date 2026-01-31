"use client";

import { useState, useEffect, useRef } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  MapPin, 
  FileText, 
  Linkedin, 
  Github, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  Upload,
  X
} from "lucide-react";

export default function UserForm({ mode = "add", initialData }) {
  const fileInputRef = useRef(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    title: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    biography: "",
    linkedin_url: "",
    github_url: "",
    role: "PRACTITIONER",
    status: "ACTIVE",
    profile_image_url: "",
  });

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        title: initialData.title || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "", // Keep password empty for security during edits
        address: initialData.address || "",
        biography: initialData.biography || "",
        linkedin_url: initialData.linkedin_url || "",
        github_url: initialData.github_url || "",
        role: initialData.role || "PRACTITIONER",
        status: initialData.status || "ACTIVE",
        profile_image_url: initialData.profile_image_url || "",
      });
    }
  }, [initialData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    try {
      setIsUploadingImage(true);
      const data = new FormData();
      data.append("image", file);

      const response = await fetch("http://localhost:5000/api/v1/users/upload-profile-image", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload image");
      }

      const imageUrl = result.data?.url || result.url || result.path;
      if (imageUrl) {
        setFormData(prev => ({ ...prev, profile_image_url: imageUrl }));
        setMessage({ type: "success", text: "📸 Profile picture uploaded!" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: `❌ Image upload failed: ${err.message}` });
    } finally {
      setIsUploadingImage(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const url = mode === "add" 
        ? "http://localhost:5000/api/v1/users" 
        : `http://localhost:5000/api/v1/users/${initialData.id}`;
      
      const response = await fetch(url, {
        method: mode === "add" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Failed to ${mode === "add" ? "create" : "update"} user`);
      }

      setMessage({ 
        type: "success", 
        text: mode === "add" ? "🎉 User created successfully!" : "✅ User profile updated!" 
      });

      if (mode === "add") {
        setFormData({
          first_name: "",
          last_name: "",
          title: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          biography: "",
          linkedin_url: "",
          github_url: "",
          role: "PRACTITIONER",
          status: "ACTIVE",
          profile_image_url: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: `❌ Error: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">
              Management
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {mode === "add" ? "Register New User" : "Update User Profile"}
            </h2>
          </div>
        </div>
        
        {message && (
          <div className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}>
            {message.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message.text}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Profile Picture Upload */}
        <section className="col-span-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-indigo-100 p-2">
              <Camera className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Profile Picture</h3>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center">
            <div 
              className="relative group cursor-pointer"
              onClick={() => !isUploadingImage && fileInputRef.current?.click()}
            >
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50 flex items-center justify-center">
                {isUploadingImage ? (
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                ) : formData.profile_image_url ? (
                  <img src={formData.profile_image_url} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>
              
              {!isUploadingImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              )}
              
              {formData.profile_image_url && !isUploadingImage && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, profile_image_url: "" }));
                  }}
                  className="absolute -top-1 -right-1 bg-rose-500 text-white p-1.5 rounded-full shadow-lg hover:bg-rose-600 transition-transform active:scale-90"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files?.[0])}
            />
            
            <p className="mt-4 text-sm font-medium text-slate-500 text-center max-w-xs">
              {formData.profile_image_url 
                ? "Click profile picture to change" 
                : "Add a profile picture to personalize your account"}
            </p>
          </div>
        </section>

        {/* Personal Information */}
        <section className="col-span-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-indigo-100 p-2">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
          </div>
          
          <div className="p-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-slate-700">First Name *</label>
              <input
                required
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                placeholder="John"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Last Name *</label>
              <input
                required
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                placeholder="Doe"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Professional Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                placeholder="Medical Student"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Password {mode === 'add' ? '*' : '(Leave blank to keep current)'}</label>
              <div className="relative mt-2">
                <input
                  required={mode === "add"}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-emerald-100 p-2">
              <Mail className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">Email Address *</label>
              <div className="relative mt-2">
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="john.doe@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Phone Number</label>
              <div className="relative mt-2">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="+1234567890"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Address</label>
              <div className="relative mt-2">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="123 Medical St, Boston, MA"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Roles & Status */}
        <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-amber-100 p-2">
              <ShieldCheck className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Access Control</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">System Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="PRACTITIONER">Practitioner</option>
                <option value="ADMIN">Administrator</option>
                <option value="EDITOR">Editor</option>
                <option value="STUDENT">Student</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">Account Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="PENDING">Pending</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="col-span-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-blue-100 p-2">
              <Github className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Social & Portfolio</h3>
          </div>
          
          <div className="p-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-slate-700">LinkedIn URL</label>
              <div className="relative mt-2">
                <input
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="https://linkedin.com/in/johndoe"
                />
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">GitHub URL</label>
              <div className="relative mt-2">
                <input
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all"
                  placeholder="https://github.com/johndoe"
                />
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="col-span-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="rounded-lg bg-indigo-100 p-2">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Biography</h3>
          </div>
          
          <div className="p-6">
            <textarea
              name="biography"
              rows={4}
              value={formData.biography}
              onChange={handleChange}
              className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none transition-all placeholder:text-slate-400"
              placeholder="Tell us about yourself..."
            />
          </div>
        </section>

        {/* Submit Button */}
        <div className="col-span-full flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-slate-200 px-8 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-10 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              mode === "add" ? "Create User" : "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
