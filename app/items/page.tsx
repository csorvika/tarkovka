"use client";
import { useState, useEffect } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Random dummy itemek generálása
    const generated: Item[] = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      price: Math.floor(Math.random() * 100000),
    }));
    setItems(generated);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-200 mb-4">All Items</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-lg font-semibold">{item.name}</div>
            <div className="text-green-400 mt-2">{item.price} ₽</div>
          </div>
        ))}
      </div>
    </div>
  );
}
