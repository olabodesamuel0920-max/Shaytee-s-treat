import type { Metadata } from "next";
import { Poppins, Pacifico, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shaytee's Treat — Digital Dessert World",
  description: "Explore Akure's finest sweet treats! Custom build your perfect ice cream cup, waffles, pancakes, and coffee, and order via WhatsApp.",
  keywords: ["shaytee", "treat", "ice cream", "waffles", "pancakes", "popcorn", "akure", "futa", "southgate"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${pacifico.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-text-dark font-sans">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow pt-20 overflow-hidden relative">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
