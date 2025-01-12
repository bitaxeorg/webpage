'use client';

import { motion } from 'framer-motion';
import { FileText, Folder, Home, Info } from 'lucide-react';

export default function Nav() {
  const navItems = [
    { href: '#hero', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: Info },
    { href: '#projects', label: 'Projects', icon: Folder },
    { href: '#updates', label: 'Updates', icon: FileText },
  ];

  return (
    <motion.nav
      className='fixed top-4 left-0 right-0 flex justify-center z-50'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className='px-1.5 py-1.5 rounded-full bg-background/80 dark:bg-black/20 backdrop-blur-md border border-border'>
        <ul className='flex items-center gap-1'>
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={item.href}
                className='flex items-center gap-2 px-4 py-2 rounded-full text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors'
              >
                <item.icon className='w-4 h-4' />
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
