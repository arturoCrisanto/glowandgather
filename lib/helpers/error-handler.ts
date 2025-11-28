import { logger } from "./logger";
import { NextResponse } from "next/server";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = {
  handle(error: unknown, context?: string) {
    if (error instanceof AppError) {
      logger.error(`${context || "Error"}: ${error.message}`, error, {
        statusCode: error.statusCode,
        isOperational: error.isOperational,
      });

      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    if (error instanceof Error) {
      logger.error(`${context || "Unexpected Error"}`, error);

      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }

    logger.error(`${context || "Unknown Error"}`, new Error(String(error)));

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  },

  throwNotFound(message = "Resource not found") {
    throw new AppError(404, message);
  },

  throwBadRequest(message = "Bad request") {
    throw new AppError(400, message);
  },

  throwUnauthorized(message = "Unauthorized") {
    throw new AppError(401, message);
  },

  throwForbidden(message = "Forbidden") {
    throw new AppError(403, message);
  },
};
