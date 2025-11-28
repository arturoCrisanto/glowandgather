type LogLevel = "[info]" | "[warn]" | "[error]" | "[debug]";

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `\n${JSON.stringify(context, null, 2)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.log(this.formatMessage("[info]", message, context));
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.warn(this.formatMessage("[warn]", message, context));
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    // Always log errors, even in production
    const errorContext =
      error instanceof Error
        ? { ...context, error: error.message, stack: error.stack }
        : { ...context, error };
    console.error(this.formatMessage("[error]", message, errorContext));
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment) {
      console.debug(this.formatMessage("[debug]", message, context));
    }
  }
}

export const logger = new Logger();
