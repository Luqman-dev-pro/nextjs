// app/profile/page.tsx
import { getCustomerFromSession } from "@/app/lib/customer-session";
import db from "@/app/lib/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const customer = await getCustomerFromSession();
  if (!customer) redirect("/login");

  const [profile] = await db`
    SELECT id, name, email, image_url FROM customers WHERE id = ${customer.id}
  `;

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
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
