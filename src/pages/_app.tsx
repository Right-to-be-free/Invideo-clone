// src/pages/_app.tsx

import type { AppProps } from "next/app";
import "@/styles/globals.css"; // or wherever your global styles are
import Navbar from "@/components/Navbar"; // adjust path if needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
