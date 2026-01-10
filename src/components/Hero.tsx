'use client';

import SearchBar from './SearchBar';
import { Terminal } from 'lucide-react';

interface HeroProps {
  onSearch?: (query: string) => void;
  totalSkills: number;
}

export default function Hero({ onSearch, totalSkills }: HeroProps) {

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Terminal className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-gray-900 dark:text-white mb-4">
            Agent Skills Marketplace
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-mono mb-2">
            for{' '}
            <span className="text-primary font-bold">Claude Code</span>,{' '}
            <span className="text-primary font-bold">Codex</span> &{' '}
            <span className="text-primary font-bold">ChatGPT</span>
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
              <span className="text-success font-bold">{totalSkills}</span> 个可用技能
            </span>
          </div>

          {/* Search Bar */}
          {onSearch && (
            <div className="flex justify-center mb-6">
              <SearchBar
                onSearch={onSearch}
                placeholder="$ search skills..."
              />
            </div>
          )}

          {/* CLI Hint */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <div className="flex items-start space-x-2 font-mono text-sm text-left">
              <span className="text-success flex-shrink-0">$</span>
              <div className="flex-1">
                <span className="text-gray-700 dark:text-gray-300">
                  npm install skills-marketplace
                </span>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                  # 安装技能市场CLI工具
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </div>
  );
}
