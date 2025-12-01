"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { playfairFont } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  images: string[];
  bottleSize?: string;
  weight?: string;
  ingredients: string[];
  scentProfile: string;
  uses: string;
  burnTime?: string;
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        router.push("/products");
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      router.push("/products");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const displayImages = product.images.length > 0 ? product.images : [product.imageSrc];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 px-4 md:px-8 bg-card border-b">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            ← Back to Products
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl mb-4">
                <Image
                  src={displayImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayImages.map((img, idx) => (
                    <Tooltip key={idx}>
                      <TooltipTrigger asChild>
                        <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? "border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>View image {idx + 1}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge variant="secondary">{product.category}</Badge>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                style={playfairFont}
              >
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>

              <Card className="mb-8">
                <CardContent>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Overview</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="details">
                      <AccordionTrigger>Details</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {product.bottleSize && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-foreground">Bottle Size:</span>
                              <span className="text-muted-foreground">{product.bottleSize}</span>
                            </div>
                          )}
                          {product.weight && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-foreground">Weight:</span>
                              <span className="text-muted-foreground">{product.weight}</span>
                            </div>
                          )}
                          {product.burnTime && (
                            <div className="flex justify-between">
                              <span className="font-semibold text-foreground">Burn Time:</span>
                              <span className="text-muted-foreground">{product.burnTime}</span>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scent">
                      <AccordionTrigger>Scent Profile</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{product.scentProfile}</p>
                      </AccordionContent>
                    </AccordionItem>

                    {product.ingredients.length > 0 && (
                      <AccordionItem value="ingredients">
                        <AccordionTrigger>Ingredients</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-muted-foreground">
                            {product.ingredients.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    <AccordionItem value="usage">
                      <AccordionTrigger>How to Use</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{product.uses}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Inquire Button */}
              <Button asChild className="w-full" style={playfairFont}>
                <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                  Inquire About This Product
                </Link>
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Fill out our contact form to place an order or ask questions about this product
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
