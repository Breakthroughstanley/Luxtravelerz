"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  MdHotel,
  MdTune,
  MdStar,
  MdCheckCircle,
  MdInfoOutline,
  MdClose,
  MdKeyboardArrowDown,
  MdPool,
  MdWifi,
  MdFreeBreakfast,
  MdLocalParking,
  MdFitnessCenter,
  MdSpa,
  MdRestaurant,
  MdAirportShuttle,
  MdLocationOn,
  MdKingBed,
  MdPeople,
  MdBalcony,
} from "react-icons/md";

// ============================================================================
// Types
// ============================================================================

interface Hotel {
  id: number;
  name: string;
  category: "Budget" | "Standard" | "Superior" | "Deluxe" | "Luxury" | "Resort";
  brand?: string;
  location: string;
  distanceFromCenter: number;
  pricePerNight: number;
  totalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  stars: 1 | 2 | 3 | 4 | 5;
  roomType: string;
  bedType: "Single" | "Double" | "King" | "Twin" | "Suite";
  maxGuests: number;
  amenities: string[];
  breakfastIncluded: boolean;
  freeCancellation: boolean;
  available: number;
}

interface HotelFilters {
  priceMax: number;
  categories: string[];
  stars: number[];
  amenities: string[];
  breakfastIncluded: boolean | null;
  freeCancellation: boolean | null;
}

interface PriceRange {
  min: number;
  max: number;
}

// ============================================================================
// Dummy Hotel Data
// ============================================================================

const DUMMY_HOTELS: Hotel[] = [
  {
    id: 1,
    name: "Radisson Blu Hotel",
    category: "Luxury",
    brand: "Radisson",
    location: "Downtown Dubai",
    distanceFromCenter: 0.3,
    pricePerNight: 185000,
    totalPrice: 370000,
    rating: 4.8,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    stars: 5,
    roomType: "Deluxe King Room",
    bedType: "King",
    maxGuests: 2,
    amenities: ["Pool", "Wifi", "Gym", "Spa", "Restaurant", "Parking", "Airport Shuttle"],
    breakfastIncluded: true,
    freeCancellation: true,
    available: 4,
  },
  {
    id: 2,
    name: "City Center Inn",
    category: "Standard",
    location: "Business Bay",
    distanceFromCenter: 1.2,
    pricePerNight: 42000,
    totalPrice: 84000,
    rating: 4.1,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    stars: 3,
    roomType: "Standard Double Room",
    bedType: "Double",
    maxGuests: 2,
    amenities: ["Wifi", "Parking", "Restaurant"],
    breakfastIncluded: false,
    freeCancellation: true,
    available: 12,
  },
  {
    id: 3,
    name: "Burj View Suites",
    category: "Resort",
    brand: "Independent",
    location: "Downtown Dubai",
    distanceFromCenter: 0.1,
    pricePerNight: 320000,
    totalPrice: 640000,
    rating: 4.95,
    reviews: 521,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    stars: 5,
    roomType: "Panoramic Suite",
    bedType: "King",
    maxGuests: 3,
    amenities: ["Pool", "Wifi", "Gym", "Spa", "Restaurant", "Parking", "Airport Shuttle", "Breakfast"],
    breakfastIncluded: true,
    freeCancellation: false,
    available: 2,
  },
  {
    id: 4,
    name: "Marina Comfort Hotel",
    category: "Superior",
    location: "Dubai Marina",
    distanceFromCenter: 2.5,
    pricePerNight: 98000,
    totalPrice: 196000,
    rating: 4.5,
    reviews: 1089,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    stars: 4,
    roomType: "Sea View Room",
    bedType: "King",
    maxGuests: 2,
    amenities: ["Pool", "Wifi", "Gym", "Restaurant", "Parking"],
    breakfastIncluded: true,
    freeCancellation: true,
    available: 7,
  },
  {
    id: 5,
    name: "Budget Stay Express",
    category: "Budget",
    location: "Deira",
    distanceFromCenter: 4.8,
    pricePerNight: 22000,
    totalPrice: 44000,
    rating: 3.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    stars: 2,
    roomType: "Economy Twin Room",
    bedType: "Twin",
    maxGuests: 2,
    amenities: ["Wifi", "Parking"],
    breakfastIncluded: false,
    freeCancellation: true,
    available: 20,
  },
  {
    id: 6,
    name: "JBR Beach Resort",
    category: "Resort",
    brand: "Marriott",
    location: "Jumeirah Beach",
    distanceFromCenter: 3.1,
    pricePerNight: 255000,
    totalPrice: 510000,
    rating: 4.85,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=400&fit=crop",
    stars: 5,
    roomType: "Beachfront Suite",
    bedType: "King",
    maxGuests: 4,
    amenities: ["Pool", "Wifi", "Gym", "Spa", "Restaurant", "Airport Shuttle"],
    breakfastIncluded: true,
    freeCancellation: true,
    available: 3,
  },
  {
    id: 7,
    name: "Al Barsha Executive Hotel",
    category: "Deluxe",
    location: "Al Barsha",
    distanceFromCenter: 2.0,
    pricePerNight: 135000,
    totalPrice: 270000,
    rating: 4.6,
    reviews: 612,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    stars: 4,
    roomType: "Executive Double Room",
    bedType: "Double",
    maxGuests: 2,
    amenities: ["Pool", "Wifi", "Gym", "Restaurant", "Parking", "Spa"],
    breakfastIncluded: false,
    freeCancellation: true,
    available: 6,
  },
  {
    id: 8,
    name: "Palm Island Retreat",
    category: "Luxury",
    brand: "Atlantis",
    location: "Palm Jumeirah",
    distanceFromCenter: 5.5,
    pricePerNight: 480000,
    totalPrice: 960000,
    rating: 4.9,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
    stars: 5,
    roomType: "Palm View King Suite",
    bedType: "Suite",
    maxGuests: 3,
    amenities: ["Pool", "Wifi", "Gym", "Spa", "Restaurant", "Parking", "Airport Shuttle"],
    breakfastIncluded: true,
    freeCancellation: false,
    available: 1,
  },
];

