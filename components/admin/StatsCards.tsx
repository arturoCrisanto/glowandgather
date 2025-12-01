"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function StatsCards({
  totalMessages,
  pendingCount,
  deliveredCount,
  unreadCount,
}: {
  totalMessages: number;
  pendingCount: number;
  deliveredCount: number;
  unreadCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card><CardContent><p className="text-muted-foreground text-sm">Total</p><p className="text-3xl font-bold">{totalMessages}</p></CardContent></Card>
      <Card><CardContent><p className="text-muted-foreground text-sm">Pending</p><p className="text-3xl font-bold text-yellow-600">{pendingCount}</p></CardContent></Card>
      <Card><CardContent><p className="text-muted-foreground text-sm">Delivered</p><p className="text-3xl font-bold text-green-600">{deliveredCount}</p></CardContent></Card>
      <Card><CardContent><p className="text-muted-foreground text-sm">Unread</p><p className="text-3xl font-bold text-primary">{unreadCount}</p></CardContent></Card>
    </div>
  );
}
