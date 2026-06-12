"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, UserCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolidNavbar = isScrolled || pathname !== "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Build Your Treat", href: "/build-your-treat" },
    { name: "Combos", href: "/combos" },
    { name: "Visit & Contact", href: "/visit" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8 ${
        showSolidNavbar
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className={`font-fredoka text-2xl md:text-3xl font-bold flex items-center gap-2 transition-colors duration-300 ${
            showSolidNavbar ? "text-pink-primary" : "text-chocolate"
          }`}
        >
          <span className="animate-bounce-slow">🍦</span>
          <span className="bg-gradient-to-r from-pink-primary via-pink-light to-caramel bg-clip-text text-transparent">
            Shaytee's Treat
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-poppins text-sm font-semibold transition-all duration-200 hover:text-pink-primary relative py-2 ${
                    isActive(link.href)
                      ? "text-pink-primary"
                      : showSolidNavbar
                      ? "text-text-dark"
                      : "text-chocolate/80 hover:text-pink-primary"
                  }`}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-primary rounded-full animate-pulse-slow" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          <Link
            href="/build-your-treat"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-primary to-pink-light text-white font-fredoka font-bold rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          >
            <ShoppingCart size={18} />
            Build Order
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/build-your-treat"
            className="p-2 bg-gradient-to-r from-pink-primary to-pink-light text-white rounded-full shadow-md"
          >
            <ShoppingCart size={18} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full focus:outline-none transition-colors ${
              showSolidNavbar ? "text-text-dark hover:bg-pink-50" : "text-chocolate hover:bg-pink-50/20"
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-pink-100 shadow-xl px-6 py-6 md:hidden flex flex-col gap-4 animate-fadeIn">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-poppins text-lg font-semibold py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-pink-primary border-l-4 border-pink-primary pl-2"
                      : "text-text-dark hover:text-pink-primary pl-2"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="h-px bg-pink-100 my-2" />
          
          <Link
            href="/admin-preview"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-text-light hover:text-pink-primary text-sm font-medium pl-2"
          >
            <UserCheck size={16} />
            Owner Admin Preview
          </Link>
        </div>
      )}
    </nav>
  );
}
