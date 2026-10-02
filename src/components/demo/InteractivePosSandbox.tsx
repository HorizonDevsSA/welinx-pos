import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Database, 
  Plus, 
  Minus, 
  Trash2, 
  Printer, 
  CreditCard, 
  DollarSign, 
  Receipt, 
  Sparkles, 
  Users, 
  Clock, 
  Check, 
  ChefHat, 
  Layers, 
  ShieldCheck,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import confetti from 'canvas-confetti';

interface MenuItem {
  id: string;
  name: string;
  category: 'mains' | 'sides' | 'drinks' | 'desserts';
  price: number;
  emoji: string;
  modifiers?: string[];
}

interface CartLine {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedModifiers: string[];
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'm1', name: 'Double Smash Burger', category: 'mains', price: 14.50, emoji: '🍔', modifiers: ['Extra Cheese (+$1.50)', 'Bacon Jam (+$2.00)', 'Gluten-Free Bun (+$1.50)', 'No Onions'] },
  { id: 'm2', name: 'Nashville Hot Chicken', category: 'mains', price: 13.75, emoji: '🍗', modifiers: ['Mild Heat', 'X-Hot', 'Extra Pickles', 'Ranch Side (+$1.00)'] },
  { id: 'm3', name: 'Truffle Mushroom Melt', category: 'mains', price: 15.00, emoji: '🥪', modifiers: ['Aged Swiss', 'Add Caramelized Onions (+$1.00)'] },
  { id: 'm4', name: 'Seared Ribeye 12oz', category: 'mains', price: 34.00, emoji: '🥩', modifiers: ['Rare', 'Medium-Rare', 'Medium', 'Garlic Butter Crust (+$2.50)'] },

  { id: 's1', name: 'Truffle Parmesan Fries', category: 'sides', price: 6.50, emoji: '🍟', modifiers: ['Extra Truffle Aioli (+$1.00)', 'Spicy Seasoning'] },
  { id: 's2', name: 'Crispy Onion Rings', category: 'sides', price: 5.75, emoji: '🧅', modifiers: ['Smoked BBQ Dip', 'Chipotle Mayo'] },
  { id: 's3', name: 'Organic Caesar Salad', category: 'sides', price: 7.50, emoji: '🥗', modifiers: ['Add Anchovies', 'Extra Shaved Parm'] },

  { id: 'd1', name: 'Hazy Craft IPA Pint', category: 'drinks', price: 8.00, emoji: '🍺', modifiers: ['Chilled Glass', '16oz Draft'] },
  { id: 'd2', name: 'Smoked Bourbon Old Fashioned', category: 'drinks', price: 14.00, emoji: '🥃', modifiers: ['Large Cube Ice', 'Extra Bitters'] },
  { id: 'd3', name: 'Double Espresso / Americano', category: 'drinks', price: 4.25, emoji: '☕', modifiers: ['Oat Milk (+$0.75)', 'Vanilla Syrup (+$0.50)'] },
  { id: 'd4', name: 'Artisan Hibiscus Lemonade', category: 'drinks', price: 4.50, emoji: '🍹', modifiers: ['Less Sweet', 'Sparkling Water'] },

  { id: 'e1', name: 'Molten Chocolate Lava Cake', category: 'desserts', price: 9.00, emoji: '🍫', modifiers: ['Add Vanilla Bean Gelato (+$2.50)'] },
  { id: 'e2', name: 'Burnt Basque Cheesecake', category: 'desserts', price: 8.50, emoji: '🍰', modifiers: ['Berry Coulis', 'Fresh Mint'] },
];

