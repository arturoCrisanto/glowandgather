import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/lib/dal/services";
import { logger, errorHandler } from "@/lib/helpers";

// GET all products
export async function GET() {
  try {
    const products = await productService.getAllProducts();

    // Transform the data to match frontend expectations
    const transformedProducts = products.map((product) =>
      productService.transformForFrontend(product)
    );

    logger.info("Fetched products", { count: transformedProducts.length });
    return NextResponse.json(transformedProducts);
  } catch (error) {
    return errorHandler.handle(error, "GET /api/products");
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = await productService.createProduct(body);

    logger.info("Created product", { id: product.id, name: product.name });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return errorHandler.handle(error, "POST /api/products");
  }
}
