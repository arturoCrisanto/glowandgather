import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/lib/dal/services";
import { logger, errorHandler } from "@/lib/helpers";

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.getProductById(id);
    const transformed = productService.transformForFrontend(product);

    return NextResponse.json(transformed);
  } catch (error) {
    return errorHandler.handle(error, "GET /api/products/[id]");
  }
}

// PATCH update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const product = await productService.updateProduct(id, body);
    logger.info("Updated product", { id });
    return NextResponse.json(product);
  } catch (error) {
    return errorHandler.handle(error, "PATCH /api/products/[id]");
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await productService.deleteProduct(id);
    logger.info("Deleted product", { id });
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return errorHandler.handle(error, "DELETE /api/products/[id]");
  }
}
