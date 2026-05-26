"use client";

import React, { useState } from "react";
import { Search, Compass, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Particles from "@/components/Particles";

interface MenuItem {
  name: string;
  desc?: string;
  prices?: number[];
  price?: number;
  category: "icecream" | "toppings" | "drizzle" | "food" | "snacks" | "drinks" | "specials";
  badge?: string;
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const menuItems: MenuItem[] = [
    // ICE CREAM
    { name: "Vanilla Dream", desc: "Classic creamy vanilla scoop", prices: [1500, 3000, 5000], category: "icecream" },
    { name: "Strawberry Delight", desc: "Creamy fresh strawberry gelato style", prices: [1500, 3000, 5000], category: "icecream" },
    { name: "Banana Caramel", desc: "Banana flavor topped with rich caramel", prices: [1500, 3000, 5000], category: "icecream" },
    { name: "Chocolate Bliss", desc: "Rich Belgian chocolate sensation", prices: [1500, 3000, 5000], category: "icecream" },

    // TOPPINGS
    { name: "Oreo Crumbles", price: 500, category: "toppings" },
    { name: "Sprinkles", price: 500, category: "toppings" },
    { name: "Chocolate Chips", price: 500, category: "toppings" },
    { name: "Gummy Bears", price: 500, category: "toppings" },
    { name: "Peanuts", price: 500, category: "toppings" },
    { name: "M&Ms", price: 1000, category: "toppings" },
    { name: "Wafers", price: 500, category: "toppings" },

    // FREE DRIZZLE
    { name: "Chocolate Drizzle", price: 0, category: "drizzle", desc: "Rich chocolate syrup" },
    { name: "Strawberry Drizzle", price: 0, category: "drizzle", desc: "Fresh sweet strawberry drizzle" },
    { name: "Honey Drizzle", price: 0, category: "drizzle", desc: "Pure sweet honey drizzle" },

    // FOOD
    { name: "Noodles & Egg", desc: "Akure student favorite instant noodles, egg, garnishing", price: 3000, category: "food", badge: "POPULAR" },
    { name: "Noodles & Chicken", desc: "Rich instant noodles with crispy chicken pieces", price: 4700, category: "food" },
    { name: "Egg Sandwich", desc: "Toasted bread with seasoned egg filling", price: 2500, category: "food" },
    { name: "Chicken Sandwich", desc: "Savoury chicken breast, mayo, vegetables sandwich", price: 3000, category: "food" },
    { name: "Chicken Salad", desc: "Fresh mixed greens, chicken strips, cream dressing", price: 4500, category: "food" },
    { name: "Toast Bread & Egg", desc: "Crispy toast with soft fluffy scrambled egg", price: 2000, category: "food" },
    { name: "Toast Bread, Egg & Sardine", desc: "Toast sandwich packed with egg & rich sardine mix", price: 2500, category: "food" },

    // POPCORN & SNACKS
    { name: "Milky Popcorn", desc: "Fresh popcorn with rich milky flavor coating", prices: [1000, 1500, 2500], category: "snacks" },
    { name: "Caramel Popcorn", desc: "Fresh sweet buttery caramel-coated popcorn", prices: [1000, 1500, 2500], category: "snacks" },
    { name: "Mini Pancakes (Box of 6)", desc: "Fluffy bite-sized pancakes with 1 free topping", price: 2000, category: "snacks" },
    { name: "Mini Pancakes (Box of 12)", desc: "Fluffy bite-sized pancakes with 2 free toppings", price: 4500, category: "snacks" },
    { name: "Bubble Waffle", desc: "Signature crispy bubble-shaped waffle", price: 3000, category: "snacks" },
    { name: "Plain Waffle", desc: "Served with honey or sweet golden syrup", price: 3000, category: "snacks" },
    { name: "Fruit Popsicle", desc: "Refreshing ice popsicle made with real fruit flavors", price: 1700, category: "snacks" },
    { name: "Chocolate Popsicle", desc: "Decadent chocolate fudge popsicle", price: 2000, category: "snacks" },
    { name: "Strawberry Popsicle", desc: "Sweet, cooling strawberry treat", price: 1700, category: "snacks" },

    // DRINKS
    { name: "Cappuccino", desc: "Classic espresso with steamed milk foam", price: 2500, category: "drinks" },
    { name: "Latte", desc: "Creamy espresso with steamed milk and thin foam layer", price: 3500, category: "drinks" },
    { name: "Americano", desc: "Smooth black coffee shot diluted in hot water", price: 2500, category: "drinks" },
    { name: "Mocha", desc: "Espresso combined with rich hot chocolate milk", price: 3500, category: "drinks" },
    { name: "Espresso", desc: "Strong concentrated shot of pure dark roast coffee", price: 3000, category: "drinks" },
    { name: "Tequila Shot", desc: "Classic high-quality tequila shot (18+ only)", price: 2000, category: "drinks" },

    // SPECIALS
    { name: "Dubai Strawberry Cup (Small)", desc: "Akure signature special dessert cup swirl", price: 6500, category: "specials", badge: "NEW" },
    { name: "Dubai Strawberry Cup (Big)", desc: "Akure signature special dessert cup double scoop swirl", price: 8000, category: "specials", badge: "NEW" },
  ];

  const categories = [
    { id: "all", name: "All Sweets", emoji: "🍭" },
    { id: "icecream", name: "Gelato / Ice Cream", emoji: "🍦" },
    { id: "toppings", name: "Toppings", emoji: "🍬" },
    { id: "food", name: "Hot Meals", emoji: "🍜" },
    { id: "snacks", name: "Snacks & Waffles", emoji: "🥞" },
    { id: "drinks", name: "Coffee & Drinks", emoji: "☕" },
    { id: "specials", name: "Specials", emoji: "⭐" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

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
            Browse our selections prepared with care in our Southgate kitchen. Choose your favorites and head to the treat builder to compile your WhatsApp order.
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
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka font-bold rounded-full shadow-md hover:scale-105 transition-transform"
          >
            <ShoppingCart size={18} />
            Launch Treat Builder
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
              <div key={index} className="glossy-card p-6 flex flex-col justify-between relative overflow-hidden">
                {item.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-white bg-gradient-to-r from-pink-primary to-amber-500 px-2 py-0.5 rounded-md shadow-sm">
                    {item.badge}
                  </span>
                )}
                
                <div>
                  <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2 flex items-center justify-between pr-14">
                    {item.name}
                  </h3>
                  
                  {item.desc && (
                    <p className="font-poppins text-text-light text-xs md:text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-pink-50/50 flex justify-between items-center">
                  {/* Prices display */}
                  {item.prices ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light/50 font-bold uppercase tracking-wider">Sizes</span>
                      <div className="flex gap-2 mt-1">
                        {item.prices.map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-pink-50 border border-pink-100 text-pink-primary text-xs font-bold rounded-md"
                          >
                            ₦{p.toLocaleString()}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light/50 font-bold uppercase tracking-wider">Price</span>
                      <span className="font-poppins text-lg font-bold text-pink-primary mt-0.5">
                        {item.price === 0 ? "FREE" : `₦${item.price?.toLocaleString()}`}
                      </span>
                    </div>
                  )}

                  {/* Add action */}
                  <Link
                    href="/build-your-treat"
                    className="p-2.5 bg-pink-50 hover:bg-pink-primary text-pink-primary hover:text-white rounded-full transition-colors duration-300"
                  >
                    <ShoppingCart size={16} />
                  </Link>
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
