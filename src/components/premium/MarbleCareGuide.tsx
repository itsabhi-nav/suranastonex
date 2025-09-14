'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Droplets, Shield, Star } from 'lucide-react';

export default function MarbleCareGuide() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-white">
      <div className="w-full px-8 sm:px-12 md:px-20 lg:px-20 xl:px-24 2xl:px-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
            MARBLE CARE GUIDE
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional tips to maintain the beauty and longevity of your premium marble surfaces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Do's */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-medium text-gray-900">DO&apos;S</h3>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  icon: <Droplets className="w-6 h-6 text-blue-500" />,
                  title: "Clean Regularly",
                  description: "Use pH-neutral cleaners and warm water for daily cleaning. Avoid harsh chemicals that can damage the marble surface."
                },
                {
                  icon: <Shield className="w-6 h-6 text-blue-500" />,
                  title: "Seal Your Marble",
                  description: "Apply a high-quality sealer every 6-12 months to protect against stains and moisture penetration."
                },
                {
                  icon: <Star className="w-6 h-6 text-blue-500" />,
                  title: "Use Coasters",
                  description: "Always use coasters under drinks and placemats under hot dishes to prevent thermal shock and staining."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex space-x-4 p-4 bg-green-50 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Don'ts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <XCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-medium text-gray-900">DON&apos;TS</h3>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
                  title: "Avoid Acidic Cleaners",
                  description: "Never use vinegar, lemon juice, or other acidic cleaners as they can etch and dull the marble surface permanently."
                },
                {
                  icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
                  title: "No Abrasive Materials",
                  description: "Avoid steel wool, harsh scrub brushes, or abrasive cleaners that can scratch and damage the polished surface."
                },
                {
                  icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
                  title: "Prevent Direct Heat",
                  description: "Never place hot pans directly on marble surfaces. Use trivets and heat-resistant pads to prevent thermal damage."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex space-x-4 p-4 bg-red-50 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Professional Care Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center bg-gray-50 p-12 rounded-2xl"
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-4">
            Need Professional Marble Care?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our certified marble care specialists offer professional cleaning, sealing, and restoration services to keep your marble looking pristine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              Book Consultation
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              Download Care Guide
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
