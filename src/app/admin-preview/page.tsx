"use client";

import React, { useState, useEffect } from "react";
import { Lock, Eye, Check, RefreshCw, Smartphone, QrCode, Sliders, TrendingUp, ShoppingBag } from "lucide-react";
import Particles from "@/components/Particles";

interface AdminItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

export default function AdminPreview() {
  const [items, setItems] = useState<AdminItem[]>([
    { id: 1, name: "Vanilla Dream", category: "Ice Cream", price: 1500, available: true },
    { id: 2, name: "Strawberry Delight", category: "Ice Cream", price: 1500, available: true },
    { id: 3, name: "Chocolate Bliss", category: "Ice Cream", price: 1500, available: true },
    { id: 4, name: "Noodles & Egg", category: "Meals", price: 3000, available: true },
    { id: 5, name: "Bubble Waffle", category: "Snacks", price: 3000, available: true },
    { id: 6, name: "Dubai Strawberry Cup", category: "Specials", price: 6500, available: false },
  ]);

  const [activeTab, setActiveTab] = useState<"menu" | "orders" | "qr">("menu");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [incomingOrders, setIncomingOrders] = useState<any[]>([]);

  // Toggle availability
  const toggleAvailable = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)));
    triggerToast("Item availability toggled (Preview Mode)");
  };

  // Adjust price
  const updatePrice = (id: number, newPrice: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, price: newPrice } : item)));
    triggerToast("Price adjusted (Preview Mode)");
  };

  const triggerToast = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 2500);
  };

  // Simulate incoming orders
  useEffect(() => {
    const defaultOrders = [
      { id: "ST-8890", name: "Femi Adesina", details: "Medium Vanilla Dream + Oreo", total: 4500, status: "pending", time: "Just now" },
      { id: "ST-8889", name: "Chioma Nwachukwu", details: "1 Bubble Waffle + Espresso", total: 6000, status: "preparing", time: "12 mins ago" },
      { id: "ST-8888", name: "Tunde Bakare", details: "Dubai Strawberry Cup (Small) + Noodles", total: 9500, status: "completed", time: "30 mins ago" },
    ];
    setIncomingOrders(defaultOrders);
  }, []);

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8 bg-zinc-50">
      {/* Background Particles */}
      <Particles />

      {/* Header Alert Ban */}
      <div className="max-w-6xl mx-auto mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between gap-4 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 shrink-0 font-bold">
            ⚠️
          </div>
          <div>
            <h4 className="font-fredoka text-sm font-bold text-chocolate uppercase tracking-wider">
              Owner Preview Mode — No Authentication Required
            </h4>
            <p className="font-poppins text-text-light text-[11px] md:text-xs">
              This area is a high-fidelity interactive simulation. Changes will not modify a database.
            </p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-chocolate text-white rounded-lg text-xs font-fredoka font-bold shadow-sm">
          <Lock size={12} />
          Sandbox Active
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Stats & Navigation Pane (Col 3) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="glossy-card p-6 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                📊
              </div>
              <h3 className="font-fredoka text-base font-bold text-chocolate">Shop Insights</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100/50">
                <div className="flex justify-between items-center text-xs text-text-light font-medium">
                  <span>Today's Mock Sales</span>
                  <TrendingUp size={14} className="text-emerald-500" />
                </div>
                <div className="text-xl font-bold font-fredoka text-pink-primary mt-1">₦34,500</div>
              </div>

              <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100/50">
                <div className="flex justify-between items-center text-xs text-text-light font-medium">
                  <span>Mock Orders Today</span>
                  <ShoppingBag size={14} className="text-pink-primary" />
                </div>
                <div className="text-xl font-bold font-fredoka text-pink-primary mt-1">8 Orders</div>
              </div>
            </div>

            <div className="h-px bg-pink-50 my-6" />

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("menu")}
                className={`w-full py-2.5 px-4 rounded-xl text-left font-poppins text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === "menu" ? "bg-pink-primary text-white" : "hover:bg-pink-50 text-text-light"
                }`}
              >
                <Sliders size={14} />
                Control Inventory
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full py-2.5 px-4 rounded-xl text-left font-poppins text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === "orders" ? "bg-pink-primary text-white" : "hover:bg-pink-50 text-text-light"
                }`}
              >
                <Smartphone size={14} />
                WhatsApp Order Feed
              </button>

              <button
                onClick={() => setActiveTab("qr")}
                className={`w-full py-2.5 px-4 rounded-xl text-left font-poppins text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === "qr" ? "bg-pink-primary text-white" : "hover:bg-pink-50 text-text-light"
                }`}
              >
                <QrCode size={14} />
                Generate Flyer QR
              </button>
            </div>
          </div>
        </div>

        {/* Right Tab Content Area (Col 9) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Menu Tab */}
          {activeTab === "menu" && (
            <div className="glossy-card p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-fredoka text-xl font-bold text-chocolate">Menu Sandbox Management</h3>
                  <p className="font-poppins text-xs text-text-light mt-0.5">Toggle stock status or adjust simulated flyer prices.</p>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-poppins text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-pink-50 text-text-light uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 font-bold">Item Name</th>
                      <th className="py-3 px-4 font-bold">Category</th>
                      <th className="py-3 px-4 font-bold">Price (₦)</th>
                      <th className="py-3 px-4 font-bold text-center">In Stock?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-pink-50/50 hover:bg-pink-50/10">
                        <td className="py-3.5 px-4 font-bold text-chocolate">{item.name}</td>
                        <td className="py-3.5 px-4 text-text-light">{item.category}</td>
                        <td className="py-3.5 px-4">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => updatePrice(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 px-2 py-1 bg-pink-50/50 border border-pink-100 rounded focus:outline-none focus:ring-1 focus:ring-pink-primary font-bold text-pink-dark"
                          />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => toggleAvailable(item.id)}
                            className={`w-14 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                              item.available
                                ? "bg-emerald-500 text-white"
                                : "bg-zinc-200 text-zinc-600"
                            }`}
                          >
                            {item.available ? "YES" : "NO"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Incoming Orders Tab */}
          {activeTab === "orders" && (
            <div className="glossy-card p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-fredoka text-xl font-bold text-chocolate">Simulated WhatsApp Incoming Stream</h3>
                  <p className="font-poppins text-xs text-text-light mt-0.5">Simulate what orders will look like when client sends WhatsApp message templates.</p>
                </div>
                <button
                  onClick={() => triggerToast("Order stream refreshed (Simulation)")}
                  className="p-2 hover:bg-pink-50 rounded-full text-pink-primary transition-colors"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Order Stream cards */}
              <div className="space-y-4">
                {incomingOrders.map((ord) => (
                  <div key={ord.id} className="p-4 bg-zinc-50 border border-pink-50 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-fredoka font-bold text-chocolate text-sm">{ord.name}</span>
                        <span className="text-[9px] font-mono text-zinc-400 bg-white border px-1 rounded">{ord.id}</span>
                      </div>
                      <span className="font-poppins text-xs text-text-light mt-1">Items: {ord.details}</span>
                      <span className="text-[10px] text-text-light/50 font-bold mt-1 uppercase tracking-wider">{ord.time}</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-text-light/50 font-bold uppercase">Estimated</span>
                        <span className="font-fredoka font-bold text-pink-primary text-sm">₦{ord.total.toLocaleString()}</span>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                        ord.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                        ord.status === "preparing" ? "bg-amber-100 text-amber-700" : "bg-pink-100 text-pink-700"
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code generator Tab */}
          {activeTab === "qr" && (
            <div className="glossy-card p-6 bg-white flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col items-center justify-center p-4 bg-pink-50/50 border border-pink-100 rounded-3xl shrink-0">
                <QrCode size={120} className="text-chocolate" />
                <span className="text-[10px] font-bold text-pink-primary uppercase tracking-widest mt-3">Scan Menu</span>
              </div>
              <div>
                <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2">QR Code Flyer Placement</h3>
                <p className="font-poppins text-xs text-text-light leading-relaxed mb-6">
                  Place this generated code on table stickers or Instagram stories. Scanning instantly redirects FUTA students directly to the home screen or builder layout.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => triggerToast("Flyer PDF download triggered (Preview)")}
                    className="px-5 py-2.5 bg-chocolate hover:bg-pink-dark text-white font-fredoka text-xs font-bold rounded-full transition-all shadow-sm"
                  >
                    Download Flyer Sticker
                  </button>
                  <button
                    onClick={() => triggerToast("QR code copied to clipboard (Preview)")}
                    className="px-5 py-2.5 bg-white border border-pink-100 text-pink-primary font-fredoka text-xs font-bold rounded-full transition-all hover:bg-pink-50"
                  >
                    Copy QR Code Link
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Floating Save Toast Notification */}
      {saveStatus && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-chocolate text-white rounded-xl shadow-lg border border-white/10 text-xs font-poppins font-semibold flex items-center gap-2 animate-bounce-slow">
          <Check size={14} className="text-emerald-500 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}
    </div>
  );
}
