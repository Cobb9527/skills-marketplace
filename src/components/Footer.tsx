import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-mono font-bold text-gray-900 dark:text-white mb-3">
              关于 SkillsMP
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              Agent技能市场平台，为Claude Code、Codex和ChatGPT提供技能扩展。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-mono font-bold text-gray-900 dark:text-white mb-3">
              快速链接
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-mono"
              >
                首页
              </Link>
              <Link
                href="/categories"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors font-mono"
              >
                浏览分类
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-mono font-bold text-gray-900 dark:text-white mb-3">
              社交媒体
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              © 2024 SkillsMP. v0.1.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
              本项目不隶属于Anthropic
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
