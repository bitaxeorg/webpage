'use client';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

import { DonationsSection } from '@/components/donations-section';

import { fadeInUp, scaleIn, staggerContainer } from '@/utils/animations';

import { ProjectsSection } from './granted-projects-section';
import { InfoSection } from './info-section';
import Nav from './nav';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const scale = useTransform(springScroll, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);
  const y = useTransform(springScroll, [0, 0.5], [0, 100]);

  return (
    <main className='min-h-screen'>
      <Nav />

      {/* Progress Bar */}
      <motion.div
        className='fixed top-0 left-0 right-0 h-1 bg-primary z-50'
        style={{
          scaleX: springScroll,
          transformOrigin: '0%',
        }}
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        id='hero'
        className='min-h-screen flex items-center justify-center relative'
        style={{ scale, opacity, y }}
        animate={isHeroInView ? 'animate' : 'initial'}
      >
        <motion.div
          className='text-center space-y-6 max-w-4xl mx-auto px-4'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          <motion.h1
            className='text-5xl md:text-7xl font-bold text-primary'
            variants={scaleIn}
          >
            Transparency Open Source
          </motion.h1>
          <motion.p
            className='text-xl text-muted-foreground'
            variants={fadeInUp}
          >
            Don't trust verify is not just a slogan it's an ethos.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='w-fit mx-auto'
          ></motion.div>
        </motion.div>
      </motion.section>

      <ProjectsSection />

      <InfoSection />
      <DonationsSection />
    </main>
  );
}
