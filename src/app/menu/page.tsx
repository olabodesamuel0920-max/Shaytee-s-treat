"use client";

// Phase 1D live sync: updated pricing and categories data source
import React, { useState } from "react";
import { Search, Compass, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Particles from "@/components/Particles";
import { menuData, allMenuItems, MenuItem, getPriceText } from "@/lib/menu-data";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", name: "All Sweets", emoji: "🍭" },
    ...menuData.categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.icon,
    })),
  ];

  const filteredItems = allMenuItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.flavor && item.flavor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  // Check if item is customizable in builder
  const isCustomizable = (item: MenuItem) => {
    return item.category === "ice-cream" || 
           item.category === "toppings" || 
           item.category === "drizzle" || 
           item.category === "waffles";
  };

  // Get deep link for custom builder
  const getBuilderLink = (item: MenuItem) => {
    if (item.category === "ice-cream") {
      return `/build-your-treat?flavor=${encodeURIComponent(item.name)}&size=Small%20Cup`;
    }
    if (item.category === "toppings") {
      return `/build-your-treat?toppings=${encodeURIComponent(item.name)}`;
    }
    if (item.category === "drizzle") {
      return `/build-your-treat?drizzle=${encodeURIComponent(item.name)}`;
    }
    return `/build-your-treat?extras=${encodeURIComponent(item.name)}`;
  };

  // Quick Order template generator for WhatsApp
  const handleQuickOrder = (item: MenuItem) => {
    const priceString = getPriceText(item);

    const message = `Hello Shaytee's Treat, I want to order:
Item: ${item.name}
Price: ${priceString}

Name: 
Pickup/Delivery: 
Location: `;

    const whatsappUrl = `https://wa.me/${menuData.contact.replace(/[\s+]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8">
      {/* Background Particles */}
      <Particles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
            Menu Preview
          </span>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-chocolate mt-3 mb-4">
            Our Sweet Menu 📑
          </h1>
          <p className="font-poppins text-text-light text-sm md:text-base leading-relaxed">
            Browse our selections prepared with care in our Southgate kitchen. Customize ice cream and waffles in our builder, or place a quick order for other specialties.
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light/60" size={18} />
            <input
              type="text"
              placeholder="Search sweets & eats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 backdrop-blur-sm border border-pink-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-primary/40 focus:border-pink-primary font-poppins text-sm text-text-dark"
            />
          </div>

          {/* Quick CTA to Builder */}
          <Link
            href="/build-your-treat"
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka font-bold rounded-full shadow-md hover:scale-105 transition-transform animate-pulse-slow"
          >
            <ShoppingCart size={18} />
            Launch Customizer
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 justify-start lg:justify-center scrollbar-none">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-poppins text-sm font-semibold transition-all duration-300 whitespace-nowrap shrink-0 border ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-primary to-pink-light text-white border-transparent shadow-md scale-105"
                  : "bg-white/60 text-pink-primary border-pink-100 hover:bg-pink-50"
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div key={index} className="glossy-card overflow-hidden flex flex-col justify-between relative">
                {/* Product Image */}
                <div className="h-48 w-full overflow-hidden relative border-b border-pink-50 bg-zinc-100">
                  <img
                    src={item.image.startsWith("/") ? item.image : `/images/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                  {item.includes && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded shadow-sm">
                      ✨ {item.includes}
                    </span>
                  )}
                  {item.extras && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded shadow-sm">
                      ✨ {item.extras}
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2 flex items-center justify-between">
                      {item.name}
                    </h3>
                    
                    {item.flavor && (
                      <p className="text-xs text-pink-primary font-semibold font-poppins mb-2">
                        Flavor: {item.flavor}
                      </p>
                    )}

                    {item.prices && (
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        {Object.entries(item.prices).map(([sizeName, priceVal]) => (
                          <span key={sizeName} className="text-[10px] font-bold font-poppins px-2 py-0.5 bg-pink-50 text-pink-primary border border-pink-100/40 rounded-md capitalize">
                            {sizeName}: ₦{priceVal.toLocaleString()}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.variants && (
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        {Object.entries(item.variants).map(([variantName, priceVal]) => (
                          <span key={variantName} className="text-[10px] font-bold font-poppins px-2 py-0.5 bg-pink-50 text-pink-primary border border-pink-100/40 rounded-md capitalize">
                            {variantName.replace("_", " ")}: ₦{priceVal.toLocaleString()}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.category === "hot-snacks-extras" && (
                      <p className="text-[10px] text-pink-primary bg-pink-50/50 border border-pink-100/40 rounded-lg p-2 mt-2 mb-3 font-semibold font-poppins">
                        ℹ️ Availability can be confirmed by Shaytee’s Treat.
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-pink-50/50 flex justify-between items-center gap-3">
                    {/* Price display */}
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light/50 font-bold uppercase tracking-wider">
                        {item.prices || item.variants ? "Options" : "Price"}
                      </span>
                      <span className="font-poppins text-sm md:text-base font-bold text-pink-primary mt-0.5">
                        {getPriceText(item)}
                      </span>
                    </div>

                    {/* Dynamic Action Buttons */}
                    {isCustomizable(item) ? (
                      <Link
                        href={getBuilderLink(item)}
                        className="px-4 py-2 bg-gradient-to-r from-pink-primary to-pink-light text-white text-xs font-fredoka font-bold rounded-full shadow-sm hover:scale-105 transition-transform text-center whitespace-nowrap flex items-center gap-1"
                      >
                        {item.category === "toppings" || item.category === "drizzle" ? "Add to Builder 🍦" : "Customize 🍦"}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleQuickOrder(item)}
                        className="px-4 py-2 bg-chocolate hover:bg-pink-dark text-white text-xs font-fredoka font-bold rounded-full shadow-sm hover:scale-105 transition-transform text-center whitespace-nowrap flex items-center gap-1 cursor-pointer"
                      >
                        Quick Order 💬
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-pink-100 max-w-xl mx-auto">
            <Compass className="text-pink-primary mx-auto mb-4 animate-bounce-slow" size={48} />
            <h3 className="font-fredoka text-xl font-bold text-chocolate">No treats found</h3>
            <p className="font-poppins text-text-light text-sm mt-2 px-6">
              We couldn't find any menu items matching "{searchQuery}". Check your spelling or select another category.
            </p>
          </div>
        )}

        {/* Pricing notice disclaimer */}
        <p className="text-xs text-text-light/60 mt-12 text-center max-w-2xl mx-auto italic leading-relaxed">
          *Menu pricing and availability are mock preview values. Locations, operating hours, delivery coverage, and final prices can be confirmed directly by Shaytee's Treat before launching.
        </p>
      </div>
    </div>
  );
}
