'use client'

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCount(items.length);
  }, []);

  const handleOpenCartPopup = async () => {
    // Dispatch event to open cart drawer
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <div onClick={handleOpenCartPopup} className="relative hover:text-blue-600 cursor-pointer">
      <ShoppingBagIcon className="h-6 w-6 text-blue-500" title="Your Cart"/>
      {count > 0 && (
        <span className="ml-1 bg-blue-600 text-white rounded-full text-xs px-2 py-0.5">
          {count}
        </span>
      )}
    </div>
  );
}
