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

const GenesisBlock = ({ onClose }: { onClose: () => void }) => {
  const rawHexData = [
    '00000000   01 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................',
    '00000010   00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................',
    '00000020   00 00 00 00 3B A3 ED FD  7A 7B 12 B2 7A C7 2C 3E   ....;£íýz{.²zÇ,>',
    '00000030   67 76 8F 61 7F C8 1B C3  88 8A 51 32 3A 9F B8 AA   gv.a.È.ÃˆŠQ2:Ÿ¸ª',
    '00000040   4B 1E 5E 4A 29 AB 5F 49  FF FF 00 1D 1D AC 2B 7C   K.^J)«_Iÿÿ...¬+|',
    '00000050   01 01 00 00 00 01 00 00  00 00 00 00 00 00 00 00   ................',
    '00000060   00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00   ................',
    '00000070   00 00 00 00 00 00 FF FF  FF FF 4D 04 FF FF 00 1D   ..........M.ÿÿ..',
    '00000080   01 04 45 54 68 65 20 54  69 6D 65 73 20 30 33 2F   ..EThe Times 03/',
    '00000090   4A 61 6E 2F 32 30 30 39  20 43 68 61 6E 63 65 6C   Jan/2009 Chancel',
    '000000A0   6C 6F 72 20 6F 6E 20 62  72 69 6E 6B 20 6F 66 20   lor on brink of ',
    '000000B0   73 65 63 6F 6E 64 20 62  61 69 6C 6F 75 74 20 66   second bailout f',
    '000000C0   6F 72 20 62 61 6E 6B 73  FF FF FF FF 01 00 F2 05   or banksÿÿÿÿ..ò.',
    '000000D0   2A 01 00 00 00 43 41 04  67 8A FD B0 FE 55 48 27   *....CA.gŠý°þUH',
    '000000E0   19 67 F1 A6 71 30 B7 10  5C D6 A8 28 E0 39 09 A6   .gñ¦q0·.\\Ö¨(à9.¦',
    '000000F0   79 62 E0 EA 1F 61 DE B6  49 F6 BC 3F 4C EF 38 C4   ybàê.aÞ¶Iö¼?Lï8Ä',
    '00000100   F3 55 04 E5 1E C1 12 DE  5C 38 4D F7 BA 0B 8D 57   óU.å.Á.Þ\\8M÷º..W',
    '00000110   8A 4C 70 2B 6B F1 1D 5F  AC 00 00 00 00            ŠLp+kñ._¬....   ',
  ];

  const [decodedLines, setDecodedLines] = useState<string[]>(
    Array(rawHexData.length).fill(''),
  );

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;

    const interval = setInterval(() => {
      if (currentLineIndex >= rawHexData.length) {
        clearInterval(interval);
        return;
      }

      const targetLine = rawHexData[currentLineIndex];

      setDecodedLines((prev) => {
        const newLines = [...prev];
        // Initialize with random characters only for positions that have actual content
        if (currentCharIndex === 0) {
          newLines[currentLineIndex] = targetLine
            .split('')
            .map((char) =>
              // Only randomize if it's not a space or formatting character
              char === ' ' || char === '.'
                ? char
                : String.fromCharCode(Math.floor(Math.random() * 93) + 33),
            )
            .join('');
        }

        // Replace one character at a time, preserving spaces and formatting
        newLines[currentLineIndex] =
          targetLine.slice(0, currentCharIndex + 1) +
          newLines[currentLineIndex].slice(currentCharIndex + 1);

        return newLines;
      });

      currentCharIndex++;

      // Move to next line when current line is complete
      if (currentCharIndex >= targetLine.length) {
        // Only increment line index if we're not at the last line
        if (currentLineIndex < rawHexData.length - 1) {
          currentLineIndex++;
          currentCharIndex = 0;
        } else {
          // If we're at the last line and finished, clear the interval
          clearInterval(interval);
        }
      }
    }, 10);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none z-50 overflow-hidden bg-black/90'>
      <button
        onClick={onClose}
        className='absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 pointer-events-auto'
      >
        <X size={16} />
      </button>
      <div className='p-8 font-mono relative min-h-[350px]'>
        <div className='space-y-1'>
          {decodedLines.map((line, index) => (
            <motion.pre
              key={index}
              className='font-mono text-primary relative h-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className='text-primary mr-2.5'>&gt;</span>
              {line}
            </motion.pre>
          ))}
        </div>

        <motion.div
          className='text-center mt-5 text-xl'
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              decodedLines[decodedLines.length - 1] >=
              rawHexData[rawHexData.length - 1]
                ? 1
                : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
        >
          Genesis Block Decoded - Bitcoin's Beginning
        </motion.div>
      </div>
    </div>
  );
};

export function EasterEggs() {
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [showGenesisBlock, setShowGenesisBlock] = useState(false);
  const [showMatrixRain, setShowMatrixRain] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'b') {
        setShowBlockchain(true);
      } else if (event.key === 'g') {
        setShowGenesisBlock(true);
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
      {showGenesisBlock && (
        <GenesisBlock onClose={() => setShowGenesisBlock(false)} />
      )}
      {showMatrixRain && (
        <MatrixRain onClose={() => setShowMatrixRain(false)} />
      )}
    </>
  );
}
