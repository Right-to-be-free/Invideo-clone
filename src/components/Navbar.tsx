import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-gray-800">Invideo Clone</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link href="/templates" className="text-gray-700 hover:text-blue-600">Templates</Link>
        <Link href="/create" className="text-blue-600 font-semibold hover:underline">+ Create</Link>
      </div>
    </nav>
  );
}
