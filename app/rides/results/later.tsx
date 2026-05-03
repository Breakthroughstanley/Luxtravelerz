"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  MdDirectionsCar,
  MdTune,
  MdStar,
  MdCheckCircle,
  MdInfoOutline,
  MdClose,
  MdKeyboardArrowDown,
  MdLocalGasStation,
  MdPeople,
  MdLuggage,
  MdAirlineSeatReclineExtra,
  MdCalendarToday,
  MdLocationOn,
  MdSpeed,
} from "react-icons/md";

// ============================================================================
// Types
// ============================================================================

interface Car {
  id: number;
  name: string;
  category: "Economy" | "Compact" | "Sedan" | "SUV" | "Luxury" | "Van";
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  totalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  transmission: "Manual" | "Automatic";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  seatsCount: number;
  baggageCapacity: number;
  mileageLimit: number;
  features: string[];
  available: number;
  imageUrl?: string;
}

interface CarFilters {
  priceMax: number;
  categories: string[];
  transmission: string[];
  fuelType: string[];
  features: string[];
}

interface PriceRange {
  min: number;
  max: number;
}

// ============================================================================
// Dummy Car Data
// ============================================================================

const DUMMY_CARS: Car[] = [
  {
    id: 1,
    name: "Toyota Corolla",
    category: "Economy",
    make: "Toyota",
    model: "Corolla",
    year: 2023,
    pricePerDay: 45000,
    totalPrice: 90000,
    rating: 4.6,
    reviews: 542,
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Petrol",
    seatsCount: 5,
    baggageCapacity: 3,
    mileageLimit: 200,
    features: ["Air Conditioning", "USB Charging", "Bluetooth"],
    available: 12,
  },
  {
    id: 2,
    name: "Honda Civic",
    category: "Compact",
    make: "Honda",
    model: "Civic",
    year: 2023,
    pricePerDay: 52000,
    totalPrice: 104000,
    rating: 4.7,
    reviews: 628,
    image: "https://images.unsplash.com/photo-1618405959076-a08ab6a6b10f?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Petrol",
    seatsCount: 5,
    baggageCapacity: 4,
    mileageLimit: 250,
    features: ["Air Conditioning", "Bluetooth", "Cruise Control"],
    available: 8,
  },
  {
    id: 3,
    name: "BMW 3 Series",
    category: "Sedan",
    make: "BMW",
    model: "3 Series",
    year: 2023,
    pricePerDay: 125000,
    totalPrice: 250000,
    rating: 4.9,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Diesel",
    seatsCount: 5,
    baggageCapacity: 5,
    mileageLimit: 300,
    features: ["Leather Seats", "GPS Navigation", "Sunroof", "Bluetooth"],
    available: 4,
  },
  {
    id: 4,
    name: "Toyota RAV4",
    category: "SUV",
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    pricePerDay: 95000,
    totalPrice: 190000,
    rating: 4.8,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1622023329007-ed98a92b27e0?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Petrol",
    seatsCount: 7,
    baggageCapacity: 6,
    mileageLimit: 350,
    features: ["4x4", "Backup Camera", "Cruise Control", "Bluetooth"],
    available: 6,
  },
  {
    id: 5,
    name: "Mercedes-Benz E-Class",
    category: "Luxury",
    make: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    pricePerDay: 185000,
    totalPrice: 370000,
    rating: 4.95,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Diesel",
    seatsCount: 5,
    baggageCapacity: 5,
    mileageLimit: 400,
    features: ["Leather Seats", "Panoramic Sunroof", "GPS Navigation", "Climate Control"],
    available: 2,
  },
  {
    id: 6,
    name: "Hyundai Tucson",
    category: "SUV",
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    pricePerDay: 75000,
    totalPrice: 150000,
    rating: 4.5,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Petrol",
    seatsCount: 5,
    baggageCapacity: 5,
    mileageLimit: 300,
    features: ["Backup Camera", "Bluetooth", "Cruise Control"],
    available: 9,
  },
  {
    id: 7,
    name: "Mercedes Sprinter Van",
    category: "Van",
    make: "Mercedes-Benz",
    model: "Sprinter",
    year: 2023,
    pricePerDay: 165000,
    totalPrice: 330000,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1527461000000-0000000000001?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Diesel",
    seatsCount: 12,
    baggageCapacity: 10,
    mileageLimit: 500,
    features: ["Air Conditioning", "Power Steering", "Backup Camera"],
    available: 3,
  },
  {
    id: 8,
    name: "Audi A4",
    category: "Sedan",
    make: "Audi",
    model: "A4",
    year: 2023,
    pricePerDay: 135000,
    totalPrice: 270000,
    rating: 4.8,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=400&h=300&fit=crop",
    transmission: "Automatic",
    fuelType: "Diesel",
    seatsCount: 5,
    baggageCapacity: 5,
    mileageLimit: 350,
    features: ["Leather Seats", "GPS Navigation", "Bluetooth", "Sunroof"],
    available: 5,
  },
];

