'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import SkillCard from '@/components/SkillCard';
import { getCategories, getPopularSkills, getSkills, getSkillCount, Category, Skill } from '@/app/actions'; // Import from Server Actions
import { ChevronDown, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  // State for DB data
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularSkills, setPopularSkills] = useState<Skill[]>([]);
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [totalSkills, setTotalSkills] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    async function initData() {
      const [cats, popular, count] = await Promise.all([
        getCategories(),
        getPopularSkills(6),
        getSkillCount()
      ]);
      setCategories(cats);
      setPopularSkills(popular);
      setTotalSkills(count);
    }
    initData();
  }, []);

  // Handle Search
  useEffect(() => {
    async function doSearch() {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await getSkills({ query: searchQuery, limit: 50 });
        setSearchResults(res.skills);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search
    const timer = setTimeout(doSearch, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  const faqs = [
    {
      question: '什么是技能市场？',
      answer: 'SkillsMP (技能市场) 是一个开源平台，汇集了为AI Agent（如Claude Code、ChatGPT等）设计的各种技能扩展。我们通过自动化爬虫，实时收录来自 GitHub 的最新 50,000+ 个技能资源。',
    },
    {
      question: '技能数据来源哪里？',
      answer: '所有技能均通过自动化系统从 GitHub、NPM 和 Model Context Protocol Registry 抓取，确保您获取的是最新、最全的资源。',
    },
    {
      question: '如何安装技能？',
      answer: '大多数技能可以通过npm或GitHub直接安装。每个技能页面都包含详细的安装说明和使用文档。',
    },
    {
      question: '这些技能是免费的吗？',
      answer: '是的，绝大多数技能都是开源的。请注意查看每个项目的 License 协议。',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero onSearch={setSearchQuery} totalSkills={totalSkills} />

      <div className="container mx-auto px-4 py-12">
        {/* Search Results */}
        {searchQuery && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-success">$</span> 搜索结果{' '}
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 ml-2" />
              ) : (
                <span className="text-gray-500">({searchResults.length})</span>
              )}
            </h2>

            {!loading && searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((skill) => (
                  // Need to cast type if SkillCard expects specific interface or adjust SkillCard
                  <SkillCard key={skill.id} skill={skill as any} />
                ))}
              </div>
            ) : !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 font-mono">
                  未找到包含 "{searchQuery}" 的技能
                </p>
              </div>
            )}
          </section>
        )}

        {/* Categories Section */}
        {!searchQuery && (
          <>
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">
                  <span className="text-success">$</span> 浏览分类
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category as any} />
                ))}
              </div>
            </section>

            {/* Popular Skills Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-6">
                <span className="text-success">$</span> 热门技能 (Top Starred)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill as any} />
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold font-mono text-gray-900 dark:text-white mb-6">
                <span className="text-success">$</span> 常见问题
              </h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800"
                  >
                    <button
                      onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <span className="font-mono font-bold text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${showFAQ === index ? 'transform rotate-180' : ''
                          }`}
                      />
                    </button>
                    {showFAQ === index && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
