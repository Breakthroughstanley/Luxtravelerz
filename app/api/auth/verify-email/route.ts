import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
    }

    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // token expiry check
    if (record.expires < new Date()) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 400 }
      );
    }

    // verify user
    await prisma.user.update({
      where: {
        email: record.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    // delete token after verification
    await prisma.verificationToken.delete({
      where: {
        token,
      },
    });

    // redirect after success
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?verified=true`
    );

  } catch (err) {
    console.error("VERIFY EMAIL ERROR:", err);

    return NextResponse.json(
      { error: "Server error during verification" },
      { status: 500 }
    );
  }
}