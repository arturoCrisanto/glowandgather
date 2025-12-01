import { productRepository } from "../repositories/product.repository";
import { logger } from "@/lib/helpers";
import { ProductCategory } from "@prisma/client";

export class ProductService {
  async getAllProducts() {
    return await productRepository.findAll();
  }

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async getActiveProducts() {
    return await productRepository.findActive();
  }

  async getBestSellers() {
    return await productRepository.findBestSellers();
  }

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    imageSrc: string;
    bottleSize?: string;
    weight?: string;
    ingredients?: string[];
    scentProfile?: string;
    uses?: string;
    burnTime?: string;
  }) {
    // Map frontend category to enum
    const categoryMap: { [key: string]: ProductCategory } = {
      Candles: "CANDLES",
      "Room Sprays": "ROOM_SPRAYS",
      "Wax Melts": "WAX_MELTS",
    };

    const created = await productRepository.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: categoryMap[data.category] || "CANDLES",
      images: [data.imageSrc],
      bottleSize: data.bottleSize,
      weight: data.weight,
      ingredients: data.ingredients || [],
      scentProfile: data.scentProfile || "Natural fragrance",
      uses: data.uses || "Use as directed",
      burnTime: data.burnTime,
    });
    logger.info("Product created", { id: created.id, name: created.name });
    return created;
  }

  async updateProduct(id: string, data: any) {
    const updated = await productRepository.update(id, data);
    logger.info("Product updated", { id });
    return updated;
  }

  async deleteProduct(id: string) {
    const res = await productRepository.delete(id);
    logger.info("Product deleted", { id });
    return res;
  }

  async toggleBestSeller(id: string, currentStatus: boolean) {
    return await productRepository.update(id, {
      isBestSeller: !currentStatus,
    });
  }

  async toggleActive(id: string, currentStatus: boolean) {
    return await productRepository.update(id, {
      isActive: !currentStatus,
    });
  }

  // Transform for frontend
  transformForFrontend(product: any) {
    const displayCategoryMap: Record<string, string> = {
      CANDLES: "Candles",
      ROOM_SPRAYS: "Room Sprays",
      WAX_MELTS: "Wax Melts",
    };
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: displayCategoryMap[product.category] || product.category,
      imageSrc: product.images[0] || "/images/candle1.jpg",
      isBestSeller: product.isBestSeller,
      isActive: product.isActive,
      bottleSize: product.bottleSize,
      weight: product.weight,
      ingredients: product.ingredients,
      scentProfile: product.scentProfile,
      uses: product.uses,
      burnTime: product.burnTime,
      images: product.images,
    };
  }
}

export const productService = new ProductService();
