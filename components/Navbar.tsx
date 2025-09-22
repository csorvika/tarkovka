"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [raidTime, setRaidTime] = useState("19:44:34");
  const [realTime, setRealTime] = useState("07:44:34");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Valós idő frissítése
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setRealTime(now.toLocaleTimeString("hu-HU"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-black text-yellow-200 font-mono text-sm flex justify-between items-center px-6 py-2 shadow-md relative">
      {/* Bal oldal - idő kijelzés */}
      <div className="flex gap-6 items-center">
        <div>
          <span className="text-blue-400 font-bold">{raidTime}</span>
          <span className="ml-1 text-gray-400">Raid time</span>
        </div>
        <div>
          <span className="text-blue-400 font-bold">{realTime}</span>
          <span className="ml-1 text-gray-400">Realtime</span>
        </div>
      </div>

      {/* Jobb oldal - menü */}
      <ul className="flex gap-6 items-center">
        <li>
          <Link href="/maps" className="hover:text-white">
            Maps <span className="ml-1 text-pink-400 text-xs">New</span>
          </Link>
        </li>

        {/* Progression dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setOpenMenu("progression")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <button className="hover:text-white">Progression ▾</button>
          {openMenu === "progression" && (
            <ul className="absolute left-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg">
              <li>
                <Link
                  href="/items"
                  className="block px-4 py-2 hover:bg-gray-700 hover:text-white"
                >
                  All Items
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/calculators" className="hover:text-white">
            Calculators ▾
          </Link>
        </li>
        <li>
          <Link href="/guns" className="hover:text-white">
            Guns/Ammo ▾
          </Link>
        </li>
        <li>
          <Link href="/more" className="hover:text-white">
            More ▾
          </Link>
        </li>
      </ul>
    </nav>
  );
}
