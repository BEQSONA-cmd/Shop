import { NextResponse } from "next/server";
import db from "@/data/db";

export async function POST(req: Request) {
  try 
  {
    const { id, username, balance } = await req.json();

    db.prepare("UPDATE users SET username = ?, balance = ? WHERE id = ?").run(
      username,
      balance,
      id
    );

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}