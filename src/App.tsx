import { useState } from 'react';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GitHubPagesModal from './components/GitHubPagesModal';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import ProjectsSection, { type ProjectModalTab } from './components/ProjectsSection';
import ResumeModal from './components/ResumeModal';
import SkillsSection from './components/SkillsSection';
import type { ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<ProjectModalTab>('architecture');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  const handleOpenProject = (project: ProjectItem, initialTab: ProjectModalTab = 'architecture') => {
    setSelectedProject(project);
    setModalInitialTab(initialTab);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col">
      <Navbar />

      <main className="w-full pt-16 flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onOpenProject={handleOpenProject} />
        <ContactSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenDeploy={() => setDeployModalOpen(true)}
        />
      </main>

      <Footer onOpenDeploy={() => setDeployModalOpen(true)} />

      <ProjectModal
        project={selectedProject}
        initialTab={modalInitialTab}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <GitHubPagesModal open={deployModalOpen} onClose={() => setDeployModalOpen(false)} />
    </div>
  );
}
