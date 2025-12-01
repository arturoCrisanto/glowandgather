import { NextRequest, NextResponse } from "next/server";
import { contactService } from "@/lib/dal/services";
import { logger, errorHandler } from "@/lib/helpers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, isRead } = body as {
      status?: "PENDING" | "DELIVERED";
      isRead?: boolean;
    };

    if (status) {
      await contactService.updateStatus(id, status);
      logger.info("Updated contact status", { id, status });
    }
    if (typeof isRead === "boolean" && isRead) {
      await contactService.markAsRead(id);
    }

    const updated = await contactService.getMessageById(id);
    return NextResponse.json(updated);
  } catch (error) {
    return errorHandler.handle(error, "PATCH /api/contact/[id]");
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const message = await contactService.getMessageById(id);
    return NextResponse.json(message);
  } catch (error) {
    return errorHandler.handle(error, "GET /api/contact/[id]");
  }
}
