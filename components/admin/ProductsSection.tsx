"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Product } from "@/lib/types";

export default function ProductsSection({
  products,
  onAddProduct,
  onToggleBestSeller,
  onToggleActive,
  onDeleteProduct,
}: {
  products: Product[];
  onAddProduct: (payload: { name: string; description: string; price: number; category: string; imageSrc: string }) => Promise<void> | void;
  onToggleBestSeller: (id: string, current: boolean) => void;
  onToggleActive: (id: string, current: boolean) => void;
  onDeleteProduct: (id: string) => void;
}) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "Candles", imageSrc: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddProduct({ ...form, price: parseFloat(form.price) });
    setForm({ name: "", description: "", price: "", category: "Candles", imageSrc: "" });
    setShowAddProduct(false);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Manage Products</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setShowAddProduct(!showAddProduct)}>
              {showAddProduct ? "Cancel" : "+ Add Product"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{showAddProduct ? "Close form" : "Create a product"}</TooltipContent>
        </Tooltip>
      </div>

      {showAddProduct && (
        <Card className="mb-8"><CardContent>
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="pname">Product Name</Label><Input id="pname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product Name" required /></div>
              <div><Label htmlFor="pprice">Price</Label><Input id="pprice" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" required /></div>
            </div>
            <div>
              <Label htmlFor="pcat">Category</Label>
              <select id="pcat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border-input bg-background dark:bg-input/30 h-9 rounded-md border px-3 py-1 text-sm">
                <option value="Candles">Candles</option>
                <option value="Room Sprays">Room Sprays</option>
                <option value="Wax Melts">Wax Melts</option>
              </select>
            </div>
            <div><Label htmlFor="pimg">Image URL</Label><Input id="pimg" value={form.imageSrc} onChange={(e) => setForm({ ...form, imageSrc: e.target.value })} placeholder="https://..." required /></div>
            <div><Label htmlFor="pdesc">Description</Label><Textarea id="pdesc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short product description" required /></div>
            <Button type="submit" className="w-full">Add Product</Button>
          </form>
        </CardContent></Card>
      )}

      <Card><CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Price</TableHead><TableHead className="text-center">Best Seller</TableHead><TableHead className="text-center">Active</TableHead><TableHead className="text-center">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>${p.price.toFixed(2)}</TableCell>
                <TableCell className="text-center"><Button size="sm" variant={p.isBestSeller ? "secondary" : "outline"} onClick={() => onToggleBestSeller(p.id, p.isBestSeller)}>{p.isBestSeller ? "Yes" : "No"}</Button></TableCell>
                <TableCell className="text-center"><Button size="sm" variant={p.isActive ? "secondary" : "outline"} onClick={() => onToggleActive(p.id, p.isActive)}>{p.isActive ? "Active" : "Hidden"}</Button></TableCell>
                <TableCell className="text-center">
                  <Dialog open={deleteDialogOpen && pendingDeleteId === p.id} onOpenChange={(v) => { if (!v) { setDeleteDialogOpen(false); setPendingDeleteId(null); } }}>
                    <DialogTrigger asChild><Button size="sm" variant="destructive" onClick={() => { setPendingDeleteId(p.id); setDeleteDialogOpen(true); }}>Delete</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Delete product</DialogTitle><DialogDescription>This will permanently delete "{p.name}".</DialogDescription></DialogHeader>
                      <DialogFooter><Button variant="outline" onClick={() => { setDeleteDialogOpen(false); setPendingDeleteId(null); }}>Cancel</Button><Button variant="destructive" onClick={() => pendingDeleteId && onDeleteProduct(pendingDeleteId)}>Delete</Button></DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>All products</TableCaption>
        </Table>
      </CardContent></Card>
    </div>
  );
}
