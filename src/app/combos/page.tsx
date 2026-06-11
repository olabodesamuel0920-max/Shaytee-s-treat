"use client";

import React from "react";
import Link from "next/link";
import { Heart, Star, Gift, Sparkles, ChevronRight } from "lucide-react";
import Particles from "@/components/Particles";

interface Combo {
  name: string;
  desc: string;
  items: string[];
  emoji: string;
  badge?: string;
  estimatedPrice: number;
  image: string;
  assetThumbnails: string[];
  params: {
    flavor: string;
    size: string;
    toppings: string[];
    drizzle?: string;
    extras: string[];
  };
}

export default function CombosPage() {
  const combosList: Combo[] = [
    {
      name: "After Class Treat",
      desc: "Perfect way to reward yourself or hang out with friends after a long day of lectures at FUTA.",
      items: ["1 Medium Small Cup Ice Cream (Strawberry Delight)", "Oreo Crumbles topping", "1 Milky Popcorn (Medium)"],
      emoji: "🎒",
      badge: "STUDENT FAVORITE",
      estimatedPrice: 5000,
      image: "/assets/shaytees/regen-v2/gelato/strawberry_delight.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/strawberry_delight.png",
        "/assets/shaytees/individual_assets/toppings/oreo-crumbles.png",
        "/assets/shaytees/individual_assets/snacks/popcorn.png"
      ],
      params: {
        flavor: "Strawberry Delight",
        size: "Medium Small Cup",
        toppings: ["Oreo Crumbles"],
        extras: ["Milky Popcorn (Medium)"],
      }
    },
    {
      name: "Birthday Treat Box",
      desc: "Celebrate your special day or surprise a friend with a curated sweet overload birthday package.",
      items: ["1 Large Big Cup Ice Cream (Chocolate Bliss)", "Box of 12 Mini Pancakes + 2 Free Toppings", "Milky Popcorn (Large)"],
      emoji: "🎂",
      badge: "PARTY SPECIAL",
      estimatedPrice: 12000,
      image: "/assets/shaytees/mini-pancakes/mini_pancakes_box_12.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/chocolate_bliss.png",
        "/assets/shaytees/mini-pancakes/mini_pancakes_box_12.png",
        "/assets/shaytees/individual_assets/snacks/popcorn.png"
      ],
      params: {
        flavor: "Chocolate Bliss",
        size: "Large Big Cup",
        toppings: ["Wafers", "Chocolate Chips"],
        extras: ["Mini Pancakes (Box of 12)", "Milky Popcorn (Large)"],
      }
    },
    {
      name: "Date Night Dessert",
      desc: "A romantic sweet treat combo designed to be shared. Sweeten up your evening with your special someone.",
      items: ["1 Medium Small Cup Ice Cream (Vanilla Dream)", "Toppings: Chocolate Chips & Sprinkles", "1 Bubble Waffle + Honey Drizzle"],
      emoji: "💖",
      badge: "SHARE FOR TWO",
      estimatedPrice: 7000,
      image: "/assets/shaytees/regen-v2/waffles/bubble_waffles.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/vanilla_dream.png",
        "/assets/shaytees/individual_assets/toppings/chocolate-chips.png",
        "/assets/shaytees/regen-v2/waffles/bubble_waffles.png"
      ],
      params: {
        flavor: "Vanilla Dream",
        size: "Medium Small Cup",
        toppings: ["Chocolate Chips", "Sprinkles"],
        drizzle: "Honey Drizzle",
        extras: ["Bubble Waffle"],
      }
    },
    {
      name: "Movie & Popcorn Combo",
      desc: "Snack buddy package for your chill movie nights at home. Keep the sweet crunch flowing.",
      items: ["1 Small Cone Ice Cream (Vanilla Dream)", "1 Caramel Popcorn (Large)", "1 Milky Popcorn (Large)"],
      emoji: "🍿",
      badge: "CRUNCH BOX",
      estimatedPrice: 6500,
      image: "/assets/shaytees/individual_assets/snacks/popcorn.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/vanilla_dream.png",
        "/assets/shaytees/individual_assets/snacks/popcorn.png"
      ],
      params: {
        flavor: "Vanilla Dream",
        size: "Small Cone",
        toppings: [],
        extras: ["Caramel Popcorn (Large)", "Milky Popcorn (Large)"],
      }
    },
    {
      name: "Sweet Tooth Overload",
      desc: "The ultimate indulgence package for heavy dessert cravings. Rich, chocolatey, and absolute bliss.",
      items: ["1 Medium Small Cup Chocolate Bliss Gelato", "Toppings: M&Ms & Wafers", "Box of 6 Mini Pancakes + Oreo topping", "1 Hot Mocha coffee"],
      emoji: "🍩",
      badge: "ULTIMATE SWEET",
      estimatedPrice: 10000,
      image: "/assets/shaytees/mini-pancakes/mini_pancakes_box_6.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/chocolate_bliss.png",
        "/assets/shaytees/individual_assets/toppings/m-and-ms.png",
        "/assets/shaytees/mini-pancakes/mini_pancakes_box_6.png"
      ],
      params: {
        flavor: "Chocolate Bliss",
        size: "Medium Small Cup",
        toppings: ["M&Ms", "Wafers"],
        extras: ["Mini Pancakes (Box of 6)", "Mocha"],
      }
    },
    {
      name: "FUTA Chill Combo",
      desc: "Our budget-friendly student chillout selection. Stay refreshed during those library study breaks.",
      items: ["1 Small Cone Vanilla scoop", "1 Plain Waffle + Syrup", "1 Latte Coffee"],
      emoji: "🎓",
      badge: "BUDGET VIBE",
      estimatedPrice: 8000,
      image: "/assets/shaytees/boards/food_waffles_extras_board.png",
      assetThumbnails: [
        "/assets/shaytees/regen-v2/gelato/vanilla_dream.png",
        "/assets/shaytees/regen-v2/waffles/plain_waffles.png",
        "/assets/shaytees/regen-v1/coffee/latte.png"
      ],
      params: {
        flavor: "Vanilla Dream",
        size: "Small Cone",
        toppings: [],
        extras: ["Plain Waffle + Syrup", "Latte"],
      }
    },
  ];

  const getComboLink = (combo: Combo) => {
    const searchParams = new URLSearchParams();
    searchParams.set("flavor", combo.params.flavor);
    searchParams.set("size", combo.params.size);
    if (combo.params.toppings.length > 0) {
      searchParams.set("toppings", combo.params.toppings.join(","));
    }
    if (combo.params.drizzle) {
      searchParams.set("drizzle", combo.params.drizzle);
    }
    if (combo.params.extras.length > 0) {
      searchParams.set("extras", combo.params.extras.join(","));
    }
    return `/build-your-treat?${searchParams.toString()}`;
  };

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8">
      {/* Background Particles */}
      <Particles />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
            Chill Packages
          </span>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-chocolate mt-3 mb-4">
            Sweet Combo Offers 🎁
          </h1>
          <p className="font-poppins text-text-light text-sm md:text-base leading-relaxed">
            Experience our handpicked combinations matching every mood. Tap a combo to load it directly into our treat customizer.
          </p>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combosList.map((combo, idx) => {
            const builderLink = getComboLink(combo);
            return (
              <div
                key={idx}
                className="glossy-card overflow-hidden flex flex-col justify-between relative"
              >
                {/* Visual Header Image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative border-b border-pink-50 bg-pink-50/30 p-4">
                  <img
                    src={combo.image.startsWith("/") ? combo.image : `/images/${combo.image}`}
                    alt={combo.name}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {combo.badge && (
                    <span className="absolute top-4 right-4 text-[9px] font-bold text-white bg-gradient-to-r from-pink-primary to-pink-light px-2 py-0.5 rounded shadow-sm">
                      {combo.badge}
                    </span>
                  )}
                  <span className="absolute bottom-2 left-4 text-3xl animate-bounce-slow" style={{ animationDelay: `${idx * 0.15}s` }}>
                    {combo.emoji}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between bg-white/40">
                  <div>
                    <h3 className="font-fredoka text-xl font-bold text-chocolate leading-tight pr-8 mb-3">
                      {combo.name}
                    </h3>

                    {/* Description */}
                    <p className="font-poppins text-text-light text-xs md:text-sm leading-relaxed mb-4">
                      {combo.desc}
                    </p>

                    {/* Visual Asset Previews */}
                    <div className="flex -space-x-2 mb-4 items-center">
                      {combo.assetThumbnails.map((thumbnail, thumbIdx) => (
                        <div
                          key={thumbIdx}
                          className="w-7 h-7 rounded-full border border-pink-100 overflow-hidden bg-white shadow-sm shrink-0 relative transition-transform hover:scale-110 hover:z-10"
                        >
                          <img
                            src={thumbnail}
                            alt="Combo item thumbnail"
                            className="w-full h-full object-contain p-0.5"
                          />
                        </div>
                      ))}
                      <span className="text-[9px] font-bold text-pink-primary font-poppins pl-2.5 uppercase tracking-wider">
                        Assets Connected
                      </span>
                    </div>

                    {/* Items list */}
                    <div className="bg-pink-50/40 rounded-2xl p-4 border border-pink-100/50 mb-6">
                      <h4 className="font-fredoka text-xs font-bold text-pink-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles size={12} />
                        What's Included:
                      </h4>
                      <ul className="space-y-2 text-xs font-poppins text-text-dark">
                        {combo.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1.5">
                            <span className="text-pink-primary shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-pink-100/40 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-light/50 font-bold uppercase tracking-wider">Est. Price</span>
                      <span className="font-fredoka text-lg font-bold text-pink-primary mt-0.5">
                        ₦{combo.estimatedPrice.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      href={builderLink}
                      className="px-4 py-2.5 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka text-xs font-bold rounded-full shadow-md flex items-center gap-1 transition-all hover:scale-105"
                    >
                      Load into Builder 🍦
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-xs font-semibold">
            <Gift size={16} />
            <span>Final combo pricing can be confirmed by Shaytee's Treat.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
