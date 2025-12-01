"use client";

import Image from 'next/image'
import SplitText from '@/components/SplitText'

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundImage: string;
  onButtonClick?: () => void;
  titleFont?: string;
  buttonFont?: string;
}

export default function HeroSection({
  title,
  subtitle,
  buttonText,
  backgroundImage,
  onButtonClick,
  titleFont = 'var(--font-playfair)',
  buttonFont = 'var(--font-inter)'
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={backgroundImage}
        alt="Hero Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-primary-foreground px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: titleFont }}>
          <SplitText
            text={title}
            className="text-5xl md:text-7xl font-bold"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            tag="span"
            onLetterAnimationComplete={() => undefined}
          />
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <button
          onClick={onButtonClick}
          className="bg-primary hover:bg-chart-2 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition duration-300"
          style={{ fontFamily: buttonFont }}
        >
          {buttonText}
        </button>
      </div>
    </section>
  )
}
