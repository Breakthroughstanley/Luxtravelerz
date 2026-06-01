"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdStar, MdStarBorder, MdFavorite, MdFavoriteBorder, MdFilterList, MdMap, MdList, MdKeyboardArrowDown, MdLocationOn, MdWifi, MdPool, MdLocalParking, MdFreeBreakfast, MdAbc, MdClose, MdSearch } from "react-icons/md";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
// ── Mock data ───────────────────────────────────────────────────────────────
const HOTELS = [
  {
    id: 1,
    name: "Eko Hotel & Suites",
    stars: 5,
    rating: 4.7,
    reviews: 1284,
    distance: "0.8 km from Victoria Island",
    tag: "Top Pick",
    tagColor: "bg-[#6c47ff] text-white",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    price: 185000,
    originalPrice: 220000,
    provider: "Booking.com",
    perks: ["Free cancellation", "Breakfast included"],
    amenities: ["wifi", "pool", "parking", "breakfast", "ac"],
    bookingOptions: 4,
    cheapestFrom: 172000,
    location: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 2,
    name: "Transcorp Hilton Abuja",
    stars: 5,
    rating: 4.5,
    reviews: 893,
    distance: "1.2 km from Maitama",
    tag: "Great for Business",
    tagColor: "bg-[#ffd166] text-gray-900",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    price: 245000,
    originalPrice: null,
    provider: "Hotels.com",
    perks: ["Free cancellation"],
    amenities: ["wifi", "pool", "parking", "ac"],
    bookingOptions: 3,
    cheapestFrom: 231000,
    location: { lat: 9.0579, lng: 7.4951 },
  },
  {
    id: 3,
    name: "Four Points by Sheraton",
    stars: 4,
    rating: 4.3,
    reviews: 562,
    distance: "0.5 km from Lekki Phase 1",
    tag: "Great for Families",
    tagColor: "bg-gray-100 text-gray-700",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop",
    price: 132000,
    originalPrice: 155000,
    provider: "Expedia",
    perks: ["Free cancellation", "Breakfast included"],
    amenities: ["wifi", "pool", "breakfast", "ac"],
    bookingOptions: 5,
    cheapestFrom: 119000,
    location: { lat: 6.4698, lng: 3.5852 },
  },
  {
    id: 4,
    name: "Radisson Blu Anchorage",
    stars: 5,
    rating: 4.6,
    reviews: 741,
    distance: "2.1 km from Bar Beach",
    tag: "Romantic Getaway",
    tagColor: "bg-pink-100 text-pink-700",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    price: 310000,
    originalPrice: null,
    provider: "Booking.com",
    perks: ["Breakfast included"],
    amenities: ["wifi", "pool", "parking", "breakfast", "ac"],
    bookingOptions: 2,
    cheapestFrom: 298000,
    location: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 5,
    name: "Southern Sun Ikoyi",
    stars: 4,
    rating: 4.1,
    reviews: 328,
    distance: "1.5 km from Ikoyi Club",
    tag: null,
    tagColor: "",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    price: 98000,
    originalPrice: 112000,
    provider: "Agoda",
    perks: ["Free cancellation"],
    amenities: ["wifi", "parking", "ac"],
    bookingOptions: 6,
    cheapestFrom: 89000,
    location: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: 6,
    name: "Marriott Lagos",
    stars: 5,
    rating: 4.8,
    reviews: 2041,
    distance: "0.3 km from Ikeja GRA",
    tag: "Guests love it",
    tagColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop",
    price: 420000,
    originalPrice: 480000,
    provider: "Marriott.com",
    perks: ["Free cancellation", "Breakfast included"],
    amenities: ["wifi", "pool", "parking", "breakfast", "ac"],
    bookingOptions: 3,
    cheapestFrom: 405000,
    location: { lat: 6.5950, lng: 3.3400 },
  },
];

const SORT_OPTIONS = ["Recommended", "Top reviews", "Lowest price", "Most stars", "Nearest first"];
const STAR_FILTERS = [5, 4, 3, 2];
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <MdWifi size={14} />,
  pool: <MdPool size={14} />,
  parking: <MdLocalParking size={14} />,
  breakfast: <MdFreeBreakfast size={14} />,
  ac: <MdAbc size={14} />,
};

