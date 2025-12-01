"use client";

import { useState, useEffect } from "react";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageSrc: string;
  isBestSeller: boolean;
  isActive: boolean;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  status?: "PENDING" | "DELIVERED";
  createdAt: string;
};

function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "messages">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Delivered">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Candles",
    imageSrc: "",
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch data
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
    } catch (error) {
      console.error("Failed to fetch products:", error);
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
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await fetch("/api/contact/logs");
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
        }),
      });

      if (response.ok) {
        setNewProduct({ name: "", description: "", price: "", category: "Candles", imageSrc: "" });
        setShowAddProduct(false);
        fetchProducts();
        toast.success("Product created successfully");
      } else {
        toast.error("Could not create product. Please try again.");
      }
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Could not add product. Please try again.");
    }
  };

  const toggleBestSeller = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBestSeller: !currentStatus }),
      });

      if (response.ok) {
        fetchProducts();
        toast.success("Best seller status updated");
      } else {
        toast.error("Could not update status. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("We couldn't update that. Please try again.");
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchProducts();
        toast.success("Visibility updated");
      } else {
        toast.error("Could not update visibility. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("We couldn't update that. Please try again.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts();
        toast.success("Product deleted");
        setPendingDeleteId(null);
        setDeleteDialogOpen(false);
      } else {
        toast.error("Could not delete product. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
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
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Request failed");
      }
      await fetchMessages();
      await fetchLogs();
      toast.success("Message status updated");
    } catch (e: any) {
      console.error("Failed to update message status", e);
      toast.error(`Failed to update status: ${e?.message ?? e}`);
    }
  };

  const parsedProductFromSubject = (subject?: string) => {
    if (!subject) return null;
    const prefix = "Product Inquiry:";
    if (subject.startsWith(prefix)) {
      return subject.replace(prefix, "").trim();
    }
    return null;
  };

  // Charts data: simple counts
  const totalMessages = messages.length;
  const pendingCount = messages.filter(m => (m.status ?? "PENDING") === "PENDING").length;
  const deliveredCount = messages.filter(m => m.status === "DELIVERED").length;
  const unreadCount = messages.filter(m => !m.isRead).length;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toISOString().slice(0, 10);
    const count = messages.filter(m => m.createdAt.slice(0,10) === dayStr).length;
    return { day: d.toLocaleDateString(undefined, { weekday: 'short' }), count };
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
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1
              className="text-3xl font-bold text-foreground"
              style={playfairFont}
            >
              Admin Dashboard
            </h1>
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

      {/* Tabs */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === "products"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === "messages"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact Messages
              {messages.filter((m) => !m.isRead).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {messages.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "products" ? (
          <div>
            {/* Add Product Button */}
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Manage Products</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => setShowAddProduct(!showAddProduct)}>
                      {showAddProduct ? "Cancel" : "+ Add Product"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{showAddProduct ? "Close form" : "Create a product"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
              <Card className="mb-8">
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pname">Product Name</Label>
                        <Input id="pname" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="pprice">Price</Label>
                        <Input id="pprice" type="number" step="0.01" placeholder="0.00" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="pcat">Category</Label>
                      <select id="pcat" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full border-input bg-background dark:bg-input/30 h-9 rounded-md border px-3 py-1 text-sm">
                        <option value="Candles">Candles</option>
                        <option value="Room Sprays">Room Sprays</option>
                        <option value="Wax Melts">Wax Melts</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="pimg">Image URL</Label>
                      <Input id="pimg" placeholder="https://..." value={newProduct.imageSrc} onChange={(e) => setNewProduct({ ...newProduct, imageSrc: e.target.value })} required />
                    </div>
                    <div>
                      <Label htmlFor="pdesc">Description</Label>
                      <Textarea id="pdesc" rows={3} placeholder="Short product description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
                    </div>
                    <Button type="submit" className="w-full">Add Product</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Products Table */}
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-center">Best Seller</TableHead>
                      <TableHead className="text-center">Active</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={product.isBestSeller ? "secondary" : "outline"}
                                  size="sm"
                                  onClick={() => toggleBestSeller(product.id, product.isBestSeller)}
                                >
                                  {product.isBestSeller ? "Yes" : "No"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Toggle best seller</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={product.isActive ? "secondary" : "outline"}
                                  size="sm"
                                  onClick={() => toggleActive(product.id, product.isActive)}
                                >
                                  {product.isActive ? "Active" : "Hidden"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Toggle visibility</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <Dialog open={deleteDialogOpen && pendingDeleteId === product.id} onOpenChange={(v) => { if (!v) { setDeleteDialogOpen(false); setPendingDeleteId(null); } }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => { setPendingDeleteId(product.id); setDeleteDialogOpen(true); }}
                              >
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete product</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete the product "{product.name}".
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => { setDeleteDialogOpen(false); setPendingDeleteId(null); }}>Cancel</Button>
                                <Button variant="destructive" onClick={() => pendingDeleteId && deleteProduct(pendingDeleteId)}>Delete</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>All products</TableCaption>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Messages</h2>

            {/* Stats & Chart */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card><CardContent>
                <p className="text-muted-foreground text-sm">Total</p>
                <p className="text-3xl font-bold">{totalMessages}</p>
              </CardContent></Card>
              <Card><CardContent>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </CardContent></Card>
              <Card><CardContent>
                <p className="text-muted-foreground text-sm">Delivered</p>
                <p className="text-3xl font-bold text-green-600">{deliveredCount}</p>
              </CardContent></Card>
              <Card><CardContent>
                <p className="text-muted-foreground text-sm">Unread</p>
                <p className="text-3xl font-bold text-primary">{unreadCount}</p>
              </CardContent></Card>
            </div>

            <div className="bg-card rounded-lg p-4 border mb-8">
              <p className="text-sm text-muted-foreground mb-3">Messages (last 7 days)</p>
              <ChartContainer
                config={{ count: { label: "Messages", color: "hsl(var(--primary))" } }}
                className="aspect-[3/1]"
              >
                <BarChart data={last7Days}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis hide tickLine={false} axisLine={false} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted))' }} />
                </BarChart>
              </ChartContainer>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <ButtonGroup>
                {(["All", "Pending", "Delivered"] as const).map((s) => (
                  <Tooltip key={s}>
                    <TooltipTrigger asChild>
                      <Button variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
                        {s}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Show {s.toLowerCase()}</TooltipContent>
                  </Tooltip>
                ))}
              </ButtonGroup>
            </div>

            {/* Messages List */}
            <div className="space-y-4 mb-8">
              {messages
                .filter((m) =>
                  statusFilter === "All"
                    ? true
                    : (m.status ?? "PENDING") === (statusFilter.toUpperCase() as any)
                )
                .map((message) => {
                  const product = parsedProductFromSubject(message.subject);
                  const status = message.status ?? "PENDING";
                  return (
                    <div
                      key={message.id}
                      className={`bg-card rounded-lg shadow p-6 border ${
                        status === "PENDING" ? "border-yellow-400" : "border-green-400"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{message.name}</h3>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={status === "PENDING" ? "secondary" : "default"}>{status}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {product && (
                        <p className="text-sm mb-2"><span className="font-semibold">Product:</span> {product}</p>
                      )}
                      <p className="font-semibold text-sm mb-2">{message.subject}</p>
                      <p className="text-muted-foreground whitespace-pre-line">{message.message}</p>

                      <div className="mt-4 flex gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant={status === "PENDING" ? "secondary" : "outline"} size="sm" onClick={() => setMessageStatus(message.id, "PENDING")}>
                              Mark Pending
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Mark this message as pending</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant={status === "DELIVERED" ? "secondary" : "outline"} size="sm" onClick={() => setMessageStatus(message.id, "DELIVERED")}>
                              Mark Delivered
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Mark this message as delivered</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Logs Table */}
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Message ID</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-sm">{new Date(log.createdAt).toLocaleString()}</TableCell>
                        <TableCell className="text-sm font-mono">{log.messageId}</TableCell>
                        <TableCell className="text-sm">{log.action}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{typeof log.details === 'object' ? JSON.stringify(log.details) : String(log.details ?? '')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>Recent activity</TableCaption>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;