import { generateMetadata } from "@/lib/helpers";
import { inter, playfairDisplay } from "@/lib/fonts";

export const metadata = generateMetadata({
  title: "Admin Dashboard - Glow and Gather",
  description: "Admin dashboard for managing Glow and Gather products and messages",
  noIndex: true,
  keywords: ["admin", "dashboard", "management"],
  path: "/admin",
  type: "website",
});

export default function AdminLayout({
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
