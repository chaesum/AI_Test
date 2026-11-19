import { useEffect, useState } from 'react';
import { ArrowRight, Check, Copy, Play, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import type { ProjectModalTab } from './ProjectsSection';

interface ProjectModalProps {
  project: ProjectItem | null;
  initialTab: ProjectModalTab;
  onClose: () => void;
}

export default function ProjectModal({ project, initialTab, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<ProjectModalTab>(initialTab);
  const [copiedCode, setCopiedCode] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);

  useEffect(() => {
    setActiveTab(initialTab);
    setSimStep(0);
    setCopiedCode(false);
  }, [project, initialTab]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(project.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(false);
    }
  };

  const runTraceSimulation = () => {
    setSimStep(1);
    setTimeout(() => setSimStep(2), 180);
    setTimeout(() => setSimStep(3), 360);
    setTimeout(() => setSimStep(4), 540);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060e20]/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] rounded-2xl border border-white/[0.1] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/[0.07] flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <span className="font-mono font-semibold text-[#b4c5ff]">
                Card {project.cardNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4cd7f6]">{project.status}</span>
            </div>
            <h3 id="project-modal-title" className="font-display text-xl sm:text-2xl font-bold text-[#f8fafc]">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="w-9 h-9 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#dae2fd] flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Segmented Tabs */}
        <div className="px-6 pt-4">
          <div
            role="tablist"
            aria-label="프로젝트 상세 정보 탭"
            className="inline-flex p-1 rounded-lg bg-[#060e20] border border-white/[0.06] gap-1"
          >
            {(
              [
                { id: 'architecture', label: '아키텍처 흐름' },
                { id: 'code', label: '파이프라인 스펙' },
                { id: 'benchmark', label: '벤치마크 · 트레이스' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                  activeTab === tab.id
                    ? 'bg-[#2563eb] text-[#eeefff]'
                    : 'text-[#94a3b8] hover:text-[#f8fafc]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 flex flex-col gap-6">
          {activeTab === 'architecture' && (
            <>
              <p className="text-sm text-[#dae2fd] leading-relaxed">{project.architectureSummary}</p>

              {/* 4-Stage Pipeline Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.architectureStages.map((stage) => (
                  <div
                    key={stage.step}
                    className="p-4 rounded-xl bg-[#131b2e] border border-white/[0.06] flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#b4c5ff]">
                        Stage {stage.step}
                      </span>
                      <span className="font-mono text-xs text-[#4cd7f6] tabular-nums">
                        {stage.latency}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#f8fafc]">{stage.title}</h4>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{stage.role}</p>
                  </div>
                ))}
              </div>

              {/* Stack Summary */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-[#94a3b8]">
                <span>Production Stack: {project.stack.join(' · ')}</span>
                <span>{project.subtitle}</span>
              </div>
            </>
          )}

          {activeTab === 'code' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-[#94a3b8] font-mono">
                  core_pipeline.py · Async Execution Reference
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-xs font-medium text-[#f8fafc] transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4cd7f6]" />
                      <span>복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#b4c5ff]" />
                      <span>코드 복사</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#060e20] border border-white/[0.07] font-mono text-xs text-[#dae2fd] overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet}</code>
              </pre>
            </div>
          )}

          {activeTab === 'benchmark' && (
            <div className="flex flex-col gap-6">
              {/* Quantitative Benchmark Table */}
              <div className="overflow-x-auto rounded-xl border border-white/[0.07]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#131b2e] text-xs text-[#94a3b8] border-b border-white/[0.07]">
                      <th className="py-3 px-4 font-medium">평가 지표</th>
                      <th className="py-3 px-4 font-medium">개선 전 (Baseline)</th>
                      <th className="py-3 px-4 font-medium">개선 후 (Production)</th>
                      <th className="py-3 px-4 font-medium text-right">변화폭</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] bg-[#0b1326]">
                    {project.benchmarks.map((row) => (
                      <tr key={row.metric}>
                        <td className="py-3 px-4 font-medium text-[#f8fafc]">{row.metric}</td>
                        <td className="py-3 px-4 font-mono text-xs text-[#94a3b8] tabular-nums">
                          {row.baseline}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#dae2fd] font-semibold tabular-nums">
                          {row.improved}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#4cd7f6] font-semibold text-right tabular-nums">
                          {row.delta}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interactive Query Trace Simulator */}
              <div className="p-4 rounded-xl bg-[#131b2e] border border-white/[0.07] flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#b4c5ff]">
                    실행 트레이스 시뮬레이션
                  </span>
                  <button
                    type="button"
                    onClick={runTraceSimulation}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-[#eeefff] text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>트레이스 실행</span>
                  </button>
                </div>

                <div className="text-xs text-[#94a3b8] bg-[#060e20] p-3 rounded-lg border border-white/[0.05]">
                  <span className="text-[#64748b] font-mono mr-2">INPUT:</span>
                  <span className="text-[#dae2fd]">{project.sampleQuery}</span>
                </div>

                {simStep > 0 && (
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {project.architectureStages.map((stage, idx) => {
                      const active = simStep >= idx + 1;
                      return (
                        <span key={stage.step} className="inline-flex items-center gap-1.5">
                          <span
                            className={`font-mono px-2 py-1 rounded ${
                              active
                                ? 'bg-[#2563eb]/20 text-[#4cd7f6]'
                                : 'bg-[#060e20] text-[#64748b]'
                            }`}
                          >
                            {stage.step} · {stage.latency}
                          </span>
                          {idx < project.architectureStages.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-[#64748b]" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}

                {simStep >= 4 && (
                  <div className="text-xs text-[#dae2fd] bg-[#060e20] p-3 rounded-lg border border-[#4cd7f6]/25 leading-relaxed">
                    <span className="text-[#4cd7f6] font-mono mr-2">OUTPUT:</span>
                    {project.sampleOutput}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
