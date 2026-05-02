"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getRandomAvatar } from "@/lib/avatar";
import { signOut } from "next-auth/react";
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, update, status } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [cabinClass, setCabinClass] = useState("Business");
  const [currency, setCurrency] = useState("GBP (£)");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Please try again");
  const [uploadName, setUploadName] = useState("");

  const email = session?.user?.email || "";

  useEffect(() => {
    if (!session?.user) return;
    const parts = session.user.name?.split(" ") ?? [];
    setFirstName(parts[0] ?? "");
    setLastName(parts.slice(1).join(" ") ?? "");
    setAvatar(session.user.image || getRandomAvatar(session.user.email || "user"));
  }, [session]);

  useEffect(() => {
    return () => {
      if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  const fullName = useMemo(
    () => [firstName, lastName].filter(Boolean).join(" ").trim(),
    [firstName, lastName]
  );

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Please log in to view your profile.</p>
      </div>
    );
  }

  const showToast = (type: "success" | "error", msg?: string) => {
    if (msg) setErrorMsg(msg);
    setToast(type);
    setTimeout(() => setToast("idle"), 4000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("error", "Image must be under 5MB");
      return;
    }

    if (avatar?.startsWith("blob:")) URL.revokeObjectURL(avatar);

    setAvatar(URL.createObjectURL(file));
    setAvatarFile(file);
    setUploadName(file.name);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setToast("idle");

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("phone", phone);
      formData.append("nationality", nationality);
      formData.append("cabinClass", cabinClass);
      formData.append("currency", currency);

      if (avatarFile) {
        formData.append("image", avatarFile);
      } else {
        formData.append("imageUrl", avatar);
      }

      const res = await fetch("/api/profile/update", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save");
      }

      const nextImage = data?.user?.image || avatar;

      await update({
        name: fullName,
        image: nextImage,
      });

      setAvatar(nextImage);
      setAvatarFile(null);
      setUploadName("");
      showToast("success");
    } catch (err: any) {
      showToast("error", err?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleDelete = async () => {
  const ok = window.confirm("Delete your account permanently?");
  if (!ok) return;

  try {
    setLoading(true);

    const res = await fetch("/api/profile/delete", {
      method: "DELETE",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || "Failed to delete account");
    }

    await signOut({ callbackUrl: "/" });
  } catch (err: any) {
    showToast("error", err?.message || "Please try again");
  } finally {
    setLoading(false);
  }
};

  const inputCls =
    "w-full rounded-xl border-[1.5px] border-[#ede9fe] bg-[#faf9ff] px-4 py-3 text-sm text-[#1a1a2e] outline-none transition focus:border-[#6c47ff] focus:shadow-[0_0_0_3px_rgba(108,71,255,0.1)]";

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9c87c5]">
        {label}
      </label>
      {children}
    </div>
  );

  const SectionLabel = ({ icon, children }: { icon: React.ReactNode; children: string }) => (
    <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7c3aed]">
      {icon}
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f5ff] px-5 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#6c47ff] p-8 text-center">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/[0.07]" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/[0.04]" />

          <div className="relative mx-auto mb-4 inline-block">
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                className="h-24 w-24 rounded-full border-[3px] border-white/35 object-cover"
              />
            )}
            <button
              onClick={() => document.getElementById("file-upload")?.click()}
              className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#6c47ff] bg-white transition hover:bg-[#ede9fe]"
              type="button"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6c47ff" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <p className="text-xl font-bold text-white">
            {fullName || "Your Name"}
          </p>
          <p className="mt-1 text-[13px] text-white/55">{email}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.14] px-3.5 py-1.5 text-xs font-medium text-[#e9d5ff]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Premium Traveller
          </div>

          <div className="mt-6 flex justify-center divide-x divide-white/10 border-t border-white/10 pt-6">
            {[
              ["12", "Trips"],
              ["4", "Upcoming"],
              ["48", "Nights"],
            ].map(([n, l]) => (
              <div key={l} className="flex-1 text-center">
                <div className="text-xl font-bold text-white">{n}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-widest text-white/45">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {toast === "success" && (
          <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Profile saved</p>
              <p className="text-xs text-green-600">Your changes have been updated</p>
            </div>
          </div>
        )}

        {toast === "error" && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-red-800">Action failed</p>
              <p className="text-xs text-red-500">{errorMsg}</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#ede9fe] bg-white p-7">
          <SectionLabel
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          >
            Personal info
          </SectionLabel>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="First name">
                <input className={inputCls} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Field>
              <Field label="Last name">
                <input className={inputCls} value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Field>
            </div>

            <Field label="Email address">
              <input className={inputCls + " cursor-not-allowed opacity-50"} value={email} disabled />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Phone">
                <input
                  className={inputCls}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7700 900000"
                />
              </Field>
              <Field label="Nationality">
                <input
                  className={inputCls}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="British"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ede9fe] bg-white p-7">
          <SectionLabel
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
          >
            Travel preferences
          </SectionLabel>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Cabin class">
              <select className={inputCls} value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
                {["Economy", "Business", "First Class", "Private"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
            <Field label="Currency">
              <select className={inputCls} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {["GBP (£)", "USD ($)", "EUR (€)", "AED (د.إ)", "JPY (¥)"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-[#ede9fe] bg-white p-7">
          <SectionLabel
            icon={
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            }
          >
            Profile photo
          </SectionLabel>

          <div
            onClick={() => document.getElementById("file-upload")?.click()}
            className="cursor-pointer rounded-xl border-[1.5px] border-dashed border-[#c4b5fd] bg-[#faf9ff] p-6 text-center transition hover:border-[#6c47ff] hover:bg-[#f5f3ff]"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ede9fe]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-[#4c1d95]">
              {uploadName || "Click to upload or drag and drop"}
            </p>
            <p className="mt-1 text-xs text-gray-400">PNG, JPG, WEBP — max 5MB</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6c47ff] py-4 text-[15px] font-semibold text-white transition hover:bg-[#5a3de8] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(108,71,255,0.35)] disabled:cursor-not-allowed disabled:opacity-70 disabled:translate-y-0"
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v14a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save changes
            </>
          )}
        </button>

        <div className="rounded-2xl border border-[#ede9fe] bg-white p-7">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-red-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Danger zone
          </div>

          <div className="flex items-center justify-between border-t border-red-50 py-4 first:border-t-0 first:pt-0">
            <div>
              <p className="text-sm font-medium text-gray-800">Change password</p>
              <p className="text-xs text-gray-400">Update your login credentials</p>
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              Update
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-red-50 py-4">
            <div>
              <p className="text-sm font-medium text-gray-800">Delete account</p>
              <p className="text-xs text-gray-400">Permanently remove all your data</p>
            </div>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}