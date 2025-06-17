'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fadeInUp, slideIn, staggerContainer } from '@/utils/animations';

const projects = [
  {
    title: 'Bitaxe Web Flasher',
    description:
      'The Project Bitaxe-Web-Flasher got funded for creating an easy and reliable flashing tool.',
    github: 'https://github.com/bitaxeorg/bitaxe-web-flasher',
  },
  {
    title: 'Eko-Miner',
    description:
      'The Project Eko-miner got funded the ASIC chips for doing R&D and hopefully creating a new device.',
    github: 'https://github.com/phil31/NerdEKO-Gamma',
  },
  {
    title: 'Bitaxe-raw',
    description:
      'The Project bitaxe-raw got funded for creating a simple and minimalisitc usbserial Firmware.',
    github: 'https://github.com/bitaxeorg/bitaxe-raw',
  },
  {
    title: 'Bitaxe 3D-Prints',
    description:
      'The Project Bitaxe 3D-Prints got funded for creating a collection of all open source and compatible 3D Prints.',
    github: 'https://github.com/bitaxeorg/bitaxe-3d-prints',
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
          Our Granted Projects
        </motion.h2>
        <motion.h2
          className='text-4xl font-bold text-center mb-12'
          variants={slideIn('up')}
        >
          Please note, for privacy reasons, specific amounts will not be
          disclosed nor any personal identifiable information, that isn't
          already disclosed by the developer.
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
