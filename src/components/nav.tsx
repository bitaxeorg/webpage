'use client';

import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { FileText, Folder, Home, Info } from 'lucide-react';

export default function Nav() {
  const navItems = [
    { id: 'top', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'updates', label: 'Updates', icon: FileText },
    { id: 'discord', label: 'Discord', icon: 'discord' },
  ];

  const DISCORD_INVITE_URL = 'https://discord.gg/osmu';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'discord') {
      window.open(DISCORD_INVITE_URL, '_blank');
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className='fixed top-2 left-0 right-0 flex justify-center z-50'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className='px-1 py-1 sm:px-1.5 sm:py-1.5 rounded-full bg-background/80 dark:bg-black/20 backdrop-blur-md border border-border'>
        <ul className='flex items-center gap-0.5 sm:gap-1'>
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                onClick={(e) => handleClick(e, item.id)}
                className='flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer'
              >
                {item.id === 'discord' ? (
                  <FontAwesomeIcon
                    icon={faDiscord}
                    className='w-3 h-3 sm:w-4 sm:h-4'
                  />
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
