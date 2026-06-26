import { QRGenerator } from "@/components/qr-generator";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-4">
          Create Custom QR Codes
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Generate beautiful, customizable QR codes for any type of data. Simply select a type or paste your content to get started.
        </p>
      </div>
      
      <QRGenerator />
    </div>
  );
}
