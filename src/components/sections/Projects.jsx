import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelChip from '../pixel/PixelChip';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';
import { PROJECTS } from '../../data/site';
import { SiGithub } from 'react-icons/si';

export default function Projects() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressFillRef = useRef(null);
  const progressTextRef = useRef(null);

  // Measure dynamic scroll distance based on track width vs viewport width
  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.parentElement?.clientWidth || window.innerWidth;
        const extraPadding = window.innerWidth >= 640 ? 64 : 24;
        setScrollRange(Math.max(0, trackWidth - containerWidth + extraPadding));
      }
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    const timer = setTimeout(updateScrollRange, 350);

    return () => {
      window.removeEventListener('resize', updateScrollRange);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Smooth scroll mapping
  const x = useTransform(scrollYProgress, value => -value * scrollRange);

  useEffect(() => {
    return scrollYProgress.on('change', latest => {
      const pct = Math.round(latest * 100);
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${pct}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${pct}%`;
      }
      const count = PROJECTS.length;
      const idx = Math.min(count - 1, Math.max(0, Math.floor(latest * count)));
      setActiveIndex(prev => (prev !== idx ? idx : prev));
    });
  }, [scrollYProgress]);

  const scrollToProject = (index) => {
    if (!targetRef.current) return;
    const count = PROJECTS.length;
    const clampedIndex = Math.max(0, Math.min(count - 1, index));
    const rect = targetRef.current.getBoundingClientRect();
    const targetTop = rect.top + window.pageYOffset;
    const targetHeight = targetRef.current.offsetHeight - window.innerHeight;
    const destination = targetTop + (clampedIndex / (count - 1)) * targetHeight;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: destination,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative border-b-4 border-[var(--px-line)]"
      style={{ height: `${PROJECTS.length * 85}vh` }}
    >
      {/* Sticky Viewport Container - Perfectly fits viewport height without overflowing */}
      <div className="sticky top-14 lg:top-0 h-[calc(100dvh-3.5rem)] lg:h-screen w-full flex flex-col justify-between py-3 sm:py-4 px-1 sm:px-2 overflow-hidden">
        {/* Streamlined Top Header & Interactive Cartridge Slot HUD */}
        <div className="flex-none pb-2 border-b-2 border-[var(--px-line)]">
          {/* Main Title Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <PixelSprite name="cartridge" scale={1.4} />
              <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[var(--px-mint)] uppercase font-bold">
                [ LEVEL 04 ]
              </span>
              <h2 className="font-['Press_Start_2P'] text-xs sm:text-sm md:text-base text-[var(--px-ink)] uppercase tracking-tight">
                PROJECT CARTRIDGES
              </h2>
            </div>

            {/* ROM Buttons & Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToProject(i)}
                    className={`px-2 py-0.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] border-2 ${
                      activeIndex === i
                        ? 'border-[var(--px-mint)] bg-[var(--px-mint)] text-black font-bold'
                        : 'border-[var(--px-line)] bg-[var(--px-panel-2)] text-[var(--px-muted)] hover:border-[var(--px-mint)]'
                    } pixel-corners-sm cursor-pointer transition-none`}
                    title={`Insert Cartridge 0${i + 1}`}
                    aria-label={`Insert Cartridge 0${i + 1}`}
                  >
                    ROM 0{i + 1}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 font-['Silkscreen'] text-[10px] text-[var(--px-muted)]">
                <div className="w-20 sm:w-24 h-2.5 bg-[var(--px-bg)] border border-[var(--px-line)] p-0.5">
                  <div
                    ref={progressFillRef}
                    className="h-full bg-[var(--px-accent)]"
                    style={{ width: '0%' }}
                  />
                </div>
                <span ref={progressTextRef} className="text-[var(--px-accent)] w-7 text-right">
                  0%
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle & Active ROM HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm select-none">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 bg-[var(--px-accent)] inline-block pixel-blink flex-none" />
              <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-[var(--px-accent)] truncate">
                ROM SLOT {String(activeIndex + 1).padStart(2, '0')}/{String(PROJECTS.length).padStart(2, '0')}: {PROJECTS[activeIndex]?.title.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-['Silkscreen'] text-[var(--px-muted)]">
              <span className="hidden md:inline">AUTONOMOUS SYSTEMS, COMPUTER VISION &amp; WEB</span>
              <span className="text-[var(--px-accent)]">SCROLL DOWN ➔</span>
            </div>
          </div>
        </div>

        {/* Middle: Horizontal Scrolling Track of Project Cartridges - Uses min-h-0 and max-h to fit viewport */}
        <div className="flex-1 min-h-0 flex items-center overflow-hidden relative my-2">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: 'transform' }}
            className="flex flex-row items-stretch gap-4 sm:gap-6 md:gap-8 z-10 pl-1 pr-8 sm:pr-16 h-full max-h-[calc(100vh-170px)] sm:max-h-[calc(100vh-180px)] py-1"
          >
            {PROJECTS.map((proj, idx) => {
              const isFeatured = proj.featured;
              const isActive = activeIndex === idx;

              return (
                <div
                  key={proj.title}
                  className="w-[84vw] sm:w-[500px] md:w-[620px] max-w-[640px] flex-none flex flex-col justify-between h-full"
                >
                  {/* Game Cartridge Outer Chassis */}
                  <div
                    className={`relative flex flex-col h-full bg-[#16102b] border-4 ${
                      isActive ? 'border-[var(--px-mint)] shadow-[0_0_14px_rgba(92,255,200,0.25)]' : 'border-[var(--px-line)]'
                    } pixel-corners pixel-shadow transition-none`}
                  >
                    {/* Cartridge Top Notch Grips */}
                    <div
                      className="h-4 sm:h-5 bg-[var(--px-panel-2)] border-b-4 border-[var(--px-line)] flex items-center justify-center gap-2 px-4 select-none flex-none"
                      aria-hidden="true"
                    >
                      <span className="w-8 h-1 bg-[var(--px-line)] block" />
                      <span className="w-8 h-1 bg-[var(--px-line)] block" />
                      <span className="w-8 h-1 bg-[var(--px-line)] block" />
                      <span className="w-8 h-1 bg-[var(--px-line)] block" />
                    </div>

                    {/* Cartridge Label Window Area */}
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 min-h-0 justify-between">
                      <div className="flex-1 min-h-0 flex flex-col">
                        <div className="flex-none">
                          {/* Header bar of Cartridge */}
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 pb-1.5 border-b-2 border-[var(--px-line)] select-none">
                            <div className="flex items-center gap-2">
                              <PixelSprite
                                name={isFeatured ? 'robot' : idx === 1 ? 'drone' : 'chip'}
                                scale={1.2}
                                color={isFeatured ? 'var(--px-mint)' : 'var(--px-accent)'}
                              />
                              <span className="font-['Silkscreen'] text-xs font-bold text-[var(--px-muted)] uppercase tracking-wider">
                                ROM_SLOT_{String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>

                            {isFeatured && (
                              <span className="px-1.5 py-0.5 bg-[var(--px-gold)] text-[var(--px-bg)] font-['Press_Start_2P'] text-[8px] font-bold">
                                FEATURED ROBOTICS
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm md:text-base text-[var(--px-ink)] leading-snug mb-1.5">
                            {proj.title}
                          </h3>

                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {proj.stack.map(tech => (
                              <PixelChip
                                key={tech}
                                variant={isFeatured ? 'mint' : 'default'}
                                size="sm"
                              >
                                {tech}
                              </PixelChip>
                            ))}
                          </div>
                        </div>

                        {/* Bullets with internal scrollbar if content exceeds available height */}
                        <ul className="space-y-1.5 flex-1 min-h-0 overflow-y-auto pr-1 my-1">
                          {proj.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2 font-['VT323'] text-base sm:text-lg md:text-xl text-[var(--px-ink)] leading-snug"
                            >
                              <span className="text-[var(--px-mint)] flex-none select-none mt-0.5">
                                &gt;
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cartridge Action Footer */}
                      <div className="flex-none pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between">
                        <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)]">
                          SYSTEM: ROS2/CV
                        </span>

                        <PixelButton
                          variant={isFeatured ? 'mint' : 'secondary'}
                          size="sm"
                          href={proj.repo}
                          target="_blank"
                          icon={<SiGithub className="w-3.5 h-3.5" />}
                        >
                          GITHUB REPO
                        </PixelButton>
                      </div>
                    </div>

                    {/* Cartridge Pin Connector strip at bottom */}
                    <div
                      className="h-2.5 sm:h-3 bg-[#110d21] border-t-2 border-[var(--px-line)] flex items-center justify-center gap-1 px-4 select-none flex-none"
                      aria-hidden="true"
                    >
                      {Array.from({ length: 16 }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 bg-[var(--px-gold)] opacity-75 block" />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom: Nav Controls & Scroll Cue */}
        <div className="flex-none flex flex-wrap items-center justify-between pt-2 border-t-2 border-[var(--px-line)] text-[10px] font-['Silkscreen'] text-[var(--px-muted)] gap-2 select-none">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => scrollToProject(activeIndex - 1)}
              className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[9px] sm:text-[10px]"
            >
              &lt; PREV CARTRIDGE
            </button>
            <button
              type="button"
              disabled={activeIndex === PROJECTS.length - 1}
              onClick={() => scrollToProject(activeIndex + 1)}
              className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[9px] sm:text-[10px]"
            >
              NEXT CARTRIDGE &gt;
            </button>
          </div>

          <div className="flex items-center gap-2 text-[var(--px-accent)]">
            <span className="hidden sm:inline">SCROLL DOWN TO SWITCH CARTRIDGE</span>
            <span className="pixel-blink">▼</span>
          </div>
        </div>
      </div>
    </section>
  );
}
