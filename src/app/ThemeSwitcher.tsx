"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeSwitcher({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<string | null>(null);

  // Set theme on mount and listen for changes
  useEffect(() => {
    // Helper to apply theme
    const applyTheme = (t: string) => {
      if (t === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    // Get theme from localStorage or system
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`p-2 rounded-full bg-white/80 dark:bg-[#23272f]/80 shadow border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      {theme === 'dark' ? <FiSun className="text-yellow-500 text-xl" /> : <FiMoon className="text-gray-700 text-xl" />}
    </button>
  );
} 