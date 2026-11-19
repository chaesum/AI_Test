import { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { CONTACT_INFO, PROJECTS, RESUME_MARKDOWN } from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleDownloadMarkdown = () => {
    const blob = new Blob([RESUME_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AI_Service_Engineer_Portfolio_Summary.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060e20]/80 backdrop-blur-md print:static print:p-0 print:bg-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] text-[#dae2fd] rounded-2xl border border-white/[0.1] shadow-2xl flex flex-col print:max-h-none print:border-0 print:shadow-none print:bg-white print:text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (Hidden in Print) */}
        <div className="no-print p-5 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 id="resume-modal-title" className="font-display text-lg font-bold text-[#f8fafc]">
              포트폴리오 요약본 · Resume Summary
            </h3>
            <p className="text-xs text-[#94a3b8]">
              브라우저 인쇄(PDF 저장) 또는 Markdown 요약 파일로 내려받을 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-xs font-medium text-[#f8fafc] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#4cd7f6]" />
              <span>요약본 (.md)</span>
            </button>
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-semibold text-[#eeefff] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF 인쇄 / 저장</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="요약본 창 닫기"
              className="w-8 h-8 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#dae2fd] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 text-sm leading-relaxed">
          <div className="pb-4 border-b border-white/[0.08] print:border-slate-200 flex flex-col gap-1">
            <h4 className="font-display text-2xl font-bold text-[#f8fafc] print:text-slate-900">
              AI Service &amp; MLOps Engineer
            </h4>
            <p className="text-xs text-[#94a3b8] print:text-slate-600">
              {CONTACT_INFO.email} · {CONTACT_INFO.location}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="font-display text-sm font-bold text-[#b4c5ff] print:text-blue-700">
              01. Core Engineering Philosophy
            </h5>
            <p className="text-[#94a3b8] print:text-slate-700">
              LLM, 머신러닝, 생성형 AI 애플리케이션 개발부터 분산 서빙 인프라(Triton / Ray Serve /
              FastAPI) 및 MLOps CI/CD 자동화까지 아우르며, 실험실 모델을 99.9% 가용성의
              프로덕션 서비스 가치로 전환합니다.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h5 className="font-display text-sm font-bold text-[#b4c5ff] print:text-blue-700">
              02. Production Case Studies
            </h5>
            <div className="flex flex-col gap-4 divide-y divide-white/[0.06] print:divide-slate-200">
              {PROJECTS.map((project) => (
                <div key={project.id} className="pt-3 first:pt-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-[#f8fafc] print:text-slate-900">
                      {project.cardNumber}. {project.title}
                    </span>
                    <span className="font-mono text-xs text-[#4cd7f6] print:text-blue-700">
                      {project.metrics[0].value} · {project.metrics[1].value}
                    </span>
                  </div>
                  <p className="text-xs text-[#94a3b8] print:text-slate-600">
                    {project.solution}
                  </p>
                  <p className="text-xs font-mono text-[#64748b] print:text-slate-500">
                    Stack: {project.stack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
