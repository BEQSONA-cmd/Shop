"use client";
import React, { useState } from "react";
import { Product } from "@/components/utils/types";
import { products } from "@/data/database";
import Sign_In from "@/components/sign";
import { useAuth } from "@/components/contexts/AuthContext";
import Cookies from "js-cookie";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogged, balance, setBalance } = useAuth();

  const try_pay = async () => 
  {
    if (isLogged) 
    {
      try {
        if (balance < product.price) {
          alert("Insufficient balance to buy this product.");
          return;
        }

        const newBalance = balance - product.price;

        const updateRes = await fetch("/api/update-balance", {
          method: "POST",
          headers: { "Content-Type": "application/json",
            "authorization": `Bearer ${Cookies.get("authToken")}`
           },
          body: JSON.stringify({ newBalance }),
        });

        if (!updateRes.ok)
          throw new Error("Failed to update balance");

        setBalance(newBalance);
        alert(`Successfully bought: ${product.name}. Your new balance is $${newBalance.toFixed(2)}`);
      } 
      catch (error) 
      {
        console.error("Error during purchase:", error);
        alert("An error occurred while processing your purchase.");
      }
    } 
    else
      setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-400">${product.price}</p>
      <button
        onClick={try_pay}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Buy Now
      </button>
      {isModalOpen && <Sign_In closeModal={closeModal} />}
    </div>
  );
};

const ShopPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
    );
  });

  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Shop</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 rounded-lg bg-gray-800 text-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;