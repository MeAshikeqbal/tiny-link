"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";

type Props = {
  targetUrl: string;
  code: string;
};

export default function TargetCardClient({ targetUrl, code }: Props) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // fallback: select and prompt (rare in modern browsers)
      console.error("Copy failed", err);
    }
  }

  return (
    <div className="lg:col-span-2 group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Target URL</span>
          <ExternalLink className="w-5 h-5 text-primary" />
        </div>
        <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border/50 break-all">
          <a
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-primary/80 font-mono text-sm transition-colors"
          >
            {targetUrl}
          </a>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={onCopy} className="gap-2">
            <Copy className="w-4 h-4" />
            {copied ? "Copied" : "Copy URL"}
          </Button>
          <Button asChild size="sm" className="gap-2">
            <a href={targetUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Visit Site
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
