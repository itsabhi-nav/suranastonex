'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Marble } from '@/data/marbles';
import Image from 'next/image';

interface MarbleCardProps {
  marble: Marble;
  index: number;
}

export default function MarbleCard({ marble, index }: MarbleCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.some((item: Marble) => item.id === marble.id);
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item: Marble) => item.id !== marble.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, marble]));
      setIsWishlisted(true);
    }
    
    // Dispatch custom event to update navbar wishlist count
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link href={`/marbles/${marble.id}`}>
        <Card className="bg-white border border-gray-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover-lift modern-card !p-0 !py-0 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden -m-0 flex-shrink-0">
            {/* Main Image */}
            <Image
              src={marble.image}
              alt={marble.name}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Action Buttons */}
            <motion.div 
              className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ x: 20, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 bg-white/95 rounded-full hover:bg-white shadow-lg magnetic"
                  onClick={(e) => {
                    e.preventDefault();
                    // Quick view functionality
                  }}
                >
                  <Eye className="w-4 h-4 text-gray-700" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  className={`w-10 h-10 p-0 bg-white/95 rounded-full transition-all duration-300 shadow-lg magnetic ${
                    isWishlisted 
                      ? 'text-red-500 hover:bg-red-50' 
                      : 'hover:bg-white text-gray-700'
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </motion.div>
            </motion.div>

            {/* Selling Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-white/95 backdrop-blur-sm shadow-sm ${
                marble.sellingStatus === 'Selling Fast' ? 'text-red-600' :
                marble.sellingStatus === 'Best Seller' ? 'text-green-600' :
                marble.sellingStatus === 'Out of Stock' ? 'text-gray-600' :
                'text-blue-600'
              }`}>
                {marble.sellingStatus}
              </span>
            </div>

          </div>

          {/* Content */}
          <div className="px-2 sm:px-3 pt-0 pb-2 sm:pb-3 space-y-1 sm:space-y-2 flex-1 flex flex-col justify-between">
            {/* Title and Price */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base">
                  {marble.name}
                </h3>
                <p className="text-xs text-gray-500">{marble.color}</p>
              </div>
              <div className="text-right ml-2">
                <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                  {marble.priceContact}
                </span>
                <p className="text-xs text-gray-500 mt-1">{marble.size}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 line-clamp-1 sm:line-clamp-2">
              {marble.description}
            </p>

            {/* Origin */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{marble.origin}</span>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 font-medium magnetic text-xs sm:text-sm py-1.5 sm:py-2"
                  variant="secondary"
                >
                  <ShoppingCart className="w-3 h-3 mr-1 sm:mr-2" />
                  Buy Now
                </Button>
              </motion.div>
            </div>
          </div>

        </Card>
      </Link>
    </motion.div>
  );
}
