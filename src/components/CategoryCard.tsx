import Link from 'next/link';
import { Category } from '@/lib/utils';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Get icon component dynamically
  const IconComponent = (Icons[
    category.icon.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof Icons
  ] || Icons.Folder) as LucideIcon;

  return (
    <Link
      href={`/categories/${category.id}`}
      className="group block"
    >
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-primary dark:hover:border-primary transition-all hover:shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <IconComponent
              className="w-6 h-6"
              style={{ color: category.color }}
            />
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              $ ls -l
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold font-mono text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
          {category.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-4 line-clamp-2">
          {category.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
            <span style={{ color: category.color }} className="font-bold">
              {category.skillCount}
            </span>{' '}
            个技能
          </span>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary transition-colors">
            cd →
          </span>
        </div>
      </div>
    </Link>
  );
}
