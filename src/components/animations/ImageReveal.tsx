'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  delay = 0,
  duration = 0.8,
  scale = true,
  parallax = false,
  parallaxSpeed = 0.5
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxSpeed * 100}%`]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration, delay }}
    >
      <motion.div
        style={parallax ? { y } : {}}
        className="relative w-full h-full"
      >
        <motion.div
          style={scale ? { scale: scaleValue } : {}}
          className="relative w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={85}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

interface ImageHoverRevealProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: React.ReactNode;
  delay?: number;
}

export function ImageHoverReveal({
  src,
  alt,
  className = '',
  overlay,
  delay = 0
}: ImageHoverRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        quality={85}
      />
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          {overlay}
        </motion.div>
      )}
    </motion.div>
  );
}

interface ImageParallaxProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  height?: string;
}

export function ImageParallax({
  src,
  alt,
  className = '',
  speed = 0.5,
  height = '100vh'
}: ImageParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ height }}>
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
          quality={85}
        />
      </motion.div>
    </div>
  );
}
