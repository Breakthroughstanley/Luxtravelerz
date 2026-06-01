"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MdSwapHoriz, MdExpandMore, MdHouse, MdDirectionsCar, MdPublic, MdKeyboardArrowDown, MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";
import DealsCarousel from "@/components/DealsCarousel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const airports = [
  // Nigeria
  { city: "Lagos", code: "LOS", name: "Murtala Muhammed International", country: "Nigeria" },
  { city: "Abuja", code: "ABV", name: "Nnamdi Azikiwe International", country: "Nigeria" },
  { city: "Port Harcourt", code: "PHC", name: "Port Harcourt International", country: "Nigeria" },
  { city: "Kano", code: "KAN", name: "Mallam Aminu Kano International", country: "Nigeria" },
  { city: "Enugu", code: "ENU", name: "Akanu Ibiam International", country: "Nigeria" },
  { city: "Calabar", code: "CBQ", name: "Margaret Ekpo International", country: "Nigeria" },
  // UAE
  { city: "Dubai", code: "DXB", name: "Dubai International", country: "UAE" },
  { city: "Abu Dhabi", code: "AUH", name: "Zayed International", country: "UAE" },
  { city: "Sharjah", code: "SHJ", name: "Sharjah International", country: "UAE" },
  // UK
  { city: "London", code: "LHR", name: "Heathrow Airport", country: "United Kingdom" },
  { city: "London", code: "LGW", name: "Gatwick Airport", country: "United Kingdom" },
  { city: "London", code: "STN", name: "Stansted Airport", country: "United Kingdom" },
  { city: "Manchester", code: "MAN", name: "Manchester Airport", country: "United Kingdom" },
  { city: "Birmingham", code: "BHX", name: "Birmingham Airport", country: "United Kingdom" },
  { city: "Edinburgh", code: "EDI", name: "Edinburgh Airport", country: "United Kingdom" },
  // USA
  { city: "New York", code: "JFK", name: "John F. Kennedy International", country: "USA" },
  { city: "New York", code: "EWR", name: "Newark Liberty International", country: "USA" },
  { city: "Los Angeles", code: "LAX", name: "Los Angeles International", country: "USA" },
  { city: "Chicago", code: "ORD", name: "O'Hare International", country: "USA" },
  { city: "Houston", code: "IAH", name: "George Bush Intercontinental", country: "USA" },
  { city: "Atlanta", code: "ATL", name: "Hartsfield-Jackson Atlanta International", country: "USA" },
  { city: "Miami", code: "MIA", name: "Miami International", country: "USA" },
  { city: "Washington", code: "IAD", name: "Dulles International", country: "USA" },
  { city: "Dallas", code: "DFW", name: "Dallas Fort Worth International", country: "USA" },
  { city: "San Francisco", code: "SFO", name: "San Francisco International", country: "USA" },
  { city: "Seattle", code: "SEA", name: "Seattle-Tacoma International", country: "USA" },
  { city: "Boston", code: "BOS", name: "Logan International", country: "USA" },
  { city: "Las Vegas", code: "LAS", name: "Harry Reid International", country: "USA" },
  { city: "Orlando", code: "MCO", name: "Orlando International", country: "USA" },
  { city: "Phoenix", code: "PHX", name: "Sky Harbor International", country: "USA" },
  // Canada
  { city: "Toronto", code: "YYZ", name: "Pearson International", country: "Canada" },
  { city: "Vancouver", code: "YVR", name: "Vancouver International", country: "Canada" },
  { city: "Montreal", code: "YUL", name: "Montréal-Trudeau International", country: "Canada" },
  { city: "Calgary", code: "YYC", name: "Calgary International", country: "Canada" },
  // Europe
  { city: "Paris", code: "CDG", name: "Charles de Gaulle", country: "France" },
  { city: "Paris", code: "ORY", name: "Orly Airport", country: "France" },
  { city: "Amsterdam", code: "AMS", name: "Schiphol Airport", country: "Netherlands" },
  { city: "Frankfurt", code: "FRA", name: "Frankfurt Airport", country: "Germany" },
  { city: "Munich", code: "MUC", name: "Munich Airport", country: "Germany" },
  { city: "Berlin", code: "BER", name: "Brandenburg Airport", country: "Germany" },
  { city: "Madrid", code: "MAD", name: "Adolfo Suárez Barajas", country: "Spain" },
  { city: "Barcelona", code: "BCN", name: "El Prat Airport", country: "Spain" },
  { city: "Rome", code: "FCO", name: "Leonardo da Vinci–Fiumicino", country: "Italy" },
  { city: "Milan", code: "MXP", name: "Malpensa Airport", country: "Italy" },
  { city: "Zurich", code: "ZRH", name: "Zurich Airport", country: "Switzerland" },
  { city: "Vienna", code: "VIE", name: "Vienna International", country: "Austria" },
  { city: "Brussels", code: "BRU", name: "Brussels Airport", country: "Belgium" },
  { city: "Lisbon", code: "LIS", name: "Humberto Delgado Airport", country: "Portugal" },
  { city: "Copenhagen", code: "CPH", name: "Copenhagen Airport", country: "Denmark" },
  { city: "Stockholm", code: "ARN", name: "Stockholm Arlanda", country: "Sweden" },
  { city: "Oslo", code: "OSL", name: "Oslo Gardermoen", country: "Norway" },
  { city: "Helsinki", code: "HEL", name: "Helsinki Airport", country: "Finland" },
  { city: "Dublin", code: "DUB", name: "Dublin Airport", country: "Ireland" },
  { city: "Athens", code: "ATH", name: "Athens International", country: "Greece" },
  { city: "Istanbul", code: "IST", name: "Istanbul Airport", country: "Turkey" },
  { city: "Warsaw", code: "WAW", name: "Chopin Airport", country: "Poland" },
  { city: "Prague", code: "PRG", name: "Václav Havel Airport", country: "Czech Republic" },
  { city: "Budapest", code: "BUD", name: "Budapest Airport", country: "Hungary" },
  // Middle East
  { city: "Doha", code: "DOH", name: "Hamad International", country: "Qatar" },
  { city: "Kuwait City", code: "KWI", name: "Kuwait International", country: "Kuwait" },
  { city: "Riyadh", code: "RUH", name: "King Khalid International", country: "Saudi Arabia" },
  { city: "Jeddah", code: "JED", name: "King Abdulaziz International", country: "Saudi Arabia" },
  { city: "Muscat", code: "MCT", name: "Muscat International", country: "Oman" },
  { city: "Beirut", code: "BEY", name: "Rafic Hariri International", country: "Lebanon" },
  { city: "Amman", code: "AMM", name: "Queen Alia International", country: "Jordan" },
  { city: "Tel Aviv", code: "TLV", name: "Ben Gurion International", country: "Israel" },
  // Asia
  { city: "Singapore", code: "SIN", name: "Changi Airport", country: "Singapore" },
  { city: "Tokyo", code: "NRT", name: "Narita International", country: "Japan" },
  { city: "Tokyo", code: "HND", name: "Haneda Airport", country: "Japan" },
  { city: "Osaka", code: "KIX", name: "Kansai International", country: "Japan" },
  { city: "Beijing", code: "PEK", name: "Capital International", country: "China" },
  { city: "Shanghai", code: "PVG", name: "Pudong International", country: "China" },
  { city: "Hong Kong", code: "HKG", name: "Hong Kong International", country: "Hong Kong" },
  { city: "Seoul", code: "ICN", name: "Incheon International", country: "South Korea" },
  { city: "Bangkok", code: "BKK", name: "Suvarnabhumi Airport", country: "Thailand" },
  { city: "Kuala Lumpur", code: "KUL", name: "Kuala Lumpur International", country: "Malaysia" },
  { city: "Mumbai", code: "BOM", name: "Chhatrapati Shivaji Maharaj International", country: "India" },
  { city: "Delhi", code: "DEL", name: "Indira Gandhi International", country: "India" },
  { city: "Bangalore", code: "BLR", name: "Kempegowda International", country: "India" },
  { city: "Colombo", code: "CMB", name: "Bandaranaike International", country: "Sri Lanka" },
  { city: "Dhaka", code: "DAC", name: "Hazrat Shahjalal International", country: "Bangladesh" },
  { city: "Karachi", code: "KHI", name: "Jinnah International", country: "Pakistan" },
  { city: "Lahore", code: "LHE", name: "Allama Iqbal International", country: "Pakistan" },
  { city: "Islamabad", code: "ISB", name: "New Islamabad International", country: "Pakistan" },
  { city: "Bali", code: "DPS", name: "Ngurah Rai International", country: "Indonesia" },
  { city: "Jakarta", code: "CGK", name: "Soekarno-Hatta International", country: "Indonesia" },
  { city: "Manila", code: "MNL", name: "Ninoy Aquino International", country: "Philippines" },
  // Africa
  { city: "Johannesburg", code: "JNB", name: "O.R. Tambo International", country: "South Africa" },
  { city: "Cape Town", code: "CPT", name: "Cape Town International", country: "South Africa" },
  { city: "Durban", code: "DUR", name: "King Shaka International", country: "South Africa" },
  { city: "Cairo", code: "CAI", name: "Cairo International", country: "Egypt" },
  { city: "Accra", code: "ACC", name: "Kotoka International", country: "Ghana" },
  { city: "Nairobi", code: "NBO", name: "Jomo Kenyatta International", country: "Kenya" },
  { city: "Addis Ababa", code: "ADD", name: "Bole International", country: "Ethiopia" },
  { city: "Casablanca", code: "CMN", name: "Mohammed V International", country: "Morocco" },
  { city: "Dakar", code: "DSS", name: "Blaise Diagne International", country: "Senegal" },
  { city: "Dar es Salaam", code: "DAR", name: "Julius Nyerere International", country: "Tanzania" },
  { city: "Kampala", code: "EBB", name: "Entebbe International", country: "Uganda" },
  { city: "Lusaka", code: "LUN", name: "Kenneth Kaunda International", country: "Zambia" },
  { city: "Harare", code: "HRE", name: "Robert Gabriel Mugabe International", country: "Zimbabwe" },
  { city: "Luanda", code: "LAD", name: "Quatro de Fevereiro International", country: "Angola" },
  { city: "Abidjan", code: "ABJ", name: "Félix-Houphouët-Boigny International", country: "Côte d'Ivoire" },
  { city: "Douala", code: "DLA", name: "Douala International", country: "Cameroon" },
  { city: "Lomé", code: "LFW", name: "Gnassingbé Eyadéma International", country: "Togo" },
  { city: "Cotonou", code: "COO", name: "Cadjehoun Airport", country: "Benin" },
  { city: "Bamako", code: "BKO", name: "Modibo Keïta International", country: "Mali" },
  // Australia / Oceania
  { city: "Sydney", code: "SYD", name: "Kingsford Smith Airport", country: "Australia" },
  { city: "Melbourne", code: "MEL", name: "Melbourne Airport", country: "Australia" },
  { city: "Brisbane", code: "BNE", name: "Brisbane Airport", country: "Australia" },
  { city: "Perth", code: "PER", name: "Perth Airport", country: "Australia" },
  { city: "Auckland", code: "AKL", name: "Auckland Airport", country: "New Zealand" },
  // Latin America
  { city: "São Paulo", code: "GRU", name: "Guarulhos International", country: "Brazil" },
  { city: "Rio de Janeiro", code: "GIG", name: "Galeão International", country: "Brazil" },
  { city: "Buenos Aires", code: "EZE", name: "Ezeiza International", country: "Argentina" },
  { city: "Bogotá", code: "BOG", name: "El Dorado International", country: "Colombia" },
  { city: "Lima", code: "LIM", name: "Jorge Chávez International", country: "Peru" },
  { city: "Mexico City", code: "MEX", name: "Benito Juárez International", country: "Mexico" },
  { city: "Cancún", code: "CUN", name: "Cancún International", country: "Mexico" },
  { city: "Santiago", code: "SCL", name: "Arturo Merino Benítez International", country: "Chile" },
];

