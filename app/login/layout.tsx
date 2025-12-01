import { generateMetadata } from "@/lib/helpers";
import { inter, playfairDisplay } from "@/lib/fonts";

export const metadata = generateMetadata({
  title: "Admin Login - Glow and Gather",
  description: "Admin login for Glow and Gather",
  keywords: ["admin", "login"],
  path: "/login",
  type: "website",
  noIndex: true,
});

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
