import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelChip from '../pixel/PixelChip';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';
import SectionHeader from '../pixel/SectionHeader';
import { PROJECTS } from '../../data/site';
import { SiGithub } from 'react-icons/si';

export default function Projects() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileRomIndex, setMobileRomIndex] = useState(0);

  const progressFillRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Measure dynamic scroll distance for desktop track
  useEffect(() => {
    if (!isDesktop) return;

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
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgress, value => -value * scrollRange);

  useEffect(() => {
    if (!isDesktop) return;

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
  }, [scrollYProgress, isDesktop]);

  // Mobile IntersectionObserver to sync active ROM index with horizontal scroll
  useEffect(() => {
    if (isDesktop || !carouselRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-rom-index'));
            if (!isNaN(index)) {
              setMobileRomIndex(index);
            }
          }
        });
      },
      {
        root: carouselRef.current,
        threshold: 0.6
      }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  const scrollToProject = (index) => {
    if (!targetRef.current || !isDesktop) return;
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

  const scrollMobileCarouselTo = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard && carouselRef.current) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative border-b-4 border-[var(--px-line)]"
      style={{ height: isDesktop ? `${PROJECTS.length * 85}vh` : 'auto' }}
    >
      {/* ======================================================== */}
      {/* 1. MOBILE & TABLET LAYOUT (< 1024px): SCROLL-SNAP CAROUSEL */}
      {/* Native horizontal snap with peek and unnested text       */}
      {/* ======================================================== */}
      <div className="block lg:hidden py-12 xs:py-16">
        <SectionHeader
          level="LEVEL 04"
          title="PROJECT CARTRIDGES"
          subtitle="AUTONOMOUS SYSTEMS, COMPUTER VISION & PLATFORMS"
          sprite="cartridge"
        />

        {/* Scroll-Snap Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-3 px-2 no-scrollbar overscroll-x-contain select-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {PROJECTS.map((proj, idx) => {
            const isFeatured = proj.featured;
            const isCurrent = mobileRomIndex === idx;

            return (
              <div
                key={proj.title}
                ref={(el) => (cardRefs.current[idx] = el)}
                data-rom-index={idx}
                className="w-[86vw] xs:w-[340px] max-w-[380px] flex-none snap-center flex flex-col"
              >
                {/* Cartridge Outer Chassis */}
                <div
                  className={`relative flex flex-col h-full bg-[#16102b] border-4 ${
                    isCurrent
                      ? 'border-[var(--px-mint)] shadow-[0_0_14px_rgba(92,255,200,0.25)]'
                      : 'border-[var(--px-line)]'
                  } pixel-corners pixel-shadow transition-none`}
                >
                  {/* Cartridge Top Notch Grips */}
                  <div
                    className="h-4 bg-[var(--px-panel-2)] border-b-4 border-[var(--px-line)] flex items-center justify-center gap-1.5 px-3 select-none flex-none"
                    aria-hidden="true"
                  >
                    <span className="w-6 h-1 bg-[var(--px-line)] block" />
                    <span className="w-6 h-1 bg-[var(--px-line)] block" />
                    <span className="w-6 h-1 bg-[var(--px-line)] block" />
                    <span className="w-6 h-1 bg-[var(--px-line)] block" />
                  </div>

                  {/* Cartridge Label Window Area */}
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Header bar of Cartridge */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 pb-1.5 border-b-2 border-[var(--px-line)] select-none">
                        <div className="flex items-center gap-2">
                          <PixelSprite
                            name={isFeatured ? 'robot' : idx === 1 ? 'drone' : 'chip'}
                            scale={1.2}
                            color={isFeatured ? 'var(--px-mint)' : 'var(--px-accent)'}
                          />
                          <span className="font-['Silkscreen'] text-xs font-bold text-[var(--px-muted)] uppercase tracking-wider">
                            ROM_SLOT_0{idx + 1}
                          </span>
                        </div>

                        {isFeatured && (
                          <span className="px-1.5 py-0.5 bg-[var(--px-gold)] text-[var(--px-bg)] font-['Press_Start_2P'] text-[8px] font-bold">
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-['Press_Start_2P'] text-xs xs:text-sm text-[var(--px-ink)] leading-snug mb-2">
                        {proj.title}
                      </h3>

                      {/* Tech Stack Chips (Wrapping) */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proj.stack.map((tech) => (
                          <PixelChip
                            key={tech}
                            variant={isFeatured ? 'mint' : 'default'}
                            size="sm"
                          >
                            {tech}
                          </PixelChip>
                        ))}
                      </div>

                      {/* Bullets: Grow naturally with no nested internal scrollbar */}
                      <ul className="space-y-2 mb-4">
                        {proj.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2 font-['VT323'] text-xl text-[var(--px-ink)] leading-snug"
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
                    <div className="pt-3 border-t-2 border-[var(--px-line)] flex flex-col gap-2">
                      <PixelButton
                        variant={isFeatured ? 'mint' : 'secondary'}
                        size="md"
                        href={proj.repo}
                        target="_blank"
                        className="w-full text-center justify-center min-h-[44px]"
                        icon={<SiGithub className="w-4 h-4" />}
                      >
                        GITHUB REPO
                      </PixelButton>

                      <span className="font-['Silkscreen'] text-[9px] text-[var(--px-muted)] text-center">
                        CARTRIDGE ARCH: ROS2 / LINUX
                      </span>
                    </div>
                  </div>

                  {/* Cartridge Pin Connector strip at bottom */}
                  <div
                    className="h-2.5 bg-[#110d21] border-t-2 border-[var(--px-line)] flex items-center justify-center gap-1 px-4 select-none flex-none"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i} className="w-1.5 h-1.5 bg-[var(--px-gold)] opacity-75 block" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ROM Selector HUD Underneath Carousel */}
        <div className="mt-4 p-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center justify-between gap-2 select-none">
          {/* Prev Button (Min 48px hit target) */}
          <button
            type="button"
            disabled={mobileRomIndex === 0}
            onClick={() => scrollMobileCarouselTo(mobileRomIndex - 1)}
            className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-xs font-['Press_Start_2P']"
            aria-label="Previous Project ROM Cartridge"
          >
            ◀
          </button>

          {/* Dots Indicator & Active Counter */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="font-['Press_Start_2P'] text-[9px] text-[var(--px-mint)] font-bold">
              ROM 0{mobileRomIndex + 1} / 0{PROJECTS.length}
            </span>

            {/* Dot indicators (Min 16px tap hit areas) */}
            <div className="flex items-center gap-1">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollMobileCarouselTo(i)}
                  className="w-6 h-6 flex items-center justify-center p-1 cursor-pointer"
                  aria-label={`Jump to ROM Cartridge 0${i + 1}`}
                >
                  <span
                    className={`block w-2.5 h-2.5 border-2 ${
                      mobileRomIndex === i
                        ? 'border-[var(--px-mint)] bg-[var(--px-mint)]'
                        : 'border-[var(--px-line)] bg-[var(--px-panel-2)]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Next Button (Min 48px hit target) */}
          <button
            type="button"
            disabled={mobileRomIndex === PROJECTS.length - 1}
            onClick={() => scrollMobileCarouselTo(mobileRomIndex + 1)}
            className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-xs font-['Press_Start_2P']"
            aria-label="Next Project ROM Cartridge"
          >
            ▶
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DESKTOP LAYOUT (>= 1024px): PINNED HORIZONTAL SCROLL   */}
      {/* 100% Unchanged from desktop original                      */}
      {/* ======================================================== */}
      {isDesktop && (
        <div className="sticky top-0 h-screen w-full hidden lg:flex flex-col justify-between py-4 px-2 overflow-hidden">
          {/* Header & Cartridge Slot HUD */}
          <div className="flex-none pb-2 border-b-2 border-[var(--px-line)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
              <div className="flex items-center gap-3">
                <PixelSprite name="cartridge" scale={1.4} />
                <span className="font-['Press_Start_2P'] text-xs text-[var(--px-mint)] uppercase font-bold">
                  [ LEVEL 04 ]
                </span>
                <h2 className="font-['Press_Start_2P'] text-base text-[var(--px-ink)] uppercase tracking-tight">
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
                      className={`px-2 py-0.5 font-['Press_Start_2P'] text-[9px] border-2 ${
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

                <div className="flex items-center gap-1.5 font-['Silkscreen'] text-[10px] text-[var(--px-muted)]">
                  <div className="w-24 h-2.5 bg-[var(--px-bg)] border border-[var(--px-line)] p-0.5">
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
            <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm select-none">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 bg-[var(--px-accent)] inline-block pixel-blink flex-none" />
                <span className="font-['Press_Start_2P'] text-[10px] text-[var(--px-accent)] truncate">
                  ROM SLOT {String(activeIndex + 1).padStart(2, '0')}/{String(PROJECTS.length).padStart(2, '0')}: {PROJECTS[activeIndex]?.title.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[9px] font-['Silkscreen'] text-[var(--px-muted)]">
                <span>AUTONOMOUS SYSTEMS, COMPUTER VISION &amp; WEB</span>
                <span className="text-[var(--px-accent)]">SCROLL DOWN ➔</span>
              </div>
            </div>
          </div>

          {/* Middle: Horizontal Scrolling Track of Project Cartridges */}
          <div className="flex-1 min-h-0 flex items-center overflow-hidden relative my-2">
            <motion.div
              ref={trackRef}
              style={{ x, willChange: 'transform' }}
              className="flex flex-row items-stretch gap-8 z-10 pl-1 pr-16 h-full max-h-[calc(100vh-180px)] py-1"
            >
              {PROJECTS.map((proj, idx) => {
                const isFeatured = proj.featured;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={proj.title}
                    className="w-[620px] max-w-[640px] flex-none flex flex-col justify-between h-full"
                  >
                    <div
                      className={`relative flex flex-col h-full bg-[#16102b] border-4 ${
                        isActive ? 'border-[var(--px-mint)] shadow-[0_0_14px_rgba(92,255,200,0.25)]' : 'border-[var(--px-line)]'
                      } pixel-corners pixel-shadow transition-none`}
                    >
                      <div
                        className="h-5 bg-[var(--px-panel-2)] border-b-4 border-[var(--px-line)] flex items-center justify-center gap-2 px-4 select-none flex-none"
                        aria-hidden="true"
                      >
                        <span className="w-8 h-1 bg-[var(--px-line)] block" />
                        <span className="w-8 h-1 bg-[var(--px-line)] block" />
                        <span className="w-8 h-1 bg-[var(--px-line)] block" />
                        <span className="w-8 h-1 bg-[var(--px-line)] block" />
                      </div>

                      <div className="p-5 flex flex-col flex-1 min-h-0 justify-between">
                        <div className="flex-1 min-h-0 flex flex-col">
                          <div className="flex-none">
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

                            <h3 className="font-['Press_Start_2P'] text-base text-[var(--px-ink)] leading-snug mb-1.5">
                              {proj.title}
                            </h3>

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

                          <ul className="space-y-1.5 flex-1 min-h-0 overflow-y-auto pr-1 my-1">
                            {proj.bullets.map((bullet, bIdx) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-2 font-['VT323'] text-xl text-[var(--px-ink)] leading-snug"
                              >
                                <span className="text-[var(--px-mint)] flex-none select-none mt-0.5">
                                  &gt;
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

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

                      <div
                        className="h-3 bg-[#110d21] border-t-2 border-[var(--px-line)] flex items-center justify-center gap-1 px-4 select-none flex-none"
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
          <div className="flex-none flex items-center justify-between pt-2 border-t-2 border-[var(--px-line)] text-[10px] font-['Silkscreen'] text-[var(--px-muted)] gap-2 select-none">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => scrollToProject(activeIndex - 1)}
                className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[10px]"
              >
                &lt; PREV CARTRIDGE
              </button>
              <button
                type="button"
                disabled={activeIndex === PROJECTS.length - 1}
                onClick={() => scrollToProject(activeIndex + 1)}
                className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[10px]"
              >
                NEXT CARTRIDGE &gt;
              </button>
            </div>

            <div className="flex items-center gap-2 text-[var(--px-accent)]">
              <span>SCROLL DOWN TO SWITCH CARTRIDGE</span>
              <span className="pixel-blink">▼</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
