"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MdSwapHoriz, MdExpandMore, MdHouse, MdDirectionsCar, MdPublic, MdKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import Footer from "@/components/footer";
import DealsCarousel from "@/components/DealsCarousel";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const [form, setForm] = useState({
    from: "Lagos",
    to: "Dubai",
    departure: "",
    returnDate: "",
    travelClass: "Economy",
    ticketType: "Round Trip",
   passengers: {
  adults: 1,
  children: 0,
  childrenAges: [] as number[],
}
  });
const [openTravelers, setOpenTravelers] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Hotels");

  const swapCities = () => {
    setForm({
      ...form,
      from: form.to,
      to: form.from,
    });
  };
const router = useRouter();
  const popular = ["London", "Dubai", "Paris", "Toronto", "Istanbul"];

  // Navigation tabs for flights page (no Flights button)
  const navTabs = [
    {
      icon: MdHouse,
      label: "Hotels",
      href: "/hotels",
      description: "Find luxury stays and top-rated hotels",
    },
    {
      icon: MdDirectionsCar,
      label: "Cars",
      href: "/rides",
      description: "Rent vehicles at top destinations",
    },
    {
      icon: MdPublic,
      label: "Explore everywhere",
      href: "/explore",
      description: "Discover curated travel experiences",
    },
  ];

  const faqs = [
    {
      question: "What is Luxtravelerz?",
      answer:
        "Luxtravelerz is a premium travel platform designed to help you discover and book exceptional flights, luxury stays, and curated travel experiences across the world.",
    },
    {
      question: "How does Luxtravelerz find the best flights?",
      answer:
        "We intelligently compare top airlines and trusted travel providers, highlighting options that combine comfort, value, and convenience—so you don't have to search multiple platforms.",
    },
    {
      question: "How do I book through Luxtravelerz?",
      answer:
        "Simply search for your journey, choose your preferred option, and we'll seamlessly connect you to the airline or provider to complete your booking securely.",
    },
    {
      question: "Can I discover new destinations?",
      answer:
        "Yes. Luxtravelerz is built for exploration—browse trending destinations, curated routes, and exclusive travel inspiration tailored to your preferences.",
    },
    {
      question: "What happens after I book?",
      answer:
        "Once your booking is confirmed, you'll receive your full itinerary and travel details directly from the provider, along with everything you need for a smooth journey.",
    },
    {
      question: "Does Luxtravelerz offer price tracking?",
      answer:
        "Yes, you can monitor fare changes for your preferred routes and receive timely updates when prices shift—so you can book with confidence.",
    },
    {
      question: "Are flexible travel options available?",
      answer:
        "Many of our partners offer flexible booking options, including changes and cancellations. You can filter for these features when searching.",
    },
    {
      question: "Can I choose more sustainable travel options?",
      answer:
        "Absolutely. Luxtravelerz allows you to identify flights with lower carbon emissions, helping you make more responsible travel decisions without compromising on quality.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
  

      {/* HERO - TOP SECTION */}
      <div className="bg-gradient-to-b from-[#6c47ff]/5 to-white pt-8 pb-8 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Millions of cheap flights. One simple search.
          </h1>
          <p className="text-gray-600 mb-6">
            <button className="text-[#6c47ff] hover:underline font-semibold">
              Explore trips →
            </button>
          </p>

          {/* SEARCH PANEL */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">
            {/* TOP CONTROLS */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* ticket type */}
              <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                {["One Way", "Round Trip"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setForm({ ...form, ticketType: type })}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                      form.ticketType === type
                        ? "bg-[#6c47ff] text-white shadow"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* class */}
              <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                {["Economy", "Business", "First"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, travelClass: c })}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                      form.travelClass === c
                        ? "bg-[#ffd166] text-gray-900 shadow"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Add hotel checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                Add a hotel
              </label>
            </div>

            {/* MAIN INPUT ROW */}
            <div className="grid md:grid-cols-5 gap-3 items-center mb-4">
              {/* FROM */}
              <div className="md:col-span-2 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 focus-within:ring-2 focus-within:ring-[#6c47ff]">
                <p className="text-xs text-gray-500 font-semibold">From</p>
                <input
                  value={form.from}
                  onChange={(e) =>
                    setForm({ ...form, from: e.target.value })
                  }
                  className="w-full text-base font-semibold outline-none bg-transparent text-gray-900"
                  placeholder="City or airport"
                />
              </div>

              {/* SWAP */}
              <div className="flex justify-center">
                <button
                  onClick={swapCities}
                  className="h-12 w-12 rounded-full bg-[#6c47ff] text-white flex items-center justify-center hover:bg-[#5a3dd4] transition shadow-md"
                >
                  <MdSwapHoriz size={20} />
                </button>
              </div>

              {/* TO */}
              <div className="md:col-span-2 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 focus-within:ring-2 focus-within:ring-[#6c47ff]">
                <p className="text-xs text-gray-500 font-semibold">To</p>
                <input
                  value={form.to}
                  onChange={(e) =>
                    setForm({ ...form, to: e.target.value })
                  }
                  className="w-full text-base font-semibold outline-none bg-transparent text-gray-900"
                  placeholder="City or airport"
                />
              </div>
            </div>

            {/* DATES + PASSENGERS */}
           <div
  className={`grid gap-3 mb-6 ${
    form.ticketType === "Round Trip"
      ? "md:grid-cols-4"
      : "md:grid-cols-3"
  }`}
>
              <div className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200">
                <p className="text-xs text-gray-500 font-semibold">Departure</p>
                <input
                  type="date"
                  value={form.departure}
                  onChange={(e) =>
                    setForm({ ...form, departure: e.target.value })
                  }
                  className="w-full text-base font-semibold outline-none bg-transparent text-gray-900"
                />
              </div>

            {form.ticketType === "Round Trip" && (
  <div className="bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200">
    <p className="text-xs text-gray-500 font-semibold">Return</p>
    <input
      type="date"
      value={form.returnDate}
      onChange={(e) =>
        setForm({ ...form, returnDate: e.target.value })
      }
      className="w-full text-base font-semibold outline-none bg-transparent text-gray-900"
    />
  </div>
)}

              {/* PASSENGERS */}
{/* PASSENGERS */}
<div className="relative">
  <button
    onClick={() => setOpenTravelers(!openTravelers)}
    className="w-full bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 flex items-center justify-between hover:bg-gray-100 transition"
  >
    <div>
      <p className="text-xs text-gray-500 font-semibold">
        Travelers
      </p>
      <p className="text-base font-semibold text-gray-900">
        {form.passengers.adults} Adult
        {form.passengers.adults > 1 && "s"}
        {form.passengers.children > 0 &&
          `, ${form.passengers.children} Child${
            form.passengers.children > 1 ? "ren" : ""
          }`}
      </p>
    </div>

    <MdKeyboardArrowDown
      size={22}
      className={`transition ${
        openTravelers ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* DROPDOWN */}
  {openTravelers && (
    <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border p-5 space-y-5 animate-in fade-in zoom-in-95">
      
      {/* INFO TEXT */}
      <p className="text-xs text-gray-500">
        Ages are required for children to ensure accurate pricing.
      </p>

      {/* ADULTS */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Adults <span className="text-xs text-gray-500">(18+)</span>
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                passengers: {
                  ...prev.passengers,
                  adults: Math.max(1, prev.passengers.adults - 1),
                },
              }))
            }
            className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            -
          </button>

          <span className="w-6 text-center">
            {form.passengers.adults}
          </span>

          <button
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                passengers: {
                  ...prev.passengers,
                  adults: prev.passengers.adults + 1,
                },
              }))
            }
            className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* CHILDREN */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Children <span className="text-xs text-gray-500">(0–17)</span>
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              const newCount = Math.max(0, form.passengers.children - 1);
              setForm((prev) => ({
                ...prev,
                passengers: {
                  ...prev.passengers,
                  children: newCount,
                  childrenAges: prev.passengers.childrenAges.slice(0, newCount),
                },
              }));
            }}
            className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            -
          </button>

          <span className="w-6 text-center">
            {form.passengers.children}
          </span>

          <button
            onClick={() => {
              const newCount = form.passengers.children + 1;
              setForm((prev) => ({
                ...prev,
                passengers: {
                  ...prev.passengers,
                  children: newCount,
                },
              }));
            }}
            className="h-8 w-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* CHILD AGES */}
   
      {/* DONE BUTTON */}
      <button
        onClick={() => setOpenTravelers(false)}
        className="w-full mt-2 bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Done
      </button>
    </div>
  )}
</div>

              {/* SEARCH BUTTON */}
          <div>
  <button
    onClick={() => {
      router.push(
        `/flights/results?from=${form.from}&to=${form.to}&departure=${form.departure}&return=${form.returnDate}&adults=${form.passengers.adults}&children=${form.passengers.children}`
      );
    }}
    className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white font-bold text-base shadow-lg hover:opacity-90 transition"
  >
    Search
  </button>
</div>
            </div>

            {/* POPULAR DESTINATIONS */}
            <div>
              <p className="text-xs text-gray-500 font-semibold mb-3">
                Popular destinations
              </p>

              <div className="flex flex-wrap gap-2">
                {popular.map((city) => (
                  <button
                    key={city}
                    onClick={() => setForm({ ...form, to: city })}
                    className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700 hover:bg-[#6c47ff] hover:text-white transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
<DealsCarousel />
      {/* NAVIGATION BUTTONS - Hotels, Cars, Explore (no Flights tab) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-3 gap-4">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.label;

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`group flex items-center gap-4 p-6 rounded-2xl border transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white border-transparent shadow-lg"
                      : "bg-gray-50 hover:bg-white border-gray-200 hover:shadow-md"
                  }`}
              >
                {/* ICON */}
                <div
                  className={`h-14 w-14 flex items-center justify-center rounded-xl text-2xl transition
                    ${
                      isActive
                        ? "bg-white/20"
                        : "bg-white text-[#6c47ff] group-hover:bg-[#6c47ff] group-hover:text-white"
                    }`}
                >
                  <tab.icon />
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-lg font-bold">{tab.label}</p>
                  <p
                    className={`text-sm ${
                      isActive ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {tab.label === "Hotels" && "Find luxury stays and top-rated hotels"}
                    {tab.label === "Cars" && "Rent vehicles at top destinations"}
                    {tab.label === "Explore everywhere" &&
                      "Discover curated travel experiences"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* HERO IMAGE SECTION */}
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div
          className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white p-6 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore every destination
            </h2>
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition">
              Search flights everywhere
            </button>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Booking flights with Luxtravelerz
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === idx ? null : idx)
                }
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition font-semibold text-gray-900 text-left"
              >
                {faq.question}
                <MdExpandMore
                  size={24}
                  className={`text-[#6c47ff] transition transform ${
                    expandedFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedFaq === idx && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
   <Footer />
    </div>
  );
}