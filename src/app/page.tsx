'use client';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

import { AboutSection } from '@/components/about-section';
import Nav from '@/components/nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  fadeInUp,
  scaleIn,
  slideIn,
  staggerContainer,
} from '@/utils/animations';

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
        style={{ scaleX: springScroll }}
        transformOrigin='0%'
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
            className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'
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
        className='py-20 bg-secondary'
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
              src='/placeholder.svg?height=400&width=600'
              alt='Featured Project Screenshot'
              className='rounded-lg shadow-xl'
              variants={slideIn('left')}
              whileHover={{
                scale: 1.05,
                rotate: -2,
                transition: { duration: 0.2 },
              }}
            />
            <motion.div className='space-y-6' variants={slideIn('right')}>
              <h3 className='text-2xl font-bold text-primary'>Bitaxe</h3>
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

      {/* Projects Section */}
      <motion.section
        id='projects'
        className='py-20'
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
            Our Projects
          </motion.h2>
          <motion.div
            className='grid md:grid-cols-3 gap-6'
            variants={staggerContainer}
          >
            {[
              {
                title: 'Bitaxe Gamma',
                description: 'The newest Bitaxe with an avg. of 1.2Th/s',
                github: 'https://github.com/bitaxe/bitaxe-gamma',
              },
              {
                title: 'Bitaxe Web Flasher',
                description:
                  'The easiest solution to flash your Bitaxe directly from your browser!',
                github: 'https://github.com/bitaxe/web-flasher',
              },
              {
                title: 'NerdQAxe++',
                description: '4 BM1370 Chips on a single board avg. 5Th/s',
                github: 'https://github.com/nerdqaxe/nerdqaxe-plus-plus',
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className='bg-secondary border-primary/20 hover:border-primary transition-colors'>
                  <CardHeader>
                    <CardTitle className='text-primary flex items-center justify-between'>
                      {project.title}
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='w-6 h-6 text-primary hover:text-primary/80' />
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Updates Section */}
      <motion.section
        id='updates'
        className='py-20 bg-secondary'
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
            Latest Updates
          </motion.h2>
          <motion.div
            className='max-w-2xl mx-auto'
            variants={scaleIn}
            whileHover={{ scale: 1.02 }}
          >
            <Card className='bg-background border-primary/20'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  v2.4.5 - Jan 7, 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>
                  CRITICAL FIX on devices without PSRAM module - Allow device to
                  start without SPIRAM
                </p>
                <Button variant='outline'>View Release</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Subscribe Section */}
      <motion.section
        id='donate'
        className='py-20'
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
            />
            <p className='text-lg mb-4'>
              Scan the QR code or click the button below to donate
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant='outline'
                size='lg'
                className='bg-primary text-background hover:bg-primary/80 hover:text-background'
              >
                Support Our Projects
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}
