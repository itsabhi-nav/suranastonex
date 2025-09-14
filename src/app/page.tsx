'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, MapPin, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMarbles, Marble } from '@/data/marbles';
import MarbleCard from '@/components/marbles/MarbleCard';
import MarbleCareGuide from '@/components/premium/MarbleCareGuide';
import MarbleComparison from '@/components/premium/MarbleComparison';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';
// import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
// import TextReveal, { SplitText } from '@/components/animations/TextReveal';
// import CounterAnimation from '@/components/animations/CounterAnimation';
import Image from 'next/image';

export default function Home() {
  const [featuredMarbles, setFeaturedMarbles] = useState<Marble[]>([]);
  const [loading, setLoading] = useState(true);

  // Load featured marbles from API
  useEffect(() => {
    const loadFeaturedMarbles = async () => {
      try {
        setLoading(true);
        const marblesData = await getMarbles();
        const featured = marblesData.filter(marble => marble.isFeatured === true).slice(0, 3);
        setFeaturedMarbles(featured);
      } catch (error) {
        console.error('Error loading featured marbles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadFeaturedMarbles();
  }, []);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => {
        // Show fallback image if video fails to load
        const fallback = document.querySelector('.video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '1';
        }
      };

      const handleLoad = () => {
        // Hide fallback when video loads successfully
        const fallback = document.querySelector('.video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '0';
        }
      };

      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoad);

      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoad);
      };
    }
  }, []);

  if (loading) {
    return <PageLoadingSkeleton type="homepage" />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/stone-desk-new.mp4" type="video/mp4" />
          </video>
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0 video-fallback"
            style={{
              backgroundImage: `url('/italian.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="space-y-6">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90"
            >
              <Award className="w-4 h-4 mr-2" />
              PREMIUM MARBLE COLLECTION
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
                ELEVATE
              </h1>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                YOUR SPACE
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-200"
            >
              Discover the world&apos;s most exquisite marble collection, handpicked from 30+ countries. Transform your space with timeless elegance and unmatched quality.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 py-4"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">30+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Countries</div>
              </div>
              <div className="w-px h-12 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Marble Types</div>
              </div>
              <div className="w-px h-12 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">25+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Years Experience</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center py-4"
            >
              <Link href="/marbles">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-5 group transition-all duration-300 shadow-2xl hover:shadow-white/20 font-semibold"
                >
                  EXPLORE COLLECTION
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-5 group transition-all duration-300 backdrop-blur-sm"
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
                <MapPin className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 py-4 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">5000+ Happy Clients</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Global Delivery</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-300 uppercase tracking-wider">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Marbles Showcase */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
              FEATURED COLLECTION
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover our most exquisite marble pieces, each one a masterpiece of nature&apos;s artistry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {loading ? (
              // Enhanced Loading skeleton with shimmer effect
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                    {/* Status Badge Skeleton */}
                    <div className="absolute top-3 left-3 h-6 bg-white/90 rounded-full w-20 animate-pulse"></div>
                    {/* Action Buttons Skeleton */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <div className="w-10 h-10 bg-white/90 rounded-full animate-pulse"></div>
                      <div className="w-10 h-10 bg-white/90 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="h-6 bg-gray-200 rounded-full w-20 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              featuredMarbles.map((marble, index) => (
              <motion.div
                key={marble.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MarbleCard marble={marble} index={index} />
              </motion.div>
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link href="/marbles">
              <Button className="bg-black text-white hover:bg-gray-800 px-12 py-4 text-lg tracking-wide transition-all duration-300 magnetic hover-lift">
                VIEW ALL COLLECTIONS
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Categories - Inspired by Elegant Marbles */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 tracking-wide">
              RARE SURFACES
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked blocks extracted from 30+ countries around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Italian Marble',
                subtitle: 'Carrara, Italy',
                description: 'The Prestigious Carrara Basin',
                image: '/italian.png',
                href: '/marble-types/italian'
              },
              {
                title: 'Blue Marble',
                subtitle: 'Bahia, Brazil',
                description: 'Brazil\'s exclusive sky blue deposits',
                image: '/blue.png',
                href: '/marble-types/blue'
              },
              {
                title: 'Pink Marble',
                subtitle: 'Estremoz, Portugal',
                description: 'Portugal\'s famous pink marble',
                image: '/pink.png',
                href: '/marble-types/pink'
              },
              {
                title: 'Rare Onyx',
                subtitle: 'Patagonia, Chile',
                description: 'Underwater Onyx Caves',
                image: '/orynx.png',
                href: '/marble-types/rare-onyx'
              }
            ].map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link href={category.href} className="group cursor-pointer block">
                  <div className="relative overflow-hidden bg-gray-100 aspect-square rounded-lg group">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white p-4 text-center">
                        <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-200 mb-1">{category.subtitle}</p>
                        <p className="text-xs text-gray-300">{category.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-500">{category.subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marble Gallery Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              MARBLE GALLERY
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Witness the natural beauty and artistry of our finest marble collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                image: '/Carrara White.png',
                title: 'Carrara White',
                subtitle: 'Classic Italian Elegance'
              },
              {
                image: '/Calacatta-Gold.png',
                title: 'Calacatta Gold',
                subtitle: 'Luxury with Golden Veins'
              },
              {
                image: '/Rosso-Levanto.png',
                title: 'Rosso Levanto',
                subtitle: 'Dramatic Red Marble'
              },
              {
                image: '/Onyx Black.png',
                title: 'Onyx Black',
                subtitle: 'Translucent Beauty'
              },
              {
                image: '/Statuario.png',
                title: 'Statuario',
                subtitle: 'Pure White Perfection'
              },
              {
                image: '/Emperador.png',
                title: 'Emperador',
                subtitle: 'Rich Brown Luxury'
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Compact */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
        
        <div className="relative w-full px-8 sm:px-12 md:px-20 lg:px-20 xl:px-24 2xl:px-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-gray-300"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Trusted by 6000+ Projects
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4">
                  <span className="block">HANDCRAFTED</span>
                  <span className="block font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    EXPERIENCE
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed max-w-lg"
              >
                From private homes to commercial projects, we have worked with 
                architects, designers & project teams from around the world in 
                selecting the right materials to go from design to reality.
              </motion.p>

              {/* Enhanced Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { number: "6000+", label: "Completed Projects", icon: "🏗️" },
                  { number: "30+", label: "Countries", icon: "🌍" },
                  { number: "35+", label: "Years Experience", icon: "⏰" },
                  { number: "800+", label: "Material Types", icon: "💎" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </span>
                      <span className="text-3xl font-light text-white">
                        {stat.number}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Client Quote */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">R</span>
                  </div>
                  <div>
                    <p className="text-gray-300 italic mb-2">
                      "Surana Stonex transformed our luxury hotel project with their exceptional marble selection and craftsmanship. The attention to detail is unmatched."
                    </p>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Rajesh Kumar</span> • Chief Architect, Tata Consultancy
                    </div>
                  </div>
                </div>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
              </motion.div>
            </motion.div>

            {/* Right Image - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/HANDCRAFTED EXPERIENCE.png"
                  alt="HANDCRAFTED EXPERIENCE"
                  width={1200}
                  height={500}
                  className="w-full h-[350px] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3"
                >
                  <Award className="w-6 h-6 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3"
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              TRUSTED BY THE BEST
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from architects, designers, and homeowners who have chosen Surana Stonex for their most prestigious projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                title: "Chief Architect",
                project: "Corporate Project",
                image: "/rajesh.png",
                quote: "Surana Stonex has been our go-to partner for premium marble solutions. Their quality and service are unmatched in the industry."
              },
              {
                name: "Priya Sharma",
                title: "Interior Designer",
                project: "Residential Project",
                image: "/priya.png",
                quote: "The marble selection from Surana Stonex transformed our client's space into something truly extraordinary. Exceptional quality and design."
              },
              {
                name: "Amit Patel",
                title: "Hotel Owner",
                project: "Hospitality Project",
                image: "/Amit.png",
                quote: "From concept to completion, Surana Stonex delivered beyond our expectations. The marble work is absolutely stunning."
              }
            ].map((testimonial) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 hover-lift">
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-gray-600">{testimonial.title}</p>
                      <p className="text-xs text-blue-600">{testimonial.project}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed text-sm">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Statistics Counter */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              OUR ACHIEVEMENTS
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Numbers that speak for our excellence and commitment to quality
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 6000, suffix: "+", label: "Projects Completed", icon: "🏗️" },
              { number: 35, suffix: "+", label: "Years Experience", icon: "⏰" },
              { number: 800, suffix: "+", label: "Marble Varieties", icon: "💎" },
              { number: 30, suffix: "+", label: "Countries Sourced", icon: "🌍" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-5xl mb-4"
                  >
                    {stat.icon}
                  </motion.div>
                  <span className="text-4xl md:text-5xl font-light mb-2 text-white">
                    {stat.number}{stat.suffix}
                  </span>
                  <div className="text-gray-300 text-sm tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marble Quality Certifications */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              CERTIFIED EXCELLENCE
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our marbles meet the highest international standards and certifications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "ISO 9001:2015",
                description: "Quality Management System",
                icon: "🏆"
              },
              {
                name: "CE Marking",
                description: "European Conformity",
                icon: "✅"
              },
              {
                name: "ASTM Standards",
                description: "American Society Testing",
                icon: "🔬"
              },
              {
                name: "Green Building",
                description: "LEED Certified",
                icon: "🌱"
              }
            ].map((cert) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-center p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300 hover-lift">
                  <div className="text-3xl mb-3">{cert.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{cert.name}</h3>
                  <p className="text-xs text-gray-600">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mastery Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              MASTERY
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience matters when it comes to block selection, import & processing, 
              combined with exclusive relationships with some of the world&apos;s most prestigious quarries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: MapPin,
                title: 'Global Sourcing',
                description: 'Handpicked blocks extracted from 30+ countries with exclusive quarry relationships'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Only the finest materials from the world&apos;s most prestigious quarries and mines'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: '35+ years of experience serving India&apos;s most discerning clientele'
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-center space-y-4">
                  <motion.div 
                    className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Marble Care Guide */}
      <MarbleCareGuide />

      {/* Premium Marble Comparison */}
      <MarbleComparison />

    </div>
  );
}
