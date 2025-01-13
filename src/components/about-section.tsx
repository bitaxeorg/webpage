import { motion } from 'framer-motion';

import { fadeInUp, slideIn } from '@/utils/animations';

export function AboutSection() {
  return (
    <motion.section
      id='about'
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
          About Us
        </motion.h2>
        <motion.div
          className='max-w-3xl mx-auto text-center'
          variants={fadeInUp}
        >
          <p className='text-lg mb-6'>
            Open Source Miners United is a global community dedicated to
            developing and promoting open source technologies for the mining
            industry. Unlike traditional organizations, we are a truly
            decentralized network of passionate developers, engineers, and
            miners spread across the globe.
          </p>
          <p className='text-lg mb-6'>
            Our community has pioneered numerous breakthrough innovations in
            Bitcoin mining, creating several world-first miners in their
            respective categories. From the Bitaxe, the world's first
            open-source Bitcoin ASIC miner, to groundbreaking ESP32-based mining
            solutions, our members consistently push the boundaries of what's
            possible in open-source mining technology.
          </p>
          <p className='text-lg'>
            Whether you're a developer, engineer, miner, or simply passionate
            about open-source technology, you're welcome to join our community
            and contribute to shaping the future of decentralized mining.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
