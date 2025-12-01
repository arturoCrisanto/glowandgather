"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background">
      <nav className="flex flex-row justify-between mx-auto shadow-md sm:px-10 px-5 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="icons/candle.svg"
            alt="logo"
            width={50}
            height={50}
            className="md:w-[50px] md:h-[50px] w-8 h-8"
          />
          <span className="text-2xl font-bold sm:text-xl hidden sm:block">Glow and Gather</span>
          <span className="text-lg font-bold sm:hidden">Glow and Gather</span>
        </Link>

        {/* Desktop Navigation - Products, About, Contact */}
        <div className="hidden md:flex items-center space-x-8 text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
          <Link 
            href="/products" 
            className="relative group hover:text-primary transition-colors duration-300" 
            title="Products page"
          >
            Products
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/about" 
            className="relative group hover:text-primary transition-colors duration-300" 
            title="About Us page"
          >
            About Us
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="/contact" 
            className="relative group hover:text-primary transition-colors duration-300" 
            title="Contact Us page"
          >
            Contact Us
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Mobile Burger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          title="Toggle menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col space-y-4 px-5 py-4 text-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
            <Link
              href="/products"
              className="hover:text-primary hover:translate-x-2 transition-all duration-300"
              title="Products page"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="hover:text-primary hover:translate-x-2 transition-all duration-300"
              title="About Us page"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-primary hover:translate-x-2 transition-all duration-300"
              title="Contact Us page"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;