"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { playfairFont } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import StatsCards from "@/components/admin/StatsCards";
import ChartsPanel from "@/components/admin/ChartsPanel";
import MessagesList from "@/components/admin/MessagesList";
import LogsPanel from "@/components/admin/LogsPanel";
import ProductsSection from "@/components/admin/ProductsSection";
import type { Product, ContactMessage, ContactLog } from "@/lib/types";

// Types now imported from lib/types

function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "messages">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<ContactLog[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Delivered">("All");
  const [logFilter, setLogFilter] = useState<"All" | "CREATED" | "STATUS_CHANGED">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Candles",
    imageSrc: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchProducts();
    fetchMessages();
    fetchLogs();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (e) {
      console.error("Failed to fetch products", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/contact/logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (e) {
      console.error("Failed to fetch logs", e);
    }
  };

  const handleAddProduct = async (payload: { name: string; description: string; price: number; category: string; imageSrc: string }) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        fetchProducts();
        toast.success("Product created successfully");
      } else {
        toast.error("Could not create product. Please try again.");
      }
    } catch (e) {
      console.error("Failed to add product", e);
      toast.error("Could not add product. Please try again.");
    }
  };

  const toggleBestSeller = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBestSeller: !current }),
      });
      if (res.ok) {
        fetchProducts();
        toast.success("Best seller status updated");
      } else {
        toast.error("Could not update status. Please try again.");
      }
    } catch (e) {
      console.error("Failed to update product", e);
      toast.error("We couldn't update that. Please try again.");
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        fetchProducts();
        toast.success("Visibility updated");
      } else {
        toast.error("Could not update visibility. Please try again.");
      }
    } catch (e) {
      console.error("Failed to update product", e);
      toast.error("We couldn't update that. Please try again.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
        toast.success("Product deleted");
        setPendingDeleteId(null);
        setDeleteDialogOpen(false);
      } else {
        toast.error("Could not delete product. Please try again.");
      }
    } catch (e) {
      console.error("Failed to delete product", e);
      toast.error("Delete failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  const setMessageStatus = async (id: string, status: "PENDING" | "DELIVERED") => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Request failed");
      await fetchMessages();
      await fetchLogs();
      toast.success("Status updated");
    } catch (e) {
      console.error("Failed to update message status", e);
      toast.error("We couldn't update the status. Please try again.");
    }
  };

  const parsedProductFromSubject = (subject?: string) => {
    if (!subject) return null;
    const prefix = "Product Inquiry:";
    return subject.startsWith(prefix) ? subject.replace(prefix, "").trim() : null;
  };

  const totalMessages = messages.length;
  const pendingCount = messages.filter((m) => (m.status ?? "PENDING") === "PENDING").length;
  const deliveredCount = messages.filter((m) => m.status === "DELIVERED").length;
  const unreadCount = messages.filter((m) => !m.isRead).length;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toISOString().slice(0, 10);
    const count = messages.filter((m) => m.createdAt.slice(0, 10) === dayStr).length;
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), count };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground" style={playfairFont}>Admin Dashboard</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                </TooltipTrigger>
                <TooltipContent>Sign out</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button onClick={() => setActiveTab("products")} className={`py-4 px-2 border-b-2 font-semibold transition-colors ${activeTab === "products" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>Products</button>
            <button onClick={() => setActiveTab("messages")} className={`py-4 px-2 border-b-2 font-semibold transition-colors ${activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              Contact Messages
              {messages.filter((m) => !m.isRead).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{messages.filter((m) => !m.isRead).length}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "products" ? (
          <div>
            <ProductsSection
              products={products}
              onAddProduct={handleAddProduct}
              onToggleBestSeller={toggleBestSeller}
              onToggleActive={toggleActive}
              onDeleteProduct={deleteProduct}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Messages</h2>

            <StatsCards totalMessages={totalMessages} pendingCount={pendingCount} deliveredCount={deliveredCount} unreadCount={unreadCount} />
            <ChartsPanel messages={messages} products={products} />

            {/* Two-column: Orders left (narrower), Logs right (wider) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <ButtonGroup>
                    {(["All", "Pending", "Delivered"] as const).map((s) => (
                      <Tooltip key={s}><TooltipTrigger asChild><Button size="sm" variant={statusFilter === s ? "default" : "outline"} onClick={() => setStatusFilter(s)}>{s}</Button></TooltipTrigger><TooltipContent>Show {s.toLowerCase()}</TooltipContent></Tooltip>
                    ))}
                  </ButtonGroup>
                </div>
                <MessagesList messages={messages} statusFilter={statusFilter} onSetStatus={setMessageStatus} />
              </div>
              <div className="md:col-span-3">
                <LogsPanel logs={logs} logFilter={logFilter} setLogFilter={setLogFilter as any} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
