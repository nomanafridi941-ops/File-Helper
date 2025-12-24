
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Home } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  // Custom Professional Logo Icon
  const LogoIcon = () => (
    <svg 
      viewBox="0 0 48 48" 
      className="w-8 h-8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer gradient circle background */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      
      {/* Main rounded square background */}
      <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#logoGradient)" />
      
      {/* Document page - left side */}
      <path 
        d="M16 12C15.4477 12 15 12.4477 15 13V35C15 35.5523 15.4477 36 16 36H24V12H16Z" 
        fill="white" 
        opacity="0.95"
      />
      
      {/* Document page - right side with slightly different opacity */}
      <path 
        d="M24 12V36H32C32.5523 36 33 35.5523 33 35V13C33 12.4477 32.5523 12 32 12H24Z" 
        fill="white" 
        opacity="0.7"
      />
      
      {/* Accent dot - top right */}
      <circle cx="35" cy="16" r="4" fill="url(#accentGradient)" />
      
      {/* Subtle line to show motion/efficiency */}
      <path 
        d="M18 20H30" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      <path 
        d="M18 26H28" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.6"
      />
      <path 
        d="M18 32H26" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        opacity="0.6"
      />
    </svg>
  );

  return (
    <header className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          {/* Premium Logo with Hover Effect */}
          <div className="relative">
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-0 blur-lg group-hover:opacity-40 transition-opacity duration-300"></div>
            
            {/* Logo container */}
            <div className="relative rounded-xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <LogoIcon />
            </div>
          </div>
          
          {/* Premium Text Logo */}
          <div className="flex flex-col -space-y-2">
            <div className="flex items-baseline space-x-0.5">
              <span className="text-lg font-black bg-gradient-to-r from-blue-600 via-blue-700 to-slate-800 dark:from-blue-400 dark:via-blue-500 dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
                FILE
              </span>
              <span className="text-lg font-black text-slate-800 dark:text-slate-200 tracking-tight">
                HELPER
              </span>
            </div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-widest">
              TOOLS
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Tools</Link>
          <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
        </nav>
        
        <div className="flex items-center space-x-3">
          {/* Home Button */}
          <Link 
            to="/" 
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
            aria-label="Go to home"
          >
            <Home className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </Link>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          
          <span className="text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-700 shadow-sm">
            ✓ 100% Private
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
