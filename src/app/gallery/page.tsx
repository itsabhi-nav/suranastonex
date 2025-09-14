'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Search, Eye, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function GalleryPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => {
        console.log('Video failed to load, showing fallback');
        const fallback = document.querySelector('.video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '1';
        }
      };

      const handleLoad = () => {
        console.log('Video loaded successfully');
        const fallback = document.querySelector('.video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '0';
        }
      };

      const handleCanPlay = () => {
        console.log('Video can start playing');
        const fallback = document.querySelector('.video-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.opacity = '0';
        }
      };

      // Add multiple event listeners for better compatibility
      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('canplaythrough', handleLoad);

      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Video autoplay failed:', error);
          handleError();
        });
      }

      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoad);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleLoad);
      };
    }
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bathroom', 'Flooring'];

  const galleryItems = [
    {
      id: 1,
      title: 'Luxury Kitchen Countertop',
      category: 'Kitchen',
      type: 'Residential',
      description: 'Calacatta Gold marble countertop with waterfall edge design',
      image: '/Calacatta-Gold.png',
      tags: ['Calacatta Gold', 'Countertop', 'Waterfall Edge']
    },
    {
      id: 2,
      title: 'Executive Office Lobby',
      category: 'Commercial',
      type: 'Commercial',
      description: 'Nero Marquina marble flooring with white Carrara accents',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Nero Marquina', 'Carrara', 'Flooring']
    },
    {
      id: 3,
      title: 'Master Bathroom Suite',
      category: 'Bathroom',
      type: 'Residential',
      description: 'Elegant white marble bathroom with gold veining details',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tags: ['White Marble', 'Bathroom', 'Gold Veining']
    },
    {
      id: 4,
      title: 'Hotel Lobby Flooring',
      category: 'Flooring',
      type: 'Commercial',
      description: 'Large format marble tiles in sophisticated pattern',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Large Format', 'Hotel', 'Pattern']
    },
    {
      id: 5,
      title: 'Modern Kitchen Island',
      category: 'Kitchen',
      type: 'Residential',
      description: 'Striking black marble island with white perimeter countertops',
      image: '/Onyx Black.png',
      tags: ['Black Marble', 'Kitchen Island', 'Contrast']
    },
    {
      id: 6,
      title: 'Restaurant Feature Wall',
      category: 'Commercial',
      type: 'Commercial',
      description: 'Textured marble feature wall creating dramatic ambiance',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Feature Wall', 'Textured', 'Restaurant']
    },
    {
      id: 7,
      title: 'Spa Bathroom Retreat',
      category: 'Bathroom',
      type: 'Residential',
      description: 'Serene marble bathroom with natural stone textures',
      image: '/bathroom.png',
      tags: ['Spa', 'Natural Texture', 'Retreat']
    },
    {
      id: 8,
      title: 'Corporate Boardroom',
      category: 'Commercial',
      type: 'Commercial',
      description: 'Executive boardroom with premium marble conference table',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Boardroom', 'Conference Table', 'Executive']
    },
    {
      id: 9,
      title: 'Outdoor Patio Flooring',
      category: 'Flooring',
      type: 'Residential',
      description: 'Weather-resistant marble tiles for outdoor living space',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Outdoor', 'Weather Resistant', 'Patio']
    }
  ];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory || item.type === selectedCategory);

  if (loading) {
    return <PageLoadingSkeleton type="gallery" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/italian.png"
          >
            <source src="/gallery.mp4" type="video/mp4" />
          </video>
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0 video-fallback transition-opacity duration-500"
            style={{
              backgroundImage: 'url("/italian.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        
        {/* Floating Particles Background */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {/* Gallery Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-4"
            >
              <Eye className="w-4 h-4 mr-2" />
              PORTFOLIO SHOWCASE
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.9] tracking-tight"
              >
                PROJECT GALLERY
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="w-24 h-0.5 bg-white mx-auto"
              />
            </div>

            {/* Enhanced Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-gray-100 max-w-4xl mx-auto px-4"
            >
              Discover our curated collection of breathtaking marble installations. From luxurious kitchens to elegant bathrooms, explore how premium marble transforms spaces into works of art.
            </motion.p>

            {/* Gallery Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">50+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Projects</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">6</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Categories</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">100%</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Satisfied</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="pt-6"
            >
              <Button 
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 transition-all duration-300 shadow-2xl hover:shadow-white/20 font-semibold"
                onClick={() => {
                  document.getElementById('gallery-grid')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Explore Gallery
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 pt-4 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">50+ Featured Projects</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                <span className="text-sm">Multiple Categories</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="text-sm">High Quality Images</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Controls */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg transition-colors duration-300 ${
                    viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg transition-colors duration-300 ${
                    viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <Button variant="outline" className="border-gray-200">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="gallery-grid" className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto'
                  : 'space-y-8 max-w-6xl mx-auto'
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className={`relative overflow-hidden rounded-lg ${
                    viewMode === 'list' ? 'w-80 h-48' : 'aspect-[4/3]'
                  }`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-4">
                        <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-4'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600">{item.category}</span>
                      <span className="text-sm text-gray-500">{item.type}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full sm:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[selectedImage].image}
                alt={filteredItems[selectedImage].title}
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
                priority
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white/10"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{filteredItems[selectedImage].title}</h3>
                <p className="text-gray-300">{filteredItems[selectedImage].description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              INSPIRED BY OUR WORK?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Let us bring your vision to life with our premium marble solutions and expert craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4">
                Start Your Project
              </Button>
              <Button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4">
                Get Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
