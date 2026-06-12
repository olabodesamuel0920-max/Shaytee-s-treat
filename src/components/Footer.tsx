import React from "react";
import Link from "next/link";
import { Phone, MapPin, MessageCircle, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-chocolate text-white/90 pt-16 pb-8 px-4 md:px-8 border-t-8 border-pink-light relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand column */}
        <div className="md:col-span-2">
          <Link href="/" className="font-fredoka text-3xl font-bold flex items-center gap-2 mb-4">
            <span>🍦</span>
            <span className="bg-gradient-to-r from-pink-light to-vanilla bg-clip-text text-transparent">
              Shaytee's Treat
            </span>
          </Link>
          <p className="font-poppins text-white/70 text-sm max-w-sm mb-6 leading-relaxed">
            Welcome to the ultimate Digital Dessert World! Experience creamy scoops, fresh mini pancakes, warm bubble waffles, and delicious drinks prepared fresh in Akure.
          </p>
          <div className="flex gap-4">
            <a
              href="https://wa.me/2348162125710"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-primary transition-colors duration-300"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="tel:08162125710"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-primary transition-colors duration-300"
            >
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-fredoka text-lg text-pink-light mb-4 font-bold">Quick Links</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/menu" className="text-white/70 hover:text-pink-light transition-colors">
                📋 Our Dessert Menu
              </Link>
            </li>
            <li>
              <Link href="/build-your-treat" className="text-white/70 hover:text-pink-light transition-colors">
                🎨 Interactive Builder
              </Link>
            </li>
            <li>
              <Link href="/combos" className="text-white/70 hover:text-pink-light transition-colors">
                🎁 Combo Offers
              </Link>
            </li>
            <li>
              <Link href="/visit" className="text-white/70 hover:text-pink-light transition-colors">
                📍 Location & Visit
              </Link>
            </li>
          </ul>
        </div>

        {/* Shop Info & Preview Note */}
        <div>
          <h4 className="font-fredoka text-lg text-pink-light mb-4 font-bold">Shop Info</h4>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-pink-light shrink-0 mt-0.5" />
              <span>FUTA Southgate, Atolagbe Shopping Complex, Akure</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={18} className="text-pink-light shrink-0 mt-0.5" />
              <span>Details: To be confirmed by Shaytee's Treat</span>
            </li>
            <li className="flex items-start gap-2">
              <Shield size={18} className="text-pink-light shrink-0 mt-0.5" />
              <Link href="/admin-preview" className="hover:text-pink-light underline">
                Owner Preview Area
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-white/40">
        <p>© {new Date().getFullYear()} Shaytee's Treat. All Rights Reserved. Built for Shaytee's Treat customers.</p>
        <p className="italic bg-white/5 px-3 py-1.5 rounded-md border border-white/5 text-pink-light">
          Shaytee’s Treat digital menu and custom order experience. Final shop details are handled by Shaytee’s Treat.
        </p>
      </div>
    </footer>
  );
}
