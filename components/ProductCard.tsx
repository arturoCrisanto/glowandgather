"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ProductCardProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  isBestSeller?: boolean;
};

function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  category, 
  imageSrc,
  isBestSeller
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="block group">
      <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {isBestSeller && <Badge>Best Seller</Badge>}
            <Badge variant="secondary">{category}</Badge>
          </div>
        </div>
        <div className="p-6">
          <h3 
            className="text-2xl font-bold text-card-foreground mb-2" 
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {name}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary font-semibold group-hover:underline cursor-pointer">View Details →</span>
              </TooltipTrigger>
              <TooltipContent>See product details</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
