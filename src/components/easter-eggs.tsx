'use client';

import { motion, useAnimation } from 'framer-motion';
import { Bitcoin } from 'lucide-react';
import { useEffect, useState } from 'react';

const matrixCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$₿';

const MatrixRain = () => {
  return (
    <div className='fixed inset-0 pointer-events-none z-50'>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute text-primary text-opacity-50 text-sm'
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{
            y: window.innerHeight + 100,
            transition: {
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {[...Array(20)].map((_, j) => (
            <div key={j}>
              {
                matrixCharacters[
                  Math.floor(Math.random() * matrixCharacters.length)
                ]
              }
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const BlockchainVisualization = () => {
  const blocks = [
    { number: 1, time: '10:00 AM', age: '5 min ago', size: '1.2 MB' },
    { number: 2, time: '10:01 AM', age: '4 min ago', size: '0.8 MB' },
    { number: 3, time: '10:02 AM', age: '3 min ago', size: '1.5 MB' },
    { number: 4, time: '10:03 AM', age: '2 min ago', size: '1.1 MB' },
    { number: 5, time: '10:04 AM', age: '1 min ago', size: '0.9 MB' },
  ];

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
      <div className='flex space-x-4'>
        {blocks.map((block, index) => (
          <motion.div
            key={block.number}
            className='w-40 h-48 bg-primary text-primary-foreground rounded-lg p-4 flex flex-col justify-between'
            initial={{ y: 50 * (index + 1), opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              delay: index * 0.1,
            }}
          >
            <div>
              <h3 className='text-lg font-bold'>Block {block.number}</h3>
              <p className='text-sm'>Time: {block.time}</p>
              <p className='text-sm'>Age: {block.age}</p>
              <p className='text-sm'>Size: {block.size}</p>
            </div>
            <div className='text-2xl font-bold'>₿</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function EasterEggs() {
  const [showBitcoin, setShowBitcoin] = useState(false);
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'b') {
        setShowBitcoin(true);
        setTimeout(() => setShowBitcoin(false), 3000);
      }
      if (event.key === 'c') {
        setShowBlockchain(true);
        setTimeout(() => setShowBlockchain(false), 5000);
      }
      if (event.key === 'm') {
        setShowMatrixRain(true);
        setTimeout(() => setShowMatrixRain(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (showBitcoin) {
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 360, 0],
        transition: { duration: 0.5 },
      });
    }
  }, [showBitcoin, controls]);

  return (
    <>
      {showBitcoin && (
        <motion.div
          className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div animate={controls}>
            <Bitcoin size={100} className='text-primary' />
          </motion.div>
        </motion.div>
      )}
      {showBlockchain && <BlockchainVisualization />}
      {showMatrixRain && <MatrixRain />}
    </>
  );
}
