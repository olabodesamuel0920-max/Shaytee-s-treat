import React from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, FileText, Compass, CheckCircle2, ChevronRight } from "lucide-react";
import FloatDessert from "@/components/FloatDessert";
import Particles from "@/components/Particles";
import { menuData } from "@/lib/menu-data";

export default function Home() {
  const benefits = [
    {
      title: "No Pinch-to-Zoom Flyers",
      desc: "Browse a clean, mobile-optimized menu that displays prices and customization options clearly without resizing images.",
      icon: <FileText className="text-pink-primary" size={24} />,
    },
    {
      title: "Clear Order Formatting",
      desc: "Customize your ice cream toppings, sizes, and extras visually, preventing errors in preparation.",
      icon: <CheckCircle2 className="text-pink-primary" size={24} />,
    },
    {
      title: "QR Menu Ready",
      desc: "Designed to be loaded instantly via a QR code scan at the physical shop counter or from social media pages.",
      icon: <Sparkles className="text-pink-primary" size={24} />,
    },
    {
      title: "Auto-Generated WhatsApp Order",
      desc: "Build your treat and tap a button to generate a structured message detailing your exact selections ready to send.",
      icon: <MessageCircle className="text-pink-primary" size={24} />,
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background Particles */}
      <Particles />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] bg-gradient-to-b from-pink-primary/20 via-pink-light/10 to-cream flex items-center justify-center px-4 md:px-8 py-12 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-pink-primary/10 border border-pink-primary/30 rounded-full text-pink-primary font-bold text-xs md:text-sm tracking-wide mb-6 animate-pulse-slow">
              ✨ AKURE DESSERT EXPERIENCE
            </span>
            <h1 className="font-fredoka text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-chocolate tracking-tight drop-shadow-sm">
              Shaytee's Treat <br />
              <span className="bg-gradient-to-r from-pink-primary to-pink-light bg-clip-text text-transparent">
                Digital Dessert World
              </span>
            </h1>
            <p className="font-poppins text-base md:text-lg text-text-light max-w-xl mb-8 leading-relaxed">
              {menuData.tagline} Build your perfect treat, explore the menu, and send your order straight to WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
              <Link
                href="/build-your-treat"
                className="px-8 py-4 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka text-lg font-bold rounded-full shadow-lg hover:shadow-pink-primary/20 hover:scale-105 transition-all duration-300 text-center"
              >
                🎨 Build My Treat
              </Link>
              <Link
                href="/menu"
                className="px-8 py-4 bg-white text-pink-primary border-2 border-pink-primary/20 hover:border-pink-primary/60 font-fredoka text-lg font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300 text-center"
              >
                📋 View Menu
              </Link>
              <a
                href={`https://wa.me/${menuData.contact.replace(/[\s+]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25d366] text-white font-fredoka text-lg font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                WhatsApp Chat
              </a>
            </div>
            {/* Quick Note */}
            <p className="text-xs text-text-light/60 mt-4 italic">
              *Locations and opening hours: To be confirmed by Shaytee's Treat.
            </p>
          </div>

          {/* Hero Right Content (3D-lite Dessert View) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <FloatDessert />
          </div>
        </div>
      </section>

      {/* VIBE OCCASIONS CATEGORIES */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-y border-pink-50 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
              Perfect For Every Vibe 🎒
            </h2>
            <p className="font-poppins text-text-light text-sm md:text-base">
              Shaytee's Treat fits right into your schedule, whatever the day demands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData.vibe_categories.map((occ, idx) => (
              <Link
                key={idx}
                href={`/menu`}
                className="glossy-card group overflow-hidden flex flex-col justify-between"
              >
                {/* Image top half */}
                <div className="w-full aspect-[4/3] overflow-hidden relative border-b border-pink-50 bg-pink-50/30 p-4">
                  <img
                    src={occ.image.startsWith("/") ? occ.image : `/images/${occ.image}`}
                    alt={occ.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl animate-bounce-slow" style={{ animationDelay: `${idx * 0.25}s` }}>
                    {occ.icon}
                  </span>
                </div>

                {/* Content bottom half */}
                <div className="p-5 flex justify-between items-center bg-white/40">
                  <div>
                    <h3 className="font-fredoka text-lg font-bold text-chocolate group-hover:text-pink-primary transition-colors">
                      {occ.name}
                    </h3>
                    <p className="text-xs text-text-light mt-0.5">Explore matching treats</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-50 group-hover:bg-pink-primary group-hover:text-white flex items-center justify-center text-pink-primary transition-all shadow-sm">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BUILD YOUR TREAT VISUALLY (BOARD IMAGES) */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-cream to-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
              Ice Cream Station
            </span>
            <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mt-3 mb-4">
              Build Your Treat Visually 🍨
            </h2>
            <p className="font-poppins text-text-light text-sm md:text-base">
              Swipe through our serving sizes, flavor choices, drizzles, extra toppings, and hot snacks to see how your dream treat comes together!
            </p>
          </div>

          {/* Cards slider */}
          <div className="flex overflow-x-auto gap-6 snap-x pb-8 scrollbar-none md:grid md:grid-cols-7 md:overflow-x-visible">
            {[
              {
                title: "Cup Sizes & Serving Styles",
                desc: "Choose between cones, small cups, big cups, or bubble waffles.",
                image: "/assets/shaytees/boards/cup-sizes-and-serving-styles.png",
              },
              {
                title: "Flavour Choices",
                desc: "Strawberry, chocolate, vanilla, or premium swirl mixes.",
                image: "/assets/shaytees/boards/flavour-choices.png",
              },
              {
                title: "Drizzles & Included Toppings",
                desc: "Chocolate, strawberry, honey sauce, and whipped cream.",
                image: "/assets/shaytees/boards/drizzles-and-included-toppings.png",
              },
              {
                title: "Extra Toppings",
                desc: "Crunchy Oreo, M&Ms, wafer sticks, gummy bears, and peanuts.",
                image: "/assets/shaytees/boards/extra-toppings.png",
              },
              {
                title: "Hot Snacks & Extras",
                desc: "Noodles, crispy shawarmas, corn dogs, and premium popcorn.",
                image: "/assets/shaytees/boards/hot-snacks-and-extras.png",
              },
              {
                title: "Coffee & Drinks",
                desc: "Freshly brewed cappuccino, lattes, espresso, and premium iced mochas.",
                image: "/assets/shaytees/boards/coffee_and_drinks_board.png",
              },
              {
                title: "Food, Waffles & Extras",
                desc: "Toast bread, sandwiches, fresh chicken salad, and sweet waffle extras.",
                image: "/assets/shaytees/boards/food_waffles_extras_board.png",
              },
            ].map((board, idx) => (
              <div
                key={idx}
                className="w-[280px] shrink-0 snap-center glossy-card bg-white/60 p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-103 md:w-auto flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-pink-50 shadow-inner bg-pink-50/20 relative mb-4 p-3">
                    <img
                      src={board.image}
                      alt={board.title}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-fredoka text-base font-bold text-chocolate mb-2 leading-tight">
                    {board.title}
                  </h3>
                  <p className="font-poppins text-text-light text-xs leading-relaxed">
                    {board.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/build-your-treat"
              className="px-8 py-3.5 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka text-base font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-center"
            >
              🎨 Build My Treat
            </Link>
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-white text-pink-primary border-2 border-pink-primary/20 hover:border-pink-primary/60 font-fredoka text-base font-bold rounded-full shadow-md hover:scale-105 transition-all duration-300 text-center"
            >
              📋 View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* WHY DIGITAL MENU */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-fredoka text-3xl md:text-4xl lg:text-5xl font-bold text-chocolate mb-4">
            Why This is More Than a Menu 🍭
          </h2>
          <p className="font-poppins text-text-light text-sm md:text-base">
            No more messy screenshot orders or squinting at phone flyers. We have rebuilt the street-side ordering experience for the digital era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div key={index} className="glossy-card p-6 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center mb-6 border border-pink-100 shadow-inner">
                {item.icon}
              </div>
              <h3 className="font-fredoka text-lg font-bold text-chocolate mb-3">
                {item.title}
              </h3>
              <p className="font-poppins text-text-light text-xs md:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
