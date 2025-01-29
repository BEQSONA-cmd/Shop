import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secret_key";

export default function handler(req: NextApiRequest, res: NextApiResponse) 
{
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  try 
  {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ user: decoded });
  } 
  catch 
  {
    console.log("Invalid Token");
    res.status(401).json({ message: "Invalid Token" });
  }
}
