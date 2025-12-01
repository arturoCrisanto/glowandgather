import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";

export class ProductRepository {
  async findAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async findActive() {
    return await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findBestSellers() {
    return await prisma.product.findMany({
      where: {
        isBestSeller: true,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  }

  async create(data: {
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    images: string[];
    bottleSize?: string;
    weight?: string;
    ingredients: string[];
    scentProfile: string;
    uses: string;
    burnTime?: string;
  }) {
    return await prisma.product.create({
      data: {
        ...data,
        inStock: true,
        isBestSeller: false,
        isActive: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      price: number;
      category: ProductCategory;
      images: string[];
      bottleSize: string;
      weight: string;
      ingredients: string[];
      scentProfile: string;
      uses: string;
      burnTime: string;
      isBestSeller: boolean;
      isActive: boolean;
      inStock: boolean;
    }>
  ) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}

export const productRepository = new ProductRepository();
