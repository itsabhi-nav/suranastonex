'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Marble } from '@/data/marbles';
import { toast } from 'sonner';
import Image from 'next/image';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Marble[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
      setIsLoading(false);
    };

    loadWishlist();

    // Listen for wishlist changes
    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener('storage', handleWishlistUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('storage', handleWishlistUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const removeFromWishlist = (marbleId: string) => {
    const updatedWishlist = wishlist.filter(marble => marble.id !== marbleId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Dispatch custom event to update navbar wishlist count
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    toast.success('Removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    // Dispatch custom event to update navbar wishlist count
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    toast.success('Wishlist cleared');
  };

  const addAllToCart = () => {
    const marbleList = wishlist.map(marble => `${marble.name} - ${marble.priceContact}`).join('\n');
    const message = `Hi! I'm interested in these marbles from my wishlist:\n\n${marbleList}\n\nCould you please provide detailed pricing and availability?`;
    const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getTotalValue = () => {
    return wishlist.length; // Return count instead of price total
  };

  if (isLoading) {
    return <PageLoadingSkeleton type="wishlist" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4"
              >
                <Heart className="w-8 h-8 text-white fill-current" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
                MY WISHLIST
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your curated collection of favorite marbles, saved for future purchase.
            </p>
          </motion.div>

          {/* Wishlist Stats */}
          {wishlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              <Card className="bg-white border border-gray-200 p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-gray-900 mb-2">{wishlist.length}</div>
                <div className="text-gray-600">Total Items</div>
              </Card>
              
              <Card className="bg-white border border-gray-200 p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{getTotalValue()}</div>
                <div className="text-gray-600">Items in Wishlist</div>
              </Card>
              
              <Card className="bg-white border border-gray-200 p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {wishlist.filter(m => m.rarity === 'legendary').length}
                </div>
                <div className="text-gray-600">Legendary Items</div>
              </Card>
            </motion.div>
          )}

          {/* Actions */}
          {wishlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 text-lg px-8 py-6"
                onClick={addAllToCart}
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Contact All on WhatsApp
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50 text-lg px-8 py-6"
                onClick={clearWishlist}
              >
                <Trash2 className="mr-2 w-5 h-5" />
                Clear Wishlist
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="relative py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            {wishlist.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {wishlist.map((marble, index) => (
                  <motion.div
                    key={marble.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="bg-white border border-gray-200 overflow-hidden group relative shadow-lg hover:shadow-xl transition-shadow duration-300">
                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 p-0"
                        onClick={() => removeFromWishlist(marble.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      {/* Marble Image */}
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={marble.image}
                          alt={marble.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {marble.name}
                            </h3>
                            <p className="text-sm text-gray-600">{marble.color}</p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full">
                              {marble.priceContact}
                            </span>
                            <p className="text-xs text-gray-500">{marble.size}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {marble.description}
                        </p>

                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{marble.origin}</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full capitalize text-gray-700">
                            {marble.rarity}
                          </span>
                        </div>

                        <Button 
                          className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
                          variant="secondary"
                          onClick={() => {
                            const message = `Hi! I'm interested in the ${marble.name} marble. ${marble.priceContact}. Could you please provide detailed pricing and availability?`;
                            const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Contact on WhatsApp
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12 sm:py-16 lg:py-20"
              >
                <div className="bg-white rounded-xl p-12 max-w-md mx-auto shadow-lg border border-gray-200">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-6xl mb-6"
                  >
                    💎
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-8">
                    Start exploring our collection and add your favorite marbles to your wishlist!
                  </p>
                  <Button
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => window.location.href = '/marbles'}
                  >
                    Explore Marbles
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
