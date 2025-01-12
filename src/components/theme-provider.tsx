'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Color = 'yellow' | 'blue' | 'green' | 'purple';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColor?: Color;
}

interface ThemeContextType {
  theme: Theme;
  color: Color;
  setTheme: (theme: Theme) => void;
  setColor: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme,
  defaultColor = 'green',
}: ThemeProviderProps) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;

      if (defaultTheme) return defaultTheme;

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [color, setColor] = useState<Color>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('color') as Color) || defaultColor;
    }
    return defaultColor;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both classes first
    root.classList.remove('light', 'dark');
    // Add the current theme
    root.classList.add(theme);

    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--primary-color', getColorValue(color));

    // Force a re-render of elements using the primary color
    root.style.setProperty(
      '--primary',
      `var(--primary-color, ${getColorValue(color)})`,
    );
    localStorage.setItem('color', color);
  }, [color]);

  // Add listener for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, color, setTheme, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function getColorValue(color: Color): string {
  switch (color) {
    case 'yellow':
      return '47 95% 50%';
    case 'blue':
      return '217 91% 60%';
    case 'green':
      return '142 71% 45%';
    case 'purple':
      return '269 80% 60%';
    default:
      return '142 71% 45%';
  }
}