export const InteractivePosSandbox: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'mains' | 'sides' | 'drinks' | 'desserts'>('mains');
  const [cart, setCart] = useState<CartLine[]>([
    { id: 'init-1', item: MENU_ITEMS[0], quantity: 1, selectedModifiers: ['Extra Cheese (+$1.50)'] },
    { id: 'init-2', item: MENU_ITEMS[4], quantity: 1, selectedModifiers: [] },
    { id: 'init-3', item: MENU_ITEMS[7], quantity: 1, selectedModifiers: [] },
  ]);
  
  const [selectedItemForMod, setSelectedItemForMod] = useState<MenuItem | null>(null);
  const [tempModifiers, setTempModifiers] = useState<string[]>([]);
  const [splitCount, setSplitCount] = useState<number>(1);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [lastLog, setLastLog] = useState<string>('Terminal initialized • Local SQLite active');
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [printedOrder, setPrintedOrder] = useState<{ id: number; items: CartLine[]; total: number; cashTotal: number } | null>(null);

  // Financial calculations
  const subtotal = cart.reduce((acc, line) => {
    let modExtra = 0;
    line.selectedModifiers.forEach((m) => {
      if (m.includes('+$1.50')) modExtra += 1.50;
      if (m.includes('+$2.00')) modExtra += 2.00;
      if (m.includes('+$2.50')) modExtra += 2.50;
      if (m.includes('+$1.00')) modExtra += 1.00;
      if (m.includes('+$0.75')) modExtra += 0.75;
      if (m.includes('+$0.50')) modExtra += 0.50;
    });
    return acc + (line.item.price + modExtra) * line.quantity;
  }, 0);

  const tax = subtotal * 0.0825;
  const cashTotal = subtotal + tax;
  const cardSurcharge = cashTotal * 0.035; // 3.5% non-cash adjustment
  const cardTotal = cashTotal + cardSurcharge;

  const handleAddToCart = (item: MenuItem) => {
    if (item.modifiers && item.modifiers.length > 0) {
      setSelectedItemForMod(item);
      setTempModifiers([]);
    } else {
      addItemToCart(item, []);
    }
  };

  const addItemToCart = (item: MenuItem, mods: string[]) => {
    const existingIndex = cart.findIndex(
      (c) => c.item.id === item.id && JSON.stringify(c.selectedModifiers) === JSON.stringify(mods)
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { id: `${item.id}-${Date.now()}`, item, quantity: 1, selectedModifiers: mods }]);
    }

    setLastLog(
      isOffline
        ? `⚡ [SQLite Local DB] Inserted ${item.name} in 0.00ms`
        : `🟢 [Postgres Sync] Ring ${item.name} synced to cloud in 12ms`
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((c) => {
          if (c.id === id) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartLine[]
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const handleCheckout = (tenderType: 'cash' | 'card') => {
    if (cart.length === 0) return;

    const orderNum = Math.floor(100 + Math.random() * 900);
    setPrintedOrder({
      id: orderNum,
      items: [...cart],
      total: tenderType === 'card' ? cardTotal : cashTotal,
      cashTotal: cashTotal,
    });
    setReceiptModalOpen(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {}

    setLastLog(
      isOffline
        ? `⚡ Order #${orderNum} recorded to local SQLite queue! (0.00ms offline)`
        : `✅ Order #${orderNum} authorized & kitchen tickets fired! (14ms sync)`
    );

    // Reset cart after checkout
    setCart([]);
  };

  return (
    <div className="rounded-3xl border border-white/[0.1] bg-slate-950/95 shadow-2xl backdrop-blur-2xl overflow-hidden">
      
      {/* Top POS Toolbar & Status Header */}
      <div className="bg-slate-900 border-b border-white/[0.08] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Terminal Info */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-sm">
                Welinx Station #01 — Downtown Bistro
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Table #12 (4 Guests)
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>{lastLog}</span>
            </div>
          </div>
        </div>

        {/* Interactive Offline Sim Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const newOffline = !isOffline;
              setIsOffline(newOffline);
              setLastLog(
                newOffline
                  ? '⚡ [WAN SIMULATION] Internet Cut! Switched to Local-First SQLite in 0.00s'
                  : '🟢 [WAN SIMULATION] Internet Restored! 3 delta records synchronized to Postgres'
              );
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
              isOffline
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
            }`}
            title="Click to simulate an internet outage"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-4 h-4 text-amber-400" />
                <span>OFFLINE MODE (SQLITE ACTIVE)</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>ONLINE (CLICK TO CUT WAN)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Register Body (Split: Catalog Left, Check/Cart Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
        
        {/* LEFT: Menu Grid & Categories (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between space-y-4">
          
          {/* Category Tabs */}
          <div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'mains', label: '🍔 Mains & Grill' },
                { id: 'sides', label: '🍟 Sides & Apps' },
                { id: 'drinks', label: '🍺 Drinks & Bar' },
                { id: 'desserts', label: '🍰 Sweets' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {MENU_ITEMS.filter((item) => item.category === selectedCategory).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddToCart(item)}
                  className="rounded-2xl bg-slate-900/90 border border-slate-800/80 p-3.5 text-left hover:border-emerald-500/50 hover:bg-slate-850 transition-all duration-200 group active:scale-[0.97] flex flex-col justify-between h-32 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.modifiers ? `${item.modifiers.length} options` : 'Standard'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts & KDS Status Bar */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ChefHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Kitchen Display: 3 active orders (Avg 5m 18s)</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Drop Guarantee</span>
            </div>
          </div>

        </div>

        {/* RIGHT: Check & Checkout Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/50 p-4 sm:p-6 flex flex-col justify-between space-y-4">
          
          {/* Cart Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span className="font-display font-bold text-white text-sm">
                Active Check #408
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSplitModal(true)}
                className="flex items-center gap-1 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
              >
                <Users className="w-3 h-3 text-cyan-400" />
                <span>Split ({splitCount})</span>
              </button>

              <button
                onClick={() => setCart([])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                title="Clear Ticket"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto max-h-56 space-y-2 pr-1">
            {cart.length === 0 ? (
              <div className="h-36 flex flex-col items-center justify-center text-center text-slate-400 text-xs space-y-2">
                <Receipt className="w-8 h-8 text-slate-400 stroke-1" />
                <span>Ticket is currently empty.<br />Tap menu items on the left to ring orders.</span>
              </div>
            ) : (
              cart.map((line) => (
                <div
                  key={line.id}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{line.item.name}</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        ${line.item.price.toFixed(2)}
                      </span>
                    </div>
                    {line.selectedModifiers.length > 0 && (
                      <div className="text-[11px] text-amber-300 font-mono mt-0.5 space-y-0.5">
                        {line.selectedModifiers.map((mod, mIdx) => (
                          <div key={mIdx}>• {mod}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-slate-950 rounded-lg p-1 border border-slate-800">
                    <button
                      onClick={() => updateQuantity(line.id, -1)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-mono font-bold text-white text-xs">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(line.id, 1)}
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing & Dual-Pricing Breakdown */}
          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Tax (8.25%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {/* Cash vs Card Dual-Pricing Display */}
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
              <div className="flex justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  Cash Price (Discounted)
                </span>
                <span className="text-sm">${cashTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cyan-300 font-bold">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  Card Price (+3.5% non-cash)
                </span>
                <span className="text-sm">${cardTotal.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                <span>Merchant Card Swipe Cost:</span>
                <span className="text-emerald-400 font-bold">$0.00 (Saved +${cardSurcharge.toFixed(2)})</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Pay Cash / Pay Card */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              onClick={() => handleCheckout('cash')}
              disabled={cart.length === 0}
              variant="default"
              className="w-full justify-center gap-1.5 py-3 text-xs"
            >
              <DollarSign className="w-4 h-4" />
              <span>Cash (${cashTotal.toFixed(2)})</span>
            </Button>

            <Button
              onClick={() => handleCheckout('card')}
              disabled={cart.length === 0}
              variant="cyanGlow"
              className="w-full justify-center gap-1.5 py-3 text-xs"
            >
              <CreditCard className="w-4 h-4" />
              <span>Card (${cardTotal.toFixed(2)})</span>
            </Button>
          </div>

        </div>

      </div>

      {/* Modifier Selection Modal */}
      {selectedItemForMod && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 font-display font-bold text-white text-base">
                <span>{selectedItemForMod.emoji}</span>
                <span>Customize {selectedItemForMod.name}</span>
              </div>
              <span className="font-mono text-emerald-400 text-sm font-bold">
                ${selectedItemForMod.price.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Select Modifiers & Add-ons
              </label>
              <div className="grid gap-2">
                {selectedItemForMod.modifiers?.map((mod, idx) => {
                  const isChecked = tempModifiers.includes(mod);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (isChecked) {
                          setTempModifiers(tempModifiers.filter((m) => m !== mod));
                        } else {
                          setTempModifiers([...tempModifiers, mod]);
                        }
                      }}
                      className={`p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                        isChecked
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{mod}</span>
                      {isChecked && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedItemForMod(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="emeraldGlow"
                onClick={() => {
                  addItemToCart(selectedItemForMod, tempModifiers);
                  setSelectedItemForMod(null);
                }}
                className="flex-1"
              >
                Add to Ticket
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Split Bill Modal */}
      {showSplitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 animate-in fade-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-white text-lg">Split Check by Seat</h3>
            <p className="text-xs text-slate-400">
              Divide total of ${cashTotal.toFixed(2)} evenly between guests.
            </p>

            <div className="flex items-center justify-center gap-3 py-2">
              {[1, 2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setSplitCount(count)}
                  className={`w-10 h-10 rounded-xl font-bold font-mono text-sm transition-all ${
                    splitCount === count
                      ? 'bg-cyan-500 text-slate-950 font-black scale-110 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
              Each Guest Pays: ${(cashTotal / splitCount).toFixed(2)} (Cash) / ${(cardTotal / splitCount).toFixed(2)} (Card)
            </div>

            <Button
              variant="cyanGlow"
              onClick={() => setShowSplitModal(false)}
              className="w-full"
            >
              Apply Split Check
            </Button>
          </div>
        </div>
      )}

      {/* Receipt Output Simulation Modal */}
      {receiptModalOpen && printedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white text-slate-950 p-6 font-mono text-xs shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="text-center pb-2 border-b border-dashed border-slate-400">
              <div className="font-black text-sm tracking-wider">WELINX DEMO BISTRO</div>
              <div className="text-[11px] text-slate-600">100 Offline Drive, Suite 100</div>
              <div className="text-[10px] text-slate-500 mt-1">
                {new Date().toLocaleString()} • Order #{printedOrder.id}
              </div>
              <div className="text-[10px] font-bold text-emerald-700 mt-0.5">
                {isOffline ? '⚡ PROCESSED IN OFFLINE LOCAL SQLITE' : '🟢 PROCESSED VIA CLOUD SYNC (12ms)'}
              </div>
            </div>

            {/* Receipt Items */}
            <div className="space-y-1.5 py-2 border-b border-dashed border-slate-400">
              {printedOrder.items.map((line, idx) => (
                <div key={idx}>
                  <div className="flex justify-between font-bold">
                    <span>{line.quantity}x {line.item.name}</span>
                    <span>${(line.item.price * line.quantity).toFixed(2)}</span>
                  </div>
                  {line.selectedModifiers.map((m, mIdx) => (
                    <div key={mIdx} className="text-[10px] text-slate-600 pl-2">• {m}</div>
                  ))}
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between font-black text-sm pt-1 border-t border-slate-300">
                <span>TOTAL PAID:</span>
                <span>${printedOrder.total.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-slate-500 text-center pt-2">
                Merchant Card Processing Surcharge Saved: 100%
              </div>
            </div>

            <Button
              variant="default"
              onClick={() => setReceiptModalOpen(false)}
              className="w-full bg-slate-950 text-white hover:bg-slate-800 mt-3"
            >
              Close Receipt Preview
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};
