'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                <NextImage
                  src="/logo.jpeg"
                  alt="Surana Stonex Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-light tracking-wider text-white">
                  SURANA STONEX
                </span>
                <span className="text-xs text-gray-400 tracking-widest">
                  PREMIUM MARBLES
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Leading supplier of premium marbles and natural stones. 
              Transforming spaces with timeless elegance and exceptional quality.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">COMPANY</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Our Services' },
                { href: '/gallery', label: 'Project Gallery' },
                { href: '/marbles', label: 'Marble Collection' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marble Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">MARBLE TYPES</h3>
            <ul className="space-y-3">
              {[
                { href: '/marble-types/italian', label: 'Italian Marble' },
                { href: '/marble-types/blue', label: 'Blue Marble' },
                { href: '/marble-types/pink', label: 'Pink Marble' },
                { href: '/marble-types/rare-onyx', label: 'Rare Onyx' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">CONTACT INFO</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>Surana Stonex Marble Works</div>
                  <div>Kishangarh</div>
                  <div>Rajasthan 305801</div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 9829051903, +91 9887971903</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">suranastonexindia@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <div>Mon - Sat: 10:30 AM - 6:30 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
            
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-t border-gray-800 py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Surana Stonex. All rights reserved. | Premium Marbles & Natural Stones
            </p>
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Website designed by{' '}
                <Link 
                  href="https://dubeyabhinav.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-300 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-400"
                >
                  Abhinav Dubey
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}