import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "@/data/database";
import { serialize } from "cookie";
import { I_user } from "@/components/utils/types";

const SECRET_KEY = "secret_key";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user: I_user | undefined = users.find((user) => user.username === username);

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
}
