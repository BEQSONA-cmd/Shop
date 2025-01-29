import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { users } from "../../lib/db";
import { serialize } from "cookie";

const SECRET_KEY = "secret_key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Invalid username or password" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  res.setHeader(
    "Set-Cookie",
    serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })
  );

  res.status(200).json({ message: "Login successful" });
}
