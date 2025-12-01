import { generateMetadata } from "@/lib/helpers";
import { inter, playfairDisplay } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

// generated metadata is from helper to have a single source of truth for metadata across the app
export const metadata = generateMetadata({
  title: "Glow and Gather - Handcrafted Premium Candles",
  description:
    "Discover Glow and Gather's handcrafted premium candles, made from natural ingredients to create a warm and inviting ambiance in your home.",
  keywords: [
    "candles",
    "handcrafted",
    "premium",
    "artisan",
    "scented candles",
    "soy candles",
    "beeswax candles",
    "candle gifts",
    "home decor",
    "aromatherapy",
  ],
  path: "/",
  image: "/images/og-image.jpg",
  type: "website",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // Don't show navbar/footer on admin and login pages
  const hideNavFooter = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} min-h-full`}>
      
      <body className={`${inter.className} antialiased`}>
        {!hideNavFooter && <Navbar />}
        {children}
        {!hideNavFooter && <Footer />}
        <Toaster position="top-right" richColors expand={false} />
      </body>
    </html>
  );
}
