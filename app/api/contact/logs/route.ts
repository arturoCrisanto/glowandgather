import { NextResponse } from "next/server";
import { contactService } from "@/lib/dal/services";
import { errorHandler } from "@/lib/helpers";

export async function GET() {
  try {
    const logs = await contactService.getLogs();
    return NextResponse.json(logs);
  } catch (error) {
    return errorHandler.handle(error, "GET /api/contact/logs");
  }
}
