"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AcmeLogo from "@/app/ui/acme-logo";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load from cookie or API if required
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setAvatarUrl(data.image_url))
      .catch(() => {});
  }, []);

  const handleOpenCartPopup = async () => {
    // Dispatch event to open cart drawer
    window.dispatchEvent(new CustomEvent("open-cart"));
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        <AcmeLogo />
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/login" className="hover:text-blue-600">Login</Link>
        <div onClick={handleOpenCartPopup} className="hover:text-blue-600"><ShoppingBagIcon className="h-7 w-7 text-blue-500" title="Your Cart"/></div>

        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border">
            <img
              src={avatarUrl || "/customers/lee-robinson.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-10 w-48 bg-white border shadow rounded z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link href="/profile/change-password" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
