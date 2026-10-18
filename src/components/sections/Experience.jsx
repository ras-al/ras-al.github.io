import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PixelBox from '../pixel/PixelBox';
import PixelSprite from '../pixel/PixelSprite';
import { EXPERIENCE } from '../../data/site';

export default function Experience() {
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
      const count = EXPERIENCE.length;
      const idx = Math.min(count - 1, Math.max(0, Math.floor(latest * count)));
      setActiveIndex(prev => (prev !== idx ? idx : prev));
    });
  }, [scrollYProgress]);

  const scrollToQuest = (index) => {
    if (!targetRef.current) return;
    const count = EXPERIENCE.length;
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
      id="experience"
      ref={targetRef}
      className="relative border-b-4 border-[var(--px-line)]"
      style={{ height: `${EXPERIENCE.length * 75}vh` }}
    >
      {/* Sticky Viewport Container - Perfectly fits viewport height without overflowing */}
      <div className="sticky top-14 lg:top-0 h-[calc(100dvh-3.5rem)] lg:h-screen w-full flex flex-col justify-between py-3 sm:py-4 px-1 sm:px-2 overflow-hidden">
        {/* Streamlined Top Header & Interactive Quest HUD */}
        <div className="flex-none pb-2 border-b-2 border-[var(--px-line)]">
          {/* Main Title Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 select-none">
            <div className="flex items-center gap-2 sm:gap-3">
              <PixelSprite name="briefcase" scale={1.4} />
              <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[var(--px-mint)] uppercase font-bold">
                [ LEVEL 02 ]
              </span>
              <h2 className="font-['Press_Start_2P'] text-xs sm:text-sm md:text-base text-[var(--px-ink)] uppercase tracking-tight">
                QUEST LOG: EXPERIENCE
              </h2>
            </div>

            {/* Jump Dots & Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {EXPERIENCE.map((exp, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => scrollToQuest(i)}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 border-2 ${
                      activeIndex === i
                        ? 'border-[var(--px-gold)] bg-[var(--px-gold)]'
                        : exp.featured
                        ? 'border-[var(--px-gold)] bg-[var(--px-panel-2)]'
                        : 'border-[var(--px-line)] bg-[var(--px-panel-2)] hover:border-[var(--px-mint)]'
                    } pixel-corners-sm cursor-pointer transition-none`}
                    title={`Jump to Quest ${i + 1}: ${exp.role}`}
                    aria-label={`Jump to Quest ${i + 1}`}
                  />
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 font-['Silkscreen'] text-[10px] text-[var(--px-muted)]">
                <div className="w-20 sm:w-24 h-2.5 bg-[var(--px-bg)] border border-[var(--px-line)] p-0.5">
                  <div
                    ref={progressFillRef}
                    className="h-full bg-[var(--px-mint)]"
                    style={{ width: '0%' }}
                  />
                </div>
                <span ref={progressTextRef} className="text-[var(--px-mint)] w-7 text-right">
                  0%
                </span>
              </div>
            </div>
          </div>

          {/* Subtitle & Active Quest HUD Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm select-none">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 bg-[var(--px-gold)] inline-block pixel-blink flex-none" />
              <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-[var(--px-gold)] truncate">
                QUEST {String(activeIndex + 1).padStart(2, '0')}/{String(EXPERIENCE.length).padStart(2, '0')}: {EXPERIENCE[activeIndex]?.role.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[9px] font-['Silkscreen'] text-[var(--px-muted)]">
              <span className="hidden md:inline">CAREER MILESTONES &amp; LEADERSHIP</span>
              <span className="text-[var(--px-mint)]">SCROLL DOWN ➔</span>
            </div>
          </div>
        </div>

        {/* Middle: Horizontal Scrolling Track of Quest Cards - Uses min-h-0 and max-h to fit viewport */}
        <div className="flex-1 min-h-0 flex items-center overflow-hidden relative my-2">
          {/* Decorative Horizontal Timeline Connector Rail */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-[var(--px-line)] -translate-y-1/2 z-0 hidden lg:block" />

          <motion.div
            ref={trackRef}
            style={{ x, willChange: 'transform' }}
            className="flex flex-row items-stretch gap-4 sm:gap-6 md:gap-8 z-10 pl-1 pr-8 sm:pr-16 h-full max-h-[calc(100vh-170px)] sm:max-h-[calc(100vh-180px)] py-1"
          >
            {EXPERIENCE.map((exp, index) => {
              const isFeatured = exp.featured;
              const isActive = activeIndex === index;

              return (
                <div
                  key={`${exp.org}-${index}`}
                  className="w-[84vw] sm:w-[460px] md:w-[540px] max-w-[560px] flex-none flex flex-col justify-between h-full"
                >
                  {/* Quest Stepped Node Header */}
                  <div className="flex items-center justify-between gap-2 mb-1.5 select-none flex-none">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 border-2 ${
                          isFeatured
                            ? 'border-[var(--px-gold)] bg-[var(--px-gold)]'
                            : 'border-[var(--px-mint)] bg-[var(--px-mint)]'
                        } pixel-corners-sm flex items-center justify-center font-['Press_Start_2P'] text-[9px] text-black font-bold`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-['Press_Start_2P'] text-[9px] text-[var(--px-gold)]">
                        QUEST_{String(EXPERIENCE.length - index).padStart(2, '0')}.EXE
                      </span>
                    </div>

                    <span className="font-['Press_Start_2P'] text-[8px] sm:text-[9px] px-2 py-0.5 bg-[var(--px-panel-2)] text-[var(--px-mint)] border-2 border-[var(--px-line)] pixel-corners-sm whitespace-nowrap">
                      {exp.dates}
                    </span>
                  </div>

                  {/* Quest Card Container with internal scrollable bullet list */}
                  <PixelBox
                    variant={isFeatured ? 'raised' : 'panel'}
                    goldBorder={isFeatured}
                    tag={isFeatured ? 'FEATURED QUEST' : null}
                    className={`flex-1 min-h-0 flex flex-col justify-between bg-[var(--px-bg)] ${
                      isActive ? 'border-[var(--px-mint)] shadow-[0_0_12px_rgba(92,255,200,0.2)]' : ''
                    }`}
                    bodyClassName="p-3 sm:p-4 md:p-5 flex flex-col justify-between h-full min-h-0"
                  >
                    <div className="flex-1 min-h-0 flex flex-col">
                      <div className="flex-none">
                        <h3 className="font-['Press_Start_2P'] text-xs sm:text-sm md:text-base text-[var(--px-ink)] leading-snug mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b-2 border-[var(--px-line)]">
                          <span className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold">
                            {exp.org}
                          </span>
                          <span className="text-[var(--px-muted)] text-sm">•</span>
                          <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)]">
                            {exp.place}
                          </span>
                        </div>
                      </div>

                      {/* Bullets with internal scrollbar if content exceeds available card height */}
                      <ul className="space-y-1.5 flex-1 min-h-0 overflow-y-auto pr-1 my-1">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2 font-['VT323'] text-base sm:text-lg md:text-xl text-[var(--px-ink)] leading-snug"
                          >
                            <span className="text-[var(--px-accent)] flex-none select-none mt-0.5">
                              &gt;
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quest Card Footer Status */}
                    <div className="flex-none mt-2 pt-2 border-t border-[var(--px-line)] flex items-center justify-between text-[10px] font-['Silkscreen'] text-[var(--px-muted)] select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[var(--px-mint)] inline-block" />
                        <span>STATUS: COMPLETED</span>
                      </div>
                      <span className="text-[var(--px-gold)]">
                        +{1000 - index * 150} EXP
                      </span>
                    </div>
                  </PixelBox>
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
              onClick={() => scrollToQuest(activeIndex - 1)}
              className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[9px] sm:text-[10px]"
            >
              &lt; PREV QUEST
            </button>
            <button
              type="button"
              disabled={activeIndex === EXPERIENCE.length - 1}
              onClick={() => scrollToQuest(activeIndex + 1)}
              className="px-2.5 py-1 bg-[var(--px-panel)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] disabled:opacity-30 disabled:pointer-events-none pixel-corners-sm text-[var(--px-ink)] cursor-pointer text-[9px] sm:text-[10px]"
            >
              NEXT QUEST &gt;
            </button>
          </div>

          <div className="flex items-center gap-2 text-[var(--px-mint)]">
            <span className="hidden sm:inline">SCROLL DOWN TO ADVANCE TIMELINE</span>
            <span className="pixel-blink">▼</span>
          </div>
        </div>
      </div>
    </section>
  );
}
