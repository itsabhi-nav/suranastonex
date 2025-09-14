'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Home, Building, Wrench, Truck, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function ServicesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
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

  const services = [
    {
      title: 'Marble Supply',
      description: 'Premium marble sourcing from 30+ countries with quality assurance and competitive pricing.',
      icon: <Award className="w-8 h-8 text-blue-600" />,
      features: ['Global Sourcing', 'Quality Control', 'Competitive Pricing', 'Custom Selection'],
      image: '/supply.png'
    },
    {
      title: 'Installation Services',
      description: 'Professional marble installation by certified craftsmen with precision and attention to detail.',
      icon: <Wrench className="w-8 h-8 text-green-600" />,
      features: ['Certified Installers', 'Precision Work', 'Timely Completion', 'Clean Installation'],
      image: '/installation.png'
    },
    {
      title: 'Custom Fabrication',
      description: 'Tailored marble solutions including custom cuts, edges, and specialized applications.',
      icon: <Building className="w-8 h-8 text-purple-600" />,
      features: ['Custom Cuts', 'Edge Profiles', 'Special Applications', 'Design Consultation'],
      image: '/fabrication.png'
    },
    {
      title: 'Maintenance & Care',
      description: 'Professional marble maintenance services to keep your surfaces looking pristine.',
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      features: ['Regular Cleaning', 'Sealing Services', 'Stain Removal', 'Restoration'],
      image: '/Maintenance.png'
    },
    {
      title: 'Consultation & Design',
      description: 'Expert design consultation to help you choose the perfect marble for your project.',
      icon: <Users className="w-8 h-8 text-red-600" />,
      features: ['Design Consultation', 'Material Selection', 'Project Planning', '3D Visualization'],
      image: '/consultation.png'
    },
    {
      title: 'Delivery & Logistics',
      description: 'Safe and secure delivery of your marble products with proper handling and insurance.',
      icon: <Truck className="w-8 h-8 text-indigo-600" />,
      features: ['Safe Delivery', 'Insurance Coverage', 'Tracking System', 'Installation Support'],
      image: '/Delivery.png'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Initial discussion about your project requirements and marble preferences.',
      icon: <Users className="w-6 h-6" />
    },
    {
      step: '02',
      title: 'Design & Selection',
      description: 'Choose the perfect marble from our extensive collection with expert guidance.',
      icon: <Award className="w-6 h-6" />
    },
    {
      step: '03',
      title: 'Fabrication',
      description: 'Custom fabrication of your marble pieces with precision and quality control.',
      icon: <Wrench className="w-6 h-6" />
    },
    {
      step: '04',
      title: 'Installation',
      description: 'Professional installation by our certified craftsmen with attention to detail.',
      icon: <Building className="w-6 h-6" />
    },
    {
      step: '05',
      title: 'Maintenance',
      description: 'Ongoing maintenance support to keep your marble looking beautiful.',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const applications = [
    {
      title: 'Residential',
      description: 'Transform your home with premium marble for kitchens, bathrooms, and living spaces.',
      icon: <Home className="w-8 h-8 text-blue-600" />,
      projects: ['Kitchen Countertops', 'Bathroom Vanities', 'Flooring', 'Fireplace Surrounds']
    },
    {
      title: 'Commercial',
      description: 'Elevate your business space with sophisticated marble installations.',
      icon: <Building className="w-8 h-8 text-green-600" />,
      projects: ['Office Lobbies', 'Retail Spaces', 'Hotels & Restaurants', 'Corporate Buildings']
    }
  ];

  if (loading) {
    return <PageLoadingSkeleton type="services" />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Video Background with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/service.mp4" type="video/mp4" />
          </video>
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0 video-fallback"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>
        
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
        
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {/* Services Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-4"
            >
              <Wrench className="w-4 h-4 mr-2" />
              COMPREHENSIVE SOLUTIONS
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.9] tracking-tight"
              >
                OUR SERVICES
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
              From premium marble sourcing to expert installation and ongoing maintenance, we provide end-to-end solutions that transform your vision into reality with unmatched quality and craftsmanship.
            </motion.p>

            {/* Services Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">6+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Core Services</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">100%</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Satisfaction</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">24/7</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Support</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 transition-all duration-300 shadow-2xl hover:shadow-white/20 font-semibold"
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
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black text-sm sm:text-base lg:text-lg px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 transition-all duration-300 backdrop-blur-sm"
                onClick={() => {
                  document.getElementById('comprehensive-solutions')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                View Services
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
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Certified Professionals</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Quality Guaranteed</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span className="text-sm">Timely Delivery</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            id="comprehensive-solutions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              COMPREHENSIVE MARBLE SOLUTIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From initial consultation to final installation and ongoing maintenance, 
              we provide end-to-end marble services that exceed expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              OUR PROCESS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach ensuring quality and satisfaction at every step
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-14 h-14 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-blue-600">{step.step}</span>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-lg">
                    <div className="text-blue-600 mb-3 flex justify-center">{step.icon}</div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-xs text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              APPLICATIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Versatile marble solutions for every type of project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {applications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{app.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{app.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">{app.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {app.projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="flex items-center text-xs text-gray-700">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {project}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              READY TO START YOUR PROJECT?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Get a free consultation and quote for your marble project. Our experts are ready to help you create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4">
                Get Free Quote
              </Button>
              <Button className="border border-white text-white hover:bg-white hover:text-black px-8 py-4">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
