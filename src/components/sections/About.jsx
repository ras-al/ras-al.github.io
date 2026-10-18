import React, { useState, useEffect, lazy, Suspense } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelSprite from '../pixel/PixelSprite';
import LazyMount from '../common/LazyMount';
import { PROFILE, EDUCATION, PROFILE_IMAGE } from '../../data/site';
import { retroAudio } from '../../utils/audio';
import { useQuality } from '../../utils/quality';

const HalftoneRevealLazy = lazy(() => import('../reactbits/HalftoneReveal'));

export default function About() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [imgError, setImgError] = useState(false);
  const quality = useQuality();

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsTouch(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const cellSize = quality === 'low' ? 10 : quality === 'medium' ? 8 : isDesktop ? 8 : 6;

  return (
    <section id="about" className="py-12 xs:py-16 sm:py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 01"
        title="ABOUT PLAYER_01"
        subtitle="CHARACTER STATS & SYSTEM PROFILE"
        sprite="user"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Portrait with HalftoneReveal */}
        <div className="lg:col-span-5 flex flex-col items-center w-full">
          <PixelBox
            title="PLAYER_01.PNG"
            variant="panel"
            className="w-full max-w-[340px] aspect-[4/5] overflow-hidden mx-auto"
            bodyClassName="p-0 relative w-full h-full"
          >
            <LazyMount
              rootMargin="200px"
              minHeight="340px"
              className="w-full h-full relative"
              style={{ touchAction: 'pan-y' }}
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
                  <div className="w-full h-full" style={{ touchAction: 'pan-y' }}>
                    <HalftoneRevealLazy
                      src={PROFILE_IMAGE}
                      fit="cover"
                      mode="duotone"
                      shape="square"
                      cellSize={cellSize}
                      angle={0}
                      inkColor="#f4efe6"
                      accentColor="#a855f7"
                      paperColor="#000000"
                      contrast={1.25}
                      revealRadius={isTouch ? 130 : 110}
                      softness={0.35}
                      linger={1.4}
                      wander={true}
                      clickBurst={true}
                      intro={true}
                      onError={() => setImgError(true)}
                    />
                  </div>
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

          <p className="font-['Silkscreen'] text-[10px] xs:text-[11px] text-[var(--px-muted)] mt-2.5 text-center uppercase tracking-wider select-none">
            {isTouch ? '> TAP TO DEVELOP THE PHOTO <' : '> HOVER OR TAP TO DEVELOP THE PHOTO <'}
          </p>
        </div>

        {/* Right Column: Character Sheet & Story */}
        <div className="lg:col-span-7 flex flex-col gap-4 xs:gap-6 w-full">
          {/* RPG Character Sheet Box */}
          <PixelBox
            title="CHARACTER_SHEET.LOG"
            icon={<PixelSprite name="chip" scale={1.2} />}
            variant="raised"
            bodyClassName="p-4 sm:p-6"
          >
            <h3 className="font-['Press_Start_2P'] text-xs xs:text-sm sm:text-base text-[var(--px-mint)] mb-3 xs:mb-4 uppercase">
              Rasal Musthafa // Level 2
            </h3>

            <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-4 xs:mb-6">
              {PROFILE.summary}
            </p>

            {/* Quick Stats Grid: Single-column on mobile, 2-column on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-4 xs:mb-6 p-3 xs:p-4 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm">
              <div className="flex flex-col">
                <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] uppercase">
                  CLASS
                </span>
                <span className="font-['Press_Start_2P'] text-[11px] xs:text-xs text-[var(--px-ink)] mt-1">
                  CSE Student
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] uppercase">
                  ACADEMIC GUILD
                </span>
                <span className="font-['Press_Start_2P'] text-[10px] xs:text-[11px] text-[var(--px-ink)] mt-1 truncate" title="T.K.M College of Engineering, Kollam">
                  TKMCE, Kollam
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] uppercase">
                  MAIN FOCUS
                </span>
                <span className="font-['Press_Start_2P'] text-[11px] xs:text-xs text-[var(--px-mint)] mt-1">
                  Robotics, Computer Vision, Full-Stack
                </span>
              </div>

              <div className="flex flex-col sm:col-span-2">
                <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] uppercase">
                  CORE INTERESTS
                </span>
                <span className="font-['Press_Start_2P'] text-[10px] xs:text-xs text-[var(--px-gold)] mt-1 leading-snug">
                  Edge Computing, Machine Learning, Autonomous Systems
                </span>
              </div>
            </div>

            {/* Relevant Coursework */}
            <div>
              <span className="font-['Silkscreen'] text-[11px] xs:text-xs text-[var(--px-muted)] uppercase tracking-wider block mb-2 xs:mb-3">
                [ UNLOCKED COURSEWORK ]
              </span>
              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {EDUCATION.coursework.map((course) => (
                  <PixelChip key={course} variant="mint" size="sm">
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
    // Play purr sound (honors sound mute state)
    retroAudio.play('purr');
    setPurring(true);
    const id = Date.now();
    setHearts((prev) => [...prev, id]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h !== id));
    }, 1200);
    setTimeout(() => setPurring(false), 2400);
  };

  return (
    <div className="relative mt-4 xs:mt-5 p-2.5 xs:p-3 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2.5 xs:gap-3 min-w-0">
        <button
          type="button"
          onClick={handlePet}
          className="cursor-pointer hover:scale-105 active:scale-95 transition-transform relative p-1.5 bg-[var(--px-bg)] border border-[var(--px-line)] flex-none min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Click to pet GIGA_CAT!"
          aria-label="Pet GIGA_CAT"
        >
          <PixelSprite name="cat" scale={2} color="var(--px-gold)" />
          {hearts.map((h) => (
            <span
              key={h}
              className="absolute -top-3 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none"
            >
              <PixelSprite name="heart" scale={1.2} />
            </span>
          ))}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-['Press_Start_2P'] text-[8px] xs:text-[9px] text-[var(--px-gold)] truncate">
              GIGA_CAT [PET NPC]
            </span>
            <span className="font-['Silkscreen'] text-[7px] xs:text-[8px] px-1 bg-[var(--px-bg)] text-[var(--px-mint)] border border-[var(--px-line)] flex-none">
              {purring ? 'PURRING' : 'SLEEPING'}
            </span>
          </div>
          <span className="font-['VT323'] text-sm xs:text-base text-[var(--px-muted)] block mt-0.5 truncate">
            {purring
              ? '“Purrr... +50 cuddles gained!”'
              : '“Zzz... Tap to pet the pixel cat!”'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePet}
        className="font-['Silkscreen'] text-[9px] px-3 py-2 bg-[var(--px-bg)] border border-[var(--px-line)] text-[var(--px-mint)] hover:border-[var(--px-mint)] active:translate-y-0.5 cursor-pointer min-h-[44px] flex items-center justify-center ml-auto sm:ml-0"
        aria-label="Pet cat action"
      >
        [PET ME]
      </button>
    </div>
  );
}
