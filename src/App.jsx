import React, { useState, useEffect, useCallback } from 'react';
import SkipToContent from './components/common/SkipToContent';
import Navigation from './components/sections/Navigation';
import BootScreen from './components/sections/BootScreen';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Research from './components/sections/Research';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import EducationCertifications from './components/sections/EducationCertifications';
import Contact from './components/sections/Contact';
import ArcadeGame from './components/sections/ArcadeGame';
import Footer from './components/sections/Footer';
import PixelCompanion from './components/pixel/PixelCompanion';

const SECTIONS = [
  'hero',
  'about',
  'experience',
  'research',
  'projects',
  'skills',
  'education',
  'certifications',
  'contact',
  'arcade'
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [bootDone, setBootDone] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  // Clear legacy sessionStorage flag if any
  useEffect(() => {
    try {
      sessionStorage.removeItem('portfolio_booted');
    } catch {
      // Ignore
    }
  }, []);

  const handleReplayIntro = useCallback(() => {
    setBootDone(false);
    setShowBoot(true);
  }, []);

  const handleBootComplete = useCallback(() => {
    setBootDone(true);
    setShowBoot(false);
  }, []);

  // Scroll-spy with IntersectionObserver
  useEffect(() => {
    const sectionElements = SECTIONS.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section closest to top
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top offset to choose the primary active section
          const nextSection = visibleEntries[0].target.id;
          setActiveSection(prev => (prev !== nextSection ? nextSection : prev));
        }
      },
      {
        rootMargin: '-15% 0px -60% 0px',
        threshold: [0, 0.2, 0.5]
      }
    );

    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler with header offset
  const handleNavigate = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    setActiveSection(sectionId);

    const offset = window.innerWidth >= 1024 ? 24 : 72; // Desktop vs mobile header height
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: offsetPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }, []);

  const handleScrollTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
    setActiveSection('hero');
  }, []);

  return (
    <div className="min-h-screen bg-[var(--px-bg)] text-[var(--px-ink)] relative selection:bg-[var(--px-mint)] selection:text-[var(--px-bg)]">
      {/* Accessible Skip Link */}
      <SkipToContent />

      {/* Global Retro Scanlines Layer */}
      <div className="scanlines-overlay" aria-hidden="true" />

      {/* Boot Screen Terminal Overlay */}
      {showBoot && <BootScreen onComplete={handleBootComplete} />}

      {/* Navigation: Fixed Compact Floating Left Rail (Desktop) & Top Sticky Bar with Drawer (Mobile) */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Column */}
      <div className="lg:pl-60">
        <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-8 py-4">
          <Hero onNavigate={handleNavigate} bootDone={bootDone} />
          <About />
          <Experience />
          <Research />
          <Projects />
          <Skills />
          <EducationCertifications />
          <Contact />
          <ArcadeGame />
          <Footer onScrollTop={handleScrollTop} />
        </main>
      </div>

      {/* Interactive Pixel Companion Assistant NPC */}
      <PixelCompanion />
    </div>
  );
}
