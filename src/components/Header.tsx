'use client';

import Link from 'next/link';
import { Menu, X, Terminal } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Terminal className="w-6 h-6 text-primary group-hover:text-primary-dark transition-colors" />
            <span className="text-xl font-mono font-bold text-gray-900 dark:text-white">
              <span className="text-success">~</span>/skillsmp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-mono"
            >
              首页
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-mono"
            >
              分类
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success font-mono">online</span>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-mono py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-mono py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                分类
              </Link>
              <div className="flex items-center space-x-2 py-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-mono">online</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
