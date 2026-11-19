import { useState } from 'react';
import { ArrowDown, UserCircle2 } from 'lucide-react';
import { HERO_TECH_STACK, PIPELINE_PRESETS, type PipelineKey } from '../data/portfolioData';

export default function HeroSection() {
  const [activePipeline, setActivePipeline] = useState<PipelineKey>('rag');
  const preset = PIPELINE_PRESETS[activePipeline];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#0b1326] py-16 lg:py-24 px-6 lg:px-12"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-[#2563eb]/15 rounded-full blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-36 w-[380px] h-[380px] bg-[#571bc1]/15 rounded-full blur-[120px]"
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch relative z-10">
        {/* Left Column: Typographic Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8">
          <div className="flex flex-col items-start gap-5">
            {/* Clean Unboxed Metadata Kicker */}
            <p className="text-xs sm:text-sm font-medium text-[#94a3b8] tracking-wide flex flex-wrap items-center gap-2">
              <span className="text-[#b4c5ff] font-semibold">AI Service &amp; MLOps Engineer</span>
              <span aria-hidden="true" className="text-[#64748b]">·</span>
              <span>Bridging Models to Production</span>
              <span aria-hidden="true" className="text-[#64748b]">·</span>
              <span className="text-[#4cd7f6]">Open to Opportunities</span>
            </p>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] leading-[1.15] tracking-tight font-extrabold text-[#f8fafc] max-w-2xl">
              AI 기술로 일상의 문제를 해결하는{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b4c5ff] to-[#d0bcff]">
                AI 서비스 엔지니어
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-[#94a3b8] max-w-xl">
              LLM, 머신러닝, 생성형 AI 애플리케이션 개발부터 분산 서빙 인프라 및 프로덕션
              서비스 구현까지—가설 검증에 멈추지 않고 실사용자 경험과 비즈니스 임팩트를
              창출합니다.
            </p>

            {/* Unboxed Core Tech Stack Strip */}
            <div className="w-full max-w-xl pt-2 pb-1 border-y border-white/[0.07] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-[#94a3b8]">
              {HERO_TECH_STACK.map((tech, idx) => (
                <span key={tech} className="inline-flex items-center gap-3">
                  <span className="text-[#dae2fd] font-medium whitespace-nowrap">{tech}</span>
                  {idx < HERO_TECH_STACK.length - 1 && (
                    <span aria-hidden="true" className="text-[#434655]">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563eb] text-[#eeefff] text-sm font-semibold hover:bg-[#1d4ed8] transition-all shadow-[0_0_24px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4c5ff]"
            >
              <span>프로젝트 살펴보기</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1e293b] text-[#f8fafc] text-sm font-medium border border-white/[0.08] hover:bg-[#31394d] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
            >
              <span>About Me 둘러보기</span>
              <UserCircle2 className="w-4 h-4 text-[#b4c5ff]" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Architecture Pipeline Preview */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="w-full h-full bg-[#111827] rounded-xl p-6 border border-white/[0.08] shadow-2xl flex flex-col justify-between gap-4">
            {/* Segmented Mode Switcher + Cluster Metadata */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 text-xs text-[#94a3b8]">
                <span className="font-mono truncate">{preset.clusterLabel}</span>
                <span className="font-mono text-[#4cd7f6] whitespace-nowrap shrink-0 tabular-nums">
                  {preset.availability}
                </span>
              </div>

              <div
                role="tablist"
                aria-label="프로덕션 아키텍처 파이프라인 모드"
                className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#060e20] border border-white/[0.06]"
              >
                {(Object.keys(PIPELINE_PRESETS) as PipelineKey[]).map((key) => {
                  const item = PIPELINE_PRESETS[key];
                  const selected = activePipeline === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActivePipeline(key)}
                      className={`py-1.5 px-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                        selected
                          ? 'bg-[#2563eb] text-[#eeefff] shadow-sm'
                          : 'text-[#94a3b8] hover:text-[#f8fafc]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Neural Pipeline Vector Map */}
            <div className="relative w-full h-44 bg-[#060e20] rounded-lg border border-white/[0.05] overflow-hidden flex items-center justify-center px-3 py-2">
              <svg
                className="w-full h-full"
                viewBox="0 0 380 156"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={`${preset.label} 파이프라인 토폴로지`}
              >
                <line
                  stroke="#b4c5ff"
                  strokeDasharray="3 3"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  x1="34"
                  y1="78"
                  x2="122"
                  y2="34"
                />
                <line
                  stroke="#b4c5ff"
                  strokeDasharray="3 3"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  x1="34"
                  y1="78"
                  x2="122"
                  y2="120"
                />
                <line
                  stroke="#4cd7f6"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  x1="122"
                  y1="34"
                  x2="218"
                  y2="78"
                />
                <line
                  stroke="#d0bcff"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  x1="122"
                  y1="120"
                  x2="218"
                  y2="78"
                />
                <line
                  stroke="#b4c5ff"
                  strokeOpacity="0.8"
                  strokeWidth="2.5"
                  x1="218"
                  y1="78"
                  x2="332"
                  y2="42"
                />
                <line
                  stroke="#8d90a0"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                  x1="218"
                  y1="78"
                  x2="332"
                  y2="114"
                />

                {/* Input Node */}
                <circle cx="34" cy="78" r="16" fill="#171f33" stroke="#b4c5ff" strokeWidth="2" />
                <text
                  x="34"
                  y="81"
                  fill="#dae2fd"
                  fontSize="7.5"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {preset.nodes.input}
                </text>

                {/* Branch Top */}
                <circle cx="122" cy="34" r="18" fill="#1e293b" stroke="#4cd7f6" strokeWidth="2" />
                <text x="122" y="37" fill="#4cd7f6" fontSize="7" fontWeight="600" textAnchor="middle">
                  {preset.nodes.branchTop}
                </text>

                {/* Branch Bottom */}
                <circle cx="122" cy="120" r="18" fill="#1e293b" stroke="#d0bcff" strokeWidth="2" />
                <text x="122" y="123" fill="#d0bcff" fontSize="7" fontWeight="600" textAnchor="middle">
                  {preset.nodes.branchBottom}
                </text>

                {/* Core Node */}
                <circle
                  cx="218"
                  cy="78"
                  r="26"
                  fill="#2563eb"
                  fillOpacity="0.24"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />
                <circle cx="218" cy="78" r="11" fill="#b4c5ff" />
                <text
                  x="218"
                  y="118"
                  fill="#eeefff"
                  fontSize="7.5"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {preset.nodes.core}
                </text>

                {/* Out Top */}
                <circle cx="332" cy="42" r="18" fill="#1e293b" stroke="#4cd7f6" strokeWidth="2" />
                <text x="332" y="45" fill="#acedff" fontSize="7" fontWeight="600" textAnchor="middle">
                  {preset.nodes.outTop}
                </text>

                {/* Out Bottom */}
                <circle cx="332" cy="114" r="18" fill="#171f33" stroke="#8d90a0" strokeWidth="2" />
                <text x="332" y="117" fill="#c3c6d7" fontSize="7" fontWeight="600" textAnchor="middle">
                  {preset.nodes.outBottom}
                </text>
              </svg>

              <span className="absolute bottom-2 left-3 font-mono text-[11px] text-[#94a3b8] tabular-nums">
                Pipeline latency: {preset.latencyP99}
              </span>
            </div>

            {/* Micro Telemetry Strip (Tabular Numerals) */}
            <div className="grid grid-cols-3 divide-x divide-white/[0.07] bg-[#131b2e] rounded-lg border border-white/[0.05]">
              <div className="p-3 flex flex-col gap-0.5">
                <span className="text-[11px] text-[#64748b]">Throughput</span>
                <span className="font-display text-lg font-bold text-[#f8fafc] tabular-nums">
                  {preset.throughput}{' '}
                  <span className="text-[11px] font-normal text-[#94a3b8]">tps</span>
                </span>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                <span className="text-[11px] text-[#64748b]">GPU Memory</span>
                <span className="font-display text-lg font-bold text-[#4cd7f6] tabular-nums">
                  {preset.gpuMemory}
                </span>
              </div>
              <div className="p-3 flex flex-col gap-0.5">
                <span className="text-[11px] text-[#64748b]">Cache Hit</span>
                <span className="font-display text-lg font-bold text-[#d0bcff] tabular-nums">
                  {preset.cacheHit}
                </span>
              </div>
            </div>

            {/* Sample Inference Payload */}
            <div className="bg-[#060e20] p-3 rounded-lg border border-white/[0.05] font-mono text-[11px] flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#4cd7f6] truncate">{preset.endpoint}</span>
                <span className="text-[#94a3b8] whitespace-nowrap shrink-0 tabular-nums">
                  {preset.httpStatus} ({preset.httpLatency})
                </span>
              </div>
              <div className="text-[#94a3b8] truncate">payload: {preset.payload}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
