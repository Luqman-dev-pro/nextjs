"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AcmeLogo from "../ui/acme-logo";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      const data = await res.json();
      setError(data.message || "Registration failed");
    }
  };

  return (
     <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 custom-bg-style shadow">
                {/* <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                  <div className="w-32 text-white md:w-36">
                    <AcmeLogo />
                  </div>
                </div> */}
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded px-3 py-2"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Create Account
        </button>
      </form>
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
      </div>
    </main>
  );
}
