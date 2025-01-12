'use client';

import { motion } from 'framer-motion';
import { Moon, Palette, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Color = 'yellow' | 'blue' | 'green' | 'purple';

export function ThemeSelector() {
  const { theme, setTheme, color, setColor } = useTheme();

  const colors: { name: Color; label: string }[] = [
    { name: 'yellow', label: 'Yellow' },
    { name: 'blue', label: 'Blue' },
    { name: 'green', label: 'Green' },
    { name: 'purple', label: 'Purple' },
  ];

  return (
    <motion.div
      className='fixed bottom-4 right-4 flex gap-2 z-50'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Palette className='h-[1.2rem] w-[1.2rem]' />
            <span className='sr-only'>Change color theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='absolute right-0'>
          {colors.map((c) => (
            <DropdownMenuItem
              key={c.name}
              onClick={() => setColor(c.name as Color)}
              className={color === c.name ? 'bg-primary/20' : ''}
            >
              {c.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant='outline'
        size='icon'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <Moon className='h-[1.2rem] w-[1.2rem]' />
        ) : (
          <Sun className='h-[1.2rem] w-[1.2rem]' />
        )}
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </motion.div>
  );
}
