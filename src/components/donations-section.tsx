'use client';

import mempoolJS from '@mempool/mempool.js';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  fadeInUp,
  scaleIn,
  slideIn,
  staggerContainer,
} from '@/utils/animations';

interface Transaction {
  txid: string;
  vout: Array<{
    scriptpubkey_address: string;
    value: number;
  }>;
  vin: Array<{
    prevout: {
      scriptpubkey_address: string;
    };
  }>;
  status: {
    confirmed: boolean;
    block_time: number;
  };
}

export function DonationsSection() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const bitcoinAddress =
    'bc1qnp980s5fpp8l94p5cvttmtdqy8rvrq74qly2yrfmzkdsntqzlc5qkc4rkq';

  useEffect(() => {
    const fetchTransactions = async () => {
      const {
        bitcoin: { addresses },
      } = mempoolJS();

      try {
        const addressTxs = await addresses.getAddressTxsChain({
          address: bitcoinAddress,
        });
        const sortedTxs = addressTxs
          .sort((a, b) => b.status.block_time - a.status.block_time)
          .slice(0, 5);
        setTransactions(sortedTxs);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Failed to fetch recent transactions');
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  return (
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
        <motion.h2 className='text-4xl font-bold mb-6' variants={slideIn('up')}>
          Like to donate?
        </motion.h2>
        <motion.div
          className='flex flex-col items-center gap-6'
          variants={scaleIn}
        >
          <QRCodeSVG
            value={`bitcoin:${bitcoinAddress}`}
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

        <motion.div
          className='mt-8 max-w-md mx-auto bg-secondary/50 rounded-lg p-4'
          variants={fadeInUp}
        >
          <h3 className='text-xl font-semibold mb-4'>Recent Donations</h3>
          <div className='space-y-2'>
            {error ? (
              <p className='text-destructive'>{error}</p>
            ) : transactions.length === 0 ? (
              <p className='text-muted-foreground'>No recent transactions</p>
            ) : (
              transactions.map((tx) => {
                const donation = tx.vout.find(
                  (out) => out.scriptpubkey_address === bitcoinAddress,
                );

                return (
                  donation && (
                    <a
                      href={`https://mempool.space/tx/${tx.txid}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block hover:bg-secondary/20 transition-colors'
                      key={tx.txid}
                    >
                      <div className='bg-secondary/10 rounded-lg p-4 flex justify-between items-center'>
                        <div className='flex flex-col text-left self-start'>
                          <span className='truncate'>
                            From:{' '}
                            {`${tx.vin[0].prevout.scriptpubkey_address.slice(0, 6)}...${tx.vin[0].prevout.scriptpubkey_address.slice(-6)}`}
                          </span>
                        </div>
                        <div className='flex flex-col items-end'>
                          <span className='font-mono'>
                            {(donation.value / 100000000).toFixed(8)} BTC
                          </span>
                          <span className='text-sm text-muted-foreground'>
                            {new Date(
                              tx.status.block_time * 1000,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </a>
                  )
                );
              })
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
