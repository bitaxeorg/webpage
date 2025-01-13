'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { scaleIn } from '@/utils/animations';

interface Release {
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  prerelease: boolean;
}

export function LatestRelease() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLatestReleases() {
      try {
        const response = await fetch(
          'https://api.github.com/repos/skot/ESP-Miner/releases?per_page=8',
        );
        if (!response.ok) throw new Error('Failed to fetch release data');
        const data = await response.json();
        const stableReleases = data
          .filter((release: Release) => !release.prerelease)
          .slice(0, 4);
        setReleases(stableReleases);
      } catch (err) {
        setError('Failed to load release information');
      }
    }

    fetchLatestReleases();
  }, []);

  if (error) {
    return null;
  }

  if (releases.length === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto'>
      {releases.map((release) => {
        const releaseDate = new Date(release.published_at).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          },
        );

        return (
          <motion.div
            key={release.tag_name}
            variants={scaleIn}
            initial='initial'
            animate='animate'
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
          >
            <Card className='bg-secondary border-primary/20 h-full'>
              <CardHeader>
                <CardTitle className='text-primary'>
                  {release.tag_name} - {releaseDate}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-muted-foreground mb-4 prose prose-invert max-w-none'>
                  <ReactMarkdown
                    components={{
                      ul: ({ children }) => (
                        <ul className='list-disc pl-4'>{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className='mb-1'>{children}</li>
                      ),
                    }}
                  >
                    {release.body.length > 400
                      ? `${release.body.slice(0, 400)}...`
                      : release.body}
                  </ReactMarkdown>
                </div>
                <a
                  href={release.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='outline'>View Release</Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
