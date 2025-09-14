'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NextImage from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/marbles', label: 'Marbles' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1.5">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">+91 9829051903, +91 9887971903</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-xs sm:text-sm">suranastonexindia@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:block text-gray-300 text-xs font-light">
                Premium Marbles & Natural Stones
              </div>
              <div className="text-gray-400 text-xs whitespace-nowrap">
                Mon-Fri: 9AM-7PM
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-4" prefetch={true}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-xl overflow-hidden shadow-lg"
              >
                <NextImage
                  src="/logo.jpeg"
                  alt="Surana Stonex Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-light tracking-wider text-gray-900">
                  SURANA STONEX
                </span>
                <span className="text-xs sm:text-sm text-gray-500 tracking-widest hidden sm:block font-medium">
                  PREMIUM MARBLES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group py-2 px-1"
                  prefetch={true}
                >
                  <span className={`text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium tracking-wide text-sm relative z-10 ${
                    pathname === item.href ? 'text-gray-900' : ''
                  }`}>
                    {item.label.toUpperCase()}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile CTA Button */}
              <Button 
                className="sm:hidden bg-black hover:bg-gray-800 text-white px-3 py-1.5 text-xs font-medium rounded-lg shadow-lg"
                onClick={() => {
                  const message = `🏛️ *Surana Stonex Premium Marbles* 🏛️

📋 *Quote Request:*

Hi! I'm interested in getting a quote for premium marble services. Please provide information about:

✨ Available marble types
💰 Pricing options
📏 Size and customization options
🚚 Delivery and installation services

📞 *Contact Details:*
📧 Email: suranastonexindia@gmail.com
📱 Phone: +91 9829051903, +91 9887971903

Thank you!`;

                  const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                QUOTE
              </Button>

              {/* Desktop CTA Button */}
              <Button 
                className="hidden sm:block bg-black hover:bg-gray-800 text-white px-6 py-2.5 text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  const message = `🏛️ *Surana Stonex Premium Marbles* 🏛️

📋 *Quote Request:*

Hi! I'm interested in getting a quote for premium marble services. Please provide information about:

✨ Available marble types
💰 Pricing options
📏 Size and customization options
🚚 Delivery and installation services

📞 *Contact Details:*
📧 Email: suranastonexindia@gmail.com
📱 Phone: +91 9829051903, +91 9887971903

Thank you!`;

                  const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                GET QUOTE
              </Button>

              {/* Mobile menu button - Enhanced visibility */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-800 hover:text-gray-900 hover:bg-gray-100 px-4 py-4 rounded-lg border border-gray-200 shadow-sm ml-1 mr-3"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-8 h-5" /> : <Menu className="w-7 h-7" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="lg:hidden bg-white border-t-2 border-gray-300 shadow-2xl"
            >
              <div className="px-4 py-8 space-y-4">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-4 px-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold text-lg border-l-4 ${
                      pathname === item.href 
                        ? 'text-gray-900 bg-gray-100 border-gray-900' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setIsOpen(false)}
                    prefetch={true}
                  >
                    {item.label.toUpperCase()}
                  </Link>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-6 border-t-2 border-gray-200 mt-6">
                  {/* Mobile CTA */}
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => {
                      const message = `🏛️ *Surana Stonex Premium Marbles* 🏛️

📋 *Quote Request:*

Hi! I'm interested in getting a quote for premium marble services. Please provide information about:

✨ Available marble types
💰 Pricing options
📏 Size and customization options
🚚 Delivery and installation services

📞 *Contact Details:*
📧 Email: suranastonexindia@gmail.com
📱 Phone: +91 9829051903, +91 9887971903

Thank you!`;

                      const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    GET QUOTE
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
