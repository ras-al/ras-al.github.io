import React, { useState, useEffect, useRef, useMemo, lazy, Suspense } from 'react';
import SplitFlapText from '../reactbits/SplitFlapText';
import PixelSprite from '../pixel/PixelSprite';
import PixelButton from '../pixel/PixelButton';
import PixelStarfield from '../pixel/PixelStarfield';
import { PROFILE } from '../../data/site';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { retroAudio } from '../../utils/audio';

const AeroShardsLazy = lazy(() => import('../reactbits/AeroShards'));

function useContainerWidth(ref) {
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}

export default function Hero({ onNavigate, bootDone = true }) {
  const containerRef = useRef(null);
  const containerWidth = useContainerWidth(containerRef);
  const [hasWebGPU, setHasWebGPU] = useState(false);
  const [gpuError, setGpuError] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Check WebGPU availability and ?nogpu=1 query flag
  useEffect(() => {
    const checkGpu = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('nogpu') === '1') {
        setHasWebGPU(false);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.gpu) {
        try {
          const adapter = await navigator.gpu.requestAdapter();
          if (adapter) {
            setHasWebGPU(true);
            return;
          }
        } catch {
          // Fall back gracefully
        }
      }
      setHasWebGPU(false);
    };
    checkGpu();

    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Track visibility for AeroShards paused prop
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(prev => (prev !== entry.isIntersecting ? entry.isIntersecting : prev));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute responsive font size for main 15-char board
  const mainFontSize = useMemo(() => {
    const gap = 4;
    const padTo = 15;
    const tileWidthEm = 1.0;
    const calculated = Math.floor((containerWidth - (padTo - 1) * gap) / (padTo * tileWidthEm));
    return Math.max(12, Math.min(44, calculated));
  }, [containerWidth]);

  // Compute font size for 22-char status board
  const statusFontSize = useMemo(() => {
    const gap = 3;
    const padTo = 22;
    const tileWidthEm = 1.0;
    const calculated = Math.floor((containerWidth - (padTo - 1) * gap) / (padTo * tileWidthEm));
    return Math.max(9, Math.min(14, calculated));
  }, [containerWidth]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-between pt-8 pb-12 overflow-hidden border-b-4 border-[var(--px-line)]"
    >
      {/* Background: AeroShards or pure CSS Pixel Starfield */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {bootDone && hasWebGPU && !gpuError ? (
          <Suspense fallback={<PixelStarfield count={60} />}>
            <AeroShardsLazy
              shardColor="#896ABD"
              accentColor="#A855F7"
              backgroundColor="transparent"
              placement={isDesktop ? 'right' : 'full'}
              material="glass"
              markers="plus"
              count={isDesktop ? 900 : 450}
              depthOfField={0.6}
              glow={0.3}
              grain={0.08}
              vignette={0.35}
              mouseInteraction
              pulseOnClick
              holdToGather
              dpr={isDesktop ? 2 : 1.25}
              paused={!isHeroVisible}
              onError={() => setGpuError(true)}
            />
          </Suspense>
        ) : (
          <PixelStarfield count={80} />
        )}
      </div>

      {/* Hero Content (z-10) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col justify-center flex-1">
        {/* SEO h1 */}
        <h1 className="sr-only">
          Rasal Musthafa, Robotics, Computer Vision and Full-Stack Developer
        </h1>

        {/* Level & Player Identification */}
        <div className="flex items-center gap-3 mb-4 select-none">
          <span className="px-2.5 py-1 bg-[var(--px-mint)] text-[var(--px-bg)] font-['Press_Start_2P'] text-[10px] font-bold pixel-corners-sm">
            PLAYER 01
          </span>
          <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] tracking-wider">
            SYSTEM ONLINE // KERALA, INDIA
          </span>
        </div>

        {/* Departure Board: Main Name & Roles */}
        <div className="mb-4 overflow-hidden py-1">
          <SplitFlapText
            key={bootDone ? 'booted-main' : 'wait-main'}
            words={['RASAL MUSTHAFA', 'ROBOTICS', 'COMPUTER VISION', 'FULL STACK DEV']}
            padTo={15}
            charset="alpha"
            flipsPerChar={6}
            stagger={0.05}
            cycleDelay={2800}
            tileColor="#1b1533"
            textColor="#f4efe6"
            tileRadius={0}
            gap={4}
            depth={0.4}
            align="left"
            order="left"
            fontSize={mainFontSize}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              '--split-flap-tile-width': '1em',
            }}
          />
        </div>

        {/* Status Board: Now Boarding */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8 p-2.5 bg-[var(--px-panel)]/90 border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm select-none">
          <div className="flex items-center gap-2 flex-none">
            <span className="w-2 h-2 bg-[var(--px-gold)] pixel-blink" />
            <span className="font-['Silkscreen'] text-[11px] font-bold text-[var(--px-gold)] tracking-wider whitespace-nowrap">
              NOW BOARDING:
            </span>
          </div>
          <div className="overflow-x-hidden w-full py-0.5">
            <SplitFlapText
              key={bootDone ? 'booted-status' : 'wait-status'}
              words={[
                'WEB MASTER IEEE CASS',
                'TECH HEAD PRODUIT',
                'WEB LEAD IEEE SB TKMCE',
              ]}
              padTo={22}
              charset="alpha"
              flipsPerChar={5}
              stagger={0.04}
              cycleDelay={3200}
              tileColor="#2a2150"
              textColor="#5cffc8"
              tileRadius={0}
              gap={3}
              depth={0.3}
              align="left"
              order="left"
              fontSize={statusFontSize}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                '--split-flap-tile-width': '1em',
              }}
            />
          </div>
        </div>

        {/* Summary text */}
        <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] max-w-2xl leading-relaxed mb-8">
          Computer Science &amp; Engineering student exploring Robotics, Edge Computing, Computer Vision, Machine Learning, and Full-Stack Development. Building practical intelligent and autonomous systems.
        </p>

        {/* CTA Buttons & Social Icons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
          <PixelButton
            variant="mint"
            size="md"
            onClick={() => onNavigate('projects')}
            icon={<PixelSprite name="cartridge" scale={1.5} color="#0f0b1e" />}
          >
            VIEW PROJECTS
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="md"
            href={PROFILE.links.resume}
            download="Rasal_Musthafa_Resume.pdf"
            icon={<PixelSprite name="download" scale={1.5} />}
          >
            DOWNLOAD RESUME
          </PixelButton>

          {/* Social Icon Buttons */}
          <div className="flex items-center gap-2">
            <PixelButton
              variant="secondary"
              size="md"
              href={PROFILE.links.github}
              target="_blank"
              ariaLabel="GitHub Profile"
              className="px-3"
            >
              <SiGithub className="w-5 h-5 text-[var(--px-ink)]" />
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="md"
              href={PROFILE.links.linkedin}
              target="_blank"
              ariaLabel="LinkedIn Profile"
              className="px-3"
            >
              <FaLinkedin className="w-5 h-5 text-[#0077b5]" />
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="md"
              href={`mailto:${PROFILE.email}`}
              ariaLabel="Send Email"
              className="px-3"
            >
              <FaEnvelope className="w-5 h-5 text-[var(--px-gold)]" />
            </PixelButton>

            <PixelButton
              variant="secondary"
              size="md"
              href={PROFILE.links.leetcode}
              target="_blank"
              ariaLabel="LeetCode Profile"
              className="px-3"
            >
              <SiLeetcode className="w-5 h-5 text-[#ffa116]" />
            </PixelButton>
          </div>
        </div>

        {/* Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 select-none">
          <div className="p-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center gap-3">
            <PixelSprite name="star" scale={1.5} color="var(--px-gold)" />
            <div>
              <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] block uppercase">
                ACADEMIC SCORE
              </span>
              <span className="font-['Press_Start_2P'] text-xs text-[var(--px-gold)] font-bold">
                CGPA 9.48 / 10
              </span>
            </div>
          </div>

          <div className="p-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center gap-3">
            <PixelSprite name="chip" scale={1.5} color="var(--px-mint)" />
            <div>
              <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] block uppercase">
                DEGREE PROGRAM
              </span>
              <span className="font-['Press_Start_2P'] text-xs text-[var(--px-mint)] font-bold">
                B.TECH 2024-28
              </span>
            </div>
          </div>

          <div className="p-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center gap-3">
            <PixelSprite name="flask" scale={1.5} color="var(--px-accent)" />
            <div>
              <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] block uppercase">
                SUMMER 2026
              </span>
              <span className="font-['Press_Start_2P'] text-xs text-[var(--px-ink)] font-bold">
                IIT MADRAS INTERN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Walking Patrol Bot NPC at bottom of Hero */}
      <HeroPatrolBot />
    </section>
  );
}

