"use client";

import Image from 'next/image'
import HeroSection from '@/components/HeroSection'
import FeatureCard from '@/components/FeatureCard'

const features = [
  {
    id: 1,
    imageSrc: "/images/candle1.jpg",
    alt: "Premium Candles",
    title: "Premium Quality",
    description: "Handcrafted with the finest soy wax and natural fragrances for a luxurious experience."
  },
  {
    id: 2,
    imageSrc: "/images/candle2.jpg",
    alt: "Eco-Friendly",
    title: "Eco-Friendly",
    description: "Made with sustainable materials and recyclable packaging for a better tomorrow."
  },
  {
    id: 3,
    imageSrc: "/images/candle3.jpg",
    alt: "Long Lasting",
    title: "Long Lasting",
    description: "Our candles burn longer with consistent fragrance that fills your space beautifully."
  }
];

function page() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Glow and Gather"
        subtitle="Experience the warmth and ambiance of handcrafted candles designed for your special moments"
        buttonText="Shop Now"
        backgroundImage="/images/hero-candle.jpg"
      />

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our <br /> <span className='text-6xl text-primary'>Collection</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
            Discover our range of handcrafted candles, each designed to bring warmth and elegance to your home.
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