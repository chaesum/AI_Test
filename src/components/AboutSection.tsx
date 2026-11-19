import { CheckCircle2, Compass, Layers, Rocket, TrendingUp } from 'lucide-react';
import { ENGINEERING_PILLARS } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-[#131b2e] py-20 lg:py-24 px-6 lg:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-start gap-2.5">
          <span className="text-sm font-semibold text-[#b4c5ff] tracking-wide">
            About Me · Engineering Philosophy
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#f8fafc] tracking-tight max-w-2xl">
            기술과 비즈니스의 가교 역할을 하는 AI 엔지니어
          </h2>
          <p className="text-base text-[#94a3b8] max-w-3xl leading-relaxed">
            단순히 모델 벤치마크 점수를 높이는 것에 머무르지 않고, 실제 고객의 서비스 병목을
            해결하고 프로덕션 수준의 안정성과 비용 효율성을 달성하는 AI 아키텍처를 지향합니다.
          </p>
        </div>

        {/* Content Split: Engineering Philosophy & 3 Key Value Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Philosophy Card */}
          <div className="lg:col-span-5 bg-[#111827] rounded-xl p-7 sm:p-8 border border-white/[0.07] shadow-xl flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-5">
              <div className="w-11 h-11 rounded-xl bg-[#2563eb]/15 text-[#b4c5ff] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f8fafc] leading-snug">
                &ldquo;실험실(Lab)의 모델을 실서비스(Product)의 가치로 전환합니다&rdquo;
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                인공지능 모델의 가능성은 실제 사용자 인터페이스와 결합하여 대규모 트래픽
                속에서도 지연 없이 안정적으로 작동할 때 비로소 진정한 비즈니스 자산이 됩니다.
              </p>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                불명확한 도메인 요구사항 속에서 최적의 프롬프트, 경량화 모델, 벡터 인덱싱,
                그리고 MLOps 파이프라인을 유기적으로 엮어내는 실용주의 엔지니어링을
                실천합니다.
              </p>
            </div>

            <div className="pt-5 border-t border-white/[0.07] flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#571bc1]/35 text-[#d0bcff] flex items-center justify-center font-display font-bold text-sm shrink-0">
                AI
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#f8fafc]">Service-Driven Mindset</span>
                <span className="text-xs text-[#64748b]">
                  Focusing on Latency, Cost &amp; User Trust
                </span>
              </div>
            </div>
          </div>

          {/* Right 3 Pillars Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGINEERING_PILLARS.map((pillar, idx) => {
              const isPrimaryFullWidth = idx === 0;
              const accentClass =
                pillar.accent === 'primary'
                  ? 'text-[#b4c5ff]'
                  : pillar.accent === 'secondary'
                    ? 'text-[#d0bcff]'
                    : 'text-[#4cd7f6]';
              const iconBgClass =
                pillar.accent === 'primary'
                  ? 'bg-[#2563eb]/20 text-[#b4c5ff]'
                  : pillar.accent === 'secondary'
                    ? 'bg-[#571bc1]/25 text-[#d0bcff]'
                    : 'bg-[#00788c]/25 text-[#4cd7f6]';

              return (
                <article
                  key={pillar.index}
                  className={`bg-[#1e293b]/85 rounded-xl p-6 border border-white/[0.07] shadow-lg flex flex-col justify-between gap-5 ${
                    isPrimaryFullWidth ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgClass}`}>
                        {pillar.accent === 'primary' && <Compass className="w-5 h-5" />}
                        {pillar.accent === 'secondary' && <Rocket className="w-5 h-5" />}
                        {pillar.accent === 'tertiary' && <TrendingUp className="w-5 h-5" />}
                      </div>
                      <span className={`font-mono text-xs font-semibold ${accentClass}`}>
                        {pillar.index}. Pillar
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-[#f8fafc]">{pillar.title}</h4>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{pillar.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-[#94a3b8]">
                    <div className="flex flex-wrap items-center gap-2">
                      {pillar.highlights.map((item, i) => (
                        <span key={item} className="inline-flex items-center gap-2">
                          <span className="text-[#dae2fd] font-medium">{item}</span>
                          {i < pillar.highlights.length - 1 && (
                            <span aria-hidden="true" className="text-[#64748b]">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                    {pillar.footerNote && (
                      <span className={`inline-flex items-center gap-1.5 font-medium ${accentClass}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{pillar.footerNote}</span>
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
