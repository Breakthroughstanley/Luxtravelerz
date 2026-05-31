"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  MdTune,
  MdCheckCircle,
  MdInfoOutline,
  MdAirlineSeatReclineExtra,
  MdLuggage,
  MdStar,
  MdClose,
  MdKeyboardArrowDown,
} from "react-icons/md";

import { useRouter, useSearchParams } from "next/navigation";


// ============================================================================
// Types
// ============================================================================

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  from: string;
  to: string;
  departureDate: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  seats: number;
  baggage: string;
  seatClass: string;
}

interface Filters {
  priceMax: number;
  airlines: string[];
  amenities: string[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface MultiFlightSegment {
  from: string;
  to: string;
  departure: string;
}

// ============================================================================
// Dummy Data
// ============================================================================

const DUMMY_FLIGHTS: Flight[] = [
  {
    id: 1,
    airline: "Air Peace",
    flightNumber: "P7 302",
    departure: "14:30",
    arrival: "19:45",
    duration: "5h 15m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 145200,
    rating: 4.5,
    reviews: 328,
    image: "https://images.unsplash.com/photo-1436262174933-eb0fda9f9e4d?w=200&h=100&fit=crop",
    amenities: ["WiFi", "Power outlet", "Meals"],
    seats: 12,
    baggage: "1x 23kg",
    seatClass: "Economy",
  },
  {
    id: 2,
    airline: "Emirates",
    flightNumber: "EK 0341",
    departure: "08:00",
    arrival: "13:15",
    duration: "5h 15m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 187500,
    rating: 4.8,
    reviews: 1250,
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=100&fit=crop",
    amenities: ["WiFi", "Power outlet", "Meals", "Lounge access"],
    seats: 5,
    baggage: "2x 23kg",
    seatClass: "Economy",
  },
  {
    id: 3,
    airline: "Turkish Airlines",
    flightNumber: "TK 0725",
    departure: "16:20",
    arrival: "02:10",
    duration: "5h 50m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 129800,
    rating: 4.4,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1505779752420-641c8402cc20?w=200&h=100&fit=crop",
    amenities: ["WiFi", "Meals"],
    seats: 8,
    baggage: "1x 23kg",
    seatClass: "Economy",
  },
  {
    id: 4,
    airline: "Qatar Airways",
    flightNumber: "QR 1018",
    departure: "11:45",
    arrival: "17:00",
    duration: "5h 15m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 198700,
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=100&fit=crop",
    amenities: ["WiFi", "Power outlet", "Meals", "Lounge access", "Entertainment"],
    seats: 3,
    baggage: "2x 23kg",
    seatClass: "Economy",
  },
  {
    id: 5,
    airline: "RwandAir",
    flightNumber: "WB 0503",
    departure: "07:30",
    arrival: "12:45",
    duration: "5h 15m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 134500,
    rating: 4.3,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=200&h=100&fit=crop",
    amenities: ["Meals"],
    seats: 15,
    baggage: "1x 23kg",
    seatClass: "Economy",
  },
  {
    id: 6,
    airline: "British Airways",
    flightNumber: "BA 0084",
    departure: "13:00",
    arrival: "18:15",
    duration: "5h 15m",
    stops: 0,
    from: "Lagos (LOS)",
    to: "Dubai (DXB)",
    departureDate: "2024-06-15",
    price: 175300,
    rating: 4.6,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1540962351516-fbb11fba16d7?w=200&h=100&fit=crop",
    amenities: ["WiFi", "Power outlet", "Meals"],
    seats: 7,
    baggage: "1x 23kg",
    seatClass: "Economy",
  },
];

// ============================================================================
// Filter Panel Component
// ============================================================================

interface FilterPanelProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  flights: Flight[];
}

function FilterPanel({ filters, setFilters, flights }: FilterPanelProps): ReactNode {
  const priceRange: PriceRange = useMemo(() => {
    if (flights.length === 0) return { min: 0, max: 0 };
    const prices = flights.map((f) => f.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [flights]);

  const airlineList: string[] = useMemo(
    () => [...new Set(flights.map((f) => f.airline))],
    [flights]
  );

  const amenitiesList: string[] = useMemo(
    () => [...new Set(flights.flatMap((f) => f.amenities))].sort(),
    [flights]
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      priceMax: priceRange.max,
      airlines: [],
      amenities: [],
    });
  }, [priceRange.max, setFilters]);

