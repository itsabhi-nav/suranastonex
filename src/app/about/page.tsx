'use client';

import { motion } from 'framer-motion';
import { Award, Users, Globe, Target, CheckCircle, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { PageLoadingSkeleton } from '@/components/ui/PageLoadingSkeleton';

export default function AboutPage() {
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

  const stats = [
    { number: '35+', label: 'Years Experience', icon: <Award className="w-8 h-8" /> },
    { number: '6000+', label: 'Projects Completed', icon: <Users className="w-8 h-8" /> },
    { number: '30+', label: 'Countries Sourced', icon: <Globe className="w-8 h-8" /> },
    { number: '800+', label: 'Marble Varieties', icon: <Target className="w-8 h-8" /> },
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality standards and exceptional craftsmanship.',
      icon: <Award className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Innovation',
      description: 'Embracing cutting-edge technology and modern techniques to deliver innovative marble solutions.',
      icon: <Target className="w-6 h-6 text-green-600" />
    },
    {
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and consistent delivery of promises.',
      icon: <CheckCircle className="w-6 h-6 text-purple-600" />
    },
    {
      title: 'Sustainability',
      description: 'Committed to environmentally responsible sourcing and sustainable practices in all our operations.',
      icon: <Globe className="w-6 h-6 text-orange-600" />
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: '35+ years in the marble industry with expertise in sourcing and quality control.'
    },
    {
      name: 'Priya Sharma',
      position: 'Head of Design',
      image: '/italian.png',
      description: 'Award-winning designer specializing in luxury marble applications and interior design.'
    },
    {
      name: 'Amit Patel',
      position: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Expert in project management and ensuring seamless execution of complex marble installations.'
    },
    {
      name: 'Sneha Reddy',
      position: 'Quality Assurance Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      description: 'Ensuring every piece meets our stringent quality standards and international certifications.'
    }
  ];

  if (loading) {
    return <PageLoadingSkeleton type="about" />;
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
            <source src="/refinery-mobile.mp4" type="video/mp4" />
          </video>
          {/* Fallback background image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-0 video-fallback"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
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
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 lg:space-y-12"
          >
            {/* Company Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white/90 mb-4"
            >
              <Award className="w-4 h-4 mr-2" />
              ESTABLISHED 1989
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.9] tracking-tight"
              >
                OUR STORY
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
              Three decades of excellence in marble craftsmanship and innovation. From humble beginnings to global recognition, discover the journey that shaped Surana Stonex into a leader in premium marble solutions.
            </motion.p>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12 pt-4"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">35+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Years Legacy</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">6000+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Projects</div>
              </div>
              <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">30+</div>
                <div className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider">Countries</div>
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
                  document.getElementById('crafting-excellence')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Discover Our Journey
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
                <Users className="w-4 h-4" />
                <span className="text-sm">6000+ Satisfied Clients</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">35+ Years Experience</span>
              </div>
              <div className="w-px h-4 bg-gray-400"></div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Global Network</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              id="crafting-excellence"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 mb-6 sm:mb-8 tracking-wide">
                CRAFTING EXCELLENCE SINCE 1989
              </h2>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded by Rajesh Kumar with a vision to bring the world&apos;s finest marbles to India, 
                  Surana Stonex has grown from a small family business to a leading marble company serving 
                  prestigious clients across the globe.
                </p>
                <p>
                  Our journey began with a simple belief: that every space deserves the beauty and 
                  elegance of natural stone. Today, we source premium marbles from over 30 countries, 
                  ensuring that our clients have access to the most exclusive and high-quality materials.
                </p>
                <p>
                  With over 6,000 successful projects and a team of dedicated professionals, we continue 
                  to push the boundaries of marble craftsmanship while maintaining our commitment to 
                  quality, innovation, and customer satisfaction.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Marble Workshop"
                width={600}
                height={384}
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">35+</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              OUR ACHIEVEMENTS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-light mb-2 text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              OUR VALUES
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-wide">
              OUR TEAM
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind Surana Stonex&apos;s success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={224}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3 text-sm">{member.position}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Quote className="w-16 h-16 text-blue-400 mx-auto mb-8" />
            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
              &ldquo;Our commitment to excellence goes beyond just providing beautiful marbles. 
              We create lasting relationships and deliver experiences that exceed expectations.&rdquo;
            </blockquote>
            <div className="text-lg text-gray-300">
              <cite className="not-italic font-semibold">Rajesh Kumar</cite>
              <span className="text-gray-500"> - Founder & CEO</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