function HeroPatrolBot() {
  const [talk, setTalk] = useState(false);
  const quotes = [
    'PATROL_BOT: Perimeter clear! Zero runtime errors detected.',
    'PATROL_BOT: Scanning... Rasal\'s portfolio is operating at 100% capacity!',
    'PATROL_BOT: BEEP! Don\'t forget to check out the Bug Hunter arcade down below!',
    'PATROL_BOT: Warning: High concentrations of genius code ahead.',
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handlePoke = () => {
    retroAudio.play('blip');
    setTalk(true);
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div
      className="w-full relative h-12 border-t-2 border-[var(--px-line)] mt-8 overflow-visible select-none"
    >
      <div className="absolute bottom-1 left-0 animate-robot-walk flex items-center gap-2 group z-20">
        <button
          type="button"
          onClick={handlePoke}
          className="flex items-center gap-2 cursor-pointer p-1 bg-[var(--px-panel)] border border-[var(--px-line)] hover:border-[var(--px-mint)] pixel-corners-sm transition-transform active:scale-95"
          title="Click to talk to Patrol Bot!"
        >
          <PixelSprite name="robot" scale={1.8} color="var(--px-mint)" />
          <span className="font-['Silkscreen'] text-[9px] text-[var(--px-mint)] font-bold">
            PATROL_BOT_v1 [TALK]
          </span>
        </button>

        {talk && (
          <div className="bg-[var(--px-panel)] border-2 border-[var(--px-line)] px-2.5 py-1 text-[11px] font-['VT323'] text-[var(--px-ink)] max-w-xs pixel-shadow-sm flex items-center gap-2 animate-fade-in">
            <span>{quotes[quoteIndex]}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setTalk(false);
              }}
              className="text-[var(--px-muted)] hover:text-[var(--px-alert,#ff4f6d)] font-['Press_Start_2P'] text-[8px]"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
