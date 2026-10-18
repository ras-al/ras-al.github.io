import React, { useState, useEffect } from 'react';
import ThoughtLine from '../reactbits/ThoughtLine';
import PixelSprite from '../pixel/PixelSprite';
import PixelButton from '../pixel/PixelButton';
import PixelBox from '../pixel/PixelBox';
import { retroAudio } from '../../utils/audio';

export default function BootScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [dissolving, setDissolving] = useState(false);
  const [working, setWorking] = useState(true);
  const [bootSettled, setBootSettled] = useState(false);
  const [steps, setSteps] = useState([]);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    }
  }, []);

  // Lock body scroll while boot screen is active
  useEffect(() => {
    if (visible) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [visible]);

  const dismissBoot = (playSound = true) => {
    if (dissolving) return;

    // Initialize/resume Web Audio context strictly inside user tap gesture
    if (playSound) {
      retroAudio.init();
      retroAudio.play('start');
    }

    setDissolving(true);

    // 4-frame stepped dissolve
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 380);
  };

  // Keyboard shortcut: Enter or Space to press start once settled, ESC to skip immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismissBoot(false);
      } else if (bootSettled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        dismissBoot(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bootSettled, dissolving]);

  // Run boot sequence steps
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const bootSequence = [
      'Reading resume.pdf',
      'Mapping experience',
      'Compiling projects',
      'Loading pixel assets',
      'Rendering portfolio'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        const nextStepText = bootSequence[currentStep];
        setSteps((prev) => [...prev, nextStepText]);
        currentStep++;
      } else {
        clearInterval(interval);
        setWorking(false);
        setBootSettled(true);
      }
    }, 320);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Booting Portfolio"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 bg-[var(--px-bg)] h-svh w-full overflow-y-auto safe-pt safe-pb safe-pl safe-pr transition-opacity duration-400 select-none ${
        dissolving ? 'opacity-0 [transition-timing-function:steps(4)]' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-lg my-auto">
        <PixelBox
          title="BOOT_SEQUENCE.SYS"
          variant="panel"
          icon={<PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />}
          className="pixel-shadow-lg w-full"
          bodyClassName="p-4 xs:p-6"
        >
          {/* Header banner */}
          <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b-2 border-[var(--px-line)] gap-2">
            <span className="font-['Press_Start_2P'] text-[10px] xs:text-xs text-[var(--px-mint)] truncate">
              RASAL M. OS v2.6
            </span>
            <div className="flex items-center gap-2 xs:gap-3">
              <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-gold)]">
                MEM: 640K OK
              </span>
              <button
                type="button"
                onClick={() => dismissBoot(false)}
                className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] hover:text-[var(--px-mint)] transition-colors cursor-pointer p-1"
                title="Skip boot sequence (or press ESC)"
                aria-label="Skip boot sequence"
              >
                [SKIP &gt;&gt;]
              </button>
            </div>
          </div>

          {/* ThoughtLine Component Integration */}
          <div className="mb-4 xs:mb-6 font-['VT323'] text-base xs:text-lg overflow-hidden">
            <ThoughtLine
              label="Booting portfolio…"
              doneLabel="Booted in"
              showTimer={true}
              collapsible={false}
              collapseOnSettle={false}
              fontSize={14}
              color="var(--px-ink)"
              glyph={<PixelSprite name="robot" scale={1.3} color="var(--px-mint)" />}
              breathDepth={0.35}
              shimmer={true}
              steps={steps}
              working={working}
            />
          </div>

          {/* Settle Action: User Must Click/Tap PRESS START to enter website */}
          {bootSettled && (
            <div className="pt-3 xs:pt-4 border-t-2 border-[var(--px-line)] flex flex-col items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[var(--px-mint)] pixel-blink flex-none" />
                <span className="font-['Silkscreen'] text-[10px] xs:text-xs text-[var(--px-mint)] font-bold tracking-wider">
                  ALL SYSTEMS READY // 100%
                </span>
              </div>

              {/* Large touch target (min 64px tall, full width up to 320px) */}
              <div className="w-full flex justify-center my-1">
                <PixelButton
                  variant="mint"
                  size="lg"
                  onClick={() => dismissBoot(true)}
                  autoFocus
                  className="w-full max-w-[320px] min-h-[64px] text-xs xs:text-sm shadow-[0_0_24px_rgba(92,255,200,0.5)] cursor-pointer tracking-wider"
                  icon={<PixelSprite name="star" scale={1.4} color="#0f0b1e" />}
                >
                  PRESS START
                </PixelButton>
              </div>

              <span className="font-['VT323'] text-base xs:text-lg text-[var(--px-muted)]">
                {isTouch ? '> TAP TO START <' : '> PRESS START OR HIT [ENTER] / [SPACE] <'}
              </span>
            </div>
          )}
        </PixelBox>
      </div>
    </div>
  );
}
