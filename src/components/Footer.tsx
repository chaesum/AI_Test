import { CONTACT_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenDeploy: () => void;
}

export default function Footer({ onOpenDeploy }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="no-print w-full bg-[#131b2e] border-t border-white/[0.06] py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display text-base font-bold text-[#f8fafc]">
            AI Service Engineering
          </span>
          <p className="text-xs text-[#64748b]">
            © 2026 AI Service Engineer. Built with precision and scalable inference.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#94a3b8]">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="hover:text-[#b4c5ff] transition-colors whitespace-nowrap"
          >
            About Me
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('projects');
            }}
            className="hover:text-[#b4c5ff] transition-colors whitespace-nowrap"
          >
            Projects
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hover:text-[#b4c5ff] transition-colors whitespace-nowrap"
          >
            Email
          </a>
          <button
            type="button"
            onClick={onOpenDeploy}
            className="hover:text-[#4cd7f6] transition-colors whitespace-nowrap cursor-pointer"
          >
            GitHub Pages 배포
          </button>
        </div>
      </div>
    </footer>
  );
}
