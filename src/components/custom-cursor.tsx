'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useSpring(1, {
    damping: 25,
    stiffness: 300,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = (element: HTMLElement | null): boolean => {
        if (!element) return false;
        if (element === document.body) return false;
        if (
          element.matches(
            'button, a, [role="button"], input, select, [onclick]',
          )
        )
          return true;
        return isClickable(element.parentElement);
      };

      if (isClickable(target)) {
        document.body.style.cursor = '';
        scale.set(1.5);
      } else {
        document.body.style.cursor = 'none';
        scale.set(1);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = '';
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      className='fixed z-50 pointer-events-none'
      style={{
        left: cursorX,
        top: cursorY,
        scale: scale,
      }}
    >
      <div className='relative flex items-center justify-center'>
        <div className='h-8 w-8 rounded-full border-2 border-primary opacity-70' />
        <div className='absolute h-2 w-2 rounded-full bg-primary' />
      </div>
    </motion.div>
  );
}
