// src/components/Navbar.tsx

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">🎬 Invideo Clone</div>
      <div className="space-x-4 text-gray-800">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/create" className="hover:text-blue-600">Create</Link>
        <Link href="/login" className="hover:text-blue-600">Login</Link>
        <Link href="/signup" className="hover:text-blue-600">Signup</Link>
      </div>
    </nav>
  );
}
