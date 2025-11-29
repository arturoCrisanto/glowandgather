import { generateMetadata } from "@/lib/helpers";
import { inter, playfairDisplay } from "@/lib/fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} min-h-full`}>
      <Navbar />
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
