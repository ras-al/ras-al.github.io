import React, { useState, useEffect, useRef } from 'react';
import PixelSprite from './PixelSprite';
import { retroAudio } from '../../utils/audio';

const NPC_DIALOGUES = [
  {
    text: "Beep boop! I'm BYTE, Rasal's robotic companion!",
    mood: 'HAPPY',
    sprite: 'robot',
  },
  {
    text: "Did you know? Rasal holds a 9.48 CGPA at TKM College of Engineering!",
    mood: 'PROUD',
    sprite: 'star',
  },
  {
    text: "Rasal was selected for the Summer 2026 Research Internship at IIT Madras!",
    mood: 'EXCITED',
    sprite: 'flask',
  },
  {
    text: "Scroll all the way down! There is a playable Bug Hunter arcade game at the bottom!",
    mood: 'ARCADE',
    sprite: 'cartridge',
  },
  {
    text: "Why do programmers prefer dark mode? Because light attracts bugs!",
    mood: 'JOKER',
    sprite: 'bug',
  },
  {
    text: "System status: 0 errors, full mobile responsiveness loaded.",
    mood: 'OPTIMAL',
    sprite: 'check',
  },
  {
    text: "Need to start fresh? Click [REBOOT] on the top navbar anytime!",
    mood: 'HELPFUL',
    sprite: 'robot',
  },
  {
    text: "A robot's favorite drink? Java with extra bytes!",
    mood: 'CHUCKLE',
    sprite: 'heart',
  },
];

export default function PixelCompanion() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [sessionDismissed, setSessionDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('byte_bot_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [gameActive, setGameActive] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [poked, setPoked] = useState(false);
  const dismissTimerRef = useRef(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-dismiss bubble after 5 seconds
  useEffect(() => {
    if (open) {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [open, index]);

  // Listen to arcade game status
  useEffect(() => {
    const handleGameStatus = (e) => {
      setGameActive(Boolean(e.detail?.active));
      if (e.detail?.active) {
        setOpen(false);
      }
    };

    window.addEventListener('arcade-game-status', handleGameStatus);
    return () => window.removeEventListener('arcade-game-status', handleGameStatus);
  }, []);

  // Hide companion while user is typing into input or textarea
  useEffect(() => {
    const handleFocusIn = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setInputActive(true);
        setOpen(false);
      }
    };
    const handleFocusOut = () => {
      setInputActive(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const handleClick = () => {
    retroAudio.play('blip');
    setPoked(true);
    setTimeout(() => setPoked(false), 300);

    if (!open) {
      setOpen(true);
    } else {
      setIndex((prev) => (prev + 1) % NPC_DIALOGUES.length);
    }
  };

  const handleDismissForSession = () => {
    setOpen(false);
    setSessionDismissed(true);
    try {
      sessionStorage.setItem('byte_bot_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  // If dismissed for session or during gameplay/keyboard typing, hide companion
  if (sessionDismissed || gameActive || inputActive) {
    return null;
  }

  const currentDialogue = NPC_DIALOGUES[index];

  return (
    <div
      className="fixed z-40 flex flex-col items-end select-none pointer-events-auto"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))',
        right: 'max(1rem, env(safe-area-inset-right, 1rem))',
      }}
    >
      {/* Speech Bubble (max 80vw, wraps, auto-dismisses after 5s) */}
      {open && (
        <div className="mb-2 w-[80vw] max-w-[270px] bg-[var(--px-panel)] border-2 border-[var(--px-line)] p-2.5 xs:p-3 pixel-shadow-md relative animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--px-line)]">
            <div className="flex items-center gap-1.5">
              <span className="font-['Press_Start_2P'] text-[8px] xs:text-[9px] text-[var(--px-mint)]">
                BYTE_BOT
              </span>
              <span className="font-['Silkscreen'] text-[7px] xs:text-[8px] px-1 bg-[var(--px-bg)] text-[var(--px-gold)] border border-[var(--px-line)]">
                {currentDialogue.mood}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-['Press_Start_2P'] text-[9px] text-[var(--px-muted)] hover:text-[var(--px-red)] cursor-pointer p-0.5"
              aria-label="Close dialogue"
            >
              &times;
            </button>
          </div>

          {/* Dialogue Text */}
          <p className="font-['VT323'] text-base xs:text-lg text-[var(--px-ink)] leading-snug">
            &ldquo;{currentDialogue.text}&rdquo;
          </p>

          {/* Next & Hide actions */}
          <div className="mt-2 pt-1 border-t border-[var(--px-line)] flex items-center justify-between text-[8px] xs:text-[9px] font-['Silkscreen'] text-[var(--px-muted)]">
            <button
              type="button"
              onClick={handleClick}
              className="text-[var(--px-mint)] hover:underline cursor-pointer"
            >
              [NEXT &gt;]
            </button>
            <button
              type="button"
              onClick={handleDismissForSession}
              className="hover:text-[var(--px-red)] cursor-pointer"
              title="Hide BYTE companion for this browser session"
            >
              [HIDE BOT]
            </button>
          </div>

          {/* Speech bubble pointer notch */}
          <div className="absolute -bottom-2 right-4 w-2.5 h-2.5 bg-[var(--px-panel)] border-r-2 border-b-2 border-[var(--px-line)] transform rotate-45" />
        </div>
      )}

      {/* Floating NPC Character Dock (smaller 40px sprite on phones) */}
      <div className="relative group">
        {/* Pixel Sprite Emote floating above head */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
          <PixelSprite name={currentDialogue.sprite} scale={0.9} color="var(--px-gold)" />
        </div>

        <button
          type="button"
          onClick={handleClick}
          className={`flex items-center gap-1.5 p-1.5 xs:p-2 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm cursor-pointer hover:border-[var(--px-mint)] active:scale-95 transition-all ${
            poked ? 'scale-90' : ''
          }`}
          title="Click to talk to BYTE!"
          aria-label="Interact with BYTE companion"
        >
          <div className="relative">
            <PixelSprite
              name="robot"
              scale={isMobile ? 1.3 : 1.7}
              color="var(--px-mint)"
            />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[var(--px-gold)] pixel-blink" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-['Press_Start_2P'] text-[8px] text-[var(--px-mint)] block">
              BYTE_BOT
            </span>
            <span className="font-['Silkscreen'] text-[7px] text-[var(--px-muted)] block">
              [TALK]
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
