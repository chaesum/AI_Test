import { useState } from 'react';
import { Check, CloudCog, Cpu, Server, Users } from 'lucide-react';
import { SKILL_CATEGORIES, type SkillCategory, type SkillItem } from '../data/portfolioData';

export default function SkillsSection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [focusedSkill, setFocusedSkill] = useState<{
    category: string;
    item: SkillItem;
  } | null>({
    category: SKILL_CATEGORIES[0].title,
    item: SKILL_CATEGORIES[0].items[1],
  });

  const visibleCategories =
    selectedCategoryId === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategoryId);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'core-ai':
        return <Cpu className="w-5 h-5" />;
      case 'backend-serving':
        return <Server className="w-5 h-5" />;
      case 'mlops-cloud':
        return <CloudCog className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getAccentClasses = (accent: SkillCategory['accent']) => {
    switch (accent) {
      case 'primary':
        return {
          icon: 'bg-[#2563eb]/20 text-[#b4c5ff]',
          tag: 'text-[#b4c5ff]',
          level: 'text-[#4cd7f6]',
        };
      case 'secondary':
        return {
          icon: 'bg-[#571bc1]/25 text-[#d0bcff]',
          tag: 'text-[#d0bcff]',
          level: 'text-[#d0bcff]',
        };
      case 'tertiary':
        return {
          icon: 'bg-[#00788c]/25 text-[#4cd7f6]',
          tag: 'text-[#4cd7f6]',
          level: 'text-[#b4c5ff]',
        };
      default:
        return {
          icon: 'bg-[#1e293b] text-[#dae2fd]',
          tag: 'text-[#94a3b8]',
          level: 'text-[#94a3b8]',
        };
    }
  };

  return (
    <section
      id="skills"
      className="w-full bg-[#0b1326] py-20 lg:py-24 px-6 lg:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header + Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-2.5">
            <span className="text-sm font-semibold text-[#b4c5ff] tracking-wide">
              Skills &amp; Expertise · Production Stack
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#f8fafc] tracking-tight">
              엔드투엔드 AI 서비스 스택
            </h2>
            <p className="text-base text-[#94a3b8] max-w-2xl">
              단순 점수 평가를 배제하고 실무에서 즉시 프로덕션 환경에 투입 가능한 핵심 역량군을
              분류했습니다. 항목을 클릭하면 실무 적용 방식을 확인할 수 있습니다.
            </p>
          </div>

          {/* Interactive Filter Segmented Bar */}
          <div
            role="tablist"
            aria-label="기술 스택 카테고리 필터"
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#111827] border border-white/[0.07] self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategoryId === 'all'}
              onClick={() => setSelectedCategoryId('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                selectedCategoryId === 'all'
                  ? 'bg-[#2563eb] text-[#eeefff]'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              All Stacks
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategoryId === cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#2563eb] text-[#eeefff]'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {cat.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Focused Skill Implementation Note */}
        {focusedSkill && (
          <div className="bg-[#131b2e] border border-white/[0.07] rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-[#4cd7f6] shrink-0" />
              <span className="font-semibold text-[#f8fafc]">{focusedSkill.item.name}</span>
              <span aria-hidden="true" className="text-[#64748b]">·</span>
              <span className="text-[#94a3b8]">{focusedSkill.item.detail}</span>
            </div>
            <span className="text-xs font-mono text-[#b4c5ff] whitespace-nowrap shrink-0">
              {focusedSkill.category} / {focusedSkill.item.level}
            </span>
          </div>
        )}

        {/* Categories Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            visibleCategories.length >= 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
          } gap-6`}
        >
          {visibleCategories.map((cat) => {
            const accent = getAccentClasses(cat.accent);
            return (
              <div
                key={cat.id}
                className="bg-[#111827] rounded-xl p-6 border border-white/[0.07] shadow-xl flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent.icon}`}>
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span className={`text-xs font-semibold ${accent.tag}`}>{cat.tag}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#f8fafc]">{cat.title}</h3>
                    <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">{cat.subtitle}</p>
                  </div>

                  {/* Clean Hairline-Divided Skill Rows (No Nested Cards) */}
                  <div className="flex flex-col divide-y divide-white/[0.06] border-t border-white/[0.06]">
                    {cat.items.map((item) => {
                      const isSelected = focusedSkill?.item.name === item.name;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setFocusedSkill({ category: cat.title, item })}
                          className={`w-full py-2.5 px-1.5 text-left flex items-center justify-between gap-2 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                            isSelected
                              ? 'bg-[#2563eb]/10 text-[#f8fafc]'
                              : 'hover:bg-white/[0.03] text-[#dae2fd]'
                          }`}
                        >
                          <span className="text-sm font-medium truncate">{item.name}</span>
                          <span className={`text-xs font-mono shrink-0 ${accent.level}`}>
                            {item.level}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] text-xs text-[#64748b]">
                  {cat.footerLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
