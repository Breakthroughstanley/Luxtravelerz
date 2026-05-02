"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdLuggage,
  MdPerson,
  MdBook,
  MdMessage,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { useSession, signOut } from "next-auth/react";
import { getRandomAvatar } from "@/lib/avatar";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/data/data";
import RegisterModal from "./RegisterModal";
import { MdFlight, MdHotel, MdDirectionsCar, MdExplore } from "react-icons/md";


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
<nav className="sticky top-0 z-50  bg-white ">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

    {/* LOGO */}
    <Link href="/home" className="flex items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-12 w-50 sm:h-14 lg:h-16 object-contain"
      />
    </Link>

    {/* Desktop Links */}
  <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-2 md:flex">
  {NAV_LINKS.map((l) => {
    const Icon = l.icon;

    return (
      <Link
        key={l.name}
        href={l.href}
        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-[#6c47ff] transition hover:bg-white hover:text-[#6c47ff] hover:shadow-sm"
      >
        <Icon size={18} />
        {l.name}
      </Link>
    );
  })}
</div>

    {/* AUTH SECTION */}
    <div className="hidden items-center gap-3 md:flex">
      {!session ? (
        <>
          <Link
            href="/login"
            className="rounded-full border border-[#6c47ff]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#6c47ff] transition hover:border-[#6c47ff] hover:bg-[#f5f1ff]"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02]"
          >
            Create Account
          </Link>
        </>
      ) : (
        <div className="relative">
          {/* PROFILE BUTTON */}
          <div
            onClick={() => setOpenProfile((v) => !v)}
            className="flex cursor-pointer items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 transition hover:bg-gray-100"
          >
            <img
              src={getRandomAvatar(session.user?.email || "user")}
              alt="profile"
              className="h-10 w-10 rounded-full border border-[#6c47ff]/20 object-cover"
            />

            <span className="max-w-[120px] truncate text-sm font-semibold text-[#6c47ff]">
              {session.user?.name || "User"}
            </span>

            <MdKeyboardArrowDown
              className={`text-[#6c47ff] transition ${
                openProfile ? "rotate-180" : ""
              }`}
              size={18}
            />
          </div>

          {/* DROPDOWN */}
          {openProfile && (
            <div
              className="absolute right-0 mt-4 w-64 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
              ref={profileRef}
            >
              <div className="bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] px-5 py-5 text-white">
                <div className="flex items-center gap-3">
                  <img
                    src={getRandomAvatar(session.user?.email || "user")}
                    alt="profile"
                    className="h-12 w-12 rounded-full border-2 border-white/30 object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {session.user?.name || "User"}
                    </p>

                    <p className="truncate text-xs text-white/80">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {[
                  {
                    href: "/trips",
                    icon: <MdLuggage size={18} />,
                    label: "My Trips",
                  },
                  {
                    href: "/profile",
                    icon: <MdPerson size={18} />,
                    label: "Profile",
                  },
                  {
                    href: "/bookings",
                    icon: <MdBook size={18} />,
                    label: "Bookings",
                  },
                  {
                    href: "/messages",
                    icon: <MdMessage size={18} />,
                    label: "Messages",
                  },
                  {
                    href: "/account",
                    icon: <MdSettings size={18} />,
                    label: "Account Info",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#f6f3ff] hover:text-[#6c47ff]"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 p-2">
                <button
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <MdLogout size={18} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Mobile Toggle */}
    <button
      onClick={() => setMobileOpen((v) => !v)}
      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-[#6c47ff] transition hover:bg-[#f6f3ff] md:hidden"
    >
      {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
    </button>
  </div>

  {/* MOBILE MENU */}
  {mobileOpen && (
    <div className="border-t border-gray-100 bg-white px-4 pb-6 pt-5 md:hidden">

      {/* MOBILE USER CARD */}
      {session && (
        <Link
          href="/profile"
          className="mb-5 flex items-center gap-4 rounded-3xl bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] p-4 text-white shadow-lg"
        >
          <img
            src={getRandomAvatar(session.user?.email || "user")}
            className="h-14 w-14 rounded-full border-2 border-white/30 object-cover"
            alt="profile"
          />

          <div>
            <p className="font-semibold">
              {session.user?.name}
            </p>

            <p className="text-xs text-white/80">
              {session.user?.email}
            </p>
          </div>
        </Link>
      )}

      {/* MOBILE NAV LINKS */}
    <div className="space-y-2">
  {NAV_LINKS.map((l) => {
    const Icon = l.icon;

    return (
      <Link
        key={l.name}
        href={l.href}
        className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 transition hover:border-[#6c47ff]/20 hover:bg-[#f6f3ff] hover:text-[#6c47ff]"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} />
          {l.name}
        </div>

        <span className="text-lg text-gray-400">→</span>
      </Link>
    );
  })}
</div>

      {/* AUTH BUTTONS */}
      <div className="mt-6 flex flex-col gap-3">
        {!session ? (
          <>
            <Link
              href="/login"
              className="rounded-2xl border border-[#6c47ff]/20 bg-white py-4 text-center text-sm font-semibold text-[#6c47ff] transition hover:bg-[#f5f1ff]"
            >
              Sign In
            </Link>

            <button
              onClick={() => setOpenRegister(true)}
              className="rounded-2xl bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] py-4 text-sm font-semibold text-white shadow-md"
            >
              Create Account
            </button>
          </>
        ) : (
          <button
            onClick={() => signOut()}
            className="rounded-2xl bg-red-500 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )}
</nav>

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}