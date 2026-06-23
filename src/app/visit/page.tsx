"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, MapPin, Clock, Compass, HelpCircle, ChevronRight, Check } from "lucide-react";
import Particles from "@/components/Particles";

interface Landmark {
  name: string;
  emoji: string;
  time: string;
  tip: string;
}

export default function VisitPage() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [inquiryText, setInquiryText] = useState("");
  
  // Time Simulation for store status
  const [simulatedHour, setSimulatedHour] = useState<number>(12);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Set initial hour on client load
  useEffect(() => {
    const currentHour = new Date().getHours();
    setSimulatedHour(currentHour);
    checkStoreStatus(currentHour);
  }, []);

  const checkStoreStatus = (hour: number) => {
    const day = new Date().getDay(); // 0 is Sunday
    if (day === 0) {
      setIsOpen(hour >= 14 && hour < 22);
    } else {
      setIsOpen(hour >= 10 && hour < 22);
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hr = parseInt(e.target.value);
    setSimulatedHour(hr);
    setIsSimulating(true);
    checkStoreStatus(hr);
  };

  const resetToRealTime = () => {
    const realHour = new Date().getHours();
    setSimulatedHour(realHour);
    setIsSimulating(false);
    checkStoreStatus(realHour);
  };

  const landmarks: Landmark[] = [
    {
      name: "Southgate Gate",
      emoji: "🏪",
      time: "10 - 15 mins",
      tip: "Meet the dispatch rider at the Southgate main arch! adjacent Atolagbe shopping complex."
    },
    {
      name: "Northgate Main",
      emoji: "🏫",
      time: "15 - 20 mins",
      tip: "Meet the rider opposite Northgate Main Gate taxi stand."
    },
    {
      name: "Obanla Junction",
      emoji: "⛪",
      time: "15 - 25 mins",
      tip: "Meet the rider at Obanla Junction opposite the church corner."
    },
    {
      name: "FUTA Highway",
      emoji: "🛵",
      time: "20 - 30 mins",
      tip: "Rider will deliver near the highway bus terminal stop."
    },
    {
      name: "Hall of Residence",
      emoji: "🎓",
      time: "25 - 35 mins",
      tip: "Rider will meet you outside your hostel entrance gate."
    },
    {
      name: "Jincheng Area",
      emoji: "🏠",
      time: "15 - 25 mins",
      tip: "Meet the rider at the Jincheng junction gate intersection."
    }
  ];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText) return;
    const locationTip = selectedLandmark ? `\n📍 Delivery Landmark: ${selectedLandmark.name}` : "";
    const message = `Hello Shaytee's Treat! I have an inquiry:${locationTip}
${inquiryText}

Could you please confirm the details? Thank you!`;
    const url = `https://wa.me/2348162125710?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Format hour for display
  const formatHourString = (hour: number) => {
    if (hour === 0) return "12:00 AM (Midnight)";
    if (hour === 12) return "12:00 PM (Noon)";
    if (hour > 12) return `${hour - 12}:00 PM`;
    return `${hour}:00 AM`;
  };

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8">
      {/* Background Particles */}
      <Particles />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pink-primary font-bold text-xs uppercase tracking-widest px-3 py-1 bg-pink-100 rounded-full">
            Come Visit Us
          </span>
          <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-chocolate mt-3 mb-4">
            Locations & Delivery Guide 📍
          </h1>
          <p className="font-poppins text-text-light text-sm md:text-base leading-relaxed">
            Quickly check our operating status, find delivery timelines around the FUTA campus, and get dispatcher tips for your area.
          </p>
        </div>

        {/* Live Store Status Indicator Box */}
        <div className="glossy-card p-6 mb-8 max-w-4xl mx-auto border-pink-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center border border-pink-100 text-2xl animate-bounce-slow">
                🕰️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-fredoka text-lg font-bold text-chocolate">Operating Hour Check</h4>
                  
                  {/* Status Badge */}
                  {isOpen ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-xs font-fredoka font-bold rounded-full shadow-sm animate-pulse-slow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Open Now 🍦
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-white text-xs font-fredoka font-bold rounded-full shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Resting up for treats 🌙
                    </span>
                  )}
                </div>
                <p className="font-poppins text-text-light text-xs mt-1">
                  Monday–Saturday: 10am–10pm <span className="mx-1">•</span> Sunday: 2pm–10pm
                </p>
              </div>
            </div>

            {/* Simulated Time Shift Slider */}
            <div className="w-full md:w-64 bg-pink-50/50 p-4 rounded-2xl border border-pink-100 flex flex-col gap-2 shrink-0">
              <div className="flex justify-between items-center text-xs font-poppins">
                <span className="font-bold text-pink-dark">Simulate Time:</span>
                <span className="font-mono bg-pink-primary/10 text-pink-primary px-1.5 py-0.5 rounded font-bold">
                  {formatHourString(simulatedHour)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                value={simulatedHour}
                onChange={handleHourChange}
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-pink-primary"
              />
              {isSimulating && (
                <button
                  onClick={resetToRealTime}
                  className="text-[10px] text-pink-primary font-bold hover:underline text-right"
                >
                  Reset to Live Time
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: Landmark Selector (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Delivery Hub selection */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2 flex items-center gap-2">
                <span>📍</span> FUTA Campus Delivery Hubs
              </h3>
              <p className="font-poppins text-text-light text-xs mb-6">
                Click your closest campus landmark to calculate dispatch timelines and dropoff instructions. (All routes and durations are estimated transit guidelines).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {landmarks.map((hub) => {
                  const isSelected = selectedLandmark?.name === hub.name;
                  return (
                    <button
                      key={hub.name}
                      onClick={() => setSelectedLandmark(hub)}
                      className={`p-4 rounded-2xl border font-poppins text-xs font-semibold flex flex-col items-center justify-center text-center transition-all duration-300 gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-pink-primary to-pink-light text-white border-transparent shadow-md scale-103"
                          : "bg-white/60 text-text-dark border-pink-100 hover:bg-pink-50/50"
                      }`}
                    >
                      <span className="text-2xl">{hub.emoji}</span>
                      <span className="font-bold">{hub.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Landmark Details Card */}
              {selectedLandmark && (
                <div className="mt-6 p-5 bg-gradient-to-r from-pink-primary/5 to-pink-light/5 border border-pink-100 rounded-2xl animate-fadeIn">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-fredoka text-sm font-bold text-pink-dark uppercase tracking-wider">
                        Estimated Timeline for {selectedLandmark.name}
                      </h4>
                      <p className="font-fredoka text-lg font-bold text-chocolate mt-1">
                        🛵 {selectedLandmark.time} <span className="text-xs font-normal text-text-light/60">(Estimated Timeline)</span>
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-bold rounded flex items-center gap-1">
                      <Check size={10} /> Active Hub
                    </span>
                  </div>
                  <p className="font-poppins text-xs text-text-light mt-3 leading-relaxed">
                    <strong>Suggested Dispatch Tip:</strong> {selectedLandmark.tip}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Inquiry Form */}
            <div className="glossy-card p-6 bg-white">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-2">
                Quick Inquiry Draft
              </h3>
              <p className="font-poppins text-text-light text-xs mb-4">
                Have specific dropoff requests? Type it here to prepare a pre-filled WhatsApp inquiry.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <textarea
                  rows={3}
                  placeholder="e.g. Do you deliver to Obanla Junction late in the evening? / Can I request a delivery to Hall 2 front block?"
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="w-full p-4 bg-pink-50/50 border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-primary/20 text-xs md:text-sm font-poppins"
                  required
                />
                
                <button
                  type="submit"
                  className="px-6 py-3 bg-chocolate hover:bg-pink-dark text-white font-fredoka font-bold rounded-full transition-colors flex items-center gap-1 text-xs shadow-md cursor-pointer"
                >
                  Draft to WhatsApp
                  <ChevronRight size={16} />
                </button>
              </form>
            </div>

          </div>

          {/* RIGHT: Quick Contacts & Map (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contacts Card */}
            <div className="glossy-card p-6 bg-white">
              <h3 className="font-fredoka text-xl font-bold text-chocolate mb-6 flex items-center gap-2">
                <span>📱</span> Hotline Channels
              </h3>

              <div className="flex flex-col gap-3.5">
                <a
                  href="https://wa.me/2348162125710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25d366] hover:bg-[#128c7e] text-white font-fredoka font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>

                <a
                  href="tel:08162125710"
                  className="w-full py-3 bg-pink-primary hover:bg-pink-dark text-white font-fredoka font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102"
                >
                  <Phone size={18} />
                  Call Shop Hotline
                </a>

                <a
                  href="https://www.tiktok.com/@shaytee.s.treat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-black hover:bg-zinc-800 text-white font-fredoka font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 448 512">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39t61,5.61Z"/>
                  </svg>
                  TikTok: @shaytee.s.treat
                </a>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="glossy-card p-6">
              <h3 className="font-fredoka text-sm font-bold text-pink-dark uppercase tracking-widest mb-4">
                Shop Map & Location
              </h3>
              
              <div className="w-full h-48 bg-pink-50 border border-pink-100 rounded-2xl relative flex items-center justify-center overflow-hidden mb-4">
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="visit-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#visit-grid)" />
                </svg>
                
                <div className="absolute top-1/2 left-0 w-full h-2.5 bg-amber-200/40 rotate-6" />
                <div className="absolute top-0 left-1/3 w-3 h-full bg-amber-200/40 -rotate-12" />

                <div className="relative z-10 flex flex-col items-center animate-bounce-slow">
                  <div className="w-9 h-9 rounded-full bg-pink-primary flex items-center justify-center text-white border-2 border-white shadow-md text-sm">
                    🏪
                  </div>
                  <span className="bg-chocolate text-white text-[9px] font-bold px-2 py-0.5 rounded shadow mt-1">
                    Atolagbe Shopping Complex
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs font-poppins text-text-light leading-relaxed">
                <MapPin size={16} className="text-pink-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-chocolate">Physical Address:</p>
                  <p>FUTA Southgate, Atolagbe Shopping Complex, Akure</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Note disclaimer */}
        <div className="glossy-card p-6 bg-pink-primary/5 border border-pink-100 text-center max-w-4xl mx-auto">
          <HelpCircle className="text-pink-primary mx-auto mb-3" size={24} />
          <h4 className="font-fredoka text-base font-bold text-chocolate">Operation Details Disclaimer</h4>
          <p className="font-poppins text-text-light text-xs md:text-sm mt-1 max-w-2xl mx-auto leading-relaxed">
            Delivery locations are shown for guidance. Delivery fee can be confirmed on WhatsApp or with the delivery rider before checkout. All operational details and order processing times are confirmed on WhatsApp.
          </p>
        </div>

      </div>
    </div>
  );
}