  const handleAirlineChange = useCallback(
    (airline: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          airlines: [...filters.airlines, airline],
        });
      } else {
        setFilters({
          ...filters,
          airlines: filters.airlines.filter((a) => a !== airline),
        });
      }
    },
    [filters, setFilters]
  );

  const handleAmenityChange = useCallback(
    (amenity: string, checked: boolean) => {
      if (checked) {
        setFilters({
          ...filters,
          amenities: [...filters.amenities, amenity],
        });
      } else {
        setFilters({
          ...filters,
          amenities: filters.amenities.filter((a) => a !== amenity),
        });
      }
    },
    [filters, setFilters]
  );

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-5 md:p-6 h-fit lg:sticky lg:top-20">
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
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          Price Range
        </h4>
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

      {/* Airlines Filter */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Airlines</h4>
        <div className="space-y-2">
          {airlineList.map((airline) => (
            <label
              key={airline}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.airlines.includes(airline)}
                onChange={(e) => handleAirlineChange(airline, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {airline}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities Filter */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                className="w-5 h-5 rounded accent-[#6c47ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {amenity}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Flight Card Component
// ============================================================================

interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

function FlightCard({ flight, onSelect }: FlightCardProps): ReactNode {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSelectClick = useCallback(() => {
    onSelect(flight);
  }, [flight, onSelect]);

  const handleExpandClick = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#6c47ff]/30 ${
        expanded ? "ring-2 ring-[#6c47ff]" : ""
      }`}
    >
      {/* Main flight info */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        {/* Left: Airline & Times */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={flight.image}
              alt={flight.airline}
              className="w-12 h-12 rounded-full object-cover shadow-md"
              loading="lazy"
            />
            <div>
              <p className="font-bold text-gray-900">{flight.airline}</p>
              <p className="text-xs text-gray-500">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                {flight.departure}
              </p>
              <p className="text-xs text-gray-500">{flight.from}</p>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-2">{flight.duration}</p>
              <div className="flex items-center w-full gap-2">
                <div className="h-1 flex-1 bg-gradient-to-r from-[#6c47ff] to-[#ffd166]" />
                {flight.stops === 0 ? (
                  <div className="text-xs font-semibold text-gray-600 px-2 py-1 bg-green-50 rounded-full text-green-700">
                    Direct
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-gray-600">
                    {flight.stops} stop{flight.stops > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                {flight.arrival}
              </p>
              <p className="text-xs text-gray-500">{flight.to}</p>
            </div>
          </div>
        </div>

        {/* Right: Price & Rating */}
        <div className="flex flex-col sm:flex-row xl:flex-col gap-4 xl:gap-2 items-start sm:items-center xl:items-end justify-between xl:justify-start">
          <div>
            <p className="text-xs text-gray-500 mb-1">From</p>
            <p className="text-3xl font-bold text-[#6c47ff]">
              ₦{flight.price.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MdStar className="text-yellow-400" size={18} />
              <span className="font-semibold text-gray-900">{flight.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({flight.reviews.toLocaleString()})
            </span>
          </div>

          <button
            onClick={handleSelectClick}
            className="px-5 py-2 bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            Select
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
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Amenities */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MdAirlineSeatReclineExtra className="text-[#6c47ff]" />
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {flight.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Baggage */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MdLuggage className="text-[#6c47ff]" />
                Baggage
              </h4>
              <p className="text-sm text-gray-700">{flight.baggage}</p>
            </div>

            {/* Seats Available */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Seats Available
              </h4>
              <p className="text-sm font-bold text-green-600">
                {flight.seats} seats left
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Booking Confirmation Modal Component
// ============================================================================

interface BookingModalProps {
  flight: Flight | null;
  onClose: () => void;
}

function BookingModal({ flight, onClose }: BookingModalProps): ReactNode {
  if (!flight) return null;

  const handleContinueClick = useCallback(() => {
    console.log("Continue to booking for flight:", flight.id);
  }, [flight]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Confirm Your Selection
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Flight summary */}
        <div className="bg-gradient-to-r from-[#6c47ff]/5 to-[#ffd166]/5 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={flight.image}
              alt={flight.airline}
              className="w-16 h-16 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{flight.airline}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#6c47ff]">
                ₦{flight.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {flight.departure}
              </p>
              <p className="text-xs text-gray-500">{flight.from}</p>
            </div>

            <div className="flex-1 flex flex-col items-center px-4">
              <p className="text-xs text-gray-500 mb-2">{flight.duration}</p>
              <div className="flex items-center w-full gap-2">
                <div className="h-1 flex-1 bg-gradient-to-r from-[#6c47ff] to-[#ffd166]" />
                {flight.stops === 0 && (
                  <span className="text-xs font-semibold text-green-700 px-2 py-1 bg-green-50 rounded-full whitespace-nowrap">
                    Direct
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {flight.arrival}
              </p>
              <p className="text-xs text-gray-500">{flight.to}</p>
            </div>
          </div>
        </div>

        {/* Details checklist */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
            <span className="text-gray-700">
              <span className="font-semibold">{flight.seats} seats</span> available
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MdCheckCircle className="text-green-500 flex-shrink-0" size={20} />
            <span className="text-gray-700">
              Baggage: <span className="font-semibold">{flight.baggage}</span>
            </span>
          </div>
          <div className="flex items-start gap-3">
            <MdCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <span className="text-gray-700">
              Amenities:{" "}
              <span className="font-semibold">
                {flight.amenities.join(", ")}
              </span>
            </span>
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
// Main Multi-City Flight Results Page
// ============================================================================

export default function MultiCityFlightResultsPage(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get data from URL params
  const multiFlightsParam = searchParams.get("flights");
  const adults = searchParams.get("adults") || "1";
  const children = searchParams.get("children") || "0";

  // Parse multi-flights
  const multiFlights: MultiFlightSegment[] = useMemo(() => {
    if (!multiFlightsParam) return [];
    try {
      return JSON.parse(decodeURIComponent(multiFlightsParam));
    } catch {
      return [];
    }
  }, [multiFlightsParam]);

  // State management
  const [filters, setFilters] = useState<Filters>({
    priceMax: Math.max(...DUMMY_FLIGHTS.map((f) => f.price)),
    airlines: [],
    amenities: [],
  });

  const [sortBy, setSortBy] = useState<"price" | "duration" | "rating" | "departure">("price");
  const [selectedFlights, setSelectedFlights] = useState<Record<number, Flight>>({});
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return Object.values(selectedFlights).reduce((sum, flight) => sum + flight.price, 0);
  }, [selectedFlights]);

  // Check if all flights are selected
  const allFlightsSelected = useMemo(() => {
    return Object.keys(selectedFlights).length === multiFlights.length;
  }, [selectedFlights, multiFlights]);

  // Filter and sort flights
  const filteredFlights: Flight[] = useMemo(() => {
    let flights: Flight[] = DUMMY_FLIGHTS.filter((flight) => {
      const priceMatch = flight.price <= filters.priceMax;
      const airlineMatch =
        filters.airlines.length === 0 ||
        filters.airlines.includes(flight.airline);
      const amenityMatch =
        filters.amenities.length === 0 ||
        filters.amenities.every((amenity) =>
          flight.amenities.includes(amenity)
        );

      return priceMatch && airlineMatch && amenityMatch;
    });

    // Sort
    if (sortBy === "price") {
      flights.sort((a, b) => a.price - b.price);
    } else if (sortBy === "duration") {
      flights.sort((a, b) => {
        const aDur = parseInt(a.duration, 10);
        const bDur = parseInt(b.duration, 10);
        return aDur - bDur;
      });
    } else if (sortBy === "rating") {
      flights.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "departure") {
      flights.sort((a, b) => a.departure.localeCompare(b.departure));
    }

    return flights;
  }, [filters, sortBy]);

  // Handlers
  const handleCloseModal = useCallback(() => {
    setSelectedFlight(null);
  }, []);

  const handleSelectMultiFlight = useCallback((segmentIndex: number, flight: Flight) => {
    setSelectedFlights((prev) => ({
      ...prev,
      [segmentIndex]: flight,
    }));
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(
        e.target.value as "price" | "duration" | "rating" | "departure"
      );
    },
    []
  );

  const handleEditSearch = useCallback(() => {
    const lastSearch = sessionStorage.getItem("lastFlightSearch");
    if (lastSearch) {
      const data = JSON.parse(lastSearch);
      const query = new URLSearchParams({
        ticketType: data.ticketType,
        from: data.from || "",
        to: data.to || "",
        departure: data.departure || "",
        return: data.returnDate || "",
        adults: String(data.passengers?.adults || 1),
        children: String(data.passengers?.children || 0),
      }).toString();
      router.push(`/home?${query}`);
    } else {
      router.push("/home");
    }
  }, [router]);

  const handleContinueToBooking = useCallback(() => {
    if (allFlightsSelected) {
      // Save selected flights and redirect to booking
      const bookingData = {
        multiFlights: selectedFlights,
        totalPrice,
        passengers: { adults: parseInt(adults), children: parseInt(children) },
      };
      sessionStorage.setItem("multiCityBooking", JSON.stringify(bookingData));
      router.push("/flights/booking");
    }
  }, [allFlightsSelected, selectedFlights, totalPrice, adults, children, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Multi-city Flights
            </h1>
            <p className="text-sm text-gray-500">
              {multiFlights.length} legs • {adults} Passenger{adults !== "1" ? "s" : ""}
              {children !== "0" && ` • ${children} Child${children !== "1" ? "ren" : ""}`}
            </p>
          </div>

          <button
            onClick={handleEditSearch}
            className="px-4 py-2 text-sm font-medium text-[#6c47ff] border border-[#6c47ff] rounded-full hover:bg-[#6c47ff]/5 transition"
          >
            ✏️ Edit search
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              flights={DUMMY_FLIGHTS}
            />
          </div>

          {/* Main results */}
          <div className="lg:col-span-3">
            {/* Your Journey Summary */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your Journey</h2>

              <div className="space-y-3">
                {multiFlights.map((flight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6c47ff] text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium">
                        {flight.from} → {flight.to}
                      </p>

                      <p className="text-sm text-gray-500">
                        {flight.departure}
                      </p>
                    </div>

                    {selectedFlights[index] && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        ✓ Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Progress */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <p className="font-medium text-blue-700">
                Selected {Object.keys(selectedFlights).length} of {multiFlights.length} flights
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(Object.keys(selectedFlights).length / multiFlights.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <p className="text-sm text-gray-600 font-medium">
                Showing {filteredFlights.length} of {DUMMY_FLIGHTS.length} flights per segment
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
                  <option value="duration">Shortest</option>
                  <option value="departure">Earliest</option>
                  <option value="rating">Best rated</option>
                </select>
              </div>
            </div>

            {/* Flight segments */}
            {filteredFlights.length > 0 ? (
              <div className="space-y-8">
                {multiFlights.map((segment, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold">
                          Flight {index + 1}
                        </h3>

                        <p className="text-gray-500">
                          {segment.from} → {segment.to}
                        </p>
                      </div>

                      {selectedFlights[index] && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Flights list for this segment */}
                    <div className="space-y-4">
                      {filteredFlights.map((flight) => (
                        <FlightCard
                          key={`${index}-${flight.id}`}
                          flight={{
                            ...flight,
                            from: segment.from,
                            to: segment.to,
                            departureDate: segment.departure,
                          }}
                          onSelect={(flight) =>
                            handleSelectMultiFlight(index, flight)
                          }
                        />
                      ))}
                    </div>

                    {/* Selected flight info */}
                    {selectedFlights[index] && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700">
                        <p className="text-sm font-medium">
                          Selected: <span className="font-bold">{selectedFlights[index].airline}</span> - Flight{" "}
                          <span className="font-bold">{selectedFlights[index].flightNumber}</span>
                        </p>
                        <p className="text-sm mt-1">
                          Price: <span className="font-bold">₦{selectedFlights[index].price.toLocaleString()}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MdInfoOutline size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No flights found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}

            {/* Continue to Booking Button */}
            {allFlightsSelected && (
              <div className="mt-8 p-6 bg-gradient-to-r from-[#6c47ff]/5 to-[#ffd166]/5 border border-[#6c47ff]/20 rounded-3xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Total journey cost</p>
                    <p className="text-3xl font-bold text-[#6c47ff]">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={handleContinueToBooking}
                    className="px-8 py-4 bg-gradient-to-r from-[#6c47ff] to-[#5a3dd4] text-white font-bold rounded-2xl hover:opacity-90 transition shadow-lg"
                  >
                    Continue to Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedFlight && (
        <BookingModal
          flight={selectedFlight}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}