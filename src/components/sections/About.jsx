import React, { useState, useEffect, lazy, Suspense } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelSprite from '../pixel/PixelSprite';
import LazyMount from '../common/LazyMount';
import { PROFILE, EDUCATION, PROFILE_IMAGE } from '../../data/site';
import { retroAudio } from '../../utils/audio';

const HalftoneRevealLazy = lazy(() => import('../reactbits/HalftoneReveal'));

export default function About() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <section id="about" className="py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 01"
        title="ABOUT PLAYER_01"
        subtitle="CHARACTER STATS & SYSTEM PROFILE"
        sprite="user"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Portrait with HalftoneReveal */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <PixelBox
            title="PLAYER_01.PNG"
            variant="panel"
            className="w-full max-w-sm aspect-[4/5] overflow-hidden"
            bodyClassName="p-0 relative w-full h-full"
          >
            <LazyMount
              rootMargin="200px"
              minHeight="380px"
              className="w-full h-full relative"
            >
              {!imgError ? (
                <Suspense
                  fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--px-panel)]">
                      <PixelSprite name="robot" scale={3} color="var(--px-mint)" />
                      <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] mt-3">
                        INITIALIZING SENSOR...
                      </span>
                    </div>
                  }
                >
                  <HalftoneRevealLazy
                    src={PROFILE_IMAGE}
                    fit="cover"
                    mode="duotone"
                    shape="square"
                    cellSize={isDesktop ? 8 : 6}
                    angle={0}
                    inkColor="#f4efe6"
                    accentColor="#a855f7"
                    paperColor="#000000"
                    contrast={1.25}
                    revealRadius={110}
                    softness={0.35}
                    linger={1.4}
                    wander
                    clickBurst
                    intro
                    onError={() => setImgError(true)}
                  />
                </Suspense>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--px-panel-2)] p-6 text-center">
                  <PixelSprite name="robot" scale={4} color="var(--px-mint)" />
                  <span className="font-['Press_Start_2P'] text-xs text-[var(--px-ink)] mt-4">
                    RASAL MUSTHAFA
                  </span>
                  <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] mt-1">
                    [PIXEL AVATAR]
                  </span>
                </div>
              )}
            </LazyMount>
          </PixelBox>

          <p className="font-['Silkscreen'] text-[11px] text-[var(--px-muted)] mt-3 text-center uppercase tracking-wider select-none">
            &gt; HOVER OR TAP TO DEVELOP THE PHOTO &lt;
          </p>
        </div>

        {/* Right Column: Character Sheet & Story */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* RPG Character Sheet Box */}
          <PixelBox
            title="CHARACTER_SHEET.LOG"
            icon={<PixelSprite name="chip" scale={1.2} />}
            variant="raised"
          >
            <h3 className="font-['Press_Start_2P'] text-sm sm:text-base text-[var(--px-mint)] mb-4 uppercase">
              Rasal Musthafa // Level 2
            </h3>

            <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-6">
              {PROFILE.summary}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm">
              <div className="flex flex-col">
                <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase">
                  CLASS
                </span>
                <span className="font-['Press_Start_2P'] text-xs text-[var(--px-ink)] mt-1">
                  CSE Student
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase">
                  ACADEMIC GUILD
                </span>
                <span className="font-['Press_Start_2P'] text-[11px] text-[var(--px-ink)] mt-1 truncate" title="T.K.M College of Engineering, Kollam">
                  TKMCE, Kollam
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase">
                  MAIN FOCUS
                </span>
                <span className="font-['Press_Start_2P'] text-xs text-[var(--px-mint)] mt-1">
                  Robotics, Computer Vision, Full-Stack
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase">
                  CORE INTERESTS
                </span>
                <span className="font-['Press_Start_2P'] text-xs text-[var(--px-gold)] mt-1 leading-snug">
                  Edge Computing, Machine Learning, Autonomous Systems
                </span>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div>
              <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] uppercase tracking-wider block mb-3">
                [ UNLOCKED COURSEWORK ]
              </span>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course) => (
                  <PixelChip key={course} variant="mint">
                    {course}
                  </PixelChip>
                ))}
              </div>
            </div>

            {/* Pixel Pet NPC */}
            <PixelCatNpc />
          </PixelBox>
        </div>
      </div>
    </section>
  );
}

function PixelCatNpc() {
  const [purring, setPurring] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handlePet = () => {
    retroAudio.play('blip');
    setPurring(true);
    const id = Date.now();
    setHearts((prev) => [...prev, id]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 1200);
    setTimeout(() => setPurring(false), 2400);
  };

  return (
    <div className="relative mt-5 p-3 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePet}
          className="cursor-pointer hover:scale-110 active:scale-95 transition-transform relative p-1 bg-[var(--px-bg)] border border-[var(--px-line)]"
          title="Click to pet GIGA_CAT!"
        >
          <PixelSprite name="cat" scale={2} color="var(--px-gold)" />
          {hearts.map((h) => (
            <span
              key={h}
              className="absolute -top-3 left-2 font-['Press_Start_2P'] text-[10px] text-[var(--px-alert,#ff4f6d)] animate-bounce"
            >
              ♥
            </span>
          ))}
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-['Press_Start_2P'] text-[9px] text-[var(--px-gold)]">
              GIGA_CAT [PET NPC]
            </span>
            <span className="font-['Silkscreen'] text-[8px] px-1 bg-[var(--px-bg)] text-[var(--px-mint)] border border-[var(--px-line)]">
              {purring ? 'PURRING' : 'SLEEPING'}
            </span>
          </div>
          <span className="font-['VT323'] text-base text-[var(--px-muted)] block mt-0.5">
            {purring
              ? '“Purrr... Rasal\'s code gave me +50 cuddles!”'
              : '“Zzz... Click to pet the pixel cat!”'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePet}
        className="font-['Silkscreen'] text-[9px] px-2.5 py-1 bg-[var(--px-bg)] border border-[var(--px-line)] text-[var(--px-mint)] hover:border-[var(--px-mint)] cursor-pointer"
      >
        [PET ME]
      </button>
    </div>
  );
}
