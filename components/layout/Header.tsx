"use client";

import Link from "next/link";
import UserAvatar from "./UserAvatar"; // client component
import CartButton from "./CartButton"; // client component
import AcmeLogo from "@/app/ui/acme-logo";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check token presence on component mount
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }); // Call logout API
    localStorage.removeItem('token')
    router.push('/login')
  };


  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600"><AcmeLogo /></Link>
      <nav className="flex items-center gap-6">
      {isLoggedIn ? (
          <button onClick={handleLogout} className="hover:text-red-600">Logout</button>
        ) : (
          <Link href="/login" className="hover:text-blue-600">Login</Link>
        )}

      {/* <Link href="/login" className="hover:text-blue-600">Login</Link> */}
        <CartButton />
        <UserAvatar />
      </nav>
    </header>
  );
}