const formatPrice = (n: number) => `₦${n.toLocaleString()}`;

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) =>
        i < count ? (
          <MdStar key={i} size={14} className="text-[#ffd166]" />
        ) : (
          <MdStarBorder key={i} size={14} className="text-gray-300" />
        )
      )}
    </div>
  );
}

export default function HotelsPage() {
  const router = useRouter();
  const [destination, setDestination] = useState("Lagos");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ adults: 2, rooms: 1 });
  const [openGuests, setOpenGuests] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [starFilter, setStarFilter] = useState<number[]>([]);
  const [priceMax, setPriceMax] = useState(500000);
  const [showFilters, setShowFilters] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const toggleFavorite = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const toggleStarFilter = (s: number) =>
    setStarFilter((prev) => (prev.includes(s) ? prev.filter((f) => f !== s) : [...prev, s]));

  const validateSearch = () => {
    const errs: Record<string, string> = {};
    if (!destination.trim()) errs.destination = "Enter a destination";
    if (!checkIn) errs.checkIn = "Select check-in date";
    if (!checkOut) errs.checkOut = "Select check-out date";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const filteredHotels = HOTELS.filter((h) => {
    if (starFilter.length > 0 && !starFilter.includes(h.stars)) return false;
    if (h.price > priceMax) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Lowest price") return a.price - b.price;
    if (sortBy === "Most stars") return b.stars - a.stars;
    if (sortBy === "Top reviews") return b.rating - a.rating;
    return 0;
  });

  return (
 
    <div className="min-h-screen bg-gray-50">
         <Navbar />
      {/* ── SEARCH BAR ─────────────────────────────────────────────────── */}
     <div className="bg-gradient-to-b from-[#6c47ff]/10 via-white to-white border-b border-gray-200 px-5 py-6">
  <div className="max-w-6xl mx-auto">

    <div className="bg-white/80 backdrop-blur-xl rounded-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-5 md:p-6">

      <div className="grid md:grid-cols-4 gap-4 items-center">

        {/* Destination */}
        <div className={`md:col-span-1 px-4 py-3 rounded-2xl transition-all border ${
          formErrors.destination
            ? "border-red-400 bg-red-50/30"
            : "border-transparent bg-gray-50/60 hover:bg-gray-50"
        }`}>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-1">
            Where to stay <span className="text-red-400">*</span>
          </p>

          <div className="flex items-center gap-2">
            <MdLocationOn size={18} className="text-[#6c47ff]" />

            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setFormErrors((p) => ({ ...p, destination: "" }));
              }}
              className="w-full bg-transparent outline-none text-sm font-semibold text-gray-900 placeholder:text-gray-300"
              placeholder="Lagos, Nigeria"
            />
          </div>

          {formErrors.destination && (
            <p className="text-[11px] text-red-500 mt-1">
              {formErrors.destination}
            </p>
          )}
        </div>

        {/* Check-in */}
        <div className={`px-4 py-3 rounded-2xl border transition-all ${
          formErrors.checkIn
            ? "border-red-400 bg-red-50/30"
            : "border-transparent bg-gray-50/60 hover:bg-gray-50"
        }`}>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-1">
            Check-in <span className="text-red-400">*</span>
          </p>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setFormErrors((p) => ({ ...p, checkIn: "" }));
            }}
            className="w-full bg-transparent outline-none text-sm font-semibold text-gray-900"
          />

          {formErrors.checkIn && (
            <p className="text-[11px] text-red-500 mt-1">
              {formErrors.checkIn}
            </p>
          )}
        </div>

        {/* Check-out */}
        <div className={`px-4 py-3 rounded-2xl border transition-all ${
          formErrors.checkOut
            ? "border-red-400 bg-red-50/30"
            : "border-transparent bg-gray-50/60 hover:bg-gray-50"
        }`}>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-1">
            Check-out <span className="text-red-400">*</span>
          </p>

          <input
            type="date"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setFormErrors((p) => ({ ...p, checkOut: "" }));
            }}
            className="w-full bg-transparent outline-none text-sm font-semibold text-gray-900"
          />

          {formErrors.checkOut && (
            <p className="text-[11px] text-red-500 mt-1">
              {formErrors.checkOut}
            </p>
          )}
        </div>

        {/* Guests + Search */}
        <div className="flex items-center gap-3">

          {/* Guests */}
          <div className="relative flex-1">
            <button
              onClick={() => setOpenGuests(!openGuests)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50/60 hover:bg-gray-50 border border-transparent text-left transition flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-1">
                  Guests
                </p>

                <p className="text-sm font-semibold text-gray-900">
                  {guests.adults} adults · {guests.rooms} room{guests.rooms > 1 ? "s" : ""}
                </p>
              </div>

              <MdKeyboardArrowDown
                size={16}
                className={`text-[#6c47ff] transition ${openGuests ? "rotate-180" : ""}`}
              />
            </button>

            {openGuests && (
              <div className="absolute z-50 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 space-y-4">
                {[
                  { label: "Adults", sub: "18+ years", key: "adults", min: 1 },
                  { label: "Rooms", sub: "Number of rooms", key: "rooms", min: 1 },
                ].map(({ label, sub, key, min }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{label}</p>
                      <p className="text-xs text-gray-400">{sub}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setGuests((p) => ({
                            ...p,
                            [key]: Math.max(min, (p as any)[key] - 1),
                          }))
                        }
                        className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        -
                      </button>

                      <span className="w-5 text-center text-sm font-bold">
                        {(guests as any)[key]}
                      </span>

                      <button
                        onClick={() =>
                          setGuests((p) => ({
                            ...p,
                            [key]: (p as any)[key] + 1,
                          }))
                        }
                        className="h-8 w-8 rounded-full bg-[#6c47ff] text-white hover:bg-[#5a3dd4]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setOpenGuests(false)}
                  className="w-full mt-2 bg-[#6c47ff] text-white py-2 rounded-xl font-semibold text-sm hover:opacity-90"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search */}
          <button
            onClick={() => {
              if (!validateSearch()) return;
            }}
            className="h-[52px] px-6 rounded-2xl bg-[#6c47ff] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <MdSearch size={20} />
          </button>

        </div>

      </div>
    </div>
  </div>
</div>

      {/* ── MAIN LAYOUT ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="flex gap-6">

          {/* ── SIDEBAR FILTERS ─────────────────────────────────────────── */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-5">

            {/* Price range */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest text-[#6c47ff]">Price per night</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={50000}
                  max={500000}
                  step={10000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#6c47ff]"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-600">₦50,000</span>
                  <span className="font-bold text-[#6c47ff]">{formatPrice(priceMax)}</span>
                </div>
              </div>
            </div>

            {/* Star rating */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest text-[#6c47ff]">Star Rating</h3>
              <div className="space-y-2">
                {STAR_FILTERS.map((s) => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={starFilter.includes(s)}
                      onChange={() => toggleStarFilter(s)}
                      className="accent-[#6c47ff] w-4 h-4"
                    />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: s }).map((_, i) => <MdStar key={i} size={14} className="text-[#ffd166]" />)}
                      {Array.from({ length: 5 - s }).map((_, i) => <MdStarBorder key={i} size={14} className="text-gray-300" />)}
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-800 transition">{s} stars</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-widest text-[#6c47ff]">Amenities</h3>
              <div className="space-y-2">
                {[
                  { key: "wifi", label: "Free WiFi" },
                  { key: "pool", label: "Swimming pool" },
                  { key: "parking", label: "Free parking" },
                  { key: "breakfast", label: "Breakfast included" },
                  { key: "ac", label: "Air conditioning" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="accent-[#6c47ff] w-4 h-4" />
                    <span className="text-sm text-gray-600">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* ── RESULTS ────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Sort + view bar */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{filteredHotels.length}</span> hotels found
                {destination && <span> in <span className="font-semibold text-[#6c47ff]">{destination}</span></span>}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white shadow-sm"
                >
                  <MdFilterList size={16} />
                  Filters
                </button>

                {/* Sort tabs */}
                <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full p-1">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${sortBy === opt ? "bg-[#6c47ff] text-white shadow" : "text-gray-600 hover:bg-white"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Mobile sort select */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="md:hidden text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white font-medium text-gray-700"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>

                {/* View toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow text-[#6c47ff]" : "text-gray-500"}`}>
                    <MdList size={18} />
                  </button>
                  <button onClick={() => setViewMode("map")} className={`p-1.5 rounded-lg transition-all ${viewMode === "map" ? "bg-white shadow text-[#6c47ff]" : "text-gray-500"}`}>
                    <MdMap size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Price insight */}
            <div className="mb-4 bg-white border border-gray-200 rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <p className="text-sm text-gray-700">Prices are <span className="font-semibold text-gray-900">as expected</span> for these dates</p>
              </div>
              <button className="text-xs text-[#6c47ff] font-semibold hover:underline">Show price data ↓</button>
            </div>

            {/* Hotel cards */}
            <div className="space-y-4">
              {filteredHotels.map((hotel, idx) => (
                <div
                  key={hotel.id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_8px_40px_rgba(108,71,255,0.12)] hover:border-[#6c47ff]/30 transition-all duration-300 group"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative md:w-64 h-52 md:h-auto shrink-0 overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Favorite */}
                      <button
                        onClick={() => toggleFavorite(hotel.id)}
                        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-all"
                      >
                        {favorites.includes(hotel.id)
                          ? <MdFavorite size={18} className="text-red-500" />
                          : <MdFavoriteBorder size={18} className="text-gray-500" />}
                      </button>
                      {/* Stars badge */}
                      <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
                        <MdStar size={12} className="text-[#ffd166]" />
                        <span className="text-white text-xs font-bold">{hotel.stars}-star hotel</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-5 flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        {hotel.tag && (
                          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2 ${hotel.tagColor}`}>
                            {hotel.tag}
                          </span>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#6c47ff] transition-colors">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mb-2">
                          <StarRow count={hotel.stars} />
                          <span className="text-xs text-gray-400 ml-1">{hotel.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-[#6c47ff] text-white text-xs font-bold px-2 py-1 rounded-lg">
                            {hotel.rating}
                          </div>
                          <span className="text-sm text-gray-600">
                            {hotel.rating >= 4.7 ? "Exceptional" : hotel.rating >= 4.4 ? "Excellent" : hotel.rating >= 4.0 ? "Very Good" : "Good"}
                          </span>
                          <span className="text-xs text-gray-400">· {hotel.reviews.toLocaleString()} reviews</span>
                        </div>
                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1.5">
                          {hotel.amenities.map((a) => (
                            <span key={a} className="flex items-center gap-1 bg-gray-50 border border-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-lg font-medium">
                              {AMENITY_ICONS[a]}
                              {a === "wifi" ? "WiFi" : a === "pool" ? "Pool" : a === "parking" ? "Parking" : a === "breakfast" ? "Breakfast" : "A/C"}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="md:w-52 shrink-0 flex flex-col justify-between md:border-l md:border-gray-100 md:pl-5">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">{hotel.provider}</p>
                          {hotel.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">{formatPrice(hotel.originalPrice)}</p>
                          )}
                          <p className="text-2xl font-bold text-gray-900">{formatPrice(hotel.price)}</p>
                          <p className="text-xs text-gray-400 mb-3">a night</p>
                          <div className="space-y-1 mb-4">
                            {hotel.perks.map((p) => (
                              <p key={p} className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                {p}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#6c47ff] to-[#8b6dff] text-white font-bold text-sm shadow-[0_6px_20px_rgba(108,71,255,0.3)] hover:scale-[1.02] transition-all duration-200">
                            Go to site →
                          </button>
                          <button className="w-full py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium hover:border-[#6c47ff] hover:text-[#6c47ff] transition-all flex items-center justify-center gap-1">
                            <MdKeyboardArrowDown size={14} />
                            {hotel.bookingOptions}+ options · from {formatPrice(hotel.cheapestFrom)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <p className="text-5xl mb-4">🏨</p>
                <p className="font-semibold text-gray-600 text-lg">No hotels match your filters</p>
                <p className="text-sm mt-1">Try adjusting the price range or star rating</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}