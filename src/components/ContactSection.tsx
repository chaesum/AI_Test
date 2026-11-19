import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  FileText,
  Globe,
  Mail,
  MapPin,
  Send,
  Share2,
  Terminal,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenResume: () => void;
  onOpenDeploy: () => void;
}

interface SubmittedInquiry {
  name: string;
  email: string;
  categoryLabel: string;
  timestamp: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  recruitment: '채용 기회 / 포지션 제안',
  consulting: 'AI 프로덕트 아키텍처 컨설팅',
  collaboration: '사이드 프로젝트 / 연구 협업',
  general: '기타 일반 문의',
};

export default function ContactSection({ onOpenResume, onOpenDeploy }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('recruitment');
  const [messageBody, setMessageBody] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState<SubmittedInquiry | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleCopyHandle = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHandle(key);
      setTimeout(() => setCopiedHandle(null), 1800);
    } catch {
      setCopiedHandle(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !messageBody.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setLastSubmitted({
      name: senderName.trim(),
      email: senderEmail.trim(),
      categoryLabel: CATEGORY_LABELS[subjectCategory] ?? subjectCategory,
      timestamp,
    });

    setSenderName('');
    setSenderEmail('');
    setSubjectCategory('recruitment');
    setMessageBody('');
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#0b1326] py-20 lg:py-24 px-6 lg:px-12 border-t border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-[#b4c5ff] tracking-wide">
            Get In Touch · Collaboration
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#f8fafc] tracking-tight">
            새로운 기회와 AI 프로덕트 협업에 대해 열려 있습니다
          </h2>
          <p className="text-base text-[#94a3b8] leading-relaxed">
            혁신적인 AI 서비스 기획, 프로덕션 서빙 파이프라인 구축 또는 채용 관련 논의가
            필요하시다면 언제든 편하게 연락해 주세요.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Verified Contact Details & Resume Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Email Copy Card */}
            <div className="bg-[#111827] rounded-xl p-6 border border-white/[0.07] shadow-xl flex flex-col gap-4">
              <span className="text-xs font-semibold text-[#b4c5ff]">Direct Contact</span>

              <div className="flex items-center justify-between gap-3 p-3.5 bg-[#131b2e] rounded-lg border border-white/[0.06]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                  <span className="text-sm text-[#f8fafc] font-medium truncate">
                    {CONTACT_INFO.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2563eb] hover:bg-[#1d4ed8] text-[#eeefff] text-xs font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4c5ff]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>복사됨!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Handle Quick Copy / View */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyHandle('github', CONTACT_INFO.githubHandle)}
                  className="p-3 rounded-lg bg-[#1e293b]/80 hover:bg-[#31394d] border border-white/[0.06] transition-colors flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                >
                  <Terminal className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#f8fafc]">GitHub</span>
                    <span className="text-xs text-[#94a3b8] truncate">
                      {copiedHandle === 'github' ? '핸들 복사됨' : CONTACT_INFO.githubHandle}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyHandle('linkedin', CONTACT_INFO.linkedinHandle)}
                  className="p-3 rounded-lg bg-[#1e293b]/80 hover:bg-[#31394d] border border-white/[0.06] transition-colors flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
                >
                  <Share2 className="w-4 h-4 text-[#d0bcff] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-[#f8fafc]">LinkedIn</span>
                    <span className="text-xs text-[#94a3b8] truncate">
                      {copiedHandle === 'linkedin' ? '프로필 복사됨' : CONTACT_INFO.linkedinHandle}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Portfolio PDF Summary Card */}
            <button
              type="button"
              onClick={onOpenResume}
              className="w-full text-left bg-[#1e293b]/85 hover:bg-[#31394d]/85 rounded-xl p-5 border border-white/[0.07] shadow-lg transition-colors flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#00788c]/30 text-[#4cd7f6] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-base font-bold text-[#f8fafc] truncate">
                    포트폴리오 요약본 PDF
                  </span>
                  <span className="text-xs text-[#94a3b8] truncate">
                    면접용 요약 문서 미리보기 및 PDF 인쇄 · Markdown 저장
                  </span>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-[#2563eb] text-[#eeefff] text-xs font-semibold whitespace-nowrap shrink-0">
                열기
              </span>
            </button>

            {/* GitHub Pages Deployment Setup Card */}
            <button
              type="button"
              onClick={onOpenDeploy}
              className="w-full text-left bg-[#111827] hover:bg-[#1e293b]/80 rounded-xl p-5 border border-white/[0.07] shadow-lg transition-colors flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#2563eb]/20 text-[#b4c5ff] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-display text-base font-bold text-[#f8fafc] truncate">
                    GitHub Pages 배포 설정
                  </span>
                  <span className="text-xs text-[#94a3b8] truncate">
                    저장소별 URL 계산, Git 푸시 명령어 및 deploy.yml 다운로드
                  </span>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-[#1e293b] text-[#dae2fd] text-xs font-semibold whitespace-nowrap shrink-0 border border-white/[0.08]">
                설정
              </span>
            </button>

            {/* Location Indicator */}
            <div className="p-4 rounded-xl bg-[#111827] border border-white/[0.06] flex items-center gap-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <MapPin className="w-4 h-4 text-[#4cd7f6] shrink-0" />
              <span>{CONTACT_INFO.location}</span>
            </div>
          </div>

          {/* Right: Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-[#111827] rounded-xl p-6 sm:p-8 border border-white/[0.07] shadow-xl flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-xl font-bold text-[#f8fafc]">메시지 보내기</h3>
              <p className="text-sm text-[#64748b]">
                보내주신 제안과 피드백은 24시간 이내에 확인 후 회신드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="senderName" className="text-xs font-medium text-[#94a3b8]">
                    성함 / 담당자명 *
                  </label>
                  <input
                    id="senderName"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-white/[0.08] text-sm text-[#f8fafc] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="senderEmail" className="text-xs font-medium text-[#94a3b8]">
                    회신받을 이메일 *
                  </label>
                  <input
                    id="senderEmail"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-white/[0.08] text-sm text-[#f8fafc] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subjectCategory" className="text-xs font-medium text-[#94a3b8]">
                  문의 유형
                </label>
                <select
                  id="subjectCategory"
                  value={subjectCategory}
                  onChange={(e) => setSubjectCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-white/[0.08] text-sm text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                >
                  <option value="recruitment">채용 기회 / 포지션 제안</option>
                  <option value="consulting">AI 프로덕트 아키텍처 컨설팅</option>
                  <option value="collaboration">사이드 프로젝트 / 연구 협업</option>
                  <option value="general">기타 일반 문의</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="messageBody" className="text-xs font-medium text-[#94a3b8]">
                  제안 내용 *
                </label>
                <textarea
                  id="messageBody"
                  rows={5}
                  required
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="프로젝트 내용, 요구 기술 스택, 일정 및 상세 제안 사항을 입력해주세요."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#131b2e] border border-white/[0.08] text-sm text-[#f8fafc] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                {lastSubmitted ? (
                  <div className="flex items-center gap-2 text-xs text-[#4cd7f6]">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>
                      {lastSubmitted.name}님({lastSubmitted.categoryLabel})의 메시지가{' '}
                      {lastSubmitted.timestamp}에 접수되었습니다.
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-[#64748b]">
                    직접 회신은 {CONTACT_INFO.email} 로 전달됩니다.
                  </span>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-[#eeefff] text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.35)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b4c5ff]"
                >
                  <span>문의 전송하기</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
