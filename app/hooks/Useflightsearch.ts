// hooks/useFlightSearch.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface FlightSearchParams {
  from: string;
  to: string;
  departure: string;
  returnDate?: string;
  passengers: number;
  travelClass: string;
  ticketType: string;
}

export interface FlightData {
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

export interface UseFlightSearchReturn {
  flights: FlightData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage flight search results
 * Integrates with Wakanow API and transforms data to our format
 */
export function useFlightSearch(
  params: FlightSearchParams
): UseFlightSearchReturn {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = useCallback(async () => {
    // Validate params
    if (!params.from || !params.to || !params.departure) {
      setError('Missing required search parameters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/flights/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          departureCity: params.from,
          arrivalCity: params.to,
          departureDate: params.departure,
          returnDate: params.returnDate || null,
          passengers: params.passengers || 1,
          cabinClass: params.travelClass || 'Economy',
          tripType: params.ticketType || 'One Way',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      const transformedFlights = transformWakanowData(data);
      setFlights(transformedFlights);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Flight search error:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  // Fetch flights when params change
  useEffect(() => {
    if (params.from && params.to && params.departure) {
      fetchFlights();
    }
  }, [params, fetchFlights]);

  return {
    flights,
    loading,
    error,
    refetch: fetchFlights,
  };
}

/**
 * Transform Wakanow API response to our internal flight data format
 */
function transformWakanowData(wakanowResponse: any): FlightData[] {
  if (!wakanowResponse.flights || !Array.isArray(wakanowResponse.flights)) {
    return [];
  }

  return wakanowResponse.flights.map((flight: any, index: number) => ({
    id: flight.id || index,
    airline: flight.airlineName || 'Unknown Airline',
    flightNumber: flight.flightCode || 'N/A',
    departure: formatTime(flight.departureTime),
    arrival: formatTime(flight.arrivalTime),
    duration: calculateDuration(flight.departureTime, flight.arrivalTime),
    stops: flight.stops || 0,
    from: formatAirport(
      flight.departureCity,
      flight.departureCode
    ),
    to: formatAirport(flight.arrivalCity, flight.arrivalCode),
    departureDate: flight.departureDate || '',
    price: Math.round(flight.price || 0),
    rating: flight.rating || 4.0,
    reviews: flight.reviewCount || 0,
    image:
      flight.airlineLogoUrl ||
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=100&fit=crop',
    amenities: Array.isArray(flight.amenities) ? flight.amenities : [],
    seats: flight.availableSeats || 5,
    baggage: flight.baggage || '1x 23kg',
    seatClass: flight.cabinClass || 'Economy',
  }));
}

/**
 * Format ISO time string to HH:MM format
 */
function formatTime(isoTime: string | undefined): string {
  if (!isoTime) return '--:--';

  try {
    const date = new Date(isoTime);
    if (isNaN(date.getTime())) return '--:--';

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  } catch {
    return '--:--';
  }
}

/**
 * Calculate flight duration from departure and arrival times
 */
function calculateDuration(
  departure: string | undefined,
  arrival: string | undefined
): string {
  if (!departure || !arrival) return '--m';

  try {
    const depTime = new Date(departure).getTime();
    const arrTime = new Date(arrival).getTime();

    if (isNaN(depTime) || isNaN(arrTime)) return '--m';

    const diffMs = arrTime - depTime;
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  } catch {
    return '--m';
  }
}

/**
 * Format airport location string
 */
function formatAirport(
  city: string | undefined,
  code: string | undefined
): string {
  if (!city && !code) return 'Unknown';
  if (!code) return city || 'Unknown';
  return `${city || 'Unknown'} (${code})`;
}