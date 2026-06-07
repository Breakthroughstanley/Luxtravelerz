// app/api/test-db/route.ts

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.count();

    return Response.json({
      success: true,
      users,
    });
  } catch (err) {
    return Response.json({
      success: false,
      error: String(err),
    });
  }
}