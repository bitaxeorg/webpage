import { motion } from 'framer-motion';

import { fadeInUp, slideIn } from '@/utils/animations';

export function InfoSection() {
  return (
    <motion.section
      id='info'
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
          Community
        </motion.h2>
        <motion.div
          className='max-w-3xl mx-auto text-center'
          variants={fadeInUp}
        >
          {/*<p className='text-lg mb-6'>
            Open Source Miners United is a decentralized global community
            advancing open source technologies in Bitcoin mining. Unlike
            traditional organizations, we operate independently of any company,
            government, or NGO. Our work is sustained entirely through community
            donations, which fund our core infrastructure, support innovative
            grant projects, and enable the reverse engineering of new mining
            chips.
          </p> */}

          <p className='text-lg mb-6'>
            Our community's achievements showcase the power of open
            collaboration. We've developed several groundbreaking innovations,
            including the Bitaxe - the world's first open-source Bitcoin ASIC
            miner - and pioneering ESP32-based mining solutions. These
            breakthroughs demonstrate our commitment to making mining technology
            more accessible and transparent.
          </p>

          {/*<p className='text-lg mb-6'>
            We maintain full transparency about how donations are used: from
            keeping our servers running and websites maintained, to funding
            promising grant applications and acquiring new mining equipment for
            reverse engineering. This openness ensures that every contribution
            directly advances open-source mining technology.
          </p> */}

          <p className='text-lg mb-6'>
            Our community welcomes everyone passionate about decentralized
            technology - whether you're a developer, engineer, miner, or
            enthusiast. Join us in our mission to democratize Bitcoin mining
            through open-source innovation.
          </p>

          <p className='text-lg'>Don't trust us? Good! Verify!</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
