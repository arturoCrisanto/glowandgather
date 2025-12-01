"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ContactLog } from "@/lib/types";

export default function LogsPanel({
  logs,
  logFilter,
  setLogFilter,
}: {
  logs: ContactLog[];
  logFilter: "All" | "CREATED" | "STATUS_CHANGED";
  setLogFilter: (f: "All" | "CREATED" | "STATUS_CHANGED") => void;
}) {
  const [showAllCreated, setShowAllCreated] = useState(false);
  const [showAllStatus, setShowAllStatus] = useState(false);
  const created = logs.filter((l) => l.action === "CREATED");
  const createdVisible = showAllCreated ? created : created.slice(0, 10);
  const statusChanged = logs.filter((l) => l.action === "STATUS_CHANGED");
  const statusVisible = showAllStatus ? statusChanged : statusChanged.slice(0, 10);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Activity Logs</h3>
        <ButtonGroup>
          {["All", "CREATED", "STATUS_CHANGED"].map((f) => (
            <Button key={f} size="sm" variant={logFilter === f ? "default" : "outline"} onClick={() => setLogFilter(f as any)}>
              {f === "STATUS_CHANGED" ? "Status" : f}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {(logFilter === "All" || logFilter === "CREATED") && (
        <Card className="mb-4"><CardContent>
          <p className="text-sm text-muted-foreground mb-2">Created</p>
          <Table>
            <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Message ID</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
            <TableBody>
              {created.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-sm text-muted-foreground">No created logs.</TableCell></TableRow>
              ) : (
                createdVisible.map((log) => (
                  <TableRow key={log.id}><TableCell className="text-sm">{new Date(log.createdAt).toLocaleString()}</TableCell><TableCell className="text-sm font-mono">{log.messageId}</TableCell><TableCell className="text-sm text-muted-foreground">{typeof log.details === 'object' ? JSON.stringify(log.details) : String(log.details ?? '')}</TableCell></TableRow>
                ))
              )}
            </TableBody>
            <TableCaption>New contact requests</TableCaption>
          </Table>
          {created.length > 10 && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowAllCreated((v) => !v)}>
                {showAllCreated ? "Show less" : `Show all (${created.length})`}
              </Button>
            </div>
          )}
        </CardContent></Card>
      )}
      {(logFilter === "All" || logFilter === "STATUS_CHANGED") && (
        <Card><CardContent>
          <p className="text-sm text-muted-foreground mb-2">Status Changes</p>
          <Table>
            <TableHeader><TableRow><TableHead>Time</TableHead><TableHead>Message ID</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {statusChanged.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-sm text-muted-foreground">No status change logs.</TableCell></TableRow>
              ) : (
                statusVisible.map((log) => (
                  <TableRow key={log.id}><TableCell className="text-sm">{new Date(log.createdAt).toLocaleString()}</TableCell><TableCell className="text-sm font-mono">{log.messageId}</TableCell><TableCell className="text-sm">{typeof log.details === 'object' && (log.details as any)?.status ? String((log.details as any).status) : '-'}</TableCell></TableRow>
                ))
              )}
            </TableBody>
            <TableCaption>Updates to message status</TableCaption>
          </Table>
          {statusChanged.length > 10 && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowAllStatus((v) => !v)}>
                {showAllStatus ? "Show less" : `Show all (${statusChanged.length})`}
              </Button>
            </div>
          )}
        </CardContent></Card>
      )}
    </div>
  );
}
