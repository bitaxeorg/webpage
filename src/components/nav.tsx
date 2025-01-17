'use client';

import { motion } from 'framer-motion';
import { FileText, Folder, Home, Info, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'top', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'updates', label: 'Updates', icon: FileText },
    { id: 'transparency', label: 'Transparency', icon: FileText },
    { id: 'discord', label: 'Discord', icon: 'discord' },
  ];

  const DISCORD_INVITE_URL = 'https://discord.gg/osmu';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'discord') {
      window.open(DISCORD_INVITE_URL, '_blank');
    } else if (id === 'transparency') {
      window.location.href = '/transparency';
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className='fixed top-2 left-0 right-0 flex justify-center z-50 px-0.5'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className='relative inline-flex rounded-full bg-background/80 dark:bg-black/20 backdrop-blur-md border border-border'>
        {/* Burger Menu Button - mobile */}
        <button
          className='md:hidden p-2.5 hover:bg-foreground/5 active:bg-foreground/10 rounded-full transition-colors flex items-center gap-2'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='Toggle menu'
        >
          <span className='text-sm font-medium text-foreground/90'>Menu</span>
          <Menu className='w-5 h-5 text-foreground/70' />
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen
              ? 'translate-y-1 opacity-100'
              : '-translate-y-2 opacity-0 pointer-events-none'
          } md:hidden absolute -left-20 top-full min-w-[240px] bg-background/95 dark:bg-black/95 border border-border rounded-2xl py-2 z-20 shadow-xl transition-all duration-200 ease-out`}
        >
          <ul className='flex flex-col py-1'>
            {navItems.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  onClick={(e) => {
                    handleClick(e, item.id);
                    setIsMenuOpen(false);
                  }}
                  className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-colors cursor-pointer'
                >
                  {item.id === 'discord' ? (
                    <svg
                      viewBox='0 0 24 24'
                      className='w-5 h-5'
                      fill='currentColor'
                    >
                      <path d='M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z' />
                    </svg>
                  ) : (
                    <item.icon className='w-4 h-4' />
                  )}
                  <span>{item.label}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop Menu */}
        <ul className='hidden md:flex items-center gap-2 px-4 py-2'>
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                onClick={(e) => handleClick(e, item.id)}
                className='flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer'
              >
                {item.id === 'discord' ? (
                  <svg
                    viewBox='0 0 24 24'
                    className='w-4 h-4 sm:w-5 sm:h-5'
                    fill='currentColor'
                  >
                    <path d='M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z' />
                  </svg>
                ) : (
                  <item.icon className='w-3 h-3 sm:w-4 sm:h-4' />
                )}
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
