import { generateMetadata as buildMeta } from "@/lib/helpers";

export const metadata = buildMeta({
  title: "Contact Us - Glow and Gather",
  description: "Have questions or inquiries? Contact Glow and Gather and we’ll get back to you soon.",
  path: "/contact",
  keywords: ["contact", "support", "inquiry", "glow and gather"],
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
