"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DealsCarousel from "@/components/DealsCarousel";
import WhyUs from "@/components/WhyUs";
import Offers from "@/components/Offers";
import { OFFERS } from "@/data/data"; // make sure OFFERS is imported
import PopularHotels from "@/components/PopularHotels";
import { HOTELS } from "@/data/data";
import SearchBar from "@/components/searchbar";
import Footer from "@/components/footer";
/* react-icons */
import { MdFlight, MdHotel, MdDirectionsCar, MdRestaurant, MdShoppingCart, MdOutlineLocalTaxi, MdChevronLeft, MdChevronRight, MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi2";
import { BsPeopleFill } from "react-icons/bs";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { TbActivityHeartbeat } from "react-icons/tb";

/* Data */


const CATEGORIES = [
  { label: "Flight",     icon: <RiFlightTakeoffLine size={20} /> },
  { label: "Activities", icon: <TbActivityHeartbeat size={20} /> },
  { label: "Stays",      icon: <MdHotel size={20} /> },
  { label: "Rides",      icon: <MdDirectionsCar size={20} /> },
];

const DEALS = [
  { from: "Lagos",  to: "London",   date: "May 9 — May 24",  price: "₦975,750",   lock: "₦272,204", badge: "DEAL OF THE DAY", bg: "#3b2f1e" },
  { from: "Abuja",  to: "Dubai",    date: "Jun 5 — Jun 19",  price: "₦890,000",   lock: "₦195,000", badge: "HOT DEAL",        bg: "#0f2233" },
  { from: "Lagos",  to: "New York", date: "Jun 1 — Jun 15",  price: "₦1,250,000", lock: "₦310,000", badge: "BEST VALUE",      bg: "#1e1040" },
  { from: "Lagos",  to: "Paris",    date: "Jul 10 — Jul 24", price: "₦1,100,000", lock: "₦280,000", badge: "POPULAR",         bg: "#0d2b1e" },
  { from: "Abuja",  to: "Toronto",  date: "Aug 3 — Aug 17",  price: "₦1,380,000", lock: "₦330,000", badge: "LIMITED SEATS",   bg: "#2a1030" },
];

const FEATURES = [
  { icon: <HiOutlineGlobeAlt size={24} />,       title: "Global coverage",     desc: "Customer support across 30+ countries, always available." },
  { icon: <HiOutlineShieldCheck size={24} />, title: "Free cancellation",   desc: "Cancel most bookings up to 48 hours before pick-up." },
  { icon: <HiOutlineClock size={24} />,       title: "Book now, pay later", desc: "Reserve your stay today and pay when you arrive." },
  { icon: <HiOutlineSparkles size={24} />,    title: "Exclusive deals",     desc: "Members-only rates on flights, hotels and experiences." },
];



const SERVICES = [
  { icon: <MdDirectionsCar size={26} />,    title: "Rent a car",           desc: "Hundreds of vehicles with 24/7 customer service." },
  { icon: <MdOutlineLocalTaxi size={26} />, title: "Private airport taxi", desc: "A driver waiting to take you straight to your stay." },
  { icon: <MdRestaurant size={26} />,       title: "Find your restaurant", desc: "Discover meals so good you'll want to come back." },
];

const FAQS = [
  { q: "Can I book activities and tours through your company?",               a: "Yes! We offer hundreds of curated activities and tours across all destinations, from guided city walks to adventure sports." },
  { q: "Do you handle flight bookings as part of your travel packages?",      a: "Absolutely. We search hundreds of airlines to find the best fares and can bundle flights with hotels or activities for extra savings." },
  { q: "Do you provide car rental services?",                                 a: "Yes, we partner with leading car rental providers worldwide. Hundreds of vehicles available with 24/7 customer service." },
  { q: "Can I customise my package to include flights, activities and cars?",  a: "Of course! Our packages are fully customisable — mix and match flights, hotels, activities and car rentals for your perfect trip." },
];

const SOCIAL = [
  { icon: <FaTwitter size={14} />,    label: "Twitter"   },
  { icon: <FaFacebookF size={14} />,  label: "Facebook"  },
  { icon: <FaLinkedinIn size={14} />, label: "LinkedIn"  },
  { icon: <FaInstagram size={14} />,  label: "Instagram" },
];

/* Logo  */
function Logo({ size = 34 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, background: "conic-gradient(#f5a623 0deg 180deg, #4a3fbf 180deg 360deg)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: size * 0.58, height: size * 0.58, borderRadius: "50%", background: "rgba(0,0,0,0.28)" }} />
    </div>
  );
}

/*  Page  */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: dir === "right" ? 310 : -310, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff]" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@700;800;900&display=swap');
        .sora { font-family: 'Sora', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .lift { transition: transform .22s ease, box-shadow .22s ease; }
        .lift:hover { transform: translateY(-5px); box-shadow: 0 24px 52px rgba(108,71,255,.14); }
        .faq-body { overflow: hidden; transition: max-height .35s ease, opacity .35s ease; }
      
      `}</style>

      {/* NAVBAR  */}
       
<SearchBar />
      {/* HERO  */}
   <Hero />
      {/* FLIGHT DEALS CAROUSEL */}
    <DealsCarousel />

      {/* WHY US  */}
     <WhyUs />

      {/*  OFFERS  */}
    
      <Offers OFFERS={OFFERS} />
      {/* POPULAR HOTELS  */}
    <PopularHotels HOTELS={HOTELS} />   

      {/*  SERVICES */}
      <section className="px-5 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">More options</p>
            <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">More ways to travel</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="lift group flex cursor-pointer gap-4 rounded-3xl border border-gray-100 bg-white p-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#6c47ff]/10 text-[#6c47ff] transition duration-200 group-hover:bg-[#6c47ff] group-hover:text-white">
                  {s.icon}
                </div>
                <div>
                  <p className="mb-1 font-semibold text-gray-900">{s.title}</p>
                  <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  RESTAURANT + GROCERIES  */}
      <section className="bg-white px-5 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-2">
          <div className="lift flex flex-col items-center overflow-hidden rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg,#fff8ec,#ffe8b8)" }}>
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f5a623]/20">
              <MdRestaurant size={36} className="text-[#f5a623]" />
            </div>
            <p className="sora mb-2 text-xl font-extrabold text-gray-900">
              Find <span className="text-[#6c47ff]">restaurants</span><br />for your next trip
            </p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-600">Discover local gems, top-rated dining, and hidden food spots in any city worldwide.</p>
            <button className="rounded-full bg-[#6c47ff] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#5a38e0] hover:shadow-lg active:scale-95">Explore Restaurants</button>
          </div>
          <div className="lift flex flex-col items-center overflow-hidden rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg,#eef2ff,#dce4ff)" }}>
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#6c47ff]/15">
              <MdShoppingCart size={36} className="text-[#6c47ff]" />
            </div>
            <p className="sora mb-2 text-xl font-extrabold text-gray-900">Groceries delivery &amp; more</p>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-600">From supermarkets to pharmacies to florists — if it's in your city, order it and receive it.</p>
            <button className="rounded-full bg-[#6c47ff] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#5a38e0] hover:shadow-lg active:scale-95">Order Now</button>
          </div>
        </div>
      </section>

      {/* SIGN IN TO SAVE  */}
      <section className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24" style={{ background: "linear-gradient(135deg,#6c47ff 0%,#a78bfa 100%)" }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/8" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <BsPeopleFill size={16} className="text-[#ffd166]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Members save more</span>
            </div>
            <h2 className="sora mb-2 text-3xl font-black text-white md:text-4xl">Sign in to save!</h2>
            <p className="max-w-md text-sm leading-relaxed text-white/70">You're already a Genuine member. To save on your next trip, all you have to do is sign in.</p>
          </div>
          <Link href="/login" className="flex-shrink-0 rounded-full bg-white px-10 py-4 text-sm font-bold text-[#6c47ff] shadow-xl transition hover:shadow-2xl hover:scale-105 active:scale-95">
            Sign in now
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-5 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">Stay in the loop</p>
          <h2 className="sora mb-3 text-2xl font-extrabold text-gray-900">Get deals in your inbox</h2>
          <p className="mb-7 text-sm text-gray-500">Subscribe to receive exclusive promotions before anyone else.</p>
          <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition focus-within:border-[#6c47ff] focus-within:shadow-md">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-gray-400" />
            <button className="m-1.5 rounded-xl px-6 text-sm font-bold text-white transition hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#f5a623,#f07c10)" }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-5 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">Got questions?</p>
            <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-[#f8f7ff]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
                  <span className="pr-4 text-sm font-semibold text-gray-900">{faq.q}</span>
                  <MdKeyboardArrowDown size={22} className={`flex-shrink-0 text-[#6c47ff] transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className="faq-body" style={{ maxHeight: openFaq === i ? "160px" : "0", opacity: openFaq === i ? 1 : 0 }}>
                  <div className="border-t border-gray-100 px-6 py-4 text-sm leading-relaxed text-gray-600">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER  */}
       <Footer  />    </div>
  );
}