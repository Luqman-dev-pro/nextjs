'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UserAvatar() {
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.image_url) setAvatar(data.image_url);
      });
  }, []);

  if (!avatar) return null;

  return (
    <div className="relative group">
      <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full border object-cover" />
      <div className="absolute right-0 top-10 w-48 bg-white shadow rounded hidden group-hover:block min-w-[140px] text-sm z-20">
        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
        <Link href="/profile/change-password" className="block px-4 py-2 hover:bg-gray-100">Change Password</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
