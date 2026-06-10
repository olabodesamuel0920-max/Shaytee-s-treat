"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, ShoppingBag, User, MapPin, Truck } from "lucide-react";
import Particles from "@/components/Particles";
import { menuData } from "@/lib/menu-data";

interface Option {
  name: string;
  price: number;
  image?: string;
}

function BuildYourTreatContent() {
  const searchParams = useSearchParams();

  // State variables for builder
  const [flavor, setFlavor] = useState<Option | null>(null);
  const [size, setSize] = useState<Option | null>(null);
  const [toppings, setToppings] = useState<Option[]>([]);
  const [drizzle, setDrizzle] = useState<Option | null>(null);
  const [extras, setExtras] = useState<Option[]>([]);
  
  // State variables for client information
  const [clientName, setClientName] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [location, setLocation] = useState("");
  const [estimatedTotal, setEstimatedTotal] = useState(0);

  // Dynamically derive options lists from menuData source of truth
  const iceCreamCat = menuData.categories.find((c) => c.id === "ice-cream");
  const flavors: Option[] = iceCreamCat
    ? iceCreamCat.items.map((item) => ({
        name: item.name,
        price: item.prices?.small_cone || 1500,
        image: item.image,
      }))
    : [];

  const firstIceCream = iceCreamCat?.items[0];
  const basePrice = firstIceCream?.prices?.small_cone || 1500;
  const mediumCupPrice = firstIceCream?.prices?.medium_small_cup || 3000;
  const largeCupPrice = firstIceCream?.prices?.large_big_cup || 5000;

  const sizes: Option[] = [
    { name: "Small Cone", price: 0, image: "/assets/shaytees/individual_assets/cup-sizes/cone.png" },
    {
      name: `Medium Small Cup (+₦${(mediumCupPrice - basePrice).toLocaleString()})`,
      price: mediumCupPrice - basePrice,
      image: "/assets/shaytees/individual_assets/cup-sizes/small-cup.png",
    },
    {
      name: `Large Big Cup (+₦${(largeCupPrice - basePrice).toLocaleString()})`,
      price: largeCupPrice - basePrice,
      image: "/assets/shaytees/individual_assets/cup-sizes/big-cup-chocolate.png",
    },
  ];

  const toppingsCat = menuData.categories.find((c) => c.id === "toppings");
  const toppingsList: Option[] = toppingsCat
    ? toppingsCat.items.map((item) => ({
        name: item.name,
        price: item.price || 500,
        image: item.image,
      }))
    : [];

  const drizzles: Option[] = (toppingsCat?.free_drizzles || []).map((name) => {
    const key = name.toLowerCase().replace(/ /g, "-");
    return {
      name,
      price: 0,
      image: `/assets/shaytees/individual_assets/drizzles/${key}.png`,
    };
  });

  const targetExtraCategories = ["waffles", "mini-pancakes", "hot-snacks-extras", "coffee", "food"];
  const extrasList: Option[] = [];

  targetExtraCategories.forEach((catId) => {
    const cat = menuData.categories.find((c) => c.id === catId);
    if (!cat) return;

    cat.items.forEach((item) => {
      let displayName = item.name;
      if (catId === "mini-pancakes") {
        displayName = `Mini Pancakes (${item.name})`;
      } else if (item.name === "Plain Waffles") {
        displayName = "Plain Waffle + Syrup";
      } else if (item.name === "Bubble Waffles") {
        displayName = "Bubble Waffle";
      }

      if (item.price !== undefined) {
        extrasList.push({
          name: displayName,
          price: item.price,
          image: item.image,
        });
      } else if (item.prices) {
        Object.entries(item.prices).forEach(([sizeKey, priceVal]) => {
          if (priceVal !== undefined) {
            const capitalizedSize = sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1);
            extrasList.push({
              name: `${displayName} (${capitalizedSize})`,
              price: priceVal,
              image: item.image,
            });
          }
        });
      } else if (item.variants) {
        Object.entries(item.variants).forEach(([variantKey, priceVal]) => {
          if (priceVal !== undefined) {
            const formattedVariant = variantKey
              .replace("_", " ")
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            extrasList.push({
              name: `${displayName} (${formattedVariant})`,
              price: priceVal,
              image: item.image,
            });
          }
        });
      }
    });
  });

  // Overwrite defaults with URL parameters
  useEffect(() => {
    if (!searchParams) return;

    const flavorParam = searchParams.get("flavor");
    const sizeParam = searchParams.get("size");
    const toppingsParam = searchParams.get("toppings");
    const drizzleParam = searchParams.get("drizzle");
    const extrasParam = searchParams.get("extras");

    if (flavorParam) {
      const foundFlav = flavors.find(
        (f) => f.name.toLowerCase() === flavorParam.toLowerCase()
      );
      if (foundFlav) setFlavor(foundFlav);
    }

    if (sizeParam) {
      const foundSize = sizes.find(
        (s) => s.name.toLowerCase().includes(sizeParam.toLowerCase())
      );
      if (foundSize) setSize(foundSize);
    }

    if (toppingsParam) {
      const names = toppingsParam.split(",").map((t) => t.trim().toLowerCase());
      const matched = toppingsList.filter((t) =>
        names.includes(t.name.toLowerCase())
      );
      setToppings(matched);
    }

    if (drizzleParam) {
      const foundDriz = drizzles.find(
        (d) => d.name.toLowerCase().includes(drizzleParam.toLowerCase())
      );
      if (foundDriz) setDrizzle(foundDriz);
    }

    if (extrasParam) {
      const names = extrasParam.split(",").map((e) => e.trim().toLowerCase());
      const matched = extrasList.filter((e) =>
        names.some((name) => 
          e.name.toLowerCase() === name || 
          e.name.toLowerCase().includes(name) || 
          name.includes(e.name.toLowerCase())
        )
      );
      setExtras(matched);
    }
  }, [searchParams]);

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

    const sizeName = size ? size.name.split(" (+")[0] : "Small Cone";
    
    let itemsText = `1. Custom Gelato Scoop: ${flavor.name} (${sizeName}) — ₦${((flavor.price) + (size ? size.price : 0)).toLocaleString()}`;
    if (toppings.length > 0) {
      itemsText += `\n   Toppings: ${toppings.map(t => `${t.name} (+₦${t.price.toLocaleString()})`).join(", ")}`;
    }
    if (drizzle) {
      itemsText += `\n   Drizzle: ${drizzle.name} (FREE)`;
    }
    
    if (extras.length > 0) {
      itemsText += `\n\n*Additional Snacks & Eats:*`;
      extras.forEach((ex, index) => {
        itemsText += `\n${index + 2}. ${ex.name} — ₦${ex.price.toLocaleString()}`;
      });
    }

    const message = `🍭 *NEW ORDER — Shaytee's Treat*

👤 *Customer Name:* ${clientName.trim() || "[Not Provided]"}
🚚 *Order Type:* ${orderType === "delivery" ? "Delivery" : "Store Pickup"}
📍 *Address/Meetup:* ${location.trim() || "[Not Provided]"}

*Order Details:*
${itemsText}

*Estimated Total:* ₦${estimatedTotal.toLocaleString()}

*Note:* Price and delivery to be finalized on chat. 💖`;

    const whatsappUrl = `https://wa.me/2348162125710?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Visual helpers removed for board card preview layouts

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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {flavors.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setFlavor(item)}
                    className={`p-3 rounded-2xl border font-poppins transition-all duration-200 text-center flex flex-col items-center gap-2.5 cursor-pointer ${
                      flavor?.name === item.name
                        ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                        : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/40 border border-white/20 relative shadow-inner">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-xs leading-tight">{item.name}</span>
                      <span className={`text-[10px] mt-0.5 font-semibold ${flavor?.name === item.name ? "text-white/80" : "text-pink-primary"}`}>
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
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((item) => {
                  const isSelected = (size?.name === item.name) || (!size && item.name === "Small Cone");
                  return (
                    <button
                      key={item.name}
                      onClick={() => setSize(item)}
                      className={`p-3 rounded-2xl border font-poppins transition-all duration-200 text-center flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/40 border border-white/20 relative shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-xs leading-tight">{item.name.split(" (+")[0]}</span>
                        <span className={`text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-pink-primary"}`}>
                          {item.price === 0 ? "Included" : `+₦${item.price.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Toppings */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">3</span>
                Select Toppings (Multi-Select)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {toppingsList.map((item) => {
                  const isSelected = toppings.some((t) => t.name === item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleToppingToggle(item)}
                      className={`p-2.5 rounded-2xl border font-poppins transition-all duration-200 text-center flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/40 border border-white/20 relative shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-xs leading-tight">{item.name}</span>
                        <span className={`text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-pink-primary"}`}>
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
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {drizzles.map((item) => {
                  const isSelected = drizzle?.name === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setDrizzle(drizzle?.name === item.name ? null : item)}
                      className={`p-2.5 rounded-2xl border font-poppins transition-all duration-200 text-center flex flex-col items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/40 border border-white/20 relative shadow-inner">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-xs leading-tight">{item.name.split(" ")[0]}</span>
                        <span className={`text-[10px] mt-0.5 font-semibold ${isSelected ? "text-white/80" : "text-emerald-600"}`}>
                          FREE
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Extras */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-pink-primary text-white text-xs flex items-center justify-center font-bold">5</span>
                Add Snacks, Food & Coffees (Optional)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {extrasList.map((item) => {
                  const isSelected = extras.some((e) => e.name === item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleExtraToggle(item)}
                      className={`p-2.5 rounded-2xl border font-poppins transition-all duration-200 text-left flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-pink-primary text-white border-transparent shadow-md scale-102"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/40 border border-white/20 shrink-0 shadow-inner bg-white">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="truncate text-xs font-bold leading-tight">{item.name}</span>
                      </div>
                      <span className={`text-[11px] font-semibold ${isSelected ? "text-white" : "text-pink-primary"} shrink-0`}>
                        +₦{item.price.toLocaleString()}
                      </span>
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
                Your Visual Customization
              </h4>
              
              <div className="w-full py-4 flex flex-col gap-4 items-center">
                {/* Visual Cards Row */}
                <div className="flex justify-center gap-4 flex-wrap w-full">
                  {/* Size Card */}
                  <div className="flex flex-col items-center bg-white/40 border border-pink-100 p-2.5 rounded-2xl w-24 text-center shadow-sm">
                    <span className="text-[9px] font-bold font-poppins text-pink-dark uppercase tracking-wider mb-1.5">Cup Size</span>
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-pink-50 p-1">
                      <img src={size ? size.image : "/assets/shaytees/individual_assets/cup-sizes/cone.png"} alt="Size" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-[10px] text-chocolate truncate mt-2 w-full">{size ? size.name.split(" (+")[0] : "Small Cone"}</span>
                  </div>

                  {/* Flavor Card */}
                  <div className="flex flex-col items-center bg-white/40 border border-pink-100 p-2.5 rounded-2xl w-24 text-center shadow-sm">
                    <span className="text-[9px] font-bold font-poppins text-pink-dark uppercase tracking-wider mb-1.5">Flavor</span>
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-pink-50">
                      <img src={flavor ? flavor.image : "/assets/shaytees/individual_assets/flavours/vanilla.png"} alt="Flavor" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-[10px] text-chocolate truncate mt-2 w-full">{flavor ? flavor.name.split(" ")[0] : "None"}</span>
                  </div>

                  {/* Drizzle Card */}
                  <div className="flex flex-col items-center bg-white/40 border border-pink-100 p-2.5 rounded-2xl w-24 text-center shadow-sm">
                    <span className="text-[9px] font-bold font-poppins text-pink-dark uppercase tracking-wider mb-1.5">Drizzle</span>
                    <div className="w-14 h-14 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-pink-50">
                      <img src={drizzle ? drizzle.image : "/assets/shaytees/individual_assets/drizzles/chocolate-sauce.png"} alt="Drizzle" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-[10px] text-chocolate truncate mt-2 w-full">{drizzle ? drizzle.name.split(" ")[0] : "None"}</span>
                  </div>
                </div>

                {/* Toppings Thumbnails List */}
                {toppings.length > 0 && (
                  <div className="w-full pt-2">
                    <span className="text-[9px] font-bold font-poppins text-pink-dark uppercase tracking-wider block text-center mb-2">Selected Toppings</span>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {toppings.map((t, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-white/50 border border-pink-50 px-2 py-1 rounded-xl shadow-sm">
                          <img src={t.image} alt={t.name} className="w-5 h-5 rounded object-cover animate-bounce-slow" style={{ animationDelay: `${idx * 0.1}s` }} />
                          <span className="text-[9px] font-bold text-chocolate">{t.name.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

export default function BuildYourTreat() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream text-pink-primary">
        <div className="animate-bounce text-2xl font-fredoka font-bold">Loading Customizer...</div>
      </div>
    }>
      <BuildYourTreatContent />
    </Suspense>
  );
}
