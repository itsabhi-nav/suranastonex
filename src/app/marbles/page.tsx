'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MarbleCard from '@/components/marbles/MarbleCard';
import { getMarbles, Marble } from '@/data/marbles';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function MarblesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [marbles, setMarbles] = useState<Marble[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Load marbles from API
  useEffect(() => {
    const loadMarbles = async () => {
      try {
        setLoading(true);
        const marblesData = await getMarbles();
        console.log('Loaded marbles:', marblesData);
        setMarbles(marblesData);
      } catch (error) {
        console.error('Error loading marbles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMarbles();
  }, []);

  const filteredMarbles = useMemo(() => {
    if (!marbles || marbles.length === 0) {
      return [];
    }
    
    let filtered = [...marbles];

    // Search filter
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(marble => 
        marble.name.toLowerCase().includes(lowercaseQuery) ||
        marble.color.toLowerCase().includes(lowercaseQuery) ||
        marble.origin.toLowerCase().includes(lowercaseQuery) ||
        marble.description.toLowerCase().includes(lowercaseQuery) ||
        marble.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(marble => 
        marble.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Origin filter
    if (selectedOrigin !== 'all') {
      filtered = filtered.filter(marble => 
        marble.origin.toLowerCase().includes(selectedOrigin.toLowerCase())
      );
    }

    // Rarity filter
    if (selectedRarity !== 'all') {
      filtered = filtered.filter(marble => marble.rarity === selectedRarity);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rarity':
          const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };
          comparison = rarityOrder[a.rarity as keyof typeof rarityOrder] - rarityOrder[b.rarity as keyof typeof rarityOrder];
          break;
        case 'origin':
          comparison = a.origin.localeCompare(b.origin);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [marbles, searchQuery, selectedCategory, selectedOrigin, selectedRarity, sortBy, sortOrder]);

  const categories = [...new Set(marbles.map(marble => marble.category))];
  const origins = [...new Set(marbles.map(marble => marble.origin))];
  const rarities = [...new Set(marbles.map(marble => marble.rarity))];

  if (loading) {
    return <PageLoadingSkeleton type="marbles" />;
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
            <source src="/marble.mp4" type="video/mp4" />
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
            {/* Collection Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-4"
            >
              <Grid className="w-4 h-4 mr-2" />
              PREMIUM COLLECTION
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.9] tracking-tight"
              >
                MARBLE COLLECTION
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
              Explore our exclusive collection of premium marbles, meticulously sourced from the world&apos;s finest quarries. Each piece tells a story of natural beauty and timeless elegance.
            </motion.p>

            {/* Collection Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">500+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Marble Types</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">30+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Countries</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">5</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Rarity Levels</div>
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
                  document.getElementById('marbles-grid')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Browse Collection
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
                <Search className="w-4 h-4" />
                <span className="text-sm">Advanced Search</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Smart Filters</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                <span className="text-sm">Multiple Views</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Controls Section */}
      <section className="relative py-6 sm:py-8 lg:py-10 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">

          {/* Search and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search marbles by name, color, origin, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-300 text-gray-900 placeholder:text-gray-500 pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base lg:text-lg focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center sm:justify-start">
                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-300 text-gray-700 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-gray-300 bg-white">
                    <SelectItem value="name" className="text-gray-900">Name</SelectItem>
                    <SelectItem value="rarity" className="text-gray-900">Rarity</SelectItem>
                    <SelectItem value="origin" className="text-gray-900">Origin</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-32 border-gray-300 text-gray-700 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-gray-300 bg-white">
                    <SelectItem value="asc" className="text-gray-900">Ascending</SelectItem>
                    <SelectItem value="desc" className="text-gray-900">Descending</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg bg-white">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-gray-600">
                {filteredMarbles.length} marble{filteredMarbles.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-gray-300 text-gray-700 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gray-300 bg-white">
                        <SelectItem value="all" className="text-gray-900">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()} className="text-gray-900">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Origin Filter */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Origin</label>
                    <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                      <SelectTrigger className="border-gray-300 text-gray-700 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gray-300 bg-white">
                        <SelectItem value="all" className="text-gray-900">All Origins</SelectItem>
                        {origins.map((origin) => (
                          <SelectItem key={origin} value={origin} className="text-gray-900">
                            {origin}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rarity Filter */}
                  <div>
                    <label className="block text-gray-900 font-medium mb-2">Rarity</label>
                    <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                      <SelectTrigger className="border-gray-300 text-gray-700 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-gray-300 bg-white">
                        <SelectItem value="all" className="text-gray-900">All Rarities</SelectItem>
                        {rarities.map((rarity) => (
                          <SelectItem key={rarity} value={rarity} className="text-gray-900">
                            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedOrigin('all');
                      setSelectedRarity('all');
                    }}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Marbles Grid */}
      <section id="marbles-grid" className="relative py-6 sm:py-8 lg:py-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {filteredMarbles.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto'
                  : 'space-y-6 max-w-6xl mx-auto'
              }
            >
              {filteredMarbles.map((marble, index) => (
                <MarbleCard 
                  key={marble.id} 
                  marble={marble} 
                  index={index}
                />
              ))}
            </motion.div>
          ) : !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 sm:py-16 lg:py-20"
            >
              <div className="bg-white rounded-xl p-8 sm:p-12 max-w-md mx-auto shadow-lg border border-gray-200">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">No marbles found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find what you&apos;re looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedOrigin('all');
                    setSelectedRarity('all');
                  }}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
