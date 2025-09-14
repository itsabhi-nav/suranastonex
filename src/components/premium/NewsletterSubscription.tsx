'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Gift, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const benefits = [
    {
      icon: <Gift className="w-6 h-6 text-blue-500" />,
      title: "Exclusive Offers",
      description: "Get access to special discounts and limited-time deals"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: "New Arrivals",
      description: "Be the first to see our latest marble collections"
    },
    {
      icon: <Award className="w-6 h-6 text-green-500" />,
      title: "Expert Tips",
      description: "Receive professional marble care and design advice"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            JOIN OUR EXCLUSIVE COMMUNITY
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get insider access to premium marble collections, expert advice, and exclusive offers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-8">Why Join Our Newsletter?</h3>
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                <div>
                  <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-white mb-4">Special Welcome Bonus</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                New subscribers get instant access to our premium marble care guide and 
                a 10% discount on their first order over $500.
              </p>
            </div>
          </motion.div>

          {/* Subscription Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Subscribe Now
              </h3>
              <p className="text-gray-300">
                Join 50,000+ marble enthusiasts worldwide
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white/30 transition-all duration-300"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium transition-all duration-300"
                >
                  Subscribe to Newsletter
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Welcome Aboard!
                </h3>
                <p className="text-gray-300">
                  Thank you for subscribing. Check your email for your welcome bonus.
                </p>
              </motion.div>
            )}

            {/* Social Proof */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-xs text-gray-400">Subscribers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-xs text-gray-400">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
