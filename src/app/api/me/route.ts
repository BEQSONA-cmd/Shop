import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret_key";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ user: decoded });
  } catch {
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
  }
}
