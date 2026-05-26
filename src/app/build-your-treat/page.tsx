"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, User, MapPin, Truck, ChevronRight } from "lucide-react";
import Particles from "@/components/Particles";

interface Option {
  name: string;
  price: number;
}

export default function BuildYourTreat() {
  // STATE variables for builder
  const [flavor, setFlavor] = useState<Option | null>(null);
  const [size, setSize] = useState<Option | null>(null);
  const [toppings, setToppings] = useState<Option[]>([]);
  const [drizzle, setDrizzle] = useState<Option | null>(null);
  const [extras, setExtras] = useState<Option[]>([]);
  
  // STATE variables for client information
  const [clientName, setClientName] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [location, setLocation] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // Lists of options matching flyer pricing
  const flavors: Option[] = [
    { name: "Vanilla Dream", price: 1500 },
    { name: "Strawberry Delight", price: 1500 },
    { name: "Banana Caramel", price: 1500 },
    { name: "Chocolate Bliss", price: 1500 },
  ];

  const sizes: Option[] = [
    { name: "Small Cup", price: 0 },
    { name: "Medium Cup (+₦1,500)", price: 1500 },
    { name: "Large Cup (+₦3,500)", price: 3500 },
  ];

  const toppingsList: Option[] = [
    { name: "Oreo Crumbles", price: 500 },
    { name: "Sprinkles", price: 500 },
    { name: "Chocolate Chips", price: 500 },
    { name: "Gummy Bears", price: 500 },
    { name: "Peanuts", price: 500 },
    { name: "M&Ms", price: 1000 },
    { name: "Wafers", price: 500 },
  ];

  const drizzles: Option[] = [
    { name: "Chocolate Drizzle", price: 0 },
    { name: "Strawberry Drizzle", price: 0 },
    { name: "Honey Drizzle", price: 0 },
  ];

  const extrasList: Option[] = [
    // Snacks
    { name: "Mini Pancakes (Box of 6)", price: 2000 },
    { name: "Mini Pancakes (Box of 12)", price: 4500 },
    { name: "Bubble Waffle", price: 3000 },
    { name: "Plain Waffle + Syrup", price: 3000 },
    // Popcorn
    { name: "Milky Popcorn (Small)", price: 1000 },
    { name: "Milky Popcorn (Medium)", price: 1500 },
    { name: "Milky Popcorn (Large)", price: 2500 },
    { name: "Caramel Popcorn (Small)", price: 1000 },
    { name: "Caramel Popcorn (Medium)", price: 1500 },
    { name: "Caramel Popcorn (Large)", price: 2500 },
    // Coffee
    { name: "Cappuccino", price: 2500 },
    { name: "Latte", price: 3500 },
    { name: "Americano", price: 2500 },
    { name: "Mocha", price: 3500 },
    { name: "Espresso", price: 3000 },
    // Food
    { name: "Noodles & Egg", price: 3000 },
    { name: "Noodles & Chicken", price: 4700 },
    { name: "Egg Sandwich", price: 2500 },
    { name: "Chicken Sandwich", price: 3000 },
    { name: "Chicken Salad", price: 4500 },
    { name: "Toast Bread & Egg", price: 2000 },
    { name: "Toast Bread, Egg & Sardine", price: 2500 },
  ];

  // Calculate Total
  useEffect(() => {
    let sum = 0;
    if (flavor) sum += flavor.price;
    if (size) sum += size.price;
    toppings.forEach((t) => (sum += t.price));
    if (drizzle) sum += drizzle.price;
    extras.forEach((e) => (sum += e.price));
    setEstimatedTotal(sum);
  }, [flavor, size, toppings, drizzle, extras]);

  // Toggle Topping selection
  const handleToppingToggle = (topping: Option) => {
    if (toppings.some((t) => t.name === topping.name)) {
      setToppings(toppings.filter((t) => t.name !== topping.name));
    } else {
      setToppings([...toppings, topping]);
    }
  };

  // Toggle Extra selection
  const handleExtraToggle = (extra: Option) => {
    if (extras.some((e) => e.name === extra.name)) {
      setExtras(extras.filter((e) => e.name !== extra.name));
    } else {
      setExtras([...extras, extra]);
    }
  };

  // Construct WhatsApp Link
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!flavor) {
      alert("Please choose an Ice Cream flavor first!");
      return;
    }

    const sizeName = size ? size.name : "Small Cup";
    const selectedToppings = toppings.length > 0 ? toppings.map((t) => t.name).join(", ") : "None";
    const selectedDrizzle = drizzle ? drizzle.name : "None";
    const selectedExtras = extras.length > 0 ? extras.map((e) => e.name).join(", ") : "None";

    // Text constructor using template literals to avoid quote escaping issues
    const message = `Hello Shaytee's Treat, I want to order:
Ice Cream: ${flavor.name}
Size: ${sizeName}
Toppings: ${selectedToppings}
Drizzle: ${selectedDrizzle}
Extras: ${selectedExtras}
Estimated Total: ₦${estimatedTotal.toLocaleString()}

Name: ${clientName || "[Please Fill]"}
Pickup/Delivery: ${orderType === "delivery" ? "Delivery" : "Pickup"}
Location: ${location || "[Please Fill]"}`;

    const whatsappUrl = `https://wa.me/2348162125710?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Get color styling for the live preview base on flavor
  const getPreviewFlavorColor = () => {
    if (!flavor) return "bg-white border-dashed border-gray-300";
    if (flavor.name === "Vanilla Dream") return "bg-gradient-to-b from-vanilla to-yellow-50";
    if (flavor.name === "Strawberry Delight") return "bg-gradient-to-b from-pink-300 to-pink-100";
    if (flavor.name === "Banana Caramel") return "bg-gradient-to-b from-[#fef08a] to-[#fef08a]/60";
    return "bg-gradient-to-b from-chocolate to-amber-900"; // Chocolate
  };

  const getPreviewSize = () => {
    if (!size) return "scale-75";
    if (size.name.includes("Medium")) return "scale-90";
    if (size.name.includes("Large")) return "scale-100";
    return "scale-75"; // Small
  };

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8">
      {/* Background Particles */}
      <Particles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
            Customizer Sandbox
          </span>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-chocolate mt-3 mb-4">
            Build Your Treat 🎨
          </h1>
          <p className="font-poppins text-text-light text-sm md:text-base leading-relaxed">
            Unleash your dessert creativity. Choose your sizes, flavors, premium toppings, drizzles, and snack sidekicks. Send the order details to WhatsApp in a single tap.
          </p>
        </div>

        {/* Builder Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Left Options Panels (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Step 1: Flavor */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">1</span>
                Choose Ice Cream Flavor
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {flavors.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setFlavor(item)}
                    className={`py-3 px-4 rounded-2xl border font-poppins text-sm font-semibold transition-all duration-200 text-left ${
                      flavor?.name === item.name
                        ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                        : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className={flavor?.name === item.name ? "text-white" : "text-pink-primary"}>
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Size */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">2</span>
                Select Cup Size
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {sizes.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setSize(item)}
                    className={`py-3 px-4 rounded-2xl border font-poppins text-sm font-semibold transition-all duration-200 text-left ${
                      (size?.name === item.name) || (!size && item.name === "Small Cup")
                        ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                        : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs opacity-85 uppercase font-bold tracking-wider">
                        {item.name.includes("Small") ? "Small" : item.name.includes("Medium") ? "Medium" : "Large"}
                      </span>
                      <span className="text-sm font-bold mt-1">
                        {item.name.split(" ")[0]} Cup
                      </span>
                      <span className="text-[10px] mt-1 opacity-70">
                        {item.price === 0 ? "Included" : `+₦${item.price.toLocaleString()}`}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Toppings */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                Select Toppings (Multi-Select)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {toppingsList.map((item) => {
                  const isSelected = toppings.some((t) => t.name === item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleToppingToggle(item)}
                      className={`py-3 px-4 rounded-2xl border font-poppins text-xs md:text-sm font-semibold transition-all duration-200 text-left ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{item.name.split(" ")[0]}</span>
                        <span className={isSelected ? "text-white" : "text-pink-primary"}>
                          +₦{item.price.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Drizzle */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">4</span>
                Select Drizzle (Free)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {drizzles.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setDrizzle(drizzle?.name === item.name ? null : item)}
                    className={`py-3 px-4 rounded-2xl border font-poppins text-xs md:text-sm font-semibold transition-all duration-200 text-left ${
                      drizzle?.name === item.name
                        ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                        : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <span>{item.name.split(" ")[0]}</span>
                      <span className="text-[10px] opacity-70 mt-0.5">FREE</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Extras */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">5</span>
                Add Snacks, Food & Coffees (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2">
                {extrasList.map((item) => {
                  const isSelected = extras.some((e) => e.name === item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleExtraToggle(item)}
                      className={`py-2.5 px-4 rounded-2xl border font-poppins text-xs font-semibold transition-all duration-200 text-left ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate pr-2">{item.name}</span>
                        <span className={isSelected ? "text-white whitespace-nowrap" : "text-pink-primary whitespace-nowrap"}>
                          +₦{item.price.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Builder Right Summary Panel & Live Preview (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Live Visual Dessert Cup Preview */}
            <div className="glossy-card p-6 flex flex-col items-center justify-center overflow-hidden">
              <h4 className="font-fredoka text-sm font-bold text-pink-primary tracking-widest uppercase mb-4">
                Dessert Live Simulator
              </h4>
              
              <div className="relative w-full h-48 flex items-center justify-center">
                {/* Drizzle Overlay */}
                {drizzle && (
                  <div className="absolute top-1/4 w-32 h-6 bg-amber-500/40 rounded-full blur-md z-30 animate-pulse-slow">
                    <div className="text-[10px] text-center text-white font-bold tracking-wider">
                      {drizzle.name.split(" ")[0]} Swirl
                    </div>
                  </div>
                )}
                
                {/* Toppings indicators */}
                <div className="absolute top-12 z-20 flex flex-wrap gap-1 justify-center max-w-[120px]">
                  {toppings.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-pink-dark text-white rounded text-[8px] font-bold shadow-sm animate-bounce-slow" style={{ animationDelay: `${idx * 0.1}s` }}>
                      {t.name.split(" ")[0]}
                    </span>
                  ))}
                </div>

                {/* Ice cream Scoop */}
                <div className={`w-32 h-32 rounded-full border-4 border-white/40 shadow-xl transition-all duration-500 z-10 flex items-center justify-center font-fredoka font-bold text-sm ${getPreviewFlavorColor()} ${getPreviewSize()}`}>
                  {!flavor ? (
                    <span className="text-text-light/50 text-xs italic text-center p-2">Select flavor</span>
                  ) : (
                    <span className="text-chocolate drop-shadow-sm text-center px-2">
                      {flavor.name}
                    </span>
                  )}
                </div>

                {/* Gelato Cup Base */}
                <div className="absolute bottom-2 w-36 h-20 bg-white/40 backdrop-blur-md border border-white/50 rounded-b-[40px] rounded-t-[5px] shadow-lg z-0 flex flex-col justify-end p-2 items-center">
                  <span className="font-fredoka text-[10px] font-bold text-pink-primary tracking-wider">Shaytee's Gelato</span>
                </div>
              </div>
            </div>

            {/* Order Summary & Form Card */}
            <div className="glossy-card p-6 bg-white">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-4 flex items-center gap-2">
                <ShoppingBag className="text-pink-primary" size={22} />
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {flavor ? (
                  <div className="flex justify-between items-center text-sm font-poppins text-text-dark border-b border-pink-50/50 pb-1.5">
                    <span>🍦 {flavor.name} ({size ? size.name.split(" ")[0] : "Small"})</span>
                    <span className="font-bold text-pink-primary">₦{((flavor.price) + (size ? size.price : 0)).toLocaleString()}</span>
                  </div>
                ) : (
                  <p className="text-xs text-text-light/50 italic py-2">No items selected yet. Choose your ice cream scoop to start!</p>
                )}

                {toppings.map((t, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-poppins text-text-light pl-3">
                    <span>🍬 + Topping: {t.name}</span>
                    <span className="font-bold">₦{t.price.toLocaleString()}</span>
                  </div>
                ))}

                {drizzle && (
                  <div className="flex justify-between items-center text-xs font-poppins text-text-light pl-3">
                    <span>🍯 + Drizzle: {drizzle.name}</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                )}

                {extras.map((e, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-poppins text-text-dark pl-3 border-b border-pink-50/30 pb-1">
                    <span>🍔 + Extra: {e.name}</span>
                    <span className="font-bold text-pink-primary">₦{e.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Client Info form */}
              <div className="mt-6 pt-4 border-t border-pink-100 flex flex-col gap-3">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/40" size={16} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-pink-50/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-primary border border-pink-100 text-xs font-poppins"
                  />
                </div>

                {/* Pickup / Delivery toggles */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderType("pickup")}
                    className={`flex-1 py-2 px-3 rounded-xl border font-poppins text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "pickup"
                        ? "bg-pink-primary/10 border-pink-primary text-pink-primary shadow-sm"
                        : "bg-white border-pink-100 text-text-light"
                    }`}
                  >
                    <Truck size={14} className="rotate-180" />
                    Pickup Shop
                  </button>
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`flex-1 py-2 px-3 rounded-xl border font-poppins text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      orderType === "delivery"
                        ? "bg-pink-primary/10 border-pink-primary text-pink-primary shadow-sm"
                        : "bg-white border-pink-100 text-text-light"
                    }`}
                  >
                    <MapPin size={14} />
                    Delivery
                  </button>
                </div>

                {/* Address/Location */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/40" size={16} />
                  <input
                    type="text"
                    placeholder={orderType === "delivery" ? "Delivery Address" : "Pickup Location / Shop details"}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-pink-50/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-primary border border-pink-100 text-xs font-poppins"
                  />
                </div>
              </div>

              {/* Total display */}
              <div className="mt-6 pt-4 border-t border-pink-100 flex justify-between items-center">
                <span className="font-fredoka font-bold text-chocolate text-base">Estimated Total:</span>
                <span className="font-fredoka font-bold text-pink-primary text-2xl">
                  ₦{estimatedTotal.toLocaleString()}
                </span>
              </div>

              {/* WhatsApp Link Actions */}
              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-fredoka font-bold rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-102"
                >
                  <MessageCircle size={20} />
                  Send Order to WhatsApp
                </button>
                <a
                  href="tel:08162125710"
                  className="w-full py-2.5 bg-chocolate/5 hover:bg-chocolate/10 text-chocolate border border-chocolate/20 font-fredoka font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
                >
                  📞 Phone Call Hotline (08162125710)
                </a>
              </div>
            </div>

            {/* Note */}
            <p className="text-[10px] text-center text-text-light/60 italic leading-relaxed">
              *Building a treat is a mock ordering flow. Pressing send formats details into a WhatsApp message draft. Confirm final checkout pricing & location directly with Shaytee's Treat on chat.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
