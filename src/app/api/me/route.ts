import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/data/db";
import { I_user } from "@/components/utils/types";

const SECRET_KEY = "secret_key";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as I_user;

    const balance = db.prepare("SELECT balance FROM users WHERE username = ?").get(decoded.username) as { balance: number };

    decoded.balance = balance.balance;

    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}
