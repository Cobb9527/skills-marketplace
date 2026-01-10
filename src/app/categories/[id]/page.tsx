'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SkillCard from '@/components/SkillCard';
import {
  getCategoryById,
  getSkillsByCategory,
  sortSkills,
  SortBy,
} from '@/lib/utils';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [sortBy, setSortBy] = useState<SortBy>('stars');

  const category = getCategoryById(categoryId);
  const skills = category ? sortSkills(getSkillsByCategory(categoryId), sortBy) : [];

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-4">
            分类未找到
          </h1>
          <Link
            href="/categories"
            className="text-primary hover:text-primary-dark font-mono"
          >
            返回分类列表
          </Link>
        </div>
      </div>
    );
  }

  // Get icon component
  const IconComponent = (Icons[
    category.icon.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') as keyof typeof Icons
  ] || Icons.Folder) as LucideIcon;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/categories"
          className="inline-flex items-center space-x-2 text-sm font-mono text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回分类</span>
        </Link>

        <div className="flex items-center space-x-4 mb-4">
          <div
            className="p-4 rounded-xl"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <IconComponent
              className="w-8 h-8"
              style={{ color: category.color }}
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-mono text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mt-1">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-gray-600 dark:text-gray-400">
          <span className="text-success font-bold">{skills.length}</span> 个技能
        </p>

        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="px-3 py-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-primary dark:focus:border-primary"
          >
            <option value="stars">按星标排序</option>
            <option value="downloads">按下载量排序</option>
            <option value="lastUpdate">按更新时间排序</option>
            <option value="name">按名称排序</option>
          </select>
        </div>
      </div>

      {/* Skills Grid */}
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 font-mono">
            该分类下暂无技能
          </p>
        </div>
      )}
    </div>
  );
}
