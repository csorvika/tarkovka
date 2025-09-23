"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Item = {
  id: string;       // Prisma UUID
  name: string;
  price: number;
  image?: string | null;
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/items");
        const data = await res.json();
        // itt a gond: az API válasz { items: [...], total, page, ... }
        console.log("API válasz:", data);
        setItems(data.items); // <-- így kell!
      } catch (error) {
        console.error("Hiba az itemek betöltésekor:", error);
      }
    }

    fetchItems();
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
            <div className="w-full h-32 relative mb-2">
              <Image
                src={item.image ?? "/placeholder.png"}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-lg font-semibold">{item.name}</div>
            <div className="text-green-400 mt-2">{item.price} ₽</div>
          </div>
        ))}
      </div>
    </div>
  );
}