// ============================================================================
// Filter Panel Component
// ============================================================================

interface FilterPanelProps {
  filters: CarFilters;
  setFilters: (filters: CarFilters) => void;
  cars: Car[];
}

function FilterPanel({ filters, setFilters, cars }: FilterPanelProps): ReactNode {
  const priceRange: PriceRange = useMemo(() => {
    if (cars.length === 0) return { min: 0, max: 0 };
    const prices = cars.map((c) => c.pricePerDay);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [cars]);

  const categoriesList: string[] = useMemo(
    () => [...new Set(cars.map((c) => c.category))].sort(),
    [cars]
  );

  const transmissionList: string[] = useMemo(
    () => [...new Set(cars.map((c) => c.transmission))].sort(),
    [cars]
  );

  const fuelTypeList: string[] = useMemo(
    () => [...new Set(cars.map((c) => c.fuelType))].sort(),
    [cars]
  );

  const featuresList: string[] = useMemo(
    () => [...new Set(cars.flatMap((c) => c.features))].sort(),
    [cars]
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      priceMax: priceRange.max,
      categories: [],
      transmission: [],
      fuelType: [],
      features: [],
    });
  }, [priceRange.max, setFilters]);

  const handleCategoryChange = useCallback(
    (category: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          categories: [...filters.categories, category],
        });
      } else {
        setFilters({
          ...filters,
          categories: filters.categories.filter((c) => c !== category),
        });
      }
    },
    [filters, setFilters]
  );

  const handleTransmissionChange = useCallback(
    (transmission: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          transmission: [...filters.transmission, transmission],
        });
      } else {
        setFilters({
          ...filters,
          transmission: filters.transmission.filter((t) => t !== transmission),
        });
      }
    },
    [filters, setFilters]
  );

  const handleFuelTypeChange = useCallback(
    (fuel: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          fuelType: [...filters.fuelType, fuel],
        });
      } else {
        setFilters({
          ...filters,
          fuelType: filters.fuelType.filter((f) => f !== fuel),
        });
      }
    },
    [filters, setFilters]
  );

  const handleFeatureChange = useCallback(
    (feature: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          features: [...filters.features, feature],
        });
      } else {
        setFilters({
          ...filters,
          features: filters.features.filter((f) => f !== feature),
        });
      }
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
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Price Per Day</h4>
        <div className="flex gap-2 items-center mb-3">
          <span className="text-sm font-medium text-gray-600">
            ₦{(filters.priceMax / 1000).toFixed(0)}k
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
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Transmission</h4>
        <div className="space-y-2">
          {transmissionList.map((transmission) => (
            <label
              key={transmission}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.transmission.includes(transmission)}
                onChange={(e) => handleTransmissionChange(transmission, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {transmission}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Fuel Type</h4>
        <div className="space-y-2">
          {fuelTypeList.map((fuel) => (
            <label
              key={fuel}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.fuelType.includes(fuel)}
                onChange={(e) => handleFuelTypeChange(fuel, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {fuel}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Features Filter */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
        <div className="space-y-2">
          {featuresList.slice(0, 6).map((feature) => (
            <label
              key={feature}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.features.includes(feature)}
                onChange={(e) => handleFeatureChange(feature, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {feature}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Car Card Component
// ============================================================================

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

function CarCard({ car, onSelect }: CarCardProps): ReactNode {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSelectClick = useCallback(() => {
    onSelect(car);
  }, [car, onSelect]);

  const handleExpandClick = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#6c47ff]/30 ${
        expanded ? "ring-2 ring-[#6c47ff]" : ""
      }`}
    >
      {/* Main car info */}
      <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Image & Details */}
        <div className="flex-1">
          <div className="mb-4">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover rounded-2xl shadow-md"
              loading="lazy"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-lg text-gray-900">
                {car.make} {car.model}
              </p>
              <p className="text-xs text-gray-500">{car.year} • {car.category}</p>
            </div>
            <div className="px-3 py-1 bg-blue-50 rounded-full">
              <p className="text-xs font-semibold text-blue-700">{car.transmission}</p>
            </div>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdPeople size={16} className="text-[#6c47ff]" />
              <span>{car.seatsCount} Seats</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdLuggage size={16} className="text-[#6c47ff]" />
              <span>{car.baggageCapacity} Bags</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MdLocalGasStation size={16} className="text-[#6c47ff]" />
              <span>{car.fuelType}</span>
            </div>
          </div>
        </div>

        {/* Right: Price & Rating */}
        <div className="lg:text-right flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-end justify-between lg:justify-start">
          <div>
            <p className="text-xs text-gray-500 mb-1">Per Day</p>
            <p className="text-3xl font-bold text-[#6c47ff]">
              ₦{car.pricePerDay.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">2 days: ₦{car.totalPrice.toLocaleString()}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" size={18} />
              <span className="font-semibold text-gray-900">{car.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({car.reviews.toLocaleString()})
            </span>
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
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Specifications</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mileage Limit</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {car.mileageLimit} km/day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Seats</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {car.seatsCount} passengers
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Baggage</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {car.baggageCapacity} large bags
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Cars</span>
                  <span className="text-sm font-semibold text-green-600">
                    {car.available} in stock
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Features</h4>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 flex items-center gap-1"
                  >
                    <MdCheckCircle size={14} className="text-green-500" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rental Terms */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Rental Terms</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Full insurance included in daily rate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Free unlimited mileage up to {car.mileageLimit} km/day</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>24/7 roadside assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Free vehicle swap if any issues</span>
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
  car: Car | null;
  onClose: () => void;
}

function BookingModal({ car, onClose }: BookingModalProps): ReactNode {
  if (!car) return null;

  const handleContinueClick = useCallback(() => {
    console.log("Continue to booking for car:", car.id);
    // TODO: Navigate to booking confirmation page
  }, [car]);

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

        {/* Car summary */}
        <div className="bg-gradient-to-r from-[#6c47ff]/5 to-[#ffd166]/5 rounded-2xl p-6 mb-6">
          <div className="mb-4">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-48 object-cover rounded-xl"
              loading="lazy"
            />
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {car.make} {car.model}
              </h3>
              <p className="text-sm text-gray-500">{car.year} • {car.category}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Per Day</p>
              <p className="text-3xl font-bold text-[#6c47ff]">
                ₦{car.pricePerDay.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <MdPeople size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{car.seatsCount} Seats</p>
            </div>
            <div className="text-center">
              <MdLocalGasStation size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">{car.fuelType}</p>
            </div>
            <div className="text-center">
              <MdAirlineSeatReclineExtra size={24} className="text-[#6c47ff] mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-900">Automatic</p>
            </div>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">Pricing Breakdown</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Rate (2 days)</span>
              <span className="font-semibold text-gray-900">₦{car.totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Insurance</span>
              <span className="font-semibold text-gray-900">Included</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="font-semibold text-gray-900">₦{Math.round(car.totalPrice * 0.05).toLocaleString()}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-xl font-bold text-[#6c47ff]">
                ₦{(car.totalPrice + Math.round(car.totalPrice * 0.05)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Included services */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-gray-900">Included Services</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700">Full insurance coverage</span>
            </div>
            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700">24/7 roadside assistance</span>
            </div>
            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700">Free vehicle swap</span>
            </div>
            <div className="flex items-center gap-3">
              <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700">Unlimited mileage up to {car.mileageLimit} km/day</span>
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
// Main Car Rental Page
// ============================================================================

export default function CarsPage(): ReactNode {
  const [filters, setFilters] = useState<CarFilters>({
    priceMax: Math.max(...DUMMY_CARS.map((c) => c.pricePerDay)),
    categories: [],
    transmission: [],
    fuelType: [],
    features: [],
  });
  const [sortBy, setSortBy] = useState<"price" | "rating" | "availability">("price");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Filter and sort cars
  const filteredCars: Car[] = useMemo(() => {
    let cars: Car[] = DUMMY_CARS.filter((car) => {
      const priceMatch = car.pricePerDay <= filters.priceMax;
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(car.category);
      const transmissionMatch =
        filters.transmission.length === 0 ||
        filters.transmission.includes(car.transmission);
      const fuelMatch =
        filters.fuelType.length === 0 || filters.fuelType.includes(car.fuelType);
      const featureMatch =
        filters.features.length === 0 ||
        filters.features.every((feature) => car.features.includes(feature));

      return (
        priceMatch &&
        categoryMatch &&
        transmissionMatch &&
        fuelMatch &&
        featureMatch
      );
    });

    // Sort
    if (sortBy === "price") {
      cars.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === "rating") {
      cars.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "availability") {
      cars.sort((a, b) => b.available - a.available);
    }

    return cars;
  }, [filters, sortBy]);

  const handleCloseModal = useCallback(() => {
    setSelectedCar(null);
  }, []);

  const handleSelectCar = useCallback((car: Car) => {
    setSelectedCar(car);
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as "price" | "rating" | "availability");
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
            <h1 className="text-2xl font-bold text-gray-900">
              Car Rentals in Dubai
            </h1>
            <p className="text-sm text-gray-500">
              June 15 - June 17, 2024 • 2 Days
            </p>
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
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              cars={DUMMY_CARS}
            />
          </div>

          {/* Main results */}
          <div className="lg:col-span-3">
            {/* Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600 font-medium">
                Showing {filteredCars.length} of {DUMMY_CARS.length} cars
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
                  <option value="availability">Most available</option>
                </select>
              </div>
            </div>

            {/* Car cards */}
            {filteredCars.length > 0 ? (
              <div className="space-y-4">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelect={handleSelectCar}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdInfoOutline size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No cars available
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or dates to find available vehicles
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Booking modal */}
      <BookingModal car={selectedCar} onClose={handleCloseModal} />
    </div>
  );
}