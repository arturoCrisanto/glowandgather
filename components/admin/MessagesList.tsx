"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ContactMessage } from "@/lib/types";

export default function MessagesList({
  messages,
  statusFilter,
  onSetStatus,
}: {
  messages: ContactMessage[];
  statusFilter: "All" | "Pending" | "Delivered";
  onSetStatus: (id: string, status: "PENDING" | "DELIVERED") => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const filtered = messages.filter((m) =>
    statusFilter === "All" ? true : (m.status ?? "PENDING") === (statusFilter.toUpperCase() as any)
  );
  const visible = showAll ? filtered : filtered.slice(0, 10);

  const parsedProductFromSubject = (subject?: string) => {
    if (!subject) return null;
    const prefix = "Product Inquiry:";
    return subject.startsWith(prefix) ? subject.replace(prefix, "").trim() : null;
  };

  if (filtered.length === 0) {
    return (
      <div className="bg-card rounded-lg shadow p-6 border">
        <p className="text-sm text-muted-foreground">No messages to show.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visible.map((message) => {
        const product = parsedProductFromSubject(message.subject);
        const status = message.status ?? "PENDING";
        return (
          <div key={message.id} className={`bg-card rounded-lg shadow p-6 border ${status === "PENDING" ? "border-yellow-400" : "border-green-400"}`}>
            <div className="flex justify-between items-start mb-3">
              <div><h3 className="font-bold text-lg">{message.name}</h3><p className="text-sm text-muted-foreground">{message.email}</p></div>
              <div className="flex items-center gap-2"><Badge variant={status === "PENDING" ? "secondary" : "default"}>{status}</Badge><span className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleDateString()}</span></div>
            </div>
            {product && (<p className="text-sm mb-2"><span className="font-semibold">Product:</span> {product}</p>)}
            <p className="font-semibold text-sm mb-2">{message.subject}</p>
            <p className="text-muted-foreground whitespace-pre-line">{message.message}</p>
            <div className="mt-4 flex gap-2">
              <Tooltip><TooltipTrigger asChild><Button size="sm" variant={status === "PENDING" ? "secondary" : "outline"} onClick={() => onSetStatus(message.id, "PENDING")}>Mark Pending</Button></TooltipTrigger><TooltipContent>Mark this message as pending</TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><Button size="sm" variant={status === "DELIVERED" ? "secondary" : "outline"} onClick={() => onSetStatus(message.id, "DELIVERED")}>Mark Delivered</Button></TooltipTrigger><TooltipContent>Mark this message as delivered</TooltipContent></Tooltip>
            </div>
          </div>
        );
      })}
      {filtered.length > 10 && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" size="sm" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show less" : `Show all (${filtered.length})`}
          </Button>
        </div>
      )}
    </div>
  );
}
