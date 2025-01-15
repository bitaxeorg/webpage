'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const opacity = useSpring(0.7, {
    damping: 25,
    stiffness: 300,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
        opacity.set(1);
      } else {
        document.body.style.cursor = 'none';
        opacity.set(0.7);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = '';
    };
  }, [cursorX, cursorY, opacity]);

  return (
    <motion.div
      className='fixed z-50 pointer-events-none'
      style={{
        left: cursorX,
        top: cursorY,
        opacity: opacity,
      }}
    >
      <div className='relative'>
        <div
          className='absolute h-48 w-48 blur-xl bg-primary/25 rounded-full'
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <svg
          width='32'
          height='32'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 1L7.5 14.5L9.5 8.5L15.5 6.5L1 1Z'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='1'
            className='text-primary'
          />
        </svg>
      </div>
    </motion.div>
  );
}
