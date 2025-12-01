import { generateMetadata as buildMeta } from "@/lib/helpers";

export const metadata = buildMeta({
  title: "Products - Glow and Gather",
  description: "Explore our handcrafted collection of candles, room sprays, and wax melts designed to bring warmth and elegance to your home.",
  path: "/products",
  keywords: [
    "candles",
    "room sprays",
    "wax melts",
    "handcrafted",
    "artisan",
    "home fragrance",
  ],
});

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
