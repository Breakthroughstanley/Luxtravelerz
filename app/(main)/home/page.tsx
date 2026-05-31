"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MdSwapHoriz, MdExpandMore, MdHouse, MdDirectionsCar, MdPublic, MdKeyboardArrowDown,   MdDeleteOutline, } from "react-icons/md";
import Link from "next/link";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";
import DealsCarousel from "@/components/DealsCarousel";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
export default function HomePage() {
 const [form, setForm] = useState({
  from: "Lagos",
  to: "Dubai",
  departure: "",
  returnDate: "",

  // START DEFAULT
  ticketType: "One Way",

  travelClass: "Economy",

  nearbyAirports: false,
  directFlights: false,

  multiFlights: [
    {
      from: "Lagos",
      to: "",
      departure: "",
    },
    {
      from: "",
      to: "Lagos",
      departure: "",
    },
  ],

  passengers: {
    adults: 1,
    children: 0,
    childrenAges: [] as number[],
  },
});
const [openTravelers, setOpenTravelers] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Hotels");
// ADD THESE STATES

const [searchResults, setSearchResults] = useState<string[]>([]);
const [activeField, setActiveField] = useState<
  "from" | "to" | null
>(null);

const airports = [
  "Lagos (LOS)",
  "Abuja (ABV)",
  "Port Harcourt (PHC)",
  "Dubai (DXB)",
  "London (LHR)",
  "Toronto (YYZ)",
  "Paris (CDG)",
  "Istanbul (IST)",
  "New York (JFK)",
  "Atlanta (ATL)",
  "Cape Town (CPT)",
  "Johannesburg (JNB)",
];
  const swapCities = () => {
    setForm({
      ...form,
      from: form.to,
      to: form.from,
    });
  };
const router = useRouter();
  const popular = ["London", "Dubai", "Paris", "Toronto", "Istanbul"];
// ADD THIS FUNCTION

const handleSearch = (
  value: string,
  field: "from" | "to"
) => {
  setActiveField(field);

  if (!value.trim()) {
    setSearchResults([]);
    return;
  }

  const filtered = airports.filter((airport) =>
    airport.toLowerCase().includes(value.toLowerCase())
  );

  setSearchResults(filtered);
};
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
useEffect(() => {
  const saved = sessionStorage.getItem("lastFlightSearch");

  if (saved) {
    const parsed = JSON.parse(saved);

    setForm((prev) => ({
      ...prev,
      ...parsed,
    }));
  }
}, []);
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
<div className="flex flex-col gap-4 mb-6">
  <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

    {/* Ticket Type */}
    <div className="w-full xl:w-auto">

      {/* Mobile Select */}
      <div className="relative xl:hidden">
        <select
          value={form.ticketType}
          onChange={(e) =>
            setForm({ ...form, ticketType: e.target.value })
          }
          className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30 focus:border-[#6c47ff] transition-all"
        >
          {["One Way", "Return", "Multi City"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden xl:flex gap-2 bg-gray-100 rounded-full p-1">
        {["One Way", "Return", "Multi City"].map((type) => (
          <button
            key={type}
            onClick={() => setForm({ ...form, ticketType: type })}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              form.ticketType === type
                ? "bg-[#6c47ff] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>

    {/* Travel Class */}
    <div className="w-full xl:w-auto">

      {/* Mobile Select */}
      <div className="relative xl:hidden">
        <select
          value={form.travelClass}
          onChange={(e) =>
            setForm({ ...form, travelClass: e.target.value })
          }
          className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd166]/40 focus:border-[#ffd166] transition-all"
        >
          {["Economy", "Premium Economy", "Business", "First"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden xl:flex gap-2 bg-gray-100 rounded-full p-1">
        {["Economy", "Premium Economy", "Business", "First"].map((c) => (
          <button
            key={c}
            onClick={() => setForm({ ...form, travelClass: c })}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              form.travelClass === c
                ? "bg-[#ffd166] text-gray-900 shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>

    {/* Add Hotel */}
    <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm hover:border-[#6c47ff]/40 transition-all">
      <input
        type="checkbox"
        className="w-4 h-4 rounded accent-[#6c47ff]"
      />
      <span className="font-medium">Add a hotel</span>
    </label>

  </div>
</div>

            {/* MAIN INPUT ROW */}
            {/* ========================= */}
{/* ========================= */}
{/* ONE WAY + RETURN */}
{/* ========================= */}

{/* ========================= */}
{/* ONE WAY + RETURN */}
{/* ========================= */}

{form.ticketType !== "Multi City" && (
  <div className="space-y-4">

  {/* ROUTE CARD */}
<div className="relative bg-gradient-to-br from-white to-[#faf8ff] border border-gray-200 rounded-[32px] p-4 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-visible z-20">

  {/* subtle glow */}
  <div className="absolute top-0 right-0 w-52 h-52 bg-[#6c47ff]/5 rounded-full blur-3xl" />

  <div className="relative z-30 grid md:grid-cols-5 gap-4 items-start overflow-visible">

    {/* FROM */}
    <div className="relative md:col-span-2 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-visible z-50">

      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          From
        </p>

        <span className="text-[9px] bg-[#f3efff] text-[#6c47ff] px-2 py-1 rounded-full font-semibold">
          Origin
        </span>
      </div>

      <p className="text-[11px] text-gray-400 mb-3">
        Flying from
      </p>

      <input
        value={form.from}
        onChange={(e) => {
          setForm({ ...form, from: e.target.value });
          handleSearch(e.target.value, "from");
        }}
        onFocus={() => setActiveField("from")}
        className="w-full bg-transparent outline-none text-xl font-bold text-gray-900 placeholder:text-gray-300"
        placeholder="Lagos (LOS)"
      />

      {/* SUGGESTIONS */}
      {activeField === "from" && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] overflow-hidden z-[99999] backdrop-blur-xl">

          {searchResults.map((airport) => (
            <button
              key={airport}
              onClick={() => {
                setForm({
                  ...form,
                  from: airport,
                });

                setSearchResults([]);
              }}
              className="w-full text-left px-4 py-3 hover:bg-[#f6f3ff] transition text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0"
            >
              {airport}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">

        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={form.nearbyAirports}
            onChange={(e) =>
              setForm({
                ...form,
                nearbyAirports: e.target.checked,
              })
            }
            className="accent-[#6c47ff]"
          />
          Nearby airports
        </label>

        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={form.directFlights}
            onChange={(e) =>
              setForm({
                ...form,
                directFlights: e.target.checked,
              })
            }
            className="accent-[#6c47ff]"
          />
          Direct only
        </label>
      </div>
    </div>

    {/* SWAP */}
    <div className="flex justify-center">
      <button
        onClick={swapCities}
        className="group h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6c47ff] to-[#8b6dff] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
      >
        <MdSwapHoriz
          size={22}
          className="group-hover:rotate-180 transition-transform duration-500"
        />
      </button>
    </div>

    {/* TO */}
    <div className="relative md:col-span-2 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-visible z-50">

      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          To
        </p>

        <span className="text-[9px] bg-[#fff5dc] text-[#b88700] px-2 py-1 rounded-full font-semibold">
          Destination
        </span>
      </div>

      <p className="text-[11px] text-gray-400 mb-3">
        Flying to
      </p>

      <input
        value={form.to}
        onChange={(e) => {
          setForm({ ...form, to: e.target.value });
          handleSearch(e.target.value, "to");
        }}
        onFocus={() => setActiveField("to")}
        className="w-full bg-transparent outline-none text-xl font-bold text-gray-900 placeholder:text-gray-300"
        placeholder="Dubai (DXB)"
      />

      {/* SUGGESTIONS */}
      {activeField === "to" && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] overflow-hidden z-[99999] backdrop-blur-xl">

          {searchResults.map((airport) => (
            <button
              key={airport}
              onClick={() => {
                setForm({
                  ...form,
                  to: airport,
                });

                setSearchResults([]);
              }}
              className="w-full text-left px-4 py-3 hover:bg-[#f6f3ff] transition text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0"
            >
              {airport}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">

        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={form.nearbyAirports}
            onChange={(e) =>
              setForm({
                ...form,
                nearbyAirports: e.target.checked,
              })
            }
            className="accent-[#6c47ff]"
          />
          Nearby airports
        </label>
      </div>
    </div>
  </div>
</div>

    {/* LOWER SECTION */}
    <div
      className={`grid gap-3 ${
        form.ticketType === "Return"
          ? "md:grid-cols-4"
          : "md:grid-cols-3"
      }`}
    >

      {/* DEPART */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
          Depart
        </p>

        <input
          type="date"
          value={form.departure}
          onChange={(e) =>
            setForm({
              ...form,
              departure: e.target.value,
            })
          }
          className="w-full bg-transparent outline-none text-base font-bold text-gray-900"
        />
      </div>

      {/* RETURN */}
      {form.ticketType === "Return" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">

          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
            Return
          </p>

          <input
            type="date"
            value={form.returnDate}
            onChange={(e) =>
              setForm({
                ...form,
                returnDate: e.target.value,
              })
            }
            className="w-full bg-transparent outline-none text-base font-bold text-gray-900"
          />
        </div>
      )}

      {/* TRAVELLERS */}
      <div className="relative">
        <button
          onClick={() => setOpenTravelers(!openTravelers)}
          className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
              Travellers
            </p>

            <p className="text-base font-bold text-gray-900">
              {form.passengers.adults} Adult
              {form.passengers.adults > 1 && "s"}
              {form.passengers.children > 0 &&
                `, ${form.passengers.children} Child`}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {form.travelClass}
            </p>
          </div>

          <MdKeyboardArrowDown
            size={20}
            className={`text-[#6c47ff] transition ${
              openTravelers ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* DROPDOWN */}
        {openTravelers && (
          <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 space-y-5">

            {/* ADULTS */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Adults
                </p>

                <p className="text-xs text-gray-400">
                  18+ years
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      passengers: {
                        ...prev.passengers,
                        adults: Math.max(
                          1,
                          prev.passengers.adults - 1
                        ),
                      },
                    }))
                  }
                  className="h-9 w-9 rounded-full bg-gray-100"
                >
                  -
                </button>

                <span className="font-bold w-5 text-center">
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
                  className="h-9 w-9 rounded-full bg-[#6c47ff] text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* CHILDREN */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Children
                </p>

                <p className="text-xs text-gray-400">
                  0 – 17 years
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      passengers: {
                        ...prev.passengers,
                        children: Math.max(
                          0,
                          prev.passengers.children - 1
                        ),
                      },
                    }))
                  }
                  className="h-9 w-9 rounded-full bg-gray-100"
                >
                  -
                </button>

                <span className="font-bold w-5 text-center">
                  {form.passengers.children}
                </span>

                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      passengers: {
                        ...prev.passengers,
                        children: prev.passengers.children + 1,
                      },
                    }))
                  }
                  className="h-9 w-9 rounded-full bg-[#6c47ff] text-white"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => setOpenTravelers(false)}
              className="w-full bg-gradient-to-r from-[#6c47ff] to-[#8b6dff] text-white py-2.5 rounded-xl font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* SEARCH */}
      <div>
        <button
       onClick={() => {
  const searchData = {
    ticketType: form.ticketType,
    from: form.from,
    to: form.to,
    departure: form.departure,
    returnDate: form.returnDate,
    passengers: form.passengers,
    travelClass: form.travelClass,
    multiFlights: form.multiFlights,
  };

  // ✅ SAVE HERE
  sessionStorage.setItem(
    "lastFlightSearch",
    JSON.stringify(searchData)
  );

  router.push(
    `/flights/results?ticketType=${form.ticketType}&from=${form.from}&to=${form.to}&departure=${form.departure}&return=${form.returnDate}&adults=${form.passengers.adults}&children=${form.passengers.children}`
  );
}}
className="w-full h-full min-h-[78px] rounded-2xl bg-gradient-to-r from-[#6c47ff] via-[#7b5cff] to-[#8b6dff] text-white font-bold text-base shadow-[0_10px_35px_rgba(108,71,255,0.25)] hover:scale-[1.02] transition-all duration-300"
        >
          Search Flights
        </button>
      </div>
    </div>
  </div>
)}

{/* ========================= */}
{/* MULTI CITY */}
{/* ========================= */}

{form.ticketType === "Multi City" && (
  <div className="space-y-4">

    {form.multiFlights.map((flight, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-white to-[#faf8ff] border border-gray-200 rounded-[28px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >

     <div className="flex items-center justify-between mb-4">
  <div>
    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
      Flight {index + 1}
    </p>

    <h3 className="text-lg font-bold text-gray-900">
      Multi-city route
    </h3>
  </div>

  <div className="flex items-center gap-2">

    {/* DELETE BUTTON */}
   {/* DELETE BUTTON */}
{index >= 2 && (
  <button
    onClick={() => {
      const updated = form.multiFlights.filter(
        (_, i) => i !== index
      );

      setForm({
        ...form,
        multiFlights: updated,
      });
    }}
    className="h-10 w-10 rounded-2xl bg-[#fff5dc] text-[#b88700] flex items-center justify-center hover:scale-105 hover:bg-[#ffefbd] transition-all duration-300 shadow-sm"
  >
    <MdDeleteOutline size={20} />
  </button>
)}

    <div className="h-10 w-10 rounded-2xl bg-[#f3efff] flex items-center justify-center text-[#6c47ff] font-bold">
      {index + 1}
    </div>
  </div>
</div>

        {/* INPUTS */}
        <div className="grid md:grid-cols-3 gap-3">

          {/* FROM */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
              From
            </p>

            <input
              value={flight.from}
              onChange={(e) => {
                const updated = [...form.multiFlights];
                updated[index].from = e.target.value;

                setForm({
                  ...form,
                  multiFlights: updated,
                });
              }}
              className="w-full bg-transparent outline-none text-lg font-bold"
              placeholder="Lagos (LOS)"
            />
          </div>

          {/* TO */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
              To
            </p>

            <input
              value={flight.to}
              onChange={(e) => {
                const updated = [...form.multiFlights];
                updated[index].to = e.target.value;

                setForm({
                  ...form,
                  multiFlights: updated,
                });
              }}
              className="w-full bg-transparent outline-none text-lg font-bold"
              placeholder="Dubai (DXB)"
            />
          </div>

          {/* DATE */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
              Depart
            </p>

            <input
              type="date"
              value={flight.departure}
              onChange={(e) => {
                const updated = [...form.multiFlights];
                updated[index].departure = e.target.value;

                setForm({
                  ...form,
                  multiFlights: updated,
                });
              }}
              className="w-full bg-transparent outline-none text-base font-bold"
            />
          </div>
        </div>
      </div>
    ))}

    {/* ACTIONS */}
    <div className="grid md:grid-cols-2 gap-3">

      {/* ADD FLIGHT */}
      <button
        onClick={() =>
          setForm({
            ...form,
            multiFlights: [
              ...form.multiFlights,
              {
                from: "",
                to: "",
                departure: "",
              },
            ],
          })
        }
        className="h-16 border-2 border-dashed border-[#6c47ff] rounded-2xl font-semibold text-[#6c47ff] hover:bg-[#f6f3ff] transition-all"
      >
        + Add another flight
      </button>

      {/* SEARCH */}
   {/* SEARCH - UPDATED TO ROUTE TO MULTI-CITY RESULTS PAGE */}
<button
 onClick={() => {
  const searchData = {
    ticketType: form.ticketType,
    from: form.from,
    to: form.to,
    departure: form.departure,
    returnDate: form.returnDate,
    passengers: form.passengers,
    travelClass: form.travelClass,
    multiFlights: form.multiFlights,
  };

  // ✅ SAVE HERE
  sessionStorage.setItem(
    "lastFlightSearch",
    JSON.stringify(searchData)
  );

  // ✅ ROUTE TO DEDICATED MULTI-CITY PAGE
  router.push(
    `/flights/multi-city?flights=${encodeURIComponent(
      JSON.stringify(form.multiFlights)
    )}&adults=${form.passengers.adults}&children=${form.passengers.children}`
  );
}}
  className="h-16 rounded-2xl bg-gradient-to-r from-[#6c47ff] via-[#7b5cff] to-[#8b6dff] text-white font-bold text-base shadow-[0_10px_35px_rgba(108,71,255,0.25)] hover:scale-[1.02] transition-all duration-300"
>
  Search Multi-city
</button>
    </div>
  </div>
)}  
 </div>
    </div>
  </div>
    
      <Hero />
<DealsCarousel />
      {/* NAVIGATION BUTTONS - Hotels, Cars, Explore (no Flights tab) */}
    

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