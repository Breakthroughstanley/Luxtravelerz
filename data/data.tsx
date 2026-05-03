"use client";

import Link from "next/link";
import { useRef, useState } from "react";

/* react-icons */
import { MdFlight, MdHotel, MdDirectionsCar, MdRestaurant, MdExplore, MdOutlineLocalTaxi, MdChevronLeft, MdChevronRight, MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi2";
import { BsPeopleFill } from "react-icons/bs";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { TbActivityHeartbeat } from "react-icons/tb";

export const NAV_LINKS = [
  {
    name: "Flights",
    href: "/home",
    icon: MdFlight,
  },
  {
    name: "Stays",
    href: "/hotels",
    icon: MdHotel,
  },
  {
    name: "Rides",
    href: "/rides",
    icon: MdDirectionsCar,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: MdExplore,
  },
];


export const CATEGORIES = [
  { label: "Flight",     icon: <RiFlightTakeoffLine size={20} /> },
  { label: "Activities", icon: <TbActivityHeartbeat size={20} /> },
  { label: "Stays",      icon: <MdHotel size={20} /> },
  { label: "Rides",      icon: <MdDirectionsCar size={20} /> },
];

export const DEALS = [
  { from: "Lagos",  to: "London",   date: "May 9 — May 24",  price: "₦975,750",   lock: "₦272,204", badge: "DEAL OF THE DAY", bg: "#3b2f1e" },
  { from: "Abuja",  to: "Dubai",    date: "Jun 5 — Jun 19",  price: "₦890,000",   lock: "₦195,000", badge: "HOT DEAL",        bg: "#0f2233" },
  { from: "Lagos",  to: "New York", date: "Jun 1 — Jun 15",  price: "₦1,250,000", lock: "₦310,000", badge: "BEST VALUE",      bg: "#1e1040" },
  { from: "Lagos",  to: "Paris",    date: "Jul 10 — Jul 24", price: "₦1,100,000", lock: "₦280,000", badge: "POPULAR",         bg: "#0d2b1e" },
  { from: "Abuja",  to: "Toronto",  date: "Aug 3 — Aug 17",  price: "₦1,380,000", lock: "₦330,000", badge: "LIMITED SEATS",   bg: "#2a1030" },
];

export const FEATURES = [
  { icon: <HiOutlineGlobeAlt size={24} />,       title: "Global coverage",     desc: "Customer support across 30+ countries, always available." },
  { icon: <HiOutlineShieldCheck size={24} />, title: "Free cancellation",   desc: "Cancel most bookings up to 48 hours before pick-up." },
  { icon: <HiOutlineClock size={24} />,       title: "Book now, pay later", desc: "Reserve your stay today and pay when you arrive." },
  { icon: <HiOutlineSparkles size={24} />,    title: "Exclusive deals",     desc: "Members-only rates on flights, hotels and experiences." },
];
export const HOTELS = [
  { city: "Dubai",    sub: "1,250 Hotels", img: "/images/dubai.jpg" },
  { city: "Paris",    sub: "2,100 Hotels", img: "/images/paris.jpg" },
  { city: "Miami",    sub: "870 Hotels",   img: "/images/miami.jpg" },
  { city: "New York", sub: "3,400 Hotels", img: "/images/newyork.jpg" },
];
export const OFFERS = [
  { title: "Seize the moment",  desc: "Save 15% or more when you book and stay before October 1 2024",        cta: "Find Getaway Deals",    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80" },
  { title: "Genius discounts",  desc: "Sign in and unlock up to 20% off on select hotels — members only",     cta: "Sign In to Save",       img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80" },
  { title: "Last-minute deals", desc: "Book within 48 hours of your trip and save big on hotels and flights", cta: "See Last-Minute Deals", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80" },
];

export const SERVICES = [
  { icon: <MdDirectionsCar size={26} />,    title: "Rent a car",           desc: "Hundreds of vehicles with 24/7 customer service." },
  { icon: <MdOutlineLocalTaxi size={26} />, title: "Private airport taxi", desc: "A driver waiting to take you straight to your stay." },
  { icon: <MdRestaurant size={26} />,       title: "Find your restaurant", desc: "Discover meals so good you'll want to come back." },
];

export const FAQS = [
  { q: "Can I book activities and tours through your company?",               a: "Yes! We offer hundreds of curated activities and tours across all destinations, from guided city walks to adventure sports." },
  { q: "Do you handle flight bookings as part of your travel packages?",      a: "Absolutely. We search hundreds of airlines to find the best fares and can bundle flights with hotels or activities for extra savings." },
  { q: "Do you provide car rental services?",                                 a: "Yes, we partner with leading car rental providers worldwide. Hundreds of vehicles available with 24/7 customer service." },
  { q: "Can I customise my package to include flights, activities and cars?",  a: "Of course! Our packages are fully customisable — mix and match flights, hotels, activities and car rentals for your perfect trip." },
];

export const SOCIAL = [
  { icon: <FaTwitter size={14} />,    label: "Twitter"   },
  { icon: <FaFacebookF size={14} />,  label: "Facebook"  },
  { icon: <FaLinkedinIn size={14} />, label: "LinkedIn"  },
  { icon: <FaInstagram size={14} />,  label: "Instagram" },
];