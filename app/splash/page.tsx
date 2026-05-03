"use client";

import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RegisterModal from "@/components/RegisterModal";
const IMAGES = [
  "/images/hero-bg-4.jpg",
  "/images/hero-bg-2.jpg",
  "/images/hero-bg-3.jpg",
];

const DESTINATIONS = [
  { label: "Santorini", color: "#f5a623" },
  { label: "Maldives", color: "#a78bfa" },
  { label: "Amalfi Coast", color: "#5dcaa5" },
  { label: "Bali", color: "#f0997b" },
  { label: "Tokyo", color: "#85b7eb" },
];

const SplashPage: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (status === "loading") return;
    if (session) router.replace("/home");
  }, [session, status, router]);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % IMAGES.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  if (status === "loading" || session) return null;

  return (
    <main className="relative z-20 flex flex-col min-h-screen">

      {/* ================= BACKGROUND ================= */}
     <div className="fixed inset-0 z-0">
  {IMAGES.map((img, i) => (
    <div
      key={i}
      className={`absolute inset-0 transition-opacity duration-[1200ms] ${
        i === current ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={img}
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
    </div>
  ))}
</div>
      {/* ================= OVERLAY ================= */}
     <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/30 via-black/10 to-black/85" />
<div className="fixed inset-0 z-10 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* ================= CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col min-h-screen"
      >

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 md:px-10 py-6">
          <div className="flex items-center gap-3">
        
             <img
               src="/logo.png"
               alt="Logo"
               className="h-20 w-30 md:h-24 md:w-34 lg:h-28 lg:w-58 object-contain"
             />
         
           
          </div>

          <Link
            href="/home"
            className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 text-sm text-white/85 hover:bg-white/18 hover:border-white/50 transition"
          >
            Explore destinations
          </Link>
        </div>

        {/* HERO CONTENT */}
        <div className="flex-1 flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-16 max-w-3xl">

          {/* Destination pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-wrap gap-2 mb-7"
          >
            {DESTINATIONS.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-xs text-white/70 hover:bg-white/18 hover:text-white transition cursor-pointer"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: d.color }}
                />
                {d.label}
              </div>
            ))}
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase mb-4"
          >
            Luxury travel redefined
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-extrabold leading-[1.04] text-white mb-5"
          >
            Where will you<br />
            go <em className="not-italic text-[#a78bfa]">next?</em>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-base text-white/50 max-w-md mb-10"
          >
            Handpicked stays, rare experiences, and unforgettable journeys.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/register"
              className="rounded-full bg-[#6c47ff] px-8 py-4 text-white font-semibold hover:shadow-[0_12px_32px_rgba(108,71,255,0.45)] transition"
            >
              Create account
            </Link>

            <Link
              href="/home"
              className="rounded-full bg-white px-8 py-4 text-[#0a0612] font-semibold"
            >
              Explore as guest
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-white/30 px-8 py-4 text-white"
            >
              Sign in
            </Link>
          </motion.div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/[0.06]">

          {/* dots */}
          <div className="flex items-center gap-1.5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-[#a78bfa]" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          {/* trust */}
          <div className="hidden md:flex items-center gap-6">
            <span className="text-xs text-white/30">Secure booking</span>
            <span className="text-xs text-white/30">190+ destinations</span>
            <span className="text-xs text-white/30">4.9 rated</span>
          </div>
        </div>

      </motion.div>
    </main>
  );
};

export default SplashPage;

/* ================= LOGO ================= */
function Logo({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: "conic-gradient(#f5a623 0deg 180deg, #6c47ff 180deg 360deg)",
      }}
    >
      <div
        className="rounded-full bg-black/35"
        style={{ width: size * 0.62, height: size * 0.62 }}
      />
    </div>
  );
}