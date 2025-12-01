"use client";

import { useMemo, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell, Label } from "recharts";
import type { ContactMessage, Product } from "@/lib/types";

type TimeRange = "7d" | "1m" | "1y";

export default function ChartsPanel({ messages, products }: { messages: ContactMessage[]; products: Product[] }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");

  const findCategoryBySubject = (subject?: string): "Candles" | "Room Sprays" | "Wax Melts" | null => {
    if (!subject) return null;
    const prefix = "Product Inquiry:";
    const name = subject.startsWith(prefix) ? subject.replace(prefix, "").trim() : subject.trim();
    const match = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (!match) return null;
    return (match.category as any) ?? null;
  };

  const areaData = useMemo(() => {
    const now = new Date();
    const result: Array<{ label: string; delivered: number; date: string }> = [];
    const addDay = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    const start = new Date(now);
    if (timeRange === "7d") {
      start.setDate(now.getDate() - 6);
      for (let i = 0; i < 7; i++) {
        const day = addDay(start, i);
        const key = day.toISOString().slice(0, 10);
        const delivered = messages.filter((m) => (m.status ?? "PENDING") === "DELIVERED" && m.createdAt.slice(0, 10) === key).length;
        result.push({
          label: day.toLocaleDateString(undefined, { weekday: "short" }),
          delivered,
          date: key,
        });
      }
    } else if (timeRange === "1m") {
      start.setDate(now.getDate() - 29);
      for (let i = 0; i < 30; i++) {
        const day = addDay(start, i);
        const key = day.toISOString().slice(0, 10);
        const delivered = messages.filter((m) => (m.status ?? "PENDING") === "DELIVERED" && m.createdAt.slice(0, 10) === key).length;
        result.push({
          label: day.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          delivered,
          date: key,
        });
      }
    } else {
      // 1y - aggregate by month
      const months: Record<string, number> = {};
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
        months[key] = 0;
      }
      messages.forEach((m) => {
        const d = new Date(m.createdAt);
        const monthsDiff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
        if (monthsDiff >= 0 && monthsDiff < 12 && (m.status ?? "PENDING") === "DELIVERED") {
          const key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
          months[key] = (months[key] ?? 0) + 1;
        }
      });
      Object.entries(months).forEach(([key, delivered]) => {
        const [y, m] = key.split("-").map((v) => parseInt(v, 10));
        const d = new Date(y, m - 1, 1);
        result.push({ label: d.toLocaleDateString(undefined, { month: "short" }), delivered, date: key });
      });
    }
    return result;
  }, [messages, timeRange]);

  const donutData = useMemo(() => {
    const cats: Array<"Candles" | "Room Sprays" | "Wax Melts"> = ["Candles", "Room Sprays", "Wax Melts"];
    const now = new Date();
    let startDate = new Date(now);
    if (timeRange === "7d") startDate.setDate(now.getDate() - 6);
    else if (timeRange === "1m") startDate.setDate(now.getDate() - 29);
    else startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    const inRange = (d: Date) => d >= startDate && d <= now;
    const counts: Record<string, number> = { Candles: 0, "Room Sprays": 0, "Wax Melts": 0 };
    for (const m of messages) {
      if ((m.status ?? "PENDING") !== "DELIVERED") continue;
      const d = new Date(m.createdAt);
      if (!inRange(d)) continue;
      const cat = findCategoryBySubject(m.subject);
      if (cat) counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return cats.map((c) => ({ label: c, value: counts[c] ?? 0 }));
  }, [messages, products, timeRange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Radar - lines only */}
      <div className="bg-card rounded-lg p-4 border md:col-span-1">
        <div className="flex items-center gap-2 pb-2">
          <p className="text-sm text-muted-foreground mr-auto">Category Radar</p>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as TimeRange)} className="h-8 rounded-md border bg-background px-2 text-sm" aria-label="Select time range">
            <option value="7d">7 days</option>
            <option value="1m">1 month</option>
            <option value="1y">1 year</option>
          </select>
        </div>
        <ChartContainer
          config={{
            candles: { label: "Candles", color: "var(--color-chart-1)" },
            roomSprays: { label: "Room Sprays", color: "var(--color-chart-2)" },
            waxMelts: { label: "Wax Melts", color: "var(--color-chart-3)" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie data={donutData} dataKey="value" nameKey="label" innerRadius={60} outerRadius={100} strokeWidth={2}>
              {donutData.map((entry) => {
                const color =
                  entry.label === "Candles"
                    ? "var(--color-candles)"
                    : entry.label === "Room Sprays"
                    ? "var(--color-roomSprays)"
                    : "var(--color-waxMelts)";
                return <Cell key={entry.label} fill={color} />;
              })}
              <Label
                position="center"
                content={({ viewBox }) => {
                  const vb: any = viewBox || {};
                  const cx = typeof vb.cx === "number" ? vb.cx : (typeof vb.x === "number" && typeof vb.width === "number" ? vb.x + vb.width / 2 : 0);
                  const cy = typeof vb.cy === "number" ? vb.cy : (typeof vb.y === "number" && typeof vb.height === "number" ? vb.y + vb.height / 2 : 0);
                  if (!cx && !cy) return null;
                  const total = donutData.reduce((sum, d) => sum + d.value, 0);
                  return (
                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan className="fill-foreground text-xl font-bold" x={cx} dy="-0.2em">{total}</tspan>
                      <tspan className="fill-muted-foreground text-xs" x={cx} dy="1.4em">Delivered</tspan>
                    </text>
                  );
                }}
              />
            </Pie>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Area - delivered with time range */}
      <div className="bg-card rounded-lg p-4 border md:col-span-2">
        <div className="flex items-center gap-2 pb-2">
          <p className="text-sm text-muted-foreground mr-auto">Delivered over Time</p>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value as TimeRange)} className="h-8 rounded-md border bg-background px-2 text-sm" aria-label="Select time range">
            <option value="7d">Last 7 days</option>
            <option value="1m">Last 1 month</option>
            <option value="1y">Last 1 year</option>
          </select>
        </div>
        <ChartContainer config={{ delivered: { label: "Delivered", color: "var(--color-chart-1)" } }} className="aspect-auto h-[25vh] w-full">
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="fillDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-delivered)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-delivered)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis hide tickLine={false} axisLine={false} />
            <Area dataKey="delivered" type="monotone" stroke="var(--color-delivered)" fill="url(#fillDelivered)" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(v) => String(v)} indicator="dot" />}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
