import { NextResponse } from "next/server";
import db from "@/data/db";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret_key";

export async function POST(req: Request) {
  try 
  {
    const { newBalance } = await req.json();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string };
    const username = decoded.username;

    db.prepare("UPDATE users SET balance = ? WHERE username = ?").run(newBalance, username);
    return NextResponse.json({ message: "Balance updated successfully" });
  } 
  catch (error) 
  {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}