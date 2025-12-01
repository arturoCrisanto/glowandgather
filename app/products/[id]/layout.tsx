import { generateMetadata as buildMeta } from "@/lib/helpers";
import { productService } from "@/lib/dal/services/product.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await productService.getProductById(id);
    return buildMeta({
      title: `${product.name} - Glow and Gather`,
      description: product.description ?? "Explore this product from Glow and Gather.",
      path: `/products/${id}`,
      image: product.images?.[0] || "/images/candle1.jpg",
      type: "product",
      keywords: [
        product.category,
        "candles",
        "room sprays",
        "wax melts",
        "handcrafted",
      ],
    });
  } catch {
    return buildMeta({
      title: `Product Details - Glow and Gather`,
      description: "Discover premium handcrafted products by Glow and Gather.",
      path: `/products/${id}`,
      image: "/images/candle1.jpg",
      type: "product",
      keywords: ["product", "handcrafted", "glow and gather"],
    });
  }
}

export default function ProductDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
