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

  const dismissBoot = (playSound = true) => {
    if (dissolving) return;
    if (playSound) {
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
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete]);

  // DO NOT auto-dismiss: user explicitly clicks PRESS START to enter website!

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Booting Portfolio"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--px-bg)] transition-opacity duration-400 ${
        dissolving ? 'opacity-0 [transition-timing-function:steps(4)]' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-lg">
        <PixelBox
          title="BOOT_SEQUENCE.SYS"
          variant="panel"
          icon={<PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />}
          className="pixel-shadow-lg"
          bodyClassName="p-6"
        >
          {/* Header banner */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[var(--px-line)]">
            <span className="font-['Press_Start_2P'] text-xs text-[var(--px-mint)]">
              RASAL MUSTHAFA OS v2.6
            </span>
            <div className="flex items-center gap-3">
              <span className="font-['Silkscreen'] text-[10px] text-[var(--px-gold)]">
                MEM: 640K OK
              </span>
              <button
                type="button"
                onClick={() => dismissBoot(false)}
                className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] hover:text-[var(--px-mint)] transition-colors cursor-pointer"
                title="Skip boot sequence (or press ESC)"
              >
                [SKIP &gt;&gt;]
              </button>
            </div>
          </div>

          {/* ThoughtLine Component Integration */}
          <div className="mb-6 font-['VT323'] text-lg">
            <ThoughtLine
              label="Booting portfolio…"
              doneLabel="Booted in"
              showTimer={true}
              collapsible={false}
              collapseOnSettle={false}
              fontSize={15}
              color="var(--px-ink)"
              glyph={<PixelSprite name="robot" scale={1.5} color="var(--px-mint)" />}
              breathDepth={0.35}
              shimmer={true}
              steps={steps}
              working={working}
            />
          </div>

          {/* Settle Action: User Must Click PRESS START to enter website */}
          {bootSettled && (
            <div className="pt-4 border-t-2 border-[var(--px-line)] flex flex-col items-center justify-center gap-3 text-center animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[var(--px-mint)] pixel-blink" />
                <span className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold tracking-wider">
                  ALL SYSTEMS READY // 100% COMPILED
                </span>
              </div>

              <div className="my-1">
                <PixelButton
                  variant="mint"
                  size="lg"
                  onClick={() => dismissBoot(true)}
                  autoFocus
                  className="hover:scale-105 active:scale-95 transition-transform shadow-[0_0_24px_rgba(92,255,200,0.5)] cursor-pointer"
                  icon={<PixelSprite name="star" scale={1.4} color="#0f0b1e" />}
                >
                  PRESS START
                </PixelButton>
              </div>

              <span className="font-['VT323'] text-base text-[var(--px-muted)]">
                &gt; PRESS START BUTTON OR HIT [ENTER] / [SPACE] TO ENTER &lt;
              </span>
            </div>
          )}
        </PixelBox>
      </div>
    </div>
  );
}
