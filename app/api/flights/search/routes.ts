// app/api/flights/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { departureCity, arrivalCity, departureDate, passengers } = body;

    if (!departureCity || !arrivalCity || !departureDate) {
      return NextResponse.json(
        { error: 'Missing required fields: departureCity, arrivalCity, departureDate' },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.WAKANOW_API_KEY;
    if (!apiKey) {
      console.error('WAKANOW_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Prepare Wakanow API request
    const wakanowPayload = {
      departure_city: departureCity,
      arrival_city: arrivalCity,
      departure_date: departureDate,
      return_date: body.returnDate || null,
      number_of_passengers: passengers || 1,
      cabin_class: body.cabinClass || 'Economy',
      trip_type: body.tripType || 'One Way',
    };

    console.log('Calling Wakanow API with payload:', wakanowPayload);

    // Call Wakanow API
    const wakanowResponse = await fetch(
      `${process.env.NEXT_PUBLIC_WAKANOW_API_URL || 'https://api.wakanow.com'}/flights/search`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(wakanowPayload),
      }
    );

    // Handle non-OK responses
    if (!wakanowResponse.ok) {
      const errorBody = await wakanowResponse.text();
      console.error('Wakanow API error:', {
        status: wakanowResponse.status,
        statusText: wakanowResponse.statusText,
        body: errorBody,
      });

      return NextResponse.json(
        {
          error: `Wakanow API error: ${wakanowResponse.statusText}`,
          details: process.env.NODE_ENV === 'development' ? errorBody : undefined,
        },
        { status: 502 }
      );
    }

    // Parse response
    const data = await wakanowResponse.json();

    // Return data to client
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Flight search error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to search flights',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for debugging (remove in production)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    message: 'Use POST method to search flights',
    example: {
      departureCity: 'Lagos',
      arrivalCity: 'Dubai',
      departureDate: '2024-06-15',
      passengers: 1,
      cabinClass: 'Economy',
      tripType: 'One Way',
    },
  });
}