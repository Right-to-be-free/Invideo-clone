import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">Invideo Clone</Link>
      <nav className="space-x-6 text-sm text-gray-600">
        <Link href="/templates">Templates</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/login" className="font-medium text-blue-600">Login</Link>
      </nav>
    </header>
  );
}
