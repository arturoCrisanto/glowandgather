import { Metadata } from "next";

export interface MetadataParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  price?: number;
  currency?: string;
  availability?: "instock" | "outofstock";
}

export function generateMetadata(params: MetadataParams): Metadata {
  const {
    title,
    description,
    path = "/",
    image = "/og-image.jpg",
    type = "website",
    keywords = ["candles", "handcrafted", "premium", "artisan"],
    price,
    currency = "PHP",
    availability,
  } = params;

  const url = `https://glowandgather.com${path}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `https://glowandgather.com${image}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://glowandgather.com"),
    alternates: {
      canonical: url,
    },

    // Open Graph - Works for Facebook, LinkedIn, Discord, etc.
    openGraph: {
      title,
      description,
      url,
      siteName: "Glow and Gather",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: type === "product" ? "website" : type, // Changed: use 'website' for products
    },

    // Twitter/X
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@glowandgather",
      site: "@glowandgather",
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
