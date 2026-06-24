"use client";

import { useState } from "react";
import products from "../data/data.json";
import type { ProductCardData } from "./ProductCard";
import ProductCard from "./ProductCard";

export default function ProductsArea() {
  const [items, setItems] = useState<ProductCardData[]>(
    products as ProductCardData[]
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleColorChange = (id: string, color: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Wyze Cameras</h1>
          <p className="text-sm text-gray-500 mt-1">
            Choose your setup and adjust quantities below.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {items.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
              onQuantityChange={handleQuantityChange}
              onColorChange={handleColorChange}
            />
          ))}
        </div>
      </div>
  );
}