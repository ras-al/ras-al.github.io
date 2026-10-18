import React, { useState, useEffect, useRef } from 'react';
import BranchedMenu from '../reactbits/BranchedMenu';
import PixelSprite from '../pixel/PixelSprite';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import { retroAudio } from '../../utils/audio';

const SECTION_LEVEL_LABELS = {
  hero: 'LEVEL 00 / START',
  about: 'LEVEL 01 / ABOUT',
  experience: 'LEVEL 02 / EXPERIENCE',
  research: 'LEVEL 03 / RESEARCH',
  projects: 'LEVEL 04 / PROJECTS',
  skills: 'LEVEL 05 / SKILLS',
  education: 'LEVEL 06 / EDUCATION',
  certifications: 'LEVEL 07 / CERTS',
  contact: 'LEVEL 08 / CONNECT',
  arcade: 'BONUS / BUG HUNTER',
};

export default function Navigation({ activeSection, onNavigate, onReplayIntro }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(() => !retroAudio.isMuted());
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  // Sync sound state
  useEffect(() => {
    const unsubscribe = retroAudio.subscribe((enabled) => {
      setSoundOn(enabled);
    });
    return unsubscribe;
  }, []);

  const handleToggleSound = () => {
    const isMuted = retroAudio.toggleMute();
    setSoundOn(!isMuted);
  };

  // Scroll progress in stepped 4% increments for retro pixel feeling
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const rawPct = Math.max(0, Math.min(100, (window.scrollY / scrollHeight) * 100));
        // Quantize in 4% stepped ticks
        const steppedPct = Math.round(rawPct / 4) * 4;
        setScrollProgress(steppedPct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle keyboard accessibility (Escape, focus trap)
  useEffect(() => {
    if (mobileDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setMobileDrawerOpen(false);
          menuButtonRef.current?.focus();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileDrawerOpen]);

  const menuItems = [
    {
      label: 'Start',
      children: [
        {
          value: 'hero',
          label: 'Home',
          icon: <PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'about',
          label: 'About',
          icon: <PixelSprite name="user" scale={1.2} color="var(--px-ink)" />,
        },
      ],
    },
    {
      label: 'Journey',
      children: [
        {
          value: 'experience',
          label: 'Experience',
          icon: <PixelSprite name="briefcase" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'research',
          label: 'Research',
          icon: <PixelSprite name="flask" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      label: 'Build',
      children: [
        {
          value: 'projects',
          label: 'Projects',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-accent)" />,
        },
        {
          value: 'skills',
          label: 'Skills',
          icon: <PixelSprite name="code" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'arcade',
          label: 'Arcade',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-gold)" />,
        },
      ],
    },
    {
      label: 'Records',
      children: [
        {
          value: 'education',
          label: 'Education',
          icon: <PixelSprite name="star" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'certifications',
          label: 'Certifications',
          icon: <PixelSprite name="trophy" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      value: 'contact',
      label: 'Connect',
      icon: <PixelSprite name="mail" scale={1.2} color="var(--px-accent)" />,
    },
  ];

  const handleSelect = (value) => {
    onNavigate(value);
    setMobileDrawerOpen(false);
    menuButtonRef.current?.focus();
  };

  const currentLevelLabel = SECTION_LEVEL_LABELS[activeSection] || 'LEVEL 00 / START';

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE STICKY TOP BAR (< lg / 1024px screens)         */}
      {/* ======================================================== */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--px-bg)]/95 backdrop-blur-md border-b-2 border-[var(--px-line)] select-none safe-pl safe-pr">
        <div className="safe-pt">
          <div className="h-12 xs:h-14 flex items-center justify-between px-3 gap-2">
            {/* Left: Pixel Logo & Active Level Indicator */}
            <button
              type="button"
              onClick={() => handleSelect('hero')}
              className="flex items-center gap-2 min-w-0 text-left cursor-pointer p-1 -ml-1 active:translate-y-0.5"
              aria-label="Scroll to home section"
            >
              <PixelSprite name="robot" scale={1.4} color="var(--px-mint)" />
              <div className="min-w-0">
                <span className="font-['Press_Start_2P'] text-[9px] xs:text-[10px] text-[var(--px-gold)] block truncate tracking-tight">
                  {currentLevelLabel}
                </span>
                <span className="font-['Silkscreen'] text-[8px] text-[var(--px-muted)] block truncate">
                  RASAL M. // 1P
                </span>
              </div>
            </button>

            {/* Right: Sound Toggle, Reboot & 48px Menu Button */}
            <div className="flex items-center gap-1.5 xs:gap-2 flex-none">
              {/* Sound Toggle (Min 44x44px target) */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="w-11 h-11 flex items-center justify-center bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] text-[var(--px-ink)] hover:border-[var(--px-mint)] active:translate-y-0.5 cursor-pointer pixel-corners-sm"
                title={soundOn ? 'Sound is ON (Click to mute)' : 'Sound is MUTED (Click to enable)'}
                aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}
              >
                <PixelSprite
                  name={soundOn ? 'speaker' : 'speaker-mute'}
                  scale={1.4}
                  color={soundOn ? 'var(--px-mint)' : 'var(--px-muted)'}
                />
              </button>

              {/* Menu Button (Min 48x48px target) */}
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileDrawerOpen((prev) => !prev)}
                className={`w-12 h-12 flex items-center justify-center border-2 pixel-corners-sm cursor-pointer transition-none ${
                  mobileDrawerOpen
                    ? 'bg-[var(--px-mint)] text-black border-[var(--px-mint)]'
                    : 'bg-[var(--px-panel)] border-[var(--px-line)] text-[var(--px-mint)] hover:border-[var(--px-mint)]'
                }`}
                aria-label="Toggle directory navigation menu"
                aria-expanded={mobileDrawerOpen}
              >
                <PixelSprite
                  name={mobileDrawerOpen ? 'close' : 'menu'}
                  scale={1.5}
                  color={mobileDrawerOpen ? '#000000' : 'var(--px-mint)'}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Stepped 4px Pixel Progress Bar Under Top Bar */}
        <div
          className="w-full h-1 bg-[var(--px-panel-2)] border-t border-[var(--px-line)] relative overflow-hidden"
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Level Progress"
        >
          <div
            className="h-full bg-[var(--px-mint)] transition-all duration-100 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. FULL-HEIGHT MOBILE DRAWER (Stepped 4-Frame Slide)      */}
      {/* ======================================================== */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Directory"
          className="lg:hidden fixed inset-0 z-50 flex"
        >
          {/* Dithered Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-200"
            onClick={() => {
              setMobileDrawerOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-hidden="true"
          />

          {/* Stepped Slide Drawer Container */}
          <div
            ref={drawerRef}
            className="relative w-full max-w-xs xs:max-w-sm h-full bg-[var(--px-panel)] border-r-4 border-[var(--px-line)] pixel-shadow-lg flex flex-col justify-between z-10 overflow-y-auto safe-pt safe-pb transform transition-transform duration-240 [transition-timing-function:steps(4)]"
          >
            {/* Drawer Header: Player Identity Card */}
            <div className="p-3 border-b-2 border-[var(--px-line)] bg-[var(--px-panel-2)] flex-none">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <PixelSprite name="robot" scale={1.5} color="var(--px-mint)" />
                  <div>
                    <h2 className="font-['Press_Start_2P'] text-[11px] text-[var(--px-ink)] tracking-wider">
                      RASAL M.
                    </h2>
                    <span className="font-['Silkscreen'] text-[9px] text-[var(--px-mint)] font-bold">
                      PLAYER 01 // EXPLORER
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-[var(--px-panel)] border border-[var(--px-line)] text-[var(--px-muted)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] pixel-corners-sm cursor-pointer"
                  aria-label="Close directory drawer"
                >
                  <PixelSprite name="close" scale={1.2} />
                </button>
              </div>

              <div className="pt-1.5 border-t border-[var(--px-line)] flex justify-between text-xs font-['VT323'] text-[var(--px-muted)]">
                <span>LVL: B.TECH 2024-28</span>
                <span className="text-[var(--px-gold)] font-bold">CGPA 9.48 / 10</span>
              </div>
            </div>

            {/* Drawer Body: Scaled BranchedMenu for Mobile Touch (rowHeight=44, fontSize=14) */}
            <div className="flex-1 py-3 px-2 overflow-y-auto flex justify-center">
              <BranchedMenu
                items={menuItems}
                active={activeSection}
                defaultOpen={[0, 1, 2, 3]}
                alwaysOpen={true}
                onSelect={handleSelect}
                color="#f4efe6"
                accentColor="#5cffc8"
                lineColor="#3b2f66"
                radius={0}
                lineWidth={2}
                rowHeight={44}
                indent={38}
                fontSize={14}
                width={260}
                drawDuration={200}
                foldDuration={160}
                className="font-['Silkscreen']"
              />
            </div>

            {/* Drawer Footer: Sound Toggle, Reboot & System Status */}
            <div className="p-3 border-t-2 border-[var(--px-line)] bg-[var(--px-panel-2)] flex flex-col gap-2 flex-none">
              <div className="flex items-center justify-between text-[10px] font-['Silkscreen']">
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="flex items-center gap-2 px-2.5 py-1.5 bg-[var(--px-panel)] border border-[var(--px-line)] hover:border-[var(--px-mint)] cursor-pointer text-[var(--px-ink)] pixel-corners-sm"
                >
                  <PixelSprite
                    name={soundOn ? 'speaker' : 'speaker-mute'}
                    scale={1.2}
                    color={soundOn ? 'var(--px-mint)' : 'var(--px-muted)'}
                  />
                  <span>SOUND: {soundOn ? 'ON' : 'MUTED'}</span>
                </button>

                {onReplayIntro && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      onReplayIntro();
                    }}
                    className="px-2.5 py-1.5 bg-[var(--px-panel)] border border-[var(--px-line)] text-[var(--px-gold)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] cursor-pointer pixel-corners-sm"
                  >
                    [REBOOT]
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-['Silkscreen'] text-[var(--px-mint)] pt-1">
                <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
                <span>DIRECTORY SYSTEM MOUNTED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. DESKTOP FLOATING COMPACT RAIL (>= lg / 1024px screens) */}
      {/* Retained exactly as originally designed for desktop       */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex fixed top-4 left-4 z-40 w-52 flex-col select-none">
        <PixelBox
          variant="panel"
          title="NAV_SYSTEM.SYS"
          className="w-full max-h-[calc(100vh-2rem)] flex flex-col pixel-shadow-sm"
          bodyClassName="p-2.5 flex flex-col gap-2 overflow-y-auto"
        >
          {/* Identity Card */}
          <div className="p-2 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <PixelSprite name="robot" scale={1.4} />
              <div className="min-w-0">
                <h1 className="font-['Press_Start_2P'] text-[10px] text-[var(--px-ink)] tracking-wider truncate">
                  RASAL M.
                </h1>
                <span className="font-['Silkscreen'] text-[8px] text-[var(--px-mint)] font-bold">
                  PLAYER 01
                </span>
              </div>
            </div>
            <div className="mt-1 text-[10px] font-['VT323'] text-[var(--px-muted)] border-t border-[var(--px-line)] pt-1 flex justify-between">
              <span>LVL: 2024-28</span>
              <span className="text-[var(--px-gold)]">CGPA 9.48</span>
            </div>
          </div>

          {/* Tree Menu with all directories always open */}
          <div className="w-full flex justify-center py-0.5">
            <BranchedMenu
              items={menuItems}
              active={activeSection}
              defaultOpen={[0, 1, 2, 3]}
              alwaysOpen={true}
              onSelect={onNavigate}
              color="#f4efe6"
              accentColor="#5cffc8"
              lineColor="#3b2f66"
              radius={0}
              lineWidth={2}
              rowHeight={30}
              indent={32}
              fontSize={11}
              width={176}
              drawDuration={260}
              foldDuration={200}
              className="font-['Silkscreen']"
            />
          </div>

          {/* Quick Status Badge & Reboot Action */}
          <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[9px] font-['Silkscreen'] px-0.5">
            <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
              <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
              <span>READY</span>
            </div>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="text-[var(--px-gold)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] transition-colors px-1.5 py-0.5 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer select-none active:translate-y-0.5"
                title="Replay intro boot sequence"
              >
                REBOOT
              </button>
            )}
          </div>
        </PixelBox>
      </aside>
    </>
  );
}
