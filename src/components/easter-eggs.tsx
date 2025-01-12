'use client';

import mempoolJS from '@mempool/mempool.js';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const matrixCharacters = '₿ABCDEFGHIJKLMNO₿PQRSTUVWXYZ₿';

const MatrixRain = ({ onClose }: { onClose: () => void }) => {
  const columns = Math.floor(window.innerWidth / 20);
  const [characters, setCharacters] = useState<string[][]>([]);

  useEffect(() => {
    const initialChars = Array(columns)
      .fill(0)
      .map(() =>
        Array(40)
          .fill(0)
          .map(
            () =>
              matrixCharacters[
                Math.floor(Math.random() * matrixCharacters.length)
              ],
          ),
      );
    setCharacters(initialChars);

    const interval = setInterval(() => {
      setCharacters((prev) =>
        prev.map((column) =>
          column.map((char, index) =>
            Math.random() < (index === 0 ? 0.3 : 0.01)
              ? matrixCharacters[
                  Math.floor(Math.random() * matrixCharacters.length)
                ]
              : char,
          ),
        ),
      );
    }, 33);

    return () => clearInterval(interval);
  }, [columns]);

  return (
    <div className='fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/90'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 pointer-events-auto'
      >
        <X size={16} />
      </button>
      {characters.map((column, i) => (
        <motion.div
          key={i}
          className='absolute text-primary font-matrix text-opacity-90 text-xl select-none'
          style={{
            left: `${i * 20}px`,
            width: '20px',
            textAlign: 'center',
            top: -800,
          }}
          animate={{
            y: [0, window.innerHeight + 800],
            transition: {
              duration: Math.random() * 3 + 8,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 3,
            },
          }}
        >
          {column.map((char, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: j * 0.08,
              }}
              style={{
                textShadow: '0 0 8px #22ff88',
                opacity: Math.max(0, 1 - j * 0.08),
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

const BlockchainVisualization = ({ onClose }: { onClose: () => void }) => {
  const [blocks, setBlocks] = useState<
    Array<{
      number: number;
      age: string;
      size: string;
      feeRange: string;
      pool: string;
      reward: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setIsLoading(true);
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
          age: getRelativeTime(block.timestamp * 1000),
          size: `${(block.size / 1000000).toFixed(1)} MB`,
          feeRange: `${block.extras.feeRange[0].toFixed(0)} - ${block.extras.feeRange[block.extras.feeRange.length - 1].toFixed(0)} sat/vB`,
          pool: block.extras.pool.name || 'Unknown',
          reward: `${(block.extras.reward / 100000000).toFixed(2)} BTC`,
        }));

        setError(null);
        setBlocks(formattedBlocks);
      } catch (error) {
        setError('Failed to fetch blockchain data');
        setBlocks([]);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
        <div className='text-primary'>Loading blockchain data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
        <div className='text-destructive'>{error}</div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-md'>
      <div className='relative max-w-full px-4'>
        <button
          onClick={onClose}
          className='absolute -top-8 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90'
        >
          <X size={16} />
        </button>
        <div className='overflow-x-auto pb-4'>
          <div className='flex space-x-4 min-w-min'>
            {blocks.map((block, index) => (
              <motion.div
                key={block.number}
                className='w-[160px] sm:w-48 shrink-0 bg-primary text-primary-foreground rounded-lg p-4 flex flex-col justify-between'
                initial={{ y: 50 * (index + 1), opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: index * 0.1,
                }}
              >
                <div className='space-y-2'>
                  <h3 className='text-lg font-bold border-b border-primary-foreground/20 pb-1 mb-2'>
                    Block {block.number} <span className='float-right'>₿</span>
                  </h3>
                  <div className='grid grid-cols-3 gap-x-2 gap-y-1.5 text-sm'>
                    <span className='text-primary-foreground/70'>Age:</span>
                    <span className='font-medium col-span-2'>{block.age}</span>

                    <span className='text-primary-foreground/70'>Size:</span>
                    <span className='font-medium col-span-2'>{block.size}</span>

                    <span className='text-primary-foreground/70'>Fees:</span>
                    <span className='font-medium col-span-2'>
                      {block.feeRange}
                    </span>

                    <span className='text-primary-foreground/70'>Pool:</span>
                    <span className='font-medium col-span-2'>{block.pool}</span>

                    <span className='text-primary-foreground/70'>Reward:</span>
                    <span className='font-medium col-span-2'>
                      {block.reward}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function EasterEggs() {
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'b') {
        setShowBlockchain(true);
      } else if (event.key === 'm') {
        setShowMatrixRain(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {showBlockchain && (
        <BlockchainVisualization onClose={() => setShowBlockchain(false)} />
      )}
      {showMatrixRain && (
        <MatrixRain onClose={() => setShowMatrixRain(false)} />
      )}
    </>
  );
}
