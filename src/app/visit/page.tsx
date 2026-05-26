"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, MapPin, Clock, Truck, ChevronRight } from "lucide-react";
import Particles from "@/components/Particles";

export default function VisitPage() {
  const [inquiryText, setInquiryText] = useState("");

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText) return;
    const message = `Hello Shaytee's Treat! I have an inquiry:
${inquiryText}

Could you please confirm the details? Thank you!`;
    const url = `https://wa.me/2348162125710?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8">
      {/* Background Particles */}
      <Particles />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
            Come Visit Us
          </span>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-chocolate mt-3 mb-4">
            Find Us & Chat 📍
          </h1>
          <p className="font-poppins text-text-light text-sm md:text-base leading-relaxed">
            Have questions about pricing, special orders, or delivery coverage? Reach out directly or check our locations near FUTA Southgate.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Contact Details (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Shop Location Details Card */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-6 flex items-center gap-2">
                <MapPin className="text-pink-primary" size={22} />
                Our Locations
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100 text-pink-primary font-bold">
                    🏪
                  </div>
                  <div>
                    <h4 className="font-fredoka text-base font-bold text-chocolate">FUTA Southgate Shop</h4>
                    <p className="font-poppins text-text-light text-xs md:text-sm mt-1 leading-relaxed">
                      Adjacent Atolagbe Shopping Complex, Southgate Area, FUTA, Akure, Ondo State.
                    </p>
                    <span className="inline-block mt-2 text-[10px] bg-pink-100 text-pink-dark px-2 py-0.5 rounded font-bold uppercase">
                      Exact Address Pending Confirmation
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100 text-pink-primary font-bold">
                    🛵
                  </div>
                  <div>
                    <h4 className="font-fredoka text-base font-bold text-chocolate">Delivery Coverages</h4>
                    <p className="font-poppins text-text-light text-xs md:text-sm mt-1 leading-relaxed">
                      Akure campus deliveries, Southgate neighborhoods, and select Akure urban areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contacts Card */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-6 flex items-center gap-2">
                <Clock className="text-pink-primary" size={22} />
                Connect With Us
              </h3>

              <div className="flex flex-col gap-4">
                <a
                  href="https://wa.me/2348162125710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25d366] hover:bg-[#128c7e] text-white font-fredoka font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp (08162125710)
                </a>

                <a
                  href="tel:08162125710"
                  className="w-full py-3 bg-pink-primary hover:bg-pink-dark text-white font-fredoka font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call Shop Hotline
                </a>
              </div>
            </div>

          </div>

          {/* Map Visual / Inquiry Form (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Map Mockup container */}
            <div className="glossy-card p-6 overflow-hidden">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-4">
                Southgate Map View 🗺️
              </h3>
              
              {/* Mock Map graphics */}
              <div className="w-full h-64 bg-pink-50 border border-pink-100 rounded-2xl relative flex items-center justify-center overflow-hidden">
                {/* SVG pattern representing grid streets */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                
                {/* Visual streets and markers */}
                <div className="absolute top-1/2 left-1/4 w-full h-4 bg-amber-200/40 rotate-12" />
                <div className="absolute top-1/4 left-1/2 w-4 h-full bg-amber-200/40 -rotate-45" />

                {/* Pin marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-pink-primary flex items-center justify-center text-white border-2 border-white shadow-lg text-lg">
                    🍦
                  </div>
                  <div className="bg-chocolate text-white text-[10px] font-bold px-2 py-1 rounded shadow-md mt-2 whitespace-nowrap">
                    Shaytee's Treat Southgate Shop
                  </div>
                </div>

                <span className="absolute bottom-3 right-4 text-[10px] text-text-light/50 font-bold bg-white/60 px-2 py-1 rounded">
                  *Map visuals are preview only.
                </span>
              </div>
            </div>

            {/* Custom inquiry preparer */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2">
                Quick Inquiry Draft
              </h3>
              <p className="font-poppins text-text-light text-xs mb-4">
                Type your questions below and we will automatically draft it into a WhatsApp message template.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <textarea
                  rows={3}
                  placeholder="e.g., Do you deliver to North Gate library area? / Can I pre-order a custom waffle box for Saturday?"
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="w-full p-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-primary/20 text-sm font-poppins"
                  required
                />
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-chocolate hover:bg-pink-dark text-white font-fredoka font-bold rounded-full transition-colors flex items-center gap-1 text-sm shadow-md"
                >
                  Draft to WhatsApp
                  <ChevronRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Closing Hours / Delivery notice footer banner */}
        <div className="glossy-card p-6 bg-pink-primary/5 border border-pink-100 text-center max-w-4xl mx-auto">
          <Clock className="text-pink-primary mx-auto mb-3" size={24} />
          <h4 className="font-fredoka text-base font-bold text-chocolate">Operation Details Notice</h4>
          <p className="font-poppins text-text-light text-xs md:text-sm mt-1 max-w-2xl mx-auto leading-relaxed">
            Opening hours, exact delivery boundaries, product availability, and shipping charges can be confirmed directly by Shaytee's Treat before ordering.
          </p>
        </div>

      </div>
    </div>
  );
}
