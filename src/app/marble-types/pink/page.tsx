'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { getMarbles, Marble } from '@/data/marbles';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function PinkMarblePage() {
  const [pinkMarbles, setPinkMarbles] = useState<Marble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarbles = async () => {
      try {
        setLoading(true);
        const marblesData = await getMarbles();
        // Filter Pink marbles
        const filtered = marblesData.filter(marble => 
          marble.category === 'pink' || 
          marble.name.toLowerCase().includes('pink') ||
          marble.name.toLowerCase().includes('estremoz') ||
          marble.name.toLowerCase().includes('rosa')
        );
        setPinkMarbles(filtered);
      } catch (error) {
        console.error('Error loading marbles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMarbles();
  }, []);

  const handleWhatsApp = () => {
    const message = `Hello! I'm interested in Pink Marble products. Could you please provide more information about:

💗 *Pink Marble Collection*
📍 *Origin:* Estremoz, Portugal
✨ *Types:* Estremoz Pink, Rosa Aurora, Pink Fantasy

📞 *Contact Details:*
📧 Email: suranastonexindia@gmail.com
📱 Phone: +91 9829051903, +91 9887971903

Please provide detailed pricing, availability, delivery options, and any additional services required. Thank you!`;

    const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <PageLoadingSkeleton type="marble-types" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-pink-100">
        <div className="absolute inset-0">
          <Image
            src="/pink.png"
            alt="Pink Marble"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 tracking-wide">
              Pink Marble
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-lg text-gray-600">Estremoz, Portugal</span>
            </div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Portugal&apos;s famous pink marble - A delicate beauty from the heart of Europe
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                The Romance of Stone
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Pink marble from Estremoz, Portugal, embodies elegance and sophistication with its 
                delicate rose hues and intricate veining patterns. This rare and precious stone has 
                been cherished for centuries for its unique beauty and exceptional quality.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Each slab tells a story of geological wonder, with soft pink tones that range from 
                subtle blush to deep rose, creating an atmosphere of warmth and luxury in any space.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-700">Estremoz Pink Classic</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-700">Rosa Aurora Premium</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-700">Pink Fantasy Veins</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/pink.png"
                  alt="Pink Marble Detail"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Our Pink Marble Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite selection of premium pink marble varieties
            </p>
          </motion.div>

          {pinkMarbles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pinkMarbles.map((marble: Marble, index: number) => (
                <motion.div
                  key={marble.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/marbles/${marble.id}`}>
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={marble.image}
                        alt={marble.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {marble.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {marble.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">
                          {marble.priceContact}
                        </span>
                        <span className="text-sm text-gray-500">
                          {marble.size}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-6">
                No Pink marble products found. Please check back later.
              </p>
              <Link
                href="/marbles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                View All Marbles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Interested in Pink Marble?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us for detailed information about our beautiful pink marble collection, 
              pricing, and availability. Our experts are here to help you find the perfect piece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Contact on WhatsApp
              </button>
              
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 9829051903, +91 9887971903</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">suranastonexindia@gmail.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
