// app/api/register/route.ts
import { NextResponse } from "next/server";
import db from "@/data/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    // Check if user already exists
    const existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (existingUser) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert new user
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);

    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}