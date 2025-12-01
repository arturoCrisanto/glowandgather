import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Reusable font style for Playfair Display
export const playfairFont = { fontFamily: "var(--font-playfair)" };
