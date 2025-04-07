import type { AppProps } from "next/app";
import "../../styles/globals.css"; // <-- import here
import Navbar from "../components/Navbar"; // update path if needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

