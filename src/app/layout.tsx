import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Forge",
  description: "Create and customize your QR codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="w-full py-6 text-center text-sm text-zinc-500 font-medium">
              QRForge · Free forever · No ads · No login
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