// ============================================================================
// Filter Panel Component
// ============================================================================

interface FilterPanelProps {
  filters: HotelFilters;
  setFilters: (filters: HotelFilters) => void;
  hotels: Hotel[];
}

function FilterPanel({ filters, setFilters, hotels }: FilterPanelProps): ReactNode {
  const priceRange: PriceRange = useMemo(() => {
    if (hotels.length === 0) return { min: 0, max: 0 };
    const prices = hotels.map((h) => h.pricePerNight);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [hotels]);

  const categoriesList: string[] = useMemo(
    () => [...new Set(hotels.map((h) => h.category))].sort(),
    [hotels]
  );

  const amenitiesList: string[] = useMemo(
    () => [...new Set(hotels.flatMap((h) => h.amenities))].sort(),
    [hotels]
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      priceMax: priceRange.max,
      categories: [],
      stars: [],
      amenities: [],
      breakfastIncluded: null,
      freeCancellation: null,
    });
  }, [priceRange.max, setFilters]);

  const handleCategoryChange = useCallback(
    (category: string, checked: boolean) => {
      setFilters({
        ...filters,
        categories: checked
          ? [...filters.categories, category]
          : filters.categories.filter((c) => c !== category),
      });
    },
    [filters, setFilters]
  );

  const handleStarChange = useCallback(
    (star: number, checked: boolean) => {
      setFilters({
        ...filters,
        stars: checked
          ? [...filters.stars, star]
          : filters.stars.filter((s) => s !== star),
      });
    },
    [filters, setFilters]
  );

  const handleAmenityChange = useCallback(
    (amenity: string, checked: boolean) => {
      setFilters({
        ...filters,
        amenities: checked
          ? [...filters.amenities, amenity]
          : filters.amenities.filter((a) => a !== amenity),
      });
    },
    [filters, setFilters]
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MdTune className="text-[#6c47ff]" />
          Filters
        </h3>
        <button
          onClick={handleResetFilters}
          className="text-sm text-[#6c47ff] hover:text-[#5a3dd4] font-medium transition"
        >
          Reset
        </button>
      </div>

      {/* Price Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Price Per Night</h4>
        <div className="flex gap-2 items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            Up to ₦{(filters.priceMax / 1000).toFixed(0)}k
          </span>
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={filters.priceMax}
          onChange={(e) =>
            setFilters({ ...filters, priceMax: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6c47ff]"
        />
        <div className="text-xs text-gray-500 mt-2">
          ₦{priceRange.min.toLocaleString()} - ₦{priceRange.max.toLocaleString()}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Category</h4>
        <div className="space-y-2">
          {categoriesList.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={(e) => handleStarChange(star, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="flex items-center gap-1">
                {Array.from({ length: star }).map((_, i) => (
                  <MdStar key={i} size={14} className="text-yellow-400" />
                ))}
                {Array.from({ length: 5 - star }).map((_, i) => (
                  <MdStar key={i} size={14} className="text-gray-200" />
                ))}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Filters</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.breakfastIncluded === true}
              onChange={(e) =>
                setFilters({ ...filters, breakfastIncluded: e.target.checked ? true : null })
              }
              className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-1">
              <MdFreeBreakfast size={15} className="text-[#6c47ff]" /> Breakfast Included
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.freeCancellation === true}
              onChange={(e) =>
                setFilters({ ...filters, freeCancellation: e.target.checked ? true : null })
              }
              className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Free Cancellation
            </span>
          </label>
        </div>
      </div>

      {/* Amenities Filter */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenitiesList.slice(0, 7).map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Amenity Icon Helper
// ============================================================================

function AmenityIcon({ amenity }: { amenity: string }): ReactNode {
  const iconMap: Record<string, ReactNode> = {
    Pool: <MdPool size={16} className="text-[#6c47ff]" />,
    Wifi: <MdWifi size={16} className="text-[#6c47ff]" />,
    Breakfast: <MdFreeBreakfast size={16} className="text-[#6c47ff]" />,
    Parking: <MdLocalParking size={16} className="text-[#6c47ff]" />,
    Gym: <MdFitnessCenter size={16} className="text-[#6c47ff]" />,
    Spa: <MdSpa size={16} className="text-[#6c47ff]" />,
    Restaurant: <MdRestaurant size={16} className="text-[#6c47ff]" />,
    "Airport Shuttle": <MdAirportShuttle size={16} className="text-[#6c47ff]" />,
  };
  return (iconMap[amenity] as ReactNode) ?? <MdCheckCircle size={16} className="text-[#6c47ff]" />;
}

// ============================================================================
// Hotel Card Component
// ============================================================================

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

function HotelCard({ hotel, onSelect }: HotelCardProps): ReactNode {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSelectClick = useCallback(() => onSelect(hotel), [hotel, onSelect]);
  const handleExpandClick = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#6c47ff]/30 ${
        expanded ? "ring-2 ring-[#6c47ff]" : ""
      }`}
    >
      {/* Main hotel info */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Image & Details */}
        <div className="flex-1">
          <div className="mb-4 relative">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-2xl shadow-md"
              loading="lazy"
            />
            {hotel.freeCancellation && (
              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Free Cancellation
              </span>
            )}
            {hotel.breakfastIncluded && (
              <span className="absolute top-3 right-3 bg-orange-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Breakfast Incl.
              </span>
            )}
          </div>

          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-lg text-gray-900">{hotel.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <MdStar key={i} size={14} className="text-yellow-400" />
                ))}
                <span className="text-xs text-gray-500 ml-1">{hotel.category}</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-50 rounded-full">
              <p className="text-xs font-semibold text-blue-700">{hotel.roomType}</p>
            </div>
          </div>

          {/* Quick specs */}
          <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
            <MdLocationOn size={14} className="text-[#6c47ff]" />
            <span>{hotel.location} • {hotel.distanceFromCenter} km from center</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdKingBed size={16} className="text-[#6c47ff]" />
              <span>{hotel.bedType}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdPeople size={16} className="text-[#6c47ff]" />
              <span>{hotel.maxGuests} Guests</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdWifi size={16} className="text-[#6c47ff]" />
              <span>Free Wifi</span>
            </div>
          </div>
        </div>

        {/* Right: Price & Rating */}
        <div className="lg:text-right flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-end justify-between lg:justify-start">
          <div>
            <p className="text-xs text-gray-500 mb-1">Per Night</p>
            <p className="text-3xl font-bold text-[#6c47ff]">
              ₦{hotel.pricePerNight.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">2 nights: ₦{hotel.totalPrice.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" size={18} />
              <span className="font-semibold text-gray-900">{hotel.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({hotel.reviews.toLocaleString()})</span>
          </div>

          <button
            onClick={handleSelectClick}
            className="px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white font-semibold rounded-2xl hover:opacity-90 transition whitespace-nowrap"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Expandable details button */}
      <button
        onClick={handleExpandClick}
        className="w-full px-6 py-3 flex items-center justify-center gap-2 bg-gray-50 border-t border-gray-200 text-gray-700 hover:bg-gray-100 transition font-medium"
      >
        {expanded ? "Hide details" : "Show details"}
        <MdKeyboardArrowDown
          size={20}
          className={`transition transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expandable details content */}
      {expanded && (
        <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Specifications */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Room Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Room Type</span>
                  <span className="text-sm font-semibold text-gray-900">{hotel.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bed Type</span>
                  <span className="text-sm font-semibold text-gray-900">{hotel.bedType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Guests</span>
                  <span className="text-sm font-semibold text-gray-900">{hotel.maxGuests} persons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rooms Available</span>
                  <span className="text-sm font-semibold text-green-600">{hotel.available} left</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center gap-1"
                  >
                    <AmenityIcon amenity={amenity} />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Terms */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Booking Terms</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              {hotel.freeCancellation && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Free cancellation up to 24 hours before check-in</span>
                </li>
              )}
              {hotel.breakfastIncluded && (
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complimentary breakfast for all guests</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Check-in from 2:00 PM • Check-out by 12:00 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>24/7 front desk and concierge service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>No hidden fees — price shown is total per room</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Booking Confirmation Modal
// ============================================================================

interface BookingModalProps {
  hotel: Hotel | null;
  onClose: () => void;
}

function BookingModal({ hotel, onClose }: BookingModalProps): ReactNode {
  if (!hotel) return null;

  const handleContinueClick = useCallback(() => {
    console.log("Continue to booking for hotel:", hotel.id);
    // TODO: Navigate to booking confirmation page
  }, [hotel]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Confirm Reservation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Hotel summary */}
        <div className="bg-gradient-to-r from-[#6c47ff]/5 to-[#ffd166]/5 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <MdStar key={i} size={14} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MdLocationOn size={14} className="text-[#6c47ff]" />
                {hotel.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Per Night</p>
              <p className="text-3xl font-bold text-[#6c47ff]">
                ₦{hotel.pricePerNight.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <MdKingBed size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{hotel.bedType}</p>
            </div>
            <div className="text-center">
              <MdPeople size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{hotel.maxGuests} Guests</p>
            </div>
            <div className="text-center">
              <MdHotel size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{hotel.category}</p>
            </div>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Pricing Breakdown</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Nightly Rate (2 nights)</span>
              <span className="font-semibold text-gray-900">₦{hotel.totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Tourism Fees</span>
              <span className="font-semibold text-gray-900">
                ₦{Math.round(hotel.totalPrice * 0.07).toLocaleString()}
              </span>
            </div>
            {hotel.breakfastIncluded && (
              <div className="flex justify-between">
                <span className="text-gray-600">Breakfast</span>
                <span className="font-semibold text-green-600">Included</span>
              </div>
            )}
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#6c47ff]">
                ₦{(hotel.totalPrice + Math.round(hotel.totalPrice * 0.07)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Included services */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-900">What's Included</h4>
          <div className="space-y-2">
            {hotel.freeCancellation && (
              <div className="flex items-center gap-3">
                <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-700">Free cancellation (before 24h check-in)</span>
              </div>
            )}
            {hotel.breakfastIncluded && (
              <div className="flex items-center gap-3">
                <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-700">Complimentary breakfast</span>
              </div>
            )}
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div key={amenity} className="flex items-center gap-3">
                <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                <span className="text-sm text-gray-700">{amenity} access included</span>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700">24/7 concierge service</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleContinueClick}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white font-semibold rounded-2xl hover:opacity-90 transition"
          >
            Continue to Booking
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Hotels Page
// ============================================================================

export default function HotelsPage(): ReactNode {
  const [filters, setFilters] = useState<HotelFilters>({
    priceMax: Math.max(...DUMMY_HOTELS.map((h) => h.pricePerNight)),
    categories: [],
    stars: [],
    amenities: [],
    breakfastIncluded: null,
    freeCancellation: null,
  });
  const [sortBy, setSortBy] = useState<"price" | "rating" | "stars">("price");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  // Filter and sort hotels
  const filteredHotels: Hotel[] = useMemo(() => {
    let hotels: Hotel[] = DUMMY_HOTELS.filter((hotel) => {
      const priceMatch = hotel.pricePerNight <= filters.priceMax;
      const categoryMatch =
        filters.categories.length === 0 || filters.categories.includes(hotel.category);
      const starsMatch =
        filters.stars.length === 0 || filters.stars.includes(hotel.stars);
      const amenityMatch =
        filters.amenities.length === 0 ||
        filters.amenities.every((a) => hotel.amenities.includes(a));
      const breakfastMatch =
        filters.breakfastIncluded === null || hotel.breakfastIncluded === filters.breakfastIncluded;
      const cancellationMatch =
        filters.freeCancellation === null || hotel.freeCancellation === filters.freeCancellation;

      return priceMatch && categoryMatch && starsMatch && amenityMatch && breakfastMatch && cancellationMatch;
    });

    if (sortBy === "price") {
      hotels.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "rating") {
      hotels.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "stars") {
      hotels.sort((a, b) => b.stars - a.stars);
    }

    return hotels;
  }, [filters, sortBy]);

  const handleCloseModal = useCallback(() => setSelectedHotel(null), []);
  const handleSelectHotel = useCallback((hotel: Hotel) => setSelectedHotel(hotel), []);
  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as "price" | "rating" | "stars");
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotels in Dubai</h1>
            <p className="text-sm text-gray-500">June 15 - June 17, 2024 • 2 Nights • 2 Guests</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-[#6c47ff] border border-[#6c47ff] rounded-full hover:bg-[#6c47ff]/5 transition">
            ✏️ Edit search
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} hotels={DUMMY_HOTELS} />
          </div>

          {/* Main results */}
          <div className="lg:col-span-3">
            {/* Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600 font-medium">
                Showing {filteredHotels.length} of {DUMMY_HOTELS.length} hotels
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort-select" className="text-sm text-gray-600 font-medium">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6c47ff]"
                >
                  <option value="price">Cheapest</option>
                  <option value="rating">Best rated</option>
                  <option value="stars">Most stars</option>
                </select>
              </div>
            </div>

            {/* Hotel cards */}
            {filteredHotels.length > 0 ? (
              <div className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} onSelect={handleSelectHotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdInfoOutline size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels available</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or dates to find available accommodations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking modal */}
      <BookingModal hotel={selectedHotel} onClose={handleCloseModal} />
    </div>
  );
}