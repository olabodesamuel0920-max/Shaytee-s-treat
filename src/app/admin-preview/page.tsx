"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Lock, 
  TrendingUp, 
  ShoppingBag, 
  Sliders, 
  Smartphone, 
  QrCode, 
  Check, 
  X, 
  Bell, 
  Volume2, 
  VolumeX, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  Download,
  AlertCircle
} from "lucide-react";
import Particles from "@/components/Particles";
import { menuData } from "@/lib/menu-data";

interface AdminItem {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
}

interface Order {
  id: string;
  name: string;
  items: string;
  total: number;
  status: "pending" | "preparing" | "completed" | "cancelled";
  time: string;
  isNew?: boolean;
}

export default function AdminPreview() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Check localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("shaytee_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<"overview" | "menu" | "orders" | "qr">("overview");
  
  // Audio chime state
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Custom toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Menu items list state
  const [menuItems, setMenuItems] = useState<AdminItem[]>([
    { id: 1, name: "Vanilla Dream", category: "Gelato / Ice Cream", price: 1500, available: true },
    { id: 2, name: "Strawberry Delight", category: "Gelato / Ice Cream", price: 1500, available: true },
    { id: 3, name: "Dubai Strawberry Cup", category: "Specials", price: 6500, available: true },
    { id: 8, name: "Boba Ice Cream", category: "Specials", price: 8000, available: true },
    { id: 4, name: "Noodles & Egg", category: "Hot Meals", price: 3500, available: true },
    { id: 5, name: "Bubble Waffle", category: "Snacks & Waffles", price: 3000, available: true },
    { id: 6, name: "Milky Popcorn", category: "Snacks & Waffles", price: 1500, available: true },
    { id: 7, name: "Cappuccino", category: "Coffee & Drinks", price: 2500, available: true },
  ]);

  // Order lists state
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ST-4421",
      name: "Tobi Adebayo",
      items: "Chocolate Bliss (Medium), Toppings: Oreo Crumbles, Drizzle: Chocolate Drizzle, Extra: Bubble Waffle",
      total: 7500,
      status: "preparing",
      time: "5 mins ago",
    },
    {
      id: "ST-4420",
      name: "Kemi Balogun",
      items: "Strawberry Delight (Large), Toppings: M&Ms, Wafers, Drizzle: Strawberry Drizzle",
      total: 6500,
      status: "completed",
      time: "20 mins ago",
    },
    {
      id: "ST-4419",
      name: "Chinedu Okafor",
      items: "Noodles & Chicken, Extra: Espresso",
      total: 7700,
      status: "completed",
      time: "45 mins ago",
    },
  ]);

  // Toast helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Synthesize dynamic chime sound with Web Audio API
  const playPingChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const playFreq = (freq: number, startOffset: number, length: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime + startOffset);
        gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + startOffset + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startOffset + length);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(ctx.currentTime + startOffset);
        osc.stop(ctx.currentTime + startOffset + length);
      };

      playFreq(523.25, 0, 0.3); // C5 note
      playFreq(783.99, 0.08, 0.4); // G5 note
    } catch (e) {
      console.warn("Audio Context playback blocked by browser security.", e);
    }
  };

  // Simulated Order Ticker generator pool
  const customerNames = ["Somto", "Tunde", "Bukola", "Yusuf", "Aisha", "Emeka", "Deji", "Ifeoma", "Zainab", "Dapo"];
  const randomFlavors = ["Vanilla Dream", "Strawberry Delight", "Banana Caramel", "Chocolate Bliss"];
  const randomSizes = ["Medium Cup", "Large Cup", "Small Cup"];
  const toppingsOptions = ["Oreo Crumbles", "Sprinkles", "Chocolate Chips", "Gummy Bears", "Peanuts", "M&Ms", "Wafers"];
  const drizzleOptions = ["Chocolate Drizzle", "Strawberry Drizzle", "Honey Drizzle"];
  const extraOptions = ["Mini Pancakes (Box of 6)", "Bubble Waffle", "Milky Popcorn (Medium)", "Cappuccino", "Noodles & Egg"];

  const triggerNewSimulatedOrder = () => {
    const name = customerNames[Math.floor(Math.random() * customerNames.length)];
    const flav = randomFlavors[Math.floor(Math.random() * randomFlavors.length)];
    const sizeSelect = randomSizes[Math.floor(Math.random() * randomSizes.length)];
    
    // Choose 1-2 toppings
    const toppingCount = Math.floor(Math.random() * 3);
    const chosenToppings: string[] = [];
    for (let i = 0; i < toppingCount; i++) {
      const top = toppingsOptions[Math.floor(Math.random() * toppingsOptions.length)];
      if (!chosenToppings.includes(top)) chosenToppings.push(top);
    }
    
    const drizzleSelect = drizzleOptions[Math.floor(Math.random() * drizzleOptions.length)];
    
    // Extra chance
    const hasExtra = Math.random() > 0.4;
    const extraSelect = hasExtra ? extraOptions[Math.floor(Math.random() * extraOptions.length)] : null;

    // Calculate simulated price
    let sum = 1500; // Base scoop
    if (sizeSelect.includes("Medium")) sum += 1500;
    if (sizeSelect.includes("Large")) sum += 3500;
    chosenToppings.forEach(t => {
      sum += t === "M&Ms" ? 1000 : 500;
    });
    if (extraSelect) {
      if (extraSelect.includes("Box of 6")) sum += 2000;
      else if (extraSelect.includes("Bubble")) sum += 3000;
      else if (extraSelect.includes("Popcorn")) sum += 1500;
      else if (extraSelect.includes("Cappuccino")) sum += 2500;
      else if (extraSelect.includes("Noodles")) sum += 3500;
    }

    const orderId = `ST-${Math.floor(5000 + Math.random() * 4999)}`;
    const itemsDescription = `${flav} (${sizeSelect.split(" ")[0]}), Toppings: ${
      chosenToppings.join(", ") || "None"
    }, Drizzle: ${drizzleSelect}${extraSelect ? `, Extra: ${extraSelect}` : ""}`;

    const newOrder: Order = {
      id: orderId,
      name,
      items: itemsDescription,
      total: sum,
      status: "pending",
      time: "Just now",
      isNew: true,
    };

    setOrders((prev) => [newOrder, ...prev.map(o => ({ ...o, isNew: false }))]);
    playPingChime();
    showToast(`🔔 New order received from ${name}!`);
  };

  // Set up ticker timer interval (12 seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      triggerNewSimulatedOrder();
    }, 12000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [soundEnabled]);

  // Accept / Progress / Complete order handlers
  const handleAcceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "preparing", time: "Just now" } : o))
    );
    showToast(`Order ${id} accepted. Preparing...`);
  };

  const handleCompleteOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "completed", time: "Just now" } : o))
    );
    showToast(`Order ${id} marked completed!`);
  };

  const handleCancelOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "cancelled", time: "Just now" } : o))
    );
    showToast(`Order ${id} cancelled.`);
  };

  // Menu updates
  const handleToggleStock = (id: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    );
    const item = menuItems.find((i) => i.id === id);
    if (item) {
      showToast(`${item.name} is now ${item.available ? "Out of Stock" : "In Stock"}`);
    }
  };

  const handlePriceChange = (id: number, priceValue: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: priceValue } : item))
    );
  };

  // Handle Passcode Submission
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === "SHAYTEE-ADMIN") {
      setIsAuthenticated(true);
      localStorage.setItem("shaytee_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect passcode. Access denied.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 md:px-8 bg-zinc-950 text-zinc-100 antialiased overflow-hidden">
        <Particles />
        <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl shadow-2xl relative z-10 backdrop-blur-md">
          <div className="text-center mb-8">
            <span className="w-14 h-14 rounded-full bg-pink-primary/10 text-pink-light border border-pink-500/20 flex items-center justify-center mx-auto text-2xl animate-pulse-slow">
              🔒
            </span>
            <h2 className="font-fredoka text-2xl font-bold text-pink-light mt-4">Admin Dashboard Gate</h2>
            <p className="font-poppins text-zinc-400 text-xs mt-2">
              Please enter the passcode to access the Shaytee's Treat Owner Console.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label htmlFor="passcode-input" className="sr-only">Passcode</label>
              <input
                id="passcode-input"
                type="password"
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-primary text-sm font-poppins text-zinc-100 placeholder-zinc-600 text-center uppercase tracking-widest"
                required
              />
            </div>

            {authError && (
              <p className="text-red-400 text-[11px] font-semibold text-center font-poppins bg-red-500/10 border border-red-500/20 py-2 rounded-lg">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka font-bold rounded-xl shadow-md hover:scale-102 hover:shadow-pink-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm"
            >
              Verify & Enter Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Mock metrics dynamically
  const activeOrdersCount = orders.filter((o) => o.status === "pending" || o.status === "preparing").length;
  const completedOrdersCount = orders.filter((o) => o.status === "completed").length;
  const mockRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="relative min-h-screen py-8 px-4 md:px-8 bg-zinc-950 text-zinc-100 antialiased overflow-hidden">
      {/* Background Particles */}
      <Particles />

      {/* Main Workspace Frame */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sandbox alert banner */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-pink-500/20 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/30 text-pink-light">
              <Lock size={18} className="animate-pulse" />
            </div>
            <div>
              <h2 className="font-fredoka text-sm font-bold text-pink-light tracking-wide uppercase">
                Simulation Mode
              </h2>
              <p className="font-poppins text-zinc-200 text-xs mt-0.5 font-semibold">
                Simulation Mode — this owner dashboard is a preview and is not connected to live orders yet.
              </p>
              <p className="font-poppins text-zinc-400 text-[11px] mt-0.5">
                Interact with the control switches, simulated prices, and real-time client-side ticker below.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Audio Toggle Switch */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                showToast(`Chime notifications ${!soundEnabled ? "Enabled" : "Muted"}`);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700/80 text-xs font-semibold font-poppins transition-colors cursor-pointer"
            >
              {soundEnabled ? <Volume2 size={14} className="text-pink-primary" /> : <VolumeX size={14} className="text-zinc-500" />}
              <span>{soundEnabled ? "Chime On" : "Chime Muted"}</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                localStorage.removeItem("shaytee_admin_auth");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold font-poppins border border-red-500/20 transition-colors cursor-pointer"
            >
              🔒 Logout
            </button>

            <span className="px-3.5 py-1.5 bg-pink-primary/20 border border-pink-500/40 text-pink-light rounded-lg text-xs font-fredoka font-bold">
              Demo Active
            </span>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl animate-bounce-slow">👑</span>
                <h3 className="font-fredoka text-lg font-bold bg-gradient-to-r from-pink-light via-pink-primary to-caramel bg-clip-text text-transparent">
                  Treat Control
                </h3>
              </div>

              {/* Navigation Menu Links */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full py-3 px-4 rounded-xl text-left font-poppins text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "overview"
                      ? "bg-gradient-to-r from-pink-primary to-pink-light text-white shadow-md scale-102"
                      : "hover:bg-zinc-800/60 text-zinc-400"
                  }`}
                >
                  <TrendingUp size={16} />
                  Overview & Analytics
                </button>

                <button
                  onClick={() => setActiveTab("menu")}
                  className={`w-full py-3 px-4 rounded-xl text-left font-poppins text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "menu"
                      ? "bg-gradient-to-r from-pink-primary to-pink-light text-white shadow-md scale-102"
                      : "hover:bg-zinc-800/60 text-zinc-400"
                  }`}
                >
                  <Sliders size={16} />
                  Menu Manager
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full py-3 px-4 rounded-xl text-left font-poppins text-xs font-bold flex items-center gap-3 transition-all relative ${
                    activeTab === "orders"
                      ? "bg-gradient-to-r from-pink-primary to-pink-light text-white shadow-md scale-102"
                      : "hover:bg-zinc-800/60 text-zinc-400"
                  }`}
                >
                  <Smartphone size={16} />
                  <span>Incoming Orders</span>
                  {activeOrdersCount > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-pink-primary text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                      {activeOrdersCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("qr")}
                  className={`w-full py-3 px-4 rounded-xl text-left font-poppins text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "qr"
                      ? "bg-gradient-to-r from-pink-primary to-pink-light text-white shadow-md scale-102"
                      : "hover:bg-zinc-800/60 text-zinc-400"
                  }`}
                >
                  <QrCode size={16} />
                  Flyer QR Setup
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Tab Panel Display (Col 9) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* TAB 1: OVERVIEW & ANALYTICS */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                
                {/* Metrics Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Revenue Card */}
                  <div className="p-5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      <span>Simulated Revenue</span>
                      <DollarSign size={16} className="text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold font-fredoka text-zinc-100 mt-2">
                      ₦{mockRevenue.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1">Based on completed sales</span>
                  </div>

                  {/* Active Orders Card */}
                  <div className="p-5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      <span>Simulated Active Orders</span>
                      <Clock size={16} className="text-pink-light" />
                    </div>
                    <div className="text-2xl font-bold font-fredoka text-zinc-100 mt-2">
                      {activeOrdersCount}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1">Waiting in queues (Mock)</span>
                  </div>

                  {/* Completed Orders Card */}
                  <div className="p-5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      <span>Simulated Completed Orders</span>
                      <CheckCircle size={16} className="text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold font-fredoka text-zinc-100 mt-2">
                      {completedOrdersCount}
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1">Success delivery drafts (Mock)</span>
                  </div>

                  {/* Simulated Visitor Clicks */}
                  <div className="p-5 bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 rounded-2xl flex flex-col justify-between">
                    <div className="flex justify-between items-center text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
                      <span>Simulated Clicks</span>
                      <Users size={16} className="text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold font-fredoka text-zinc-100 mt-2">
                      142 Clicks
                    </div>
                    <span className="text-[10px] text-zinc-500 mt-1">Menu flyer scans today</span>
                  </div>
                </div>

                {/* Popular analytics snapshots with Progress Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Flavor distribution card */}
                  <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-lg">
                    <h4 className="font-fredoka text-sm font-bold text-pink-light uppercase tracking-wider mb-6 flex items-center gap-2">
                      <span>🍓</span> Mock Flavor Sales Splits
                    </h4>

                    <div className="space-y-4">
                      {/* Strawberry Delight */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Strawberry Delight</span>
                          <span className="text-zinc-400">45% (Favorite)</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-primary to-pink-light rounded-full" style={{ width: "45%" }} />
                        </div>
                      </div>

                      {/* Chocolate Bliss */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Chocolate Bliss</span>
                          <span className="text-zinc-400">30%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-primary to-pink-light rounded-full" style={{ width: "30%" }} />
                        </div>
                      </div>

                      {/* Vanilla Dream */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Vanilla Dream</span>
                          <span className="text-zinc-400">18%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-primary to-pink-light rounded-full" style={{ width: "18%" }} />
                        </div>
                      </div>

                      {/* Banana Caramel */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Banana Caramel</span>
                          <span className="text-zinc-400">7%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-primary to-pink-light rounded-full" style={{ width: "7%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toppings popularity card */}
                  <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-lg">
                    <h4 className="font-fredoka text-sm font-bold text-pink-light uppercase tracking-wider mb-6 flex items-center gap-2">
                      <span>🍬</span> Top Toppings Demands
                    </h4>

                    <div className="space-y-4">
                      {/* Oreo Crumbles */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Oreo Crumbles</span>
                          <span className="text-zinc-400">38%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-light to-caramel rounded-full" style={{ width: "38%" }} />
                        </div>
                      </div>

                      {/* M&Ms */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">M&Ms Premium</span>
                          <span className="text-zinc-400">25%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-light to-caramel rounded-full" style={{ width: "25%" }} />
                        </div>
                      </div>

                      {/* Sprinkles */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Colorful Sprinkles</span>
                          <span className="text-zinc-400">20%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-light to-caramel rounded-full" style={{ width: "20%" }} />
                        </div>
                      </div>

                      {/* Wafers */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-poppins">
                          <span className="font-bold">Biscuit Wafers</span>
                          <span className="text-zinc-400">17%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-pink-light to-caramel rounded-full" style={{ width: "17%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Order Ticker Banner inside Overview */}
                <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-primary flex items-center justify-center font-bold">
                      💡
                    </span>
                    <div>
                      <h4 className="font-fredoka text-xs font-bold text-zinc-300 uppercase tracking-widest">
                        Automated Order Generation
                      </h4>
                      <p className="font-poppins text-zinc-400 text-xs mt-0.5">
                        A new simulated order automatically rolls in every 12 seconds with a sound notification. Let's head to "Incoming Orders" to manage the queue!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="px-4 py-2 bg-pink-primary text-white font-fredoka font-bold text-xs rounded-xl shadow-md transition-all hover:scale-102"
                  >
                    Manage Orders
                  </button>
                </div>

                {/* Owner Launch Confirmation Checklist */}
                <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl shadow-lg">
                  <h4 className="font-fredoka text-sm font-bold text-pink-light uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>📋</span> Owner Launch Confirmation Checklist
                  </h4>
                  <p className="font-poppins text-zinc-400 text-xs mb-6">
                    Use this checklist to verify store settings and business choices before launching the platform publicly.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Popcorn pricing</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Small ₦1,500, Medium ₦2,000, Large ₦2,500. Applied globally.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Shawarma options</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: No Sausage ₦3,500, Single ₦3,500, Double ₦4,000. Applied globally.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Official WhatsApp number / SIM confirmation</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Official WhatsApp number confirmed and active. Show active number as 08162125710.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Operating hours</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Monday to Saturday 10am–10pm, Sunday 2pm–10pm.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Delivery fee handling</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: delivery fees are discussed/confirmed directly on WhatsApp with the rider.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Delivery areas</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: delivery locations are shown for guidance only.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Tequila Shot visibility decision</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Tequila Shot hidden from public menus since it cannot be delivered.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Cone delivery rule</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Small Cone removed from builder customizer because it cannot be delivered.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Cup prices</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Medium Small Cup is ₦3,000, Large Big Cup is ₦5,000.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Replacement product pictures</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: All ice cream flavors (Vanilla Dream, Strawberry Delight, Chocolate Bliss, and Banana Caramel) updated to cup-style visuals.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Boba Ice Cream visible in Build Your Treat</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Confirmed: Boba Ice Cream visible in Build Your Treat customizer and specials menu for ₦8,000.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Social media links</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">TikTok handle @shaytee.s.treat is active and verified in footer & visit pages.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-850 flex items-start gap-3">
                      <input type="checkbox" className="mt-0.5 rounded border-zinc-800 text-pink-primary focus:ring-pink-primary bg-zinc-900 cursor-pointer" />
                      <div>
                        <p className="font-fredoka text-xs font-bold text-zinc-200">Final launch approval</p>
                        <p className="text-[10px] text-zinc-500 font-poppins">Owner final sign-off to proceed with public launch and remove dashboard gate.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Product Image Library Checklist Section */}
                <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl shadow-lg">
                  <h4 className="font-fredoka text-sm font-bold text-pink-light uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span>🖼️</span> Connected Product Image Library
                  </h4>
                  <p className="font-poppins text-zinc-400 text-xs mb-6">
                    All digital storefront elements are mapped to high-resolution branding assets stored in <code className="text-pink-primary bg-pink-500/10 px-1.5 py-0.5 rounded font-mono text-[10px]">public/assets/shaytees/</code>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🗺️</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Visual Boards</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Menu slider graphics</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        7 / 7 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🍧</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Cup Styles</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Cone and cup base scales</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        3 / 3 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🍦</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Flavours</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Gelato scoop options</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        4 / 4 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🍯</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Drizzles</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Sauce syrups & creams</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        5 / 5 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🍬</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Toppings</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Crumbles, chips & candies</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        7 / 7 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">☕</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Coffee Drinks</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Cappuccino, latte, americano</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        5 / 5 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🥪</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Food & Sandwiches</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Sandwiches and salads</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        5 / 5 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🧊</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Frozen Treats/Popsicles</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Individual popsicles</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        3 / 3 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🥞</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Mini Pancakes</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Serving boxes</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        2 / 2 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl"> waffle 🧇</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Waffles</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Bubble and plain waffles</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        2 / 2 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🥃</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Specials/Shots</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Dubai cups & tequila shots</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        2 / 2 OK
                      </span>
                    </div>

                    <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🍟</span>
                        <div>
                          <p className="font-fredoka text-xs font-bold text-zinc-200">Snacks & Extras</p>
                          <p className="text-[10px] text-zinc-500 font-poppins">Popcorn, noodles & wraps</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-[10px] rounded">
                        7 / 7 OK
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: INTERACTIVE MENU MANAGER */}
            {activeTab === "menu" && (
              <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-pink-light">Interactive Menu Manager</h3>
                    <p className="font-poppins text-xs text-zinc-400 mt-0.5">
                      Adjust pricing and toggle stocks. Out-of-stock items will be dimmed to represent mock storefront updates.
                    </p>
                  </div>
                </div>

                {/* Menu items row-cards */}
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
                        !item.available ? "opacity-40 grayscale" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center font-bold text-lg border border-zinc-800">
                          {item.name.includes("Vanilla") ? "🍦" :
                           item.name.includes("Strawberry") ? "🍓" :
                           item.name.includes("Dubai") ? "⭐" :
                           item.name.includes("Boba") ? "🧋" :
                           item.name.includes("Noodles") ? "🍜" :
                           item.name.includes("Waffle") ? "🧇" :
                           item.name.includes("Popcorn") ? "🍿" : "☕"}
                        </div>
                        <div>
                          <h4 className="font-fredoka text-sm font-bold text-zinc-200">{item.name}</h4>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>

                      {/* Controls (Price adjustment & toggle available) */}
                      <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800">
                        {/* Price inline editor */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Price</span>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-pink-primary font-bold text-xs">₦</span>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handlePriceChange(item.id, parseInt(e.target.value) || 0)}
                              className="pl-5 pr-2 py-1 w-24 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-200 focus:outline-none focus:border-pink-primary"
                            />
                          </div>
                        </div>

                        {/* Availability toggle switch */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase">Status</span>
                          <button
                            onClick={() => handleToggleStock(item.id)}
                            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                              item.available ? "bg-pink-primary" : "bg-zinc-800"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                                item.available ? "translate-x-6" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: LIVE ORDER STREAM TICKER */}
            {activeTab === "orders" && (
              <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-pink-light">Live Order Stream Ticker</h3>
                    <p className="font-poppins text-xs text-zinc-400 mt-0.5">
                      New mock orders arrive every 12 seconds. Simulate preparing and checkout status workflows.
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={triggerNewSimulatedOrder}
                      className="px-4 py-2 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka text-xs font-bold rounded-xl shadow-md transition-all hover:scale-102"
                    >
                      + Sim Order
                    </button>
                  </div>
                </div>

                {/* Queue categories */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {orders.length > 0 ? (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className={`p-4 bg-zinc-950 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${
                          ord.isNew ? "border-pink-500/80 shadow-lg shadow-pink-500/10 animate-pulse-slow" : "border-zinc-800/80"
                        } ${
                          ord.status === "cancelled" ? "opacity-30 grayscale" : ""
                        }`}
                      >
                        <div className="flex flex-col flex-grow">
                          <div className="flex items-center gap-2">
                            {ord.isNew && (
                              <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                              </span>
                            )}
                            <span className="font-fredoka font-bold text-zinc-200 text-sm">{ord.name}</span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                              {ord.id}
                            </span>
                          </div>
                          <span className="font-poppins text-xs text-zinc-400 mt-1 leading-relaxed">
                            {ord.items}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-bold mt-1 uppercase tracking-wider">
                            ⏰ {ord.time}
                          </span>
                        </div>

                        {/* Order stats & actions */}
                        <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800">
                          {/* Price */}
                          <div className="flex flex-col text-right">
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Total</span>
                            <span className="font-fredoka font-bold text-pink-primary text-sm">
                              ₦{ord.total.toLocaleString()}
                            </span>
                          </div>

                          {/* Status */}
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                              ord.status === "completed"
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                                : ord.status === "preparing"
                                ? "bg-amber-500/10 border border-amber-500/30 text-amber-400"
                                : ord.status === "cancelled"
                                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                                : "bg-pink-500/10 border border-pink-500/30 text-pink-light"
                            }`}
                          >
                            {ord.status}
                          </span>

                          {/* Actions buttons */}
                          <div className="flex gap-2">
                            {ord.status === "pending" && (
                              <button
                                onClick={() => handleAcceptOrder(ord.id)}
                                className="p-2 bg-pink-primary/10 hover:bg-pink-primary text-pink-light hover:text-white rounded-lg border border-pink-500/20 transition-all flex items-center justify-center"
                                title="Accept Order"
                              >
                                <Check size={14} />
                              </button>
                            )}

                            {ord.status === "preparing" && (
                              <button
                                onClick={() => handleCompleteOrder(ord.id)}
                                className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg border border-emerald-500/20 transition-all flex items-center justify-center"
                                title="Mark Completed"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}

                            {ord.status !== "completed" && ord.status !== "cancelled" && (
                              <button
                                onClick={() => handleCancelOrder(ord.id)}
                                className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/20 transition-all flex items-center justify-center"
                                title="Cancel Order"
                              >
                                <X size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-zinc-950/40 rounded-3xl border border-zinc-800">
                      <AlertCircle className="text-pink-primary mx-auto mb-4 animate-bounce" size={36} />
                      <h4 className="font-fredoka text-zinc-300 font-bold">No orders stream yet</h4>
                      <p className="font-poppins text-zinc-500 text-xs mt-1">Wait for next simulated order tick.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: FLYER QR & MARKETING */}
            {activeTab === "qr" && (
              <div className="p-6 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8">
                {/* Visual QR sticker mockup */}
                <div className="flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-3xl shrink-0">
                  <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center p-3">
                    <QrCode size={120} className="text-zinc-950" />
                  </div>
                  <span className="text-[10px] font-fredoka font-bold text-pink-light tracking-widest mt-4 uppercase">
                    Scan Menu Flyer
                  </span>
                </div>

                <div>
                  <h3 className="font-fredoka text-xl font-bold text-pink-light mb-2">QR Code Flyer Sticker</h3>
                  <p className="font-poppins text-xs text-zinc-400 leading-relaxed mb-6">
                    Download this barcode to place on tables, print on takeaway bags, or add to Instagram posts. Scanning redirects FUTA students instantly to browse menu and build custom ice cream cups.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => showToast("Downloading mock sticker PDF flyer... (Preview)")}
                      className="px-6 py-3 bg-gradient-to-r from-pink-primary to-pink-light hover:shadow-lg hover:shadow-pink-500/10 text-white font-fredoka text-xs font-bold rounded-full transition-all flex items-center gap-1.5 justify-center"
                    >
                      <Download size={14} />
                      Download QR Sticker
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("https://shaytees-treat.demo");
                        showToast("Sticker copy simulation successful!");
                      }}
                      className="px-6 py-3 bg-zinc-850 hover:bg-zinc-800 text-pink-light border border-zinc-800 font-fredoka text-xs font-bold rounded-full transition-all flex items-center gap-1.5 justify-center"
                    >
                      Copy Simulator Link
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Floating Save Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-zinc-900 border border-pink-500/20 text-white rounded-xl shadow-2xl text-xs font-poppins font-semibold flex items-center gap-2 animate-bounce-slow">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-primary animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
