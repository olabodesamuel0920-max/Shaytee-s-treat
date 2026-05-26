"use client";

import React from "react";

export default function FloatDessert() {
  return (
    <div className="relative w-72 h-96 md:w-96 md:h-[450px] preserve-3d flex items-center justify-center select-none scale-90 md:scale-100">
      {/* Background Soft Glow Blobs */}
      <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full blob-pink animate-pulse-slow z-0" />
      <div className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full blob-yellow animate-pulse-slow [animation-delay:2s] z-0" />

      {/* Orbiting Toppings Layer 1 (Clockwise) */}
      <div className="absolute inset-0 pointer-events-none z-20 animate-orbit-clockwise">
        {/* Floating Waffle piece */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-caramel rounded-md border-2 border-white shadow-lg flex items-center justify-center font-bold text-lg select-none">
          🧇
        </div>
        {/* Floating Cherry */}
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm">
          🍒
        </div>
      </div>

      {/* Orbiting Toppings Layer 2 (Counter-Clockwise) */}
      <div className="absolute inset-0 pointer-events-none z-20 animate-orbit-counter">
        {/* Floating Popcorn */}
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-popcorn rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm">
          🍿
        </div>
        {/* Floating Oreo Cookie */}
        <div className="absolute bottom-1/3 left-1/4 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-neutral-800 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm font-bold text-white">
          🍪
        </div>
      </div>

      {/* Main Dessert Cup (Floating Medium) */}
      <div className="relative w-56 h-80 md:w-64 md:h-96 flex flex-col justify-end items-center animate-float-slow z-10">
        
        {/* Whipped Cream & Toppings */}
        <div className="absolute bottom-[210px] md:bottom-[250px] w-24 h-16 bg-white rounded-full shadow-md z-30 flex items-center justify-center">
          <div className="w-16 h-10 bg-pink-100 rounded-full transform -rotate-12 absolute -top-4 shadow-sm" />
          <div className="w-8 h-8 bg-red-600 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 shadow-md border-2 border-white flex items-center justify-center text-xs animate-bounce-slow">
            🍒
          </div>
          <div className="absolute w-2 h-8 bg-amber-800 rounded-full rotate-45 -right-2 top-2 shadow-sm" /> {/* Wafer stick */}
        </div>

        {/* Scoop 3: Chocolate Bliss */}
        <div className="absolute bottom-[170px] md:bottom-[200px] w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-chocolate to-amber-700 shadow-md border-2 border-white/20 z-20" />

        {/* Scoop 2: Strawberry Delight */}
        <div className="absolute bottom-[100px] md:bottom-[120px] w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-pink-primary to-pink-light shadow-md border-2 border-white/20 z-15" />

        {/* Scoop 1: Vanilla Dream */}
        <div className="absolute bottom-[30px] md:bottom-[40px] w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-tr from-vanilla via-amber-50 to-white shadow-md border-2 border-white/20 z-10" />

        {/* Glass Cup Dessert Bowl */}
        <div className="w-48 h-40 md:w-56 md:h-48 bg-white/30 backdrop-blur-md rounded-b-[100px] rounded-t-[10px] border border-white/40 shadow-2xl relative z-40 overflow-hidden flex flex-col justify-between items-center p-4">
          {/* Glass Glossy reflections */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/25 skew-y-6 transform -translate-y-8" />
          <div className="absolute top-0 right-4 w-4 h-full bg-white/10" />

          {/* Drizzle & Sprinkles inside glass overlay */}
          <div className="w-full flex justify-around mt-4 opacity-75">
            <span className="text-xs">🍬</span>
            <span className="text-xs">✨</span>
            <span className="text-xs">🍬</span>
          </div>

          {/* Logo badge in center of cup */}
          <div className="bg-pink-primary/80 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-white text-xxs md:text-xs font-bold tracking-widest uppercase font-fredoka shadow-md">
            Shaytee's
          </div>

          <div className="text-[10px] text-pink-dark/60 font-semibold tracking-wider">
            PREVIEW EXPERIENCES
          </div>
        </div>

        {/* Stand / Shadow underneath */}
        <div className="w-24 h-4 bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/20 relative z-30 -mt-1" />
        <div className="w-32 h-6 bg-black/10 rounded-full blur-md -mt-1 scale-y-50 animate-pulse-slow" />
      </div>
    </div>
  );
}
