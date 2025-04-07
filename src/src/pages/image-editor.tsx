import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import component to disable SSR
const ImageEditorClient = dynamic(() => import("../components/ImageEditorClient"), {
  ssr: false,
});

export default function ImageEditorPage() {
  return (
    <>
      <Head>
        <title>Image Editor – All In One Editor</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Image Editor</h1>
        <ImageEditorClient />
      </main>
    </>
  );
}
