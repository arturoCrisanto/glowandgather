import { NextRequest, NextResponse } from "next/server";
import { contactService } from "@/lib/dal/services";
import { logger, errorHandler } from "@/lib/helpers";

// GET all contact messages
export async function GET() {
  try {
    const messages = await contactService.getAllMessages();
    logger.info("Fetched contact messages", { count: messages.length });
    return NextResponse.json(messages);
  } catch (error) {
    return errorHandler.handle(error, "GET /api/contact");
  }
}

// POST create new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return errorHandler.handle(
        new Error("Name, email, and message are required"),
        "POST /api/contact validation"
      );
    }

    const contactMessage = await contactService.createMessage({
      name,
      email,
      subject: subject || "No subject",
      message,
    });

    logger.info("Created contact message", { id: contactMessage.id });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        id: contactMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler.handle(error, "POST /api/contact");
  }
}