type AirportEntry = typeof airports[0];

// Reusable suggestion dropdown component
const SuggestionDropdown = ({
  results,
  onSelect,
}: {
  results: AirportEntry[];
  onSelect: (a: AirportEntry) => void;
}) => (
  <div className="absolute left-0 right-0 top-[105%] bg-white border border-gray-200 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] overflow-hidden z-[99999]">
    {results.map((airport, i) => (
      <button
        key={`${airport.code}-${i}`}
        onMouseDown={(e) => {
          e.preventDefault();
          onSelect(airport);
        }}
        className="w-full text-left px-4 py-3 hover:bg-[#f6f3ff] transition flex items-center gap-3 border-b border-gray-100 last:border-0"
      >
        <span className="text-xs font-bold bg-[#f3efff] text-[#6c47ff] px-2 py-1 rounded-lg w-12 text-center shrink-0">
          {airport.code}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {airport.city}
            <span className="text-gray-400 font-normal ml-1">{airport.country}</span>
          </p>
          <p className="text-xs text-gray-400 truncate">{airport.name}</p>
        </div>
      </button>
    ))}
  </div>
);

const searchAirports = (value: string): AirportEntry[] => {
  if (!value.trim()) return [];
  const query = value.toLowerCase();
  return airports
    .filter(
      (a) =>
        a.city.toLowerCase().includes(query) ||
        a.code.toLowerCase().includes(query) ||
        a.name.toLowerCase().includes(query) ||
        a.country.toLowerCase().includes(query)
    )
    .slice(0, 6);
};

