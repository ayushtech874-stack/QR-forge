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
          <div className="flex min-h-screen flex-col relative overflow-hidden">
            {/* Subtle solid color effect on the sides */}
            <div className="fixed top-1/4 -left-[20vw] w-[40vw] h-[50vh] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="fixed top-1/4 -right-[20vw] w-[40vw] h-[50vh] bg-violet-500/10 dark:bg-violet-500/15 blur-[120px] rounded-full pointer-events-none z-0" />
            
            <div className="relative z-10 w-full flex-none">
              <Navbar />
            </div>
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <footer className="w-full py-6 text-center text-sm text-zinc-500 font-medium relative z-10">
              QRForge · Free forever · No ads · No login
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
