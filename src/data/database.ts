import bcrypt from "bcryptjs";
import { I_user } from "@/components/utils/types";

// Fake user database (replace with real DB later)

export const users: I_user[] = [
  {
    username: "admin",
    balance: 100,
    password: bcrypt.hashSync("admin", 10),
  },
  {
    username: "beqa",
    balance: 7232154.64,
    password: bcrypt.hashSync("beqa", 10),
  },
];