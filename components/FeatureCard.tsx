"use client";

import Image from "next/image";
import React from "react";

type FeatureCardProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
};

function FeatureCard({ imageSrc, alt, title, description }: FeatureCardProps) {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-card-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
