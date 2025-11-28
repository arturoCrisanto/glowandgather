import { NextResponse } from "next/server";

interface SuccessResponseOptions {
  message?: string;
  data?: any;
  status?: number;
}

interface ErrorResponseOptions {
  message: string;
  errors?: any;
  status?: number;
}

export const responseHelper = {
  success({ message = "Success", data, status = 200 }: SuccessResponseOptions) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status }
    );
  },

  created({ message = "Created successfully", data }: SuccessResponseOptions) {
    return NextResponse.json(
      {
        success: true,
        message,
        data,
      },
      { status: 201 }
    );
  },

  error({ message, errors, status = 500 }: ErrorResponseOptions) {
    return NextResponse.json(
      {
        success: false,
        message,
        ...(errors && { errors }),
      },
      { status }
    );
  },

  noContent() {
    return new NextResponse(null, { status: 204 });
  },

  unauthorized(message = "Unauthorized") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 401 }
    );
  },

  forbidden(message = "Forbidden") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 403 }
    );
  },

  notFound(message = "Resource not found") {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 404 }
    );
  },

  badRequest(message = "Bad request", errors?: any) {
    return NextResponse.json(
      {
        success: false,
        message,
        ...(errors && { errors }),
      },
      { status: 400 }
    );
  },
};
