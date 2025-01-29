import bcrypt from "bcryptjs";
import { I_user } from "@/utils/types";

// Fake user database (replace with real DB later)

export const users: I_user[] = [
  {
    username: "admin",
    balance: 100,
    password: bcrypt.hashSync("admin", 10),
  },
];