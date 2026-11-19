import { useEffect, useState } from 'react';
import { Check, Copy, Download, GitBranch, Globe, Terminal, X } from 'lucide-react';

interface GitHubPagesModalProps {
  open: boolean;
  onClose: () => void;
}

const WORKFLOW_YAML = `name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Configure base path and build
        run: |
          REPO_NAME="\${{ github.event.repository.name }}"
          OWNER_NAME="\${{ github.repository_owner }}"
          if [ "$REPO_NAME" = "\${OWNER_NAME}.github.io" ]; then
            export VITE_BASE_PATH="/"
          else
            export VITE_BASE_PATH="/\${REPO_NAME}/"
          fi
          npm run build
          cp dist/index.html dist/404.html
          touch dist/.nojekyll

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

export default function GitHubPagesModal({ open, onClose }: GitHubPagesModalProps) {
  const [username, setUsername] = useState('your-github-id');
  const [siteMode, setSiteMode] = useState<'project' | 'user'>('project');
  const [repoName, setRepoName] = useState('ai-engineer-portfolio');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const cleanUser = username.trim() || 'your-github-id';
  const cleanRepo =
    siteMode === 'user' ? `${cleanUser}.github.io` : repoName.trim() || 'ai-engineer-portfolio';
  const liveUrl =
    siteMode === 'user'
      ? `https://${cleanUser}.github.io/`
      : `https://${cleanUser}.github.io/${cleanRepo}/`;
  const remoteUrl = `https://github.com/${cleanUser}/${cleanRepo}.git`;

  const gitCommands = `git init
git add .
git commit -m "Deploy AI Engineer Portfolio to GitHub Pages"
git branch -M main
git remote add origin ${remoteUrl}
git push -u origin main`;

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  const handleDownloadWorkflow = () => {
    const blob = new Blob([WORKFLOW_YAML], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'deploy.yml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#060e20]/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gh-pages-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111827] text-[#dae2fd] rounded-2xl border border-white/[0.1] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[#4cd7f6]">
              GitHub Actions · Automated Static Deployment
            </span>
            <h3 id="gh-pages-modal-title" className="font-display text-xl font-bold text-[#f8fafc]">
              GitHub Pages 배포 설정 및 실행 가이드
            </h3>
            <p className="text-xs text-[#94a3b8]">
              프로젝트에 배포 워크플로우(`.github/workflows/deploy.yml`)와 서브패스 호환 빌드
              설정이 이미 적용되어 있습니다.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="배포 가이드 창 닫기"
            className="w-9 h-9 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-[#dae2fd] flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Step 1: Repository Configurator */}
          <div className="p-5 rounded-xl bg-[#131b2e] border border-white/[0.07] flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#f8fafc] flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#b4c5ff]" />
                <span>1. 저장소 정보 입력</span>
              </span>

              <div
                role="tablist"
                aria-label="GitHub Pages 도메인 유형"
                className="inline-flex p-1 rounded-lg bg-[#060e20] border border-white/[0.06] gap-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={siteMode === 'project'}
                  onClick={() => setSiteMode('project')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    siteMode === 'project'
                      ? 'bg-[#2563eb] text-[#eeefff]'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  프로젝트 저장소
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={siteMode === 'user'}
                  onClick={() => setSiteMode('user')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    siteMode === 'user'
                      ? 'bg-[#2563eb] text-[#eeefff]'
                      : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  유저 메인 도메인
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gh-username" className="text-xs font-medium text-[#94a3b8]">
                  GitHub 아이디 (Username)
                </label>
                <input
                  id="gh-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your-github-id"
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-white/[0.08] text-sm font-mono text-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="gh-repo" className="text-xs font-medium text-[#94a3b8]">
                  저장소 이름 (Repository)
                </label>
                <input
                  id="gh-repo"
                  type="text"
                  value={siteMode === 'user' ? `${cleanUser}.github.io` : repoName}
                  disabled={siteMode === 'user'}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="ai-engineer-portfolio"
                  className="w-full px-3 py-2 rounded-lg bg-[#060e20] border border-white/[0.08] text-sm font-mono text-[#f8fafc] disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                />
              </div>
            </div>

            {/* Live Preview URL */}
            <div className="p-3 rounded-lg bg-[#060e20] border border-white/[0.06] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Globe className="w-4 h-4 text-[#4cd7f6] shrink-0" />
                <span className="text-xs text-[#94a3b8] shrink-0">예상 URL:</span>
                <span className="font-mono text-xs text-[#f8fafc] truncate">{liveUrl}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('url', liveUrl)}
                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#31394d] text-xs text-[#dae2fd] transition-colors"
              >
                {copiedKey === 'url' ? (
                  <>
                    <Check className="w-3 h-3 text-[#4cd7f6]" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-[#b4c5ff]" />
                    <span>URL 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Step 2: Push Commands */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-[#f8fafc] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#b4c5ff]" />
                <span>2. Git 저장소 연결 및 푸시 명령어</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy('git', gitCommands)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#31394d] text-xs font-medium text-[#f8fafc] transition-colors"
              >
                {copiedKey === 'git' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4cd7f6]" />
                    <span>복사됨</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#b4c5ff]" />
                    <span>명령어 복사</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#060e20] border border-white/[0.07] font-mono text-xs text-[#dae2fd] overflow-x-auto leading-relaxed">
              <code>{gitCommands}</code>
            </pre>
          </div>

          {/* Step 3: GitHub Settings Checklist + Workflow Download */}
          <div className="p-5 rounded-xl bg-[#131b2e] border border-white/[0.07] flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#f8fafc]">
                3. GitHub 저장소 Pages 활성화 방법
              </span>
              <button
                type="button"
                onClick={handleDownloadWorkflow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-xs font-semibold text-[#eeefff] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>deploy.yml 다운로드</span>
              </button>
            </div>

            <ol className="text-xs sm:text-sm text-[#94a3b8] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>
                GitHub 저장소의 <strong className="text-[#f8fafc]">Settings → Pages</strong>{' '}
                메뉴로 이동합니다.
              </li>
              <li>
                <strong className="text-[#f8fafc]">Build and deployment → Source</strong>를{' '}
                <strong className="text-[#4cd7f6]">GitHub Actions</strong>로 선택합니다.
              </li>
              <li>
                <code className="font-mono text-xs text-[#dae2fd]">main</code> 브랜치에 푸시하면
                자동으로 빌드(`dist/`) 후 배포가 완료됩니다.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
