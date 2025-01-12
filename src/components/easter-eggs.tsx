'use client';

import mempoolJS from '@mempool/mempool.js';
import { motion, useAnimation } from 'framer-motion';
import { Bitcoin } from 'lucide-react';
import { useEffect, useState } from 'react';

const matrixCharacters = '₿ABCDEFGHIJKLMNO₿PQRSTUVWXYZ₿';

const MatrixRain = () => {
  const columns = Math.floor(window.innerWidth / 20); // Adjust based on character width
  const [characters, setCharacters] = useState<string[][]>([]);

  useEffect(() => {
    // Initialize columns with random characters
    const initialChars = Array(columns)
      .fill(0)
      .map(() =>
        Array(30)
          .fill(0)
          .map(
            () =>
              matrixCharacters[
                Math.floor(Math.random() * matrixCharacters.length)
              ],
          ),
      );
    setCharacters(initialChars);

    // Periodically update random characters
    const interval = setInterval(() => {
      setCharacters((prev) =>
        prev.map((column) =>
          column.map(
            (char) =>
              Math.random() < 0.02 // 2% chance to change character
                ? matrixCharacters[
                    Math.floor(Math.random() * matrixCharacters.length)
                  ]
                : char, // Keep existing character if not changing
          ),
        ),
      );
    }, 50);

    return () => clearInterval(interval);
  }, [columns]);

  return (
    <div className='fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/90'>
      {characters.map((column, i) => (
        <motion.div
          key={i}
          className='absolute text-primary font-matrix text-opacity-90 text-xl select-none'
          style={{
            left: `${i * 20}px`,
            width: '20px',
            textAlign: 'center',
            top: -600,
          }}
          animate={{
            y: [0, window.innerHeight + 600],
            transition: {
              duration: Math.random() * 4 + 6, // Random duration between 6-10 seconds
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2, // Random initial delay between 0-2 seconds
            },
          }}
        >
          {column.map((char, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: j * 0.1,
              }}
              style={{
                textShadow: '0 0 8px #22ff88',
                opacity: 1 - j * 0.1, // Fade out towards the bottom
              }}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const BlockchainVisualization = () => {
  const [blocks, setBlocks] = useState<
    Array<{
      number: number;
      time: string;
      age: string;
      size: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const { bitcoin } = mempoolJS();
        const {
          blocks: { getBlocks, getBlocksTipHeight },
        } = bitcoin;

        // Get the latest block height
        const tipHeight = await getBlocksTipHeight();

        // Fetch blocks
        const latestBlocks = await getBlocks({ start_height: tipHeight });

        // Format the blocks
        const formattedBlocks = latestBlocks.slice(0, 5).map((block) => ({
          number: block.height,
          time: new Date(block.timestamp * 1000).toLocaleTimeString(),
          age: getRelativeTime(block.timestamp * 1000),
          size: `${(block.size / 1000000).toFixed(1)} MB`,
        }));

        setError(null);
        setBlocks(formattedBlocks);
      } catch (error) {
        setError('Failed to fetch blockchain data');
        setBlocks([]);
      }
    };

    fetchBlocks();
  }, []);

  // Helper function to format relative time
  const getRelativeTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  if (error) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
        <div className='text-destructive'>{error}</div>
      </div>
    );
  }

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

const BitcoinVisualization = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 720, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      },
    });
  }, [controls]);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
      <motion.div
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, -20, 0],
        }}
        transition={{
          y: {
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          },
        }}
        exit={{ opacity: 0 }}
      >
        <motion.div animate={controls} className='relative'>
          <motion.div
            className='absolute inset-0 text-primary/50 blur-xl'
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Bitcoin size={100} />
          </motion.div>
          <Bitcoin size={100} className='text-primary relative' />
        </motion.div>
      </motion.div>
    </div>
  );
};

export function EasterEggs() {
  const [showBitcoin, setShowBitcoin] = useState(false);
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'b') {
        setShowBitcoin(true);
        timeoutId = setTimeout(() => setShowBitcoin(false), 4000);
      }
      if (event.key === 'c') {
        setShowBlockchain(true);
        timeoutId = setTimeout(() => setShowBlockchain(false), 10000);
      }
      if (event.key === 'm') {
        setShowMatrixRain(true);
        timeoutId = setTimeout(() => setShowMatrixRain(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {showBitcoin && <BitcoinVisualization />}
      {showBlockchain && <BlockchainVisualization />}
      {showMatrixRain && <MatrixRain />}
    </>
  );
}
