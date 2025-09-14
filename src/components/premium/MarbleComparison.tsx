'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function MarbleComparison() {
  const [selectedMarbles, setSelectedMarbles] = useState<string[]>([]);

  const marbles = [
    {
      id: 'carrara',
      name: 'Carrara White',
      origin: 'Italy',
      pricing: 'Contact for Best Pricing',
      durability: 8,
      maintenance: 'Low',
      applications: ['Flooring', 'Countertops', 'Wall Cladding'],
      image: '/Carrara White.png',
      description: 'Classic Italian marble with subtle gray veining'
    },
    {
      id: 'calacatta',
      name: 'Calacatta Gold',
      origin: 'Italy',
      pricing: 'Contact for Best Pricing',
      durability: 9,
      maintenance: 'Medium',
      applications: ['Kitchen Countertops', 'Bathroom', 'Flooring'],
      image: '/Calacatta-Gold.png',
      description: 'Premium Italian marble with dramatic gold veining'
    },
    {
      id: 'emperador',
      name: 'Emperador Dark',
      origin: 'Spain',
      pricing: 'Contact for Best Pricing',
      durability: 7,
      maintenance: 'Low',
      applications: ['Flooring', 'Wall Cladding', 'Outdoor'],
      image: '/Emperador.png',
      description: 'Rich brown marble with beautiful natural patterns'
    },
    {
      id: 'nero',
      name: 'Nero Marquina',
      origin: 'Spain',
      pricing: 'Contact for Best Pricing',
      durability: 8,
      maintenance: 'Medium',
      applications: ['Countertops', 'Bathroom', 'Accent Walls'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Elegant black marble with white veining'
    }
  ];

  const handleSelectMarble = (marbleId: string) => {
    setSelectedMarbles(prev => {
      if (prev.includes(marbleId)) {
        return prev.filter(id => id !== marbleId);
      } else if (prev.length < 3) {
        return [...prev, marbleId];
      }
      return prev;
    });
  };

  const selectedMarbleData = marbles.filter(marble => selectedMarbles.includes(marble.id));

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
      <div className="w-full px-8 sm:px-12 md:px-20 lg:px-20 xl:px-24 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            COMPARE MARBLES
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare different marble types side by side to make the perfect choice for your project
          </p>
        </motion.div>

        {/* Marble Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Select up to 3 marbles to compare
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marbles.map((marble) => (
              <motion.div
                key={marble.id}
                whileHover={{ scale: 1.02 }}
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  selectedMarbles.includes(marble.id)
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleSelectMarble(marble.id)}
              >
                <div className="relative">
                  <Image
                    src={marble.image}
                    alt={marble.name}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover"
                  />
                  {selectedMarbles.includes(marble.id) && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                    <h4 className="font-semibold">{marble.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{marble.origin}</p>
                    <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      {marble.pricing}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        {selectedMarbleData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Comparison Results
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Property</th>
                    {selectedMarbleData.map((marble) => (
                      <th key={marble.id} className="text-center py-4 px-6 font-semibold text-gray-900 min-w-[200px]">
                        <div className="space-y-2">
                          <Image
                            src={marble.image}
                            alt={marble.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-lg mx-auto"
                          />
                          <div className="text-sm">{marble.name}</div>
                          <div className="text-xs text-gray-500">{marble.origin}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-medium text-gray-900">Pricing</td>
                    {selectedMarbleData.map((marble) => (
                      <td key={marble.id} className="py-4 px-6 text-center">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full">
                          {marble.pricing}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-medium text-gray-900">Durability</td>
                    {selectedMarbleData.map((marble) => (
                      <td key={marble.id} className="py-4 px-6 text-center">
                        <div className="flex justify-center space-x-1">
                          {[...Array(10)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < marble.durability ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 mt-1">{marble.durability}/10</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-medium text-gray-900">Maintenance</td>
                    {selectedMarbleData.map((marble) => (
                      <td key={marble.id} className="py-4 px-6 text-center text-gray-700">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          marble.maintenance === 'Low' ? 'bg-green-100 text-green-800' :
                          marble.maintenance === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {marble.maintenance}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-6 font-medium text-gray-900">Applications</td>
                    {selectedMarbleData.map((marble) => (
                      <td key={marble.id} className="py-4 px-6 text-center">
                        <div className="space-y-1">
                          {marble.applications.map((app, index) => (
                            <div key={index} className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                              {app}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Description</td>
                    {selectedMarbleData.map((marble) => (
                      <td key={marble.id} className="py-4 px-6 text-center text-gray-700 text-sm">
                        {marble.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <Button 
                className="bg-black text-white hover:bg-gray-800"
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
                Get Quote
              </Button>
              <Button className="border border-gray-300 text-gray-700 hover:bg-gray-50">
                Download Comparison
              </Button>
            </div>
          </motion.div>
        )}

        {selectedMarbleData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-16 bg-gray-50 rounded-2xl"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Select marbles to compare
            </h3>
            <p className="text-gray-600">
              Choose up to 3 marbles from the selection above to see detailed comparisons
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
