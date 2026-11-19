import { useState } from 'react';
import { Code2, ExternalLink, Layers } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';

export type ProjectModalTab = 'architecture' | 'code' | 'benchmark';

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectItem, initialTab?: ProjectModalTab) => void;
}

const FILTER_OPTIONS: Array<'All' | ProjectItem['category']> = [
  'All',
  'RAG',
  'Agentic AI',
  'Realtime LLM',
];

export default function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'All' | ProjectItem['category']>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="w-full bg-[#131b2e] py-20 lg:py-24 px-6 lg:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-2.5">
            <span className="text-sm font-semibold text-[#b4c5ff] tracking-wide">
              Featured Projects · Case Studies
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#f8fafc] tracking-tight">
              프로덕션 검증 카드뉴스 프로젝트
            </h2>
            <p className="text-base text-[#94a3b8] max-w-2xl leading-relaxed">
              단순한 토이 프로젝트가 아닌, 비즈니스 문제 정의부터 아키텍처 수립 및 지표 개선까지
              입체적 스토리로 정리한 대표 작업물입니다.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="프로젝트 카테고리 필터"
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#111827] border border-white/[0.07] self-start lg:self-auto"
          >
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                role="tab"
                aria-selected={filter === opt}
                onClick={() => setFilter(opt)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                  filter === opt
                    ? 'bg-[#2563eb] text-[#eeefff]'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {opt === 'All' ? 'All Projects' : opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Card-News Style Project Units */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {visibleProjects.map((project) => {
            const hasImageError = failedImages[project.id];
            const accentText =
              project.accent === 'primary'
                ? 'text-[#b4c5ff]'
                : project.accent === 'secondary'
                  ? 'text-[#d0bcff]'
                  : 'text-[#4cd7f6]';

            return (
              <article
                key={project.id}
                className="bg-[#111827] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative w-full aspect-video bg-[#0b1326] overflow-hidden">
                  {!hasImageError ? (
                    <img
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1e293b] via-[#111827] to-[#060e20] flex flex-col items-center justify-center gap-2 p-6 text-center">
                      <Layers className="w-8 h-8 text-[#b4c5ff]" />
                      <span className="text-sm font-medium text-[#dae2fd]">{project.subtitle}</span>
                    </div>
                  )}

                  {/* Measured Contrast Scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent"
                  />

                  {/* Clean Unboxed Kicker & Title */}
                  <div className="absolute bottom-3.5 left-5 right-5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#dae2fd]/90">
                      <span className={`font-mono font-semibold ${accentText}`}>
                        Card {project.cardNumber}
                      </span>
                      <span aria-hidden="true" className="text-[#94a3b8]">·</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true" className="text-[#94a3b8]">·</span>
                      <span className="text-[#4cd7f6]">{project.status}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#f8fafc] leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card News Narrative Body */}
                <div className="p-6 flex flex-col gap-5 flex-1">
                  {/* Problem & Solution separated by clean whitespace & hairline divider */}
                  <div className="flex flex-col gap-4 divide-y divide-white/[0.06]">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-[#ffb4ab]">
                        문제 정의 · Problem
                      </span>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{project.problem}</p>
                    </div>

                    <div className="pt-3.5 flex flex-col gap-1">
                      <span className={`text-xs font-semibold ${accentText}`}>
                        솔루션 구현 · Solution
                      </span>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Key Quantitative Results */}
                  <div className="grid grid-cols-2 divide-x divide-white/[0.07] bg-[#1e293b]/70 rounded-xl border border-white/[0.06]">
                    {project.metrics.map((metric) => {
                      const metricColor =
                        metric.accent === 'primary'
                          ? 'text-[#b4c5ff]'
                          : metric.accent === 'secondary'
                            ? 'text-[#d0bcff]'
                            : 'text-[#4cd7f6]';
                      return (
                        <div key={metric.label} className="p-3.5 text-center flex flex-col gap-0.5">
                          <span
                            className={`font-display text-xl sm:text-2xl font-extrabold tabular-nums ${metricColor}`}
                          >
                            {metric.value}
                          </span>
                          <span className="text-xs text-[#94a3b8]">{metric.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stack Metadata (Unboxed) */}
                  <div className="text-xs text-[#94a3b8] flex flex-wrap items-center gap-2 pt-1">
                    {project.stack.map((tech, i) => (
                      <span key={tech} className="inline-flex items-center gap-2">
                        <span className="font-mono text-[#dae2fd]">{tech}</span>
                        {i < project.stack.length - 1 && (
                          <span aria-hidden="true" className="text-[#434655]">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="px-6 pb-6 pt-1 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenProject(project, 'architecture')}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#f8fafc] text-xs font-semibold text-center transition-colors border border-white/[0.07] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  >
                    상세 아키텍처 보기
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenProject(project, 'code')}
                    title="파이프라인 코드 스펙 보기"
                    aria-label={`${project.title} 코드 스펙 보기`}
                    className="w-10 h-10 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#94a3b8] hover:text-[#b4c5ff] flex items-center justify-center transition-colors border border-white/[0.07] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  >
                    <Code2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenProject(project, 'benchmark')}
                    title="벤치마크 및 추론 시뮬레이션 보기"
                    aria-label={`${project.title} 벤치마크 및 검증 보기`}
                    className="w-10 h-10 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#94a3b8] hover:text-[#4cd7f6] flex items-center justify-center transition-colors border border-white/[0.07] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
