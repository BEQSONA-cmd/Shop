import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import db from "@/data/db";
import bcrypt from "bcryptjs";
import { I_user } from "@/components/utils/types";

const SECRET_KEY = "secret_key";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username) as I_user;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    const token = jwt.sign({ username: user.username, balance: user.balance }, SECRET_KEY);

    const response = NextResponse.json({ message: "Login successful" });

    response.headers.set(
      "Set-Cookie",
      serialize("authToken", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}