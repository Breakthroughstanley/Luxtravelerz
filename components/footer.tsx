"use client";

import Link from "next/link";
import { SOCIAL } from "@/data/data";

export default function Footer() {
  return (
    <footer className="bg-[#ede8ff] px-5 pt-14 pb-7 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* TOP GRID */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            {
              title: "Company",
              links: ["About Us", "How we work", "Careers", "Press"],
            },
            {
              title: "Contact",
              links: ["Help / FAQ", "Press", "Partners", "Affiliates"],
            },
            {
              title: "Discover",
              links: ["Travel Tips", "Blog", "Destinations", "App Download"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">
                {col.title}
              </p>

              {col.links.map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="mb-3 block text-sm text-gray-600 transition hover:text-[#6c47ff]"
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}

          {/* LOGO */}
          <div>
            <Link href="/home" className="mb-1 flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-20 w-30 md:h-24 md:w-34 lg:h-28 lg:w-38 object-contain"
              />
            </Link>

            <p className="text-xs leading-relaxed text-gray-500">
              Your journey to the world's most hidden gem begins here.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-violet-200 pt-6">
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              {["About Us", "Contact Us", "Travel Tips", "FAQ"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-xs text-gray-500 transition hover:text-[#6c47ff]"
                >
                  {l}
                </Link>
              ))}
            </div>

            <p className="text-xs text-gray-400">
              © 2026 Luxtravelerz. All Rights Reserved
            </p>

            {/* SOCIAL */}
            <div className="flex gap-2.5">
              {SOCIAL.map((s) => (
  <a key={s.label} href="#">
    {s.icon}
  </a>
))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}