export default function HomePage() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    ticketType: "One Way",
    travelClass: "Economy",
    nearbyAirports: false,
    directFlights: false,
    multiFlights: [
      { from: "", to: "", departure: "" },
      { from: "", to: "", departure: "" },
    ],
    passengers: {
      adults: 1,
      children: 0,
      childrenAges: [] as number[],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openTravelers, setOpenTravelers] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Suggestion state for main from/to
  const [fromResults, setFromResults] = useState<AirportEntry[]>([]);
  const [toResults, setToResults] = useState<AirportEntry[]>([]);

  // Suggestion state for multi-city: keyed as "index-from" | "index-to"
  const [multiSuggestions, setMultiSuggestions] = useState<Record<string, AirportEntry[]>>({});

  const router = useRouter();

  // ── Main field handlers ──────────────────────────────────────────
  const handleFromChange = (value: string) => {
    setForm({ ...form, from: value });
    setErrors((prev) => ({ ...prev, from: "" }));
    setFromResults(searchAirports(value));
  };

  const handleToChange = (value: string) => {
    setForm({ ...form, to: value });
    setErrors((prev) => ({ ...prev, to: "" }));
    setToResults(searchAirports(value));
  };

  const selectFrom = (airport: AirportEntry) => {
    setForm({ ...form, from: `${airport.city} (${airport.code})` });
    setFromResults([]);
    setErrors((prev) => ({ ...prev, from: "" }));
  };

  const selectTo = (airport: AirportEntry) => {
    setForm({ ...form, to: `${airport.city} (${airport.code})` });
    setToResults([]);
    setErrors((prev) => ({ ...prev, to: "" }));
  };

  const swapCities = () => {
    setForm({ ...form, from: form.to, to: form.from });
  };

  // ── Multi-city field handlers ────────────────────────────────────
  const handleMultiChange = (index: number, field: "from" | "to" | "departure", value: string) => {
    const updated = [...form.multiFlights];
    updated[index] = { ...updated[index], [field]: value };
    setForm({ ...form, multiFlights: updated });
    setErrors((prev) => ({ ...prev, [`multi_${index}_${field}`]: "" }));

    if (field === "from" || field === "to") {
      const key = `${index}-${field}`;
      setMultiSuggestions((prev) => ({ ...prev, [key]: searchAirports(value) }));
    }
  };

  const selectMultiAirport = (index: number, field: "from" | "to", airport: AirportEntry) => {
    const updated = [...form.multiFlights];
    updated[index] = { ...updated[index], [field]: `${airport.city} (${airport.code})` };
    setForm({ ...form, multiFlights: updated });
    const key = `${index}-${field}`;
    setMultiSuggestions((prev) => ({ ...prev, [key]: [] }));
    setErrors((prev) => ({ ...prev, [`multi_${index}_${field}`]: "" }));
  };

  const clearMultiSuggestions = (index: number, field: "from" | "to") => {
    setTimeout(() => {
      const key = `${index}-${field}`;
      setMultiSuggestions((prev) => ({ ...prev, [key]: [] }));
    }, 150);
  };

  // ── Validation ───────────────────────────────────────────────────
  const validateMain = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.from.trim()) newErrors.from = "Please enter a departure city";
    if (!form.to.trim()) newErrors.to = "Please enter a destination city";
    if (!form.departure) newErrors.departure = "Please select a departure date";
    if (form.ticketType === "Return" && !form.returnDate) newErrors.returnDate = "Please select a return date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMulti = (): boolean => {
    const newErrors: Record<string, string> = {};
    form.multiFlights.forEach((flight, i) => {
      if (!flight.from.trim()) newErrors[`multi_${i}_from`] = "Required";
      if (!flight.to.trim()) newErrors[`multi_${i}_to`] = "Required";
      if (!flight.departure) newErrors[`multi_${i}_departure`] = "Required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Session restore ──────────────────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem("lastFlightSearch");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm((prev) => ({ ...prev, ...parsed }));
    }
  }, []);

  // ── FAQ data ─────────────────────────────────────────────────────
  const faqs = [
    { question: "What is Luxtravelerz?", answer: "Luxtravelerz is a premium travel platform designed to help you discover and book exceptional flights, luxury stays, and curated travel experiences across the world." },
    { question: "How does Luxtravelerz find the best flights?", answer: "We intelligently compare top airlines and trusted travel providers, highlighting options that combine comfort, value, and convenience—so you don't have to search multiple platforms." },
    { question: "How do I book through Luxtravelerz?", answer: "Simply search for your journey, choose your preferred option, and we'll seamlessly connect you to the airline or provider to complete your booking securely." },
    { question: "Can I discover new destinations?", answer: "Yes. Luxtravelerz is built for exploration—browse trending destinations, curated routes, and exclusive travel inspiration tailored to your preferences." },
    { question: "What happens after I book?", answer: "Once your booking is confirmed, you'll receive your full itinerary and travel details directly from the provider, along with everything you need for a smooth journey." },
    { question: "Does Luxtravelerz offer price tracking?", answer: "Yes, you can monitor fare changes for your preferred routes and receive timely updates when prices shift—so you can book with confidence." },
    { question: "Are flexible travel options available?", answer: "Many of our partners offer flexible booking options, including changes and cancellations. You can filter for these features when searching." },
    { question: "Can I choose more sustainable travel options?", answer: "Absolutely. Luxtravelerz allows you to identify flights with lower carbon emissions, helping you make more responsible travel decisions without compromising on quality." },
  ];

  // ── Error label helper ───────────────────────────────────────────
  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? (
      <p className="text-[10px] text-red-500 mt-1 font-medium">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - TOP SECTION */}
      <div className="bg-gradient-to-b from-[#6c47ff]/5 to-white pt-8 pb-8 px-5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Millions of cheap flights. One simple search.
          </h1>
          <p className="text-gray-600 mb-6">
            <button className="text-[#6c47ff] hover:underline font-semibold">Explore trips →</button>
          </p>

          {/* SEARCH PANEL */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg">

            {/* TOP CONTROLS */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                {/* Ticket Type */}
                <div className="w-full xl:w-auto">
                  <div className="relative xl:hidden">
                    <select
                      value={form.ticketType}
                      onChange={(e) => setForm({ ...form, ticketType: e.target.value })}
                      className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/30 focus:border-[#6c47ff] transition-all"
                    >
                      {["One Way", "Return", "Multi City"].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="hidden xl:flex gap-2 bg-gray-100 rounded-full p-1">
                    {["One Way", "Return", "Multi City"].map((type) => (
                      <button key={type} onClick={() => setForm({ ...form, ticketType: type })}
                        className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${form.ticketType === type ? "bg-[#6c47ff] text-white shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-white"}`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Class */}
                <div className="w-full xl:w-auto">
                  <div className="relative xl:hidden">
                    <select
                      value={form.travelClass}
                      onChange={(e) => setForm({ ...form, travelClass: e.target.value })}
                      className="w-full appearance-none bg-white border border-gray-200 rounded-2xl px-4 py-3 pr-12 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd166]/40 focus:border-[#ffd166] transition-all"
                    >
                      {["Economy", "Premium Economy", "Business", "First"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="hidden xl:flex gap-2 bg-gray-100 rounded-full p-1">
                    {["Economy", "Premium Economy", "Business", "First"].map((c) => (
                      <button key={c} onClick={() => setForm({ ...form, travelClass: c })}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${form.travelClass === c ? "bg-[#ffd166] text-gray-900 shadow-md" : "text-gray-600 hover:text-gray-900 hover:bg-white"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add Hotel */}
                <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm hover:border-[#6c47ff]/40 transition-all">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#6c47ff]" />
                  <span className="font-medium">Add a hotel</span>
                </label>
              </div>
            </div>

            {/* ── ONE WAY + RETURN ── */}
            {form.ticketType !== "Multi City" && (
              <div className="space-y-4">
                {/* ROUTE CARD */}
                <div className="relative bg-gradient-to-br from-white to-[#faf8ff] border border-gray-200 rounded-[32px] p-4 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-visible z-20">
                  <div className="absolute top-0 right-0 w-52 h-52 bg-[#6c47ff]/5 rounded-full blur-3xl" />

                  <div className="relative z-30 grid md:grid-cols-5 gap-4 items-start overflow-visible">

                    {/* FROM */}
                    <div className={`relative md:col-span-2 bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300 overflow-visible z-50 ${errors.from ? "border-red-400" : "border-gray-100"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">From <span className="text-red-400">*</span></p>
                        <span className="text-[9px] bg-[#f3efff] text-[#6c47ff] px-2 py-1 rounded-full font-semibold">Origin</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-3">Flying from</p>
                      <input
                        value={form.from}
                        onChange={(e) => handleFromChange(e.target.value)}
                        onFocus={() => setFromResults(searchAirports(form.from))}
                        onBlur={() => setTimeout(() => setFromResults([]), 150)}
                        className="w-full bg-transparent outline-none text-xl font-bold text-gray-900 placeholder:text-gray-300"
                        placeholder="Lagos (LOS)"
                      />
                      <FieldError field="from" />
                      {fromResults.length > 0 && <SuggestionDropdown results={fromResults} onSelect={selectFrom} />}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                          <input type="checkbox" checked={form.nearbyAirports} onChange={(e) => setForm({ ...form, nearbyAirports: e.target.checked })} className="accent-[#6c47ff]" />
                          Nearby airports
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                          <input type="checkbox" checked={form.directFlights} onChange={(e) => setForm({ ...form, directFlights: e.target.checked })} className="accent-[#6c47ff]" />
                          Direct only
                        </label>
                      </div>
                    </div>

                    {/* SWAP */}
                    <div className="flex justify-center">
                      <button onClick={swapCities}
                        className="group h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6c47ff] to-[#8b6dff] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300">
                        <MdSwapHoriz size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                      </button>
                    </div>

                    {/* TO */}
                    <div className={`relative md:col-span-2 bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300 overflow-visible z-50 ${errors.to ? "border-red-400" : "border-gray-100"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">To <span className="text-red-400">*</span></p>
                        <span className="text-[9px] bg-[#fff5dc] text-[#b88700] px-2 py-1 rounded-full font-semibold">Destination</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-3">Flying to</p>
                      <input
                        value={form.to}
                        onChange={(e) => handleToChange(e.target.value)}
                        onFocus={() => setToResults(searchAirports(form.to))}
                        onBlur={() => setTimeout(() => setToResults([]), 150)}
                        className="w-full bg-transparent outline-none text-xl font-bold text-gray-900 placeholder:text-gray-300"
                        placeholder="Dubai (DXB)"
                      />
                      <FieldError field="to" />
                      {toResults.length > 0 && <SuggestionDropdown results={toResults} onSelect={selectTo} />}
                      <div className="flex flex-wrap gap-3 mt-4">
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                          <input type="checkbox" checked={form.nearbyAirports} onChange={(e) => setForm({ ...form, nearbyAirports: e.target.checked })} className="accent-[#6c47ff]" />
                          Nearby airports
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LOWER SECTION */}
                <div className={`grid gap-3 ${form.ticketType === "Return" ? "md:grid-cols-4" : "md:grid-cols-3"}`}>

                  {/* DEPART */}
                  <div className={`bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${errors.departure ? "border-red-400" : "border-gray-200"}`}>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Depart <span className="text-red-400">*</span></p>
                    <input
                      type="date"
                      value={form.departure}
                      onChange={(e) => { setForm({ ...form, departure: e.target.value }); setErrors((p) => ({ ...p, departure: "" })); }}
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-900"
                    />
                    <FieldError field="departure" />
                  </div>

                  {/* RETURN */}
                  {form.ticketType === "Return" && (
                    <div className={`bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${errors.returnDate ? "border-red-400" : "border-gray-200"}`}>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Return <span className="text-red-400">*</span></p>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => { setForm({ ...form, returnDate: e.target.value }); setErrors((p) => ({ ...p, returnDate: "" })); }}
                        className="w-full bg-transparent outline-none text-base font-bold text-gray-900"
                      />
                      <FieldError field="returnDate" />
                    </div>
                  )}

                  {/* TRAVELLERS */}
                  <div className="relative">
                    <button onClick={() => setOpenTravelers(!openTravelers)}
                      className="w-full h-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="text-left">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Travellers</p>
                        <p className="text-base font-bold text-gray-900">
                          {form.passengers.adults} Adult{form.passengers.adults > 1 && "s"}
                          {form.passengers.children > 0 && `, ${form.passengers.children} Child`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{form.travelClass}</p>
                      </div>
                      <MdKeyboardArrowDown size={20} className={`text-[#6c47ff] transition ${openTravelers ? "rotate-180" : ""}`} />
                    </button>

                    {openTravelers && (
                      <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 space-y-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">Adults</p>
                            <p className="text-xs text-gray-400">18+ years</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setForm((prev) => ({ ...prev, passengers: { ...prev.passengers, adults: Math.max(1, prev.passengers.adults - 1) } }))} className="h-9 w-9 rounded-full bg-gray-100">-</button>
                            <span className="font-bold w-5 text-center">{form.passengers.adults}</span>
                            <button onClick={() => setForm((prev) => ({ ...prev, passengers: { ...prev.passengers, adults: prev.passengers.adults + 1 } }))} className="h-9 w-9 rounded-full bg-[#6c47ff] text-white">+</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">Children</p>
                            <p className="text-xs text-gray-400">0 – 17 years</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setForm((prev) => ({ ...prev, passengers: { ...prev.passengers, children: Math.max(0, prev.passengers.children - 1) } }))} className="h-9 w-9 rounded-full bg-gray-100">-</button>
                            <span className="font-bold w-5 text-center">{form.passengers.children}</span>
                            <button onClick={() => setForm((prev) => ({ ...prev, passengers: { ...prev.passengers, children: prev.passengers.children + 1 } }))} className="h-9 w-9 rounded-full bg-[#6c47ff] text-white">+</button>
                          </div>
                        </div>
                        <button onClick={() => setOpenTravelers(false)} className="w-full bg-gradient-to-r from-[#6c47ff] to-[#8b6dff] text-white py-2.5 rounded-xl font-semibold">Done</button>
                      </div>
                    )}
                  </div>

                  {/* SEARCH */}
                  <div>
                    <button
                      onClick={() => {
                        if (!validateMain()) return;
                        const searchData = { ticketType: form.ticketType, from: form.from, to: form.to, departure: form.departure, returnDate: form.returnDate, passengers: form.passengers, travelClass: form.travelClass, multiFlights: form.multiFlights };
                        sessionStorage.setItem("lastFlightSearch", JSON.stringify(searchData));
                        router.push(`/flights/results?ticketType=${form.ticketType}&from=${form.from}&to=${form.to}&departure=${form.departure}&return=${form.returnDate}&adults=${form.passengers.adults}&children=${form.passengers.children}`);
                      }}
                      className="w-full h-full min-h-[78px] rounded-2xl bg-gradient-to-r from-[#6c47ff] via-[#7b5cff] to-[#8b6dff] text-white font-bold text-base shadow-[0_10px_35px_rgba(108,71,255,0.25)] hover:scale-[1.02] transition-all duration-300"
                    >
                      Search Flights
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── MULTI CITY ── */}
            {form.ticketType === "Multi City" && (
              <div className="space-y-4">
                {form.multiFlights.map((flight, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-[#faf8ff] border border-gray-200 rounded-[28px] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Flight {index + 1}</p>
                        <h3 className="text-lg font-bold text-gray-900">Multi-city route</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {index >= 2 && (
                          <button
                            onClick={() => setForm({ ...form, multiFlights: form.multiFlights.filter((_, i) => i !== index) })}
                            className="h-10 w-10 rounded-2xl bg-[#fff5dc] text-[#b88700] flex items-center justify-center hover:scale-105 hover:bg-[#ffefbd] transition-all duration-300 shadow-sm"
                          >
                            <MdDeleteOutline size={20} />
                          </button>
                        )}
                        <div className="h-10 w-10 rounded-2xl bg-[#f3efff] flex items-center justify-center text-[#6c47ff] font-bold">{index + 1}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      {/* MULTI FROM */}
                      <div className={`relative bg-white rounded-2xl p-4 border overflow-visible z-[${50 - index}] ${errors[`multi_${index}_from`] ? "border-red-400" : "border-gray-100"}`}>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">From <span className="text-red-400">*</span></p>
                        <input
                          value={flight.from}
                          onChange={(e) => handleMultiChange(index, "from", e.target.value)}
                          onFocus={() => {
                            const key = `${index}-from`;
                            setMultiSuggestions((prev) => ({ ...prev, [key]: searchAirports(flight.from) }));
                          }}
                          onBlur={() => clearMultiSuggestions(index, "from")}
                          className="w-full bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                          placeholder="Lagos (LOS)"
                        />
                        {errors[`multi_${index}_from`] && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors[`multi_${index}_from`]}</p>}
                        {(multiSuggestions[`${index}-from`] ?? []).length > 0 && (
                          <SuggestionDropdown results={multiSuggestions[`${index}-from`]} onSelect={(a) => selectMultiAirport(index, "from", a)} />
                        )}
                      </div>

                      {/* MULTI TO */}
                      <div className={`relative bg-white rounded-2xl p-4 border overflow-visible z-[${50 - index}] ${errors[`multi_${index}_to`] ? "border-red-400" : "border-gray-100"}`}>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">To <span className="text-red-400">*</span></p>
                        <input
                          value={flight.to}
                          onChange={(e) => handleMultiChange(index, "to", e.target.value)}
                          onFocus={() => {
                            const key = `${index}-to`;
                            setMultiSuggestions((prev) => ({ ...prev, [key]: searchAirports(flight.to) }));
                          }}
                          onBlur={() => clearMultiSuggestions(index, "to")}
                          className="w-full bg-transparent outline-none text-lg font-bold text-gray-900 placeholder:text-gray-300"
                          placeholder="Dubai (DXB)"
                        />
                        {errors[`multi_${index}_to`] && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors[`multi_${index}_to`]}</p>}
                        {(multiSuggestions[`${index}-to`] ?? []).length > 0 && (
                          <SuggestionDropdown results={multiSuggestions[`${index}-to`]} onSelect={(a) => selectMultiAirport(index, "to", a)} />
                        )}
                      </div>

                      {/* MULTI DATE */}
                      <div className={`bg-white rounded-2xl p-4 border ${errors[`multi_${index}_departure`] ? "border-red-400" : "border-gray-100"}`}>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Depart <span className="text-red-400">*</span></p>
                        <input
                          type="date"
                          value={flight.departure}
                          onChange={(e) => handleMultiChange(index, "departure", e.target.value)}
                          className="w-full bg-transparent outline-none text-base font-bold text-gray-900"
                        />
                        {errors[`multi_${index}_departure`] && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors[`multi_${index}_departure`]}</p>}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    onClick={() => setForm({ ...form, multiFlights: [...form.multiFlights, { from: "", to: "", departure: "" }] })}
                    className="h-16 border-2 border-dashed border-[#6c47ff] rounded-2xl font-semibold text-[#6c47ff] hover:bg-[#f6f3ff] transition-all"
                  >
                    + Add another flight
                  </button>
                  <button
                    onClick={() => {
                      if (!validateMulti()) return;
                      const searchData = { ticketType: form.ticketType, from: form.from, to: form.to, departure: form.departure, returnDate: form.returnDate, passengers: form.passengers, travelClass: form.travelClass, multiFlights: form.multiFlights };
                      sessionStorage.setItem("lastFlightSearch", JSON.stringify(searchData));
                      router.push(`/flights/multi-city?flights=${encodeURIComponent(JSON.stringify(form.multiFlights))}&adults=${form.passengers.adults}&children=${form.passengers.children}`);
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

      {/* HERO IMAGE SECTION */}
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div
          className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-white p-6 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore every destination</h2>
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition">Search flights everywhere</button>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Booking flights with Luxtravelerz</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition font-semibold text-gray-900 text-left"
              >
                {faq.question}
                <MdExpandMore size={24} className={`text-[#6c47ff] transition transform ${expandedFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {expandedFaq === idx && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}