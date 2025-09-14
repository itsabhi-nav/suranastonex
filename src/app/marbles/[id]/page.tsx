'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ChevronLeft, ChevronRight, Star, CheckCircle, Truck, Shield, Award } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { getMarbles, Marble } from '@/data/marbles';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function MarbleDetailPage() {
  const params = useParams();
  const marbleId = params.id as string;
  const [marble, setMarble] = useState<Marble | null>(null);
  const [marbles, setMarbles] = useState<Marble[]>([]);
  const [loading, setLoading] = useState(true);

  // Load marbles from API
  useEffect(() => {
    const loadMarbles = async () => {
      try {
        setLoading(true);
        const marblesData = await getMarbles();
        setMarbles(marblesData);
        const foundMarble = marblesData.find(m => m.id === marbleId);
        setMarble(foundMarble || null);
      } catch (error) {
        console.error('Error loading marbles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMarbles();
  }, [marbleId]);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <PageLoadingSkeleton type="marble-detail" />;
  }


  if (!marble) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Marble not found</h1>
          <Link href="/marbles">
            <Button>Back to Marbles</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = marble.images && marble.images.length > 0 
    ? [marble.image, ...marble.images]
    : [marble.image];

  const sizes = [
    { name: 'Small', dimensions: '30x30 cm', pricing: 'Contact for Best Pricing' },
    { name: 'Medium', dimensions: '60x60 cm', pricing: 'Contact for Best Pricing' },
    { name: 'Large', dimensions: '90x90 cm', pricing: 'Contact for Best Pricing' }
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Premium Quality',
      description: 'Sourced from the finest quarries with strict quality control'
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: 'Warranty',
      description: '5-year warranty on all our marble products'
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-600" />,
      title: 'Free Delivery',
      description: 'Complimentary delivery within 50km radius'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // Add to localStorage logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/marbles" className="text-gray-500 hover:text-gray-700">Marbles</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{marble.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={images[currentImageIndex]}
                  alt={marble.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 border-white/50 text-gray-700 hover:bg-white"
                    onClick={toggleWishlist}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 border-white/50 text-gray-700 hover:bg-white"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${marble.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-600 font-medium">{marble.origin}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      marble.sellingStatus === 'Selling Fast' ? 'bg-red-100 text-red-700 border border-red-200' :
                      marble.sellingStatus === 'Best Seller' ? 'bg-green-100 text-green-700 border border-green-200' :
                      marble.sellingStatus === 'Out of Stock' ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {marble.sellingStatus}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">{marble.name}</h1>
                <p className="text-base text-gray-500 mb-4">{marble.color} • {marble.origin}</p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{marble.description}</p>
                
                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Material</div>
                    <div className="font-medium text-gray-900">{marble.material}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Finish</div>
                    <div className="font-medium text-gray-900">{marble.finish}</div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                      {marble.priceContact}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Category</div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300">
                      {marble.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Contact us for detailed pricing based on size, finish, and quantity requirements</p>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Rarity</div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      marble.rarity === 'common' ? 'bg-gray-100 text-gray-700' :
                      marble.rarity === 'uncommon' ? 'bg-green-100 text-green-700' :
                      marble.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                      marble.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {marble.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Size</h3>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name.toLowerCase())}
                      className={`p-4 border rounded-lg text-center transition-all duration-300 ${
                        selectedSize === size.name.toLowerCase()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-1">{size.name}</div>
                      <div className="text-sm text-gray-600 mb-2">{size.dimensions}</div>
                      <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{size.pricing}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">sq ft</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-medium transition-all duration-300"
                  onClick={() => {
                    const selectedSizeObj = sizes.find(s => s.name.toLowerCase() === selectedSize);
                    const message = `🏛️ *Surana Stonex Premium Marbles* 🏛️

📋 *Marble Inquiry Details:*

✨ *Marble Name:* ${marble.name}
🎨 *Color:* ${marble.color}
🌍 *Origin:* ${marble.origin}
📏 *Size Selected:* ${selectedSizeObj?.name} (${selectedSizeObj?.dimensions})
📦 *Quantity:* ${quantity} sq ft
💰 *Pricing:* ${marble.priceContact}
⭐ *Rarity:* ${marble.rarity.toUpperCase()}
🏷️ *Category:* ${marble.category}
🔧 *Finish:* ${marble.finish}
📐 *Material:* ${marble.material}

📝 *Description:* ${marble.description}

🖼️ *Image:* ${window.location.origin}${marble.image}

📞 *Contact Details:*
📧 Email: suranastonexindia@gmail.com
📱 Phone: +91 9829051903, +91 9887971903
🌐 Website: ${window.location.origin}

Please provide detailed pricing, availability, delivery options, and any additional services required. Thank you!`;
                    const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                  }}
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Contact on WhatsApp
                </Button>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Specifications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Quick Specs</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">{marble.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">{marble.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Finish:</span>
                    <span className="font-medium">{marble.finish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Standard Size:</span>
                    <span className="font-medium">{marble.size}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium">{marble.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">{marble.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Finish:</span>
                    <span className="font-medium">Polished</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thickness:</span>
                    <span className="font-medium">20mm</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Kitchen Countertops
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Bathroom Vanities
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Flooring
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Wall Cladding
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Clean with pH-neutral cleaner</li>
                  <li>• Avoid acidic substances</li>
                  <li>• Seal every 6-12 months</li>
                  <li>• Use coasters under drinks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Related Marbles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marbles.slice(0, 3).map((relatedMarble) => (
              <Link key={relatedMarble.id} href={`/marbles/${relatedMarble.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src={relatedMarble.image}
                      alt={relatedMarble.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {relatedMarble.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{relatedMarble.origin}</p>
                  <p className="font-semibold text-gray-900">{relatedMarble.priceContact}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}