'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fadeInUp, slideIn, staggerContainer } from '@/utils/animations';

const projects = [
  {
    title: 'ESP-Miner',
    description: 'The firmware for all Bitaxe',
    github: 'https://github.com/skot/esp-miner',
  },
  {
    title: 'Bitaxe Gamma',
    description: 'The newest Bitaxe with an average of 1.2Th/s',
    github: 'https://github.com/bitaxeorg/bitaxeGamma',
  },
  {
    title: 'Bitaxe Web Flasher',
    description:
      'The easiest solution to flash your Bitaxe directly from your browser!',
    github: 'https://github.com/bitaxeorg/bitaxe-web-flasher',
  },
  {
    title: 'NerdQAxe++',
    description: '4 BM1370 Chips on a single board with an average of 5Th/s',
    github: 'https://github.com/shufps/qaxe',
  },
  {
    title: 'BitHalo',
    description: 'The first accessory for your Bitaxe',
    github: 'https://github.com/IamGPIO/BitHalo-201-204-Bitaxe',
  },
  {
    title: 'AntSniffer',
    description:
      'Tap into the signals on an Antminer data cable for logic analyzers and other development purposes',
    github: 'https://github.com/SirVapes/AntSniffer',
  },
  {
    title: 'Public Pool',
    description: 'A Nestjs and Typescript Bitcoin stratum mining server',
    github: 'https://github.com/benjamin-wilson/public-pool',
  },
  {
    title: 'NerdEko',
    description: '12 BM1370 Chips on a single board with an average of 14Th/s',
    github: 'https://github.com/phil31/NerdEKO-Gamma',
  },
];

export function ProjectsSection() {
  return (
    <motion.section
      id='projects'
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
          Our Projects
        </motion.h2>
        <motion.div
          className='grid md:grid-cols-3 gap-6'
          variants={staggerContainer}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.2 },
              }}
            >
              <a
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Card className='bg-secondary/70 border-primary/20 hover:border-primary transition-colors'>
                  <CardHeader>
                    <CardTitle className='text-primary flex items-center justify-between'>
                      {project.title}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Github className='w-6 h-6 text-primary' />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground'>
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
