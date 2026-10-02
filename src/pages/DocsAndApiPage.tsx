import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  Code2, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles,
  Server,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const DocsAndApiPage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copySnippet = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleWebhook = `// Example Welinx Realtime Transaction Webhook Payload
{
  "event": "pos.order.completed",
  "timestamp": "2026-10-02T16:30:00Z",
  "tenant_id": "tenant_metro_hospitality_901",
  "store_id": "store_austin_downtown",
  "terminal_id": "pos_reg_01",
  "offline_sync_mode": "sqlite_wal_synced",
  "data": {
    "order_id": "ord_89210",
    "order_number": 408,
    "total_cents": 2875,
    "payment_method": "dual_pricing_cash_discount",
    "merchant_fee_cents": 0,
    "items": [
      { "sku": "BG-SMASH-01", "name": "Double Smash Burger", "qty": 1, "price_cents": 1450 },
      { "sku": "SD-TRUFF-02", "name": "Truffle Parm Fries", "qty": 1, "price_cents": 650 }
    ]
  }
}`;

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="purple">Developer Hub & Open SDKs</Badge>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
            Developer Documentation & API
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Build custom ERP integrations, automate supplier inventory purchase orders, and connect proprietary hardware via ESC/POS & GraphQL APIs.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">GraphQL & REST APIs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Programmatically query branch sales, menu catalogs, staff timeclock entries, and recipe inventory levels with sub-second response times.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] space-y-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">Realtime Webhooks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive instant cryptographically signed webhooks for order creation, kitchen ticket bumps, low stock thresholds, and shift closes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/[0.08] space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-display text-white">ESC/POS & Hardware SDK</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native protocol drivers for thermal printers, 2D scanners, electronic scales, and customer pole displays over USB, Serial RS232, and TCP/IP.
            </p>
          </div>
        </div>

        {/* Code Snippet Preview */}
        <div className="rounded-3xl border border-white/[0.08] bg-slate-950 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Webhook Payload: pos.order.completed</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copySnippet(sampleWebhook, 1)}
              className="gap-1.5 text-xs h-8 px-3 border-slate-700 text-slate-300"
            >
              {copiedIndex === 1 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </Button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900/90 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {sampleWebhook}
          </pre>
        </div>

      </div>
    </div>
  );
};
