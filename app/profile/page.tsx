// app/profile/page.tsx

'use client'
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";

export default function ProfilePage(req: Request) {
  // const headerList = headers();
  // const token = (await headerList).get('authorization')?.split(' ')[1] || null;
  // const customer = await getCustomerFromToken(token);
  // console.log(localStorage.getItem('token'));
  // if (!customer) redirect('/login');


  // const [profile] = await db`
  //   SELECT id, name, email, image_url FROM customers WHERE id = ${customer.id}
  // `;

  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    fetch('/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/login'
        }
        return res.json()
      })
      .then(data => setProfile(data))
  }, [])

  if (!profile) return <LoadingSpinner />

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow custom-bg-style">
      <h1 className="text-2xl font-semibold mb-6">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            className="w-full p-2 border rounded"
            defaultValue={profile.name}
            disabled
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            className="w-full p-2 border rounded"
            defaultValue={profile.email}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
