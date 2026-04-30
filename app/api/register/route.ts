"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import crypto from "crypto";

// ✅ import BOTH emails

import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // ✅ VALIDATION
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ CREATE USER
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    // ✅ CREATE VERIFICATION TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: user.email!,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    // 🚀 SEND EMAILS (DO NOT BREAK FLOW IF THEY FAIL)
    try {
      // 👉 1. Send welcome email immediately
      await sendWelcomeEmail(user.email!, user.name || undefined);

      // 👉 2. Send verification email
  

    } catch (mailError) {
      console.error("MAIL ERROR:", mailError);

      return NextResponse.json({
        warning:
          "Account created, but we couldn’t send some emails. You can request them again.",
      });
    }

    return NextResponse.json({
      message:
        "Account created successfully. Check your email to verify your account.",
    });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}