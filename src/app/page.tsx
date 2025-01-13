'use client';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

import { AboutSection } from '@/components/about-section';
import { LatestRelease } from '@/components/latest-release';
import Nav from '@/components/nav';
import { ProjectsSection } from '@/components/projects-section';
import { Button } from '@/components/ui/button';

import {
  fadeInUp,
  scaleIn,
  slideIn,
  staggerContainer,
} from '@/utils/animations';

import bitAxeSchematic from '/public/images/bitaxe-render-and-schematic.png';

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
            Empowering Open Source Mining
          </motion.h1>
          <motion.p
            className='text-xl text-muted-foreground'
            variants={fadeInUp}
          >
            Join our community of passionate miners and developers working
            together to advance open source mining technologies.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href='#donate'>
              <Button
                variant='outline'
                size='lg'
                className='bg-primary text-background hover:bg-primary/80 hover:text-background'
              >
                Like to Donate and help us?
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Project Section */}
      <motion.section
        id='featured'
        className='py-20 min-h-screen'
        variants={fadeInUp}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <motion.div
          className='container mx-auto px-4'
          variants={staggerContainer}
        >
          <motion.h2
            className='text-4xl font-bold text-center mb-12'
            variants={slideIn('up')}
          >
            Featured Project
          </motion.h2>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <motion.img
              src={bitAxeSchematic.src}
              alt='Featured Project Screenshot'
              className='rounded-lg shadow-xl max-h-[500px] ml-auto w-full'
              variants={slideIn('left')}
              whileHover={{
                scale: 1.05,
                rotate: -2,
                transition: { duration: 0.2 },
              }}
            />
            <motion.div className='space-y-6' variants={slideIn('right')}>
              <h3 className='text-3xl font-bold text-primary'>Bitaxe</h3>
              <p className='text-muted-foreground'>
                Our flagship open-source project for Bitcoin Home Mining.
              </p>
              <div className='flex space-x-4'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant='outline'>View Bitaxe</Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant='outline'>View ESP Miner</Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <AboutSection />

      <ProjectsSection />

      {/* Updates Section */}
      <motion.section
        id='updates'
        className='py-20 min-h-screen'
        variants={fadeInUp}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <div className='container mx-auto px-4'>
          <motion.h2
            className='text-4xl font-bold text-center mb-12'
            variants={slideIn('up')}
          >
            Latest Bitaxe Updates
          </motion.h2>
          <LatestRelease />
        </div>
      </motion.section>

      {/* Donate Section */}
      <motion.section
        id='donate'
        className='py-20 min-h-screen'
        variants={fadeInUp}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <motion.div
          className='container mx-auto px-4 text-center'
          variants={staggerContainer}
        >
          <motion.h2
            className='text-4xl font-bold mb-6'
            variants={slideIn('up')}
          >
            Like to donate?
          </motion.h2>
          <motion.div
            className='flex flex-col items-center gap-6'
            variants={scaleIn}
          >
            <QRCodeSVG
              value='bitcoin:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
              size={200}
              level='H'
              includeMargin={true}
              className='rounded-lg'
            />
            <p className='text-lg mb-4'>
              Scan the QR code or click the button below to donate
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href='https://getalby.com/p/osmu' target='_blank'>
                <Button
                  variant='outline'
                  size='lg'
                  className='bg-primary text-background hover:bg-primary/80 hover:text-background'
                >
                  Donate
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
