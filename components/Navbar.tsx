"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient"; // Adjust if your path differs
import Link from "next/link";

export default function NavbarComponent() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to login/homepage
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-gray-800">All In One Editor</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/templates" className="text-gray-700 hover:text-blue-600">
          Templates
        </Link>
        <Link href="/create" className="text-blue-600 font-semibold hover:underline">
          + Create
        </Link>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}
