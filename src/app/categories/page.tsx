import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: '分类浏览 - Skills Marketplace',
  description: '浏览所有技能分类',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
        <h1 className="text-4xl font-bold font-mono text-gray-900 dark:text-white mb-3">
          <span className="text-success">$</span> 技能分类
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-mono">
          浏览所有 {categories.length} 个技能分类
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
