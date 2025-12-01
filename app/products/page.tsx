"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { playfairFont } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

const categories = ["All", "Candles", "Room Sprays", "Wax Melts"];

function page() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        // Filter only active products
        const activeProducts = data.filter((p: Product) => p.isActive);
        setProducts(activeProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 md:px-8 bg-linear-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            style={playfairFont}
          >
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our handcrafted collection of candles, room sprays, and wax melts,
            each designed to bring warmth and elegance to your home.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-4 md:px-8 sticky top-20 bg-background/95 backdrop-blur-sm z-40 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <ButtonGroup>
              {categories.map((category) => (
                <Tooltip key={category}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "default" : "outline"}
                      style={playfairFont}
                    >
                      {category}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Select {category}</TooltipContent>
                </Tooltip>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground text-lg">
              Showing <span className="font-bold text-foreground">{filteredProducts.length}</span>{" "}
              {selectedCategory === "All" ? "products" : selectedCategory.toLowerCase()}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                  imageSrc={product.imageSrc}
                  isBestSeller={product.isBestSeller}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default page;