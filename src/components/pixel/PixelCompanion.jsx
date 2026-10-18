import React, { useState } from 'react';
import PixelSprite from './PixelSprite';
import { retroAudio } from '../../utils/audio';

const NPC_DIALOGUES = [
  {
    text: "Beep boop! I'm BYTE, Rasal's robotic companion!",
    mood: 'HAPPY',
    emote: '★',
  },
  {
    text: "Did you know? Rasal holds a 9.48 CGPA at TKM College of Engineering!",
    mood: 'PROUD',
    emote: '⚡',
  },
  {
    text: "Rasal was selected for the Summer 2026 Research Internship at IIT Madras!",
    mood: 'EXCITED',
    emote: '!',
  },
  {
    text: "Scroll all the way down! There is a playable Bug Hunter arcade game at the bottom!",
    mood: 'ARCADE',
    emote: '★',
  },
  {
    text: "Why do programmers prefer dark mode? Because light attracts bugs!",
    mood: 'JOKER',
    emote: '?',
  },
  {
    text: "System status: 0 errors, 7 React Bits components integrated flawlessly.",
    mood: 'OPTIMAL',
    emote: '✓',
  },
  {
    text: "Need to start fresh? Click [REBOOT] on the top-left navbar anytime!",
    mood: 'HELPFUL',
    emote: '⚡',
  },
  {
    text: "A robot's favorite drink? Java with extra bytes!",
    mood: 'CHUCKLE',
    emote: '♥',
  },
];

export default function PixelCompanion() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [poked, setPoked] = useState(false);

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

  const currentDialogue = NPC_DIALOGUES[index];

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => {
          setMinimized(false);
          setOpen(true);
          retroAudio.play('blip');
        }}
        className="fixed bottom-4 right-4 z-40 bg-[var(--px-panel)] border-2 border-[var(--px-line)] px-2.5 py-1.5 flex items-center gap-2 pixel-shadow-sm cursor-pointer hover:border-[var(--px-mint)] select-none"
        title="Open BYTE companion"
      >
        <PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />
        <span className="font-['Silkscreen'] text-[10px] text-[var(--px-mint)]">
          BYTE [TALK]
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end select-none">
      {/* Speech Bubble */}
      {open && (
        <div className="mb-2 max-w-[260px] bg-[var(--px-panel)] border-2 border-[var(--px-line)] p-3 pixel-shadow-md relative animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--px-line)]">
            <div className="flex items-center gap-1.5">
              <span className="font-['Press_Start_2P'] text-[9px] text-[var(--px-mint)]">
                BYTE_BOT
              </span>
              <span className="font-['Silkscreen'] text-[8px] px-1 bg-[var(--px-bg)] text-[var(--px-gold)] border border-[var(--px-line)]">
                {currentDialogue.mood}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-['Press_Start_2P'] text-[9px] text-[var(--px-muted)] hover:text-[var(--px-alert,#ff4f6d)] cursor-pointer"
              title="Close dialogue"
            >
              &times;
            </button>
          </div>

          {/* Dialogue Text */}
          <p className="font-['VT323'] text-base text-[var(--px-ink)] leading-snug">
            &ldquo;{currentDialogue.text}&rdquo;
          </p>

          {/* Next hint */}
          <div className="mt-2 pt-1 border-t border-[var(--px-line)] flex items-center justify-between text-[9px] font-['Silkscreen'] text-[var(--px-muted)]">
            <button
              type="button"
              onClick={handleClick}
              className="text-[var(--px-mint)] hover:underline cursor-pointer"
            >
              [NEXT DIALOGUE &gt;]
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setMinimized(true);
              }}
              className="hover:text-[var(--px-ink)] cursor-pointer"
            >
              [MINIMIZE]
            </button>
          </div>

          {/* Speech bubble pointer notch */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-[var(--px-panel)] border-r-2 border-b-2 border-[var(--px-line)] transform rotate-45" />
        </div>
      )}

      {/* Floating NPC Character Dock */}
      <div className="relative group">
        {/* Emote Indicator floating above head */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 font-['Press_Start_2P'] text-[9px] text-[var(--px-gold)] animate-bounce">
          {currentDialogue.emote}
        </div>

        <button
          type="button"
          onClick={handleClick}
          className={`flex items-center gap-2 p-2 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm cursor-pointer hover:border-[var(--px-mint)] hover:bg-[var(--px-panel-2)] transition-all ${
            poked ? 'scale-90' : 'hover:scale-105'
          }`}
          title="Click to talk to BYTE!"
        >
          <div className="relative">
            <PixelSprite name="robot" scale={1.8} color="var(--px-mint)" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--px-gold)] pixel-blink" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-['Press_Start_2P'] text-[8px] text-[var(--px-mint)] block">
              NPC: BYTE
            </span>
            <span className="font-['Silkscreen'] text-[8px] text-[var(--px-muted)] block">
              [TAP TO TALK]
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
