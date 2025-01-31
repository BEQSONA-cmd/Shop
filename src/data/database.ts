import bcrypt from "bcryptjs";
import { I_user } from "@/components/utils/types";
import { Product } from "@/components/utils/types";

// export const users: I_user[] = [
//   {
//     username: "admin",
//     balance: 1000,
//     password: bcrypt.hashSync("admin", 10),
//   },
//   {
//     username: "beqa",
//     balance: 7232154.64,
//     password: bcrypt.hashSync("beqa", 10),
//   },
// ];

export const products: Product[] = 
[
  { id: 1, name: "Product 1", price: 100, category: "Category 1", image: "product.png" },
  { id: 2, name: "Product 2", price: 200, category: "Category 2", image: "product.png" },
  { id: 3, name: "Product 3", price: 300, category: "Category 1", image: "product.png" },
  { id: 4, name: "Product 4", price: 400, category: "Category 2", image: "product.png" },
  { id: 5, name: "Product 5", price: 500, category: "Category 1", image: "product.png" },
  { id: 6, name: "Product 6", price: 600, category: "Category 2", image: "product.png" },
  { id: 7, name: "Product 7", price: 700, category: "Category 1", image: "product.png" },
  { id: 8, name: "Product 8", price: 800, category: "Category 2", image: "product.png" },
  { id: 9, name: "Product 9", price: 900, category: "Category 1", image: "product.png" },
  { id: 10, name: "Product 10", price: 1000, category: "Category 2", image: "product.png" },
];
