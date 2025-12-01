"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import FeatureCard from '@/components/FeatureCard'
import { playfairFont } from '@/lib/utils';

const features = [
  {
    id: 1,
    imageSrc: "/images/candle1.jpg",
    alt: "Premium Candles",
    title: "Premium Quality",
    description: "Handcrafted with the finest soy wax and natural fragrances for a luxurious experience."
  },
  {
    id: 3,
    imageSrc: "/images/candle3.jpg",
    alt: "Long Lasting",
    title: "Long Lasting",
    description: "Our candles burn longer with consistent fragrance that fills your space beautifully."
  }
];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  isBestSeller: boolean;
  isActive: boolean;
};

function page() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products = await response.json();
        // Filter for best sellers and take only first 3
        const bestSellerProducts = products
          .filter((p: Product) => p.isBestSeller && p.isActive)
          .slice(0, 3);
        setBestSellers(bestSellerProducts);
      }
    } catch (error) {
      console.error('Failed to fetch best sellers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Glow and Gather"
        subtitle="Experience the warmth and ambiance of handcrafted candles designed for your special moments"
        buttonText="Shop Now"
        backgroundImage="/images/hero-candle.jpg"
      />

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="py-20 px-4 md:px-8 bg-linear-to-b from-primary/5 to-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground" style={playfairFont}>
              Best <span className='text-primary'>Sellers</span>
            </h2>
            <p className="text-lg md:text-xl text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
              Our most loved products, handpicked by our customers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                  imageSrc={product.imageSrc}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground" style={playfairFont}>
            Why Choose <br /> <span className='text-6xl text-primary'>Us</span>
          </h2>
          <p className="text-lg md:text-xl text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
            Discover what makes our products special
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                imageSrc={feature.imageSrc}
                alt={feature.alt}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page