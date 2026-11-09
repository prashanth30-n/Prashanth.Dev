/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TanishqHeader, PaletteName } from './components/TanishqHeader';
import { TanishqHero } from './components/TanishqHero';
import { GitHubActivity } from './components/GitHubActivity';
import { EducationSection } from './components/EducationSection';
import { StackSection } from './components/StackSection';
import { ProjectsTanishq } from './components/ProjectsTanishq';
import { SystemsLabTanishq } from './components/SystemsLabTanishq';
import { TanishqFooter } from './components/TanishqFooter';
import { ResumeModal } from './components/ResumeModal';
import { ScreenshotLightbox } from './components/ScreenshotLightbox';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CommandPalette } from './components/CommandPalette';
import { Project } from './data/portfolioData';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return true; // Default to dark mode
    }
    return true;
  });

  const [palette, setPalette] = useState<PaletteName>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('palette') as PaletteName;
      if (stored && ['zinc', 'cyan', 'emerald', 'amber', 'violet'].includes(stored)) {
        return stored;
      }
    }
    return 'cyan';
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedScreenshotsProject, setSelectedScreenshotsProject] = useState<Project | null>(null);
  const [selectedArchitectureProject, setSelectedArchitectureProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Sync dark class and palette attribute on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', palette);
    localStorage.setItem('palette', palette);
  }, [palette]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] dark:bg-[#0c0d0e] text-[#171717] dark:text-[#ededed] transition-colors duration-200">
      {/* Central Narrow Container Matching tanishqlabs.in layout */}
      <div className="mx-auto max-w-2xl px-5 sm:px-6 py-4 flex flex-col min-h-screen">
        {/* Top Header with India Time & Theme Switcher & Palette Picker */}
        <TanishqHeader
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          palette={palette}
          onSelectPalette={setPalette}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main Content Flow */}
        <main className="flex-1 space-y-10">
          {/* Hero Section */}
          <TanishqHero onOpenResume={() => setIsResumeOpen(true)} />

          {/* GitHub Contributions Heatmap */}
          <GitHubActivity />

          {/* Education & Background (GRIET CGPA 8.79 + Hacktoberfest 2nd Prize) */}
          <EducationSection />

          {/* Numbered Technical Stack */}
          <StackSection />

          {/* Projects (6) */}
          <ProjectsTanishq
            onOpenArchitecture={(project) => setSelectedArchitectureProject(project)}
            onOpenScreenshots={(project) => setSelectedScreenshotsProject(project)}
          />

          {/* Interactive Systems Lab Accordion */}
          <SystemsLabTanishq />
        </main>

        {/* Footer */}
        <TanishqFooter onOpenResume={() => setIsResumeOpen(true)} />
      </div>

      {/* Full Resume PDF Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Project Screenshots Lightbox */}
      <ScreenshotLightbox
        project={selectedScreenshotsProject}
        onClose={() => setSelectedScreenshotsProject(null)}
      />

      {/* System Architecture Topology Modal */}
      <ArchitectureModal
        project={selectedArchitectureProject}
        onClose={() => setSelectedArchitectureProject(null)}
      />

      {/* Developer Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={(project) => setSelectedArchitectureProject(project)}
      />
    </div>
  );
}
