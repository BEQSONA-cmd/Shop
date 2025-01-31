// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import db from "@/data/db";

export async function GET() {
  try {
    const users = db.prepare("SELECT * FROM users").all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}