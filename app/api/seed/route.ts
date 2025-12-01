import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const products = [
  // CANDLES
  {
    name: "Vanilla Bean Candle",
    category: "CANDLES",
    price: 450,
    description:
      "A clean-burning soy wax candle that brings out a classic vanilla aroma. Perfect for customers who love warm, inviting scents. The amber jar gives a minimalist aesthetic while protecting the fragrance from light.",
    bottleSize: null,
    weight: "150g (5.3oz)",
    ingredients: [
      "100% soy wax",
      "natural vanilla fragrance oil",
      "cotton wick",
    ],
    scentProfile: "Sweet, creamy vanilla with a warm finish",
    uses: "Perfect for living rooms, bedrooms, and creating cozy evening ambiance. Light the candle and let it burn for 2-3 hours at a time for optimal performance.",
    burnTime: "28–32 hours",
    images: ["/images/candle1.jpg", "/images/candle2.jpg"],
    inStock: true,
    isBestSeller: true,
    isActive: true,
  },
  {
    name: "Lavender Calm Candle",
    category: "CANDLES",
    price: 500,
    description:
      "A soothing lavender candle crafted for relaxation and stress relief. The consistent slow burn and gentle scent make it ideal for night routines or peaceful ambient lighting.",
    bottleSize: null,
    weight: "180g (6.3oz)",
    ingredients: ["Soy wax", "lavender essential oil", "cotton wick"],
    scentProfile: "Floral, calming, herbal",
    uses: "Best for bedtime, meditation spaces, and relaxation corners. Light 30 minutes before sleep for a calming atmosphere.",
    burnTime: "30–35 hours",
    images: ["/images/candle2.jpg", "/images/candle3.jpg"],
    inStock: true,
    isBestSeller: true,
    isActive: true,
  },

  // ROOM SPRAYS
  {
    name: "Citrus Fresh Spray",
    category: "ROOM_SPRAYS",
    price: 350,
    description:
      "A lively citrus mist that quickly eliminates odor and refreshes any space. Safe for everyday use and great for customers who prefer light and uplifting fragrances.",
    bottleSize: "100ml",
    weight: null,
    ingredients: [
      "Distilled water",
      "citrus essential oils (orange, lemon)",
      "eco-safe solubilizer",
    ],
    scentProfile: "Bright, refreshing, energizing",
    uses: "Ideal for kitchen, workspace, bathroom, and car. Spray 2-3 times in the air or on fabrics. Shake well before use.",
    burnTime: null,
    images: ["/images/candle3.jpg", "/images/hero-candle.jpg"],
    inStock: true,
    isBestSeller: true,
    isActive: true,
  },
  {
    name: "Woodland Mist Spray",
    category: "ROOM_SPRAYS",
    price: 400,
    description:
      "A calming forest-inspired room spray that adds a natural, earthy aroma. Ideal for minimalist homes with warm and neutral palettes.",
    bottleSize: "100ml",
    weight: null,
    ingredients: [
      "Distilled water",
      "cedarwood oil",
      "pine fragrance oil",
      "natural solubilizer",
    ],
    scentProfile: "Earthy, woody, grounding",
    uses: "Perfect for living rooms, office, and study areas. Spray into the air to create a grounding atmosphere. Avoid direct contact with furniture.",
    burnTime: null,
    images: ["/images/hero-candle.jpg", "/images/candle1.jpg"],
    inStock: true,
    isBestSeller: false,
    isActive: true,
  },

  // WAX MELTS
  {
    name: "Vanilla & Cinnamon Wax Melt",
    category: "WAX_MELTS",
    price: 300,
    description:
      "Perfect for customers who want a flameless option. Melts easily and fills the room with a delicious vanilla-cinnamon aroma that feels like the holidays all year.",
    bottleSize: null,
    weight: "60g",
    ingredients: ["Soy wax", "vanilla oil", "cinnamon essential oil"],
    scentProfile: "Cozy, warm, slightly spicy",
    uses: "Use with wax warmers. Break off 1-2 cubes and place in warmer. Each pack provides 3-4 uses. Remove wax when scent fades.",
    burnTime: null,
    images: ["/images/candle2.jpg", "/images/candle1.jpg"],
    inStock: true,
    isBestSeller: false,
    isActive: true,
  },
  {
    name: "Lavender & Chamomile Wax Melt",
    category: "WAX_MELTS",
    price: 300,
    description:
      "A calming blend that promotes relaxation and better sleep. Melts slowly and releases a soft fragrance perfect for quiet nights.",
    bottleSize: null,
    weight: "60g",
    ingredients: [
      "Soy wax",
      "lavender essential oil",
      "chamomile essential oil",
    ],
    scentProfile: "Herbal, soothing, gentle",
    uses: "Best for bedrooms. Use with wax warmers, 3-4 uses per pack. Place 1-2 cubes in warmer 30 minutes before bedtime for optimal relaxation.",
    burnTime: null,
    images: ["/images/candle3.jpg", "/images/candle2.jpg"],
    inStock: true,
    isBestSeller: false,
    isActive: true,
  },
];

export async function POST() {
  try {
    // Clear existing products
    await prisma.product.deleteMany({});

    // Insert new products
    const created = [];
    for (const product of products) {
      const newProduct = await prisma.product.create({
        data: product as any,
      });
      created.push(newProduct);
    }

    return NextResponse.json({
      message: "Database seeded successfully!",
      total: created.length,
      products: created.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
      })),
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
