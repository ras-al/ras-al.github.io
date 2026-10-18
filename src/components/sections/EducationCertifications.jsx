import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelSprite from '../pixel/PixelSprite';
import LogoLoop from '../reactbits/LogoLoop';
import { EDUCATION, CERTIFICATIONS } from '../../data/site';
import { useQuality } from '../../utils/quality';

export default function EducationCertifications() {
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const quality = useQuality();

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setPrefersReducedMotion(
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const certItems = CERTIFICATIONS.map((cert) => ({
    ...cert,
    node: (
      <div className="w-full max-w-[380px] mx-auto p-2.5 xs:p-3 sm:p-4 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center gap-2.5 xs:gap-3.5 select-none">
        <PixelSprite name="cartridge" scale={1.5} color="var(--px-mint)" className="flex-none" />
        <div className="flex-1 min-w-0">
          <h4 className="font-['Silkscreen'] text-[11px] sm:text-[13px] font-bold text-[var(--px-ink)] leading-snug">
            {cert.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 font-['Press_Start_2P'] text-[7px] xs:text-[8px] sm:text-[9px]">
            <span className="text-[var(--px-gold)]">{cert.issuer}</span>
            <span className="text-[var(--px-muted)]">•</span>
            <span className="text-[var(--px-mint)]">{cert.date}</span>
          </div>
        </div>
      </div>
    ),
  }));

  const handleNextCert = () => {
    setActiveCertIndex((prev) => (prev + 1) % CERTIFICATIONS.length);
  };

  const handlePrevCert = () => {
    setActiveCertIndex((prev) => (prev - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length);
  };

  const showStaticList = prefersReducedMotion || quality === 'low';

  return (
    <div className="py-12 xs:py-16 sm:py-20 border-b-4 border-[var(--px-line)]">
      {/* Container holding both #education and #certifications: stacked on mobile & tablet, 2-column on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Top/Left Column: Education */}
        <div id="education" className="lg:col-span-6 flex flex-col w-full">
          <SectionHeader
            level="LEVEL 06"
            title="ACADEMIC RECORDS"
            subtitle="INSTITUTION & DEGREE PROGRAM"
            sprite="star"
            className="mb-4 sm:mb-6"
          />

          <PixelBox
            title="TKMCE_ACADEMIC_RECORD.DAT"
            variant="raised"
            goldBorder={true}
            tag="2024 - 2028"
            className="flex-1 w-full"
            bodyClassName="p-4 sm:p-6"
          >
            <div className="mb-4">
              <span className="font-['Silkscreen'] text-xs text-[var(--px-mint)] uppercase font-bold tracking-wider block">
                B.TECH IN COMPUTER SCIENCE &amp; ENGINEERING
              </span>
              <h3 className="font-['Press_Start_2P'] text-xs xs:text-sm sm:text-base text-[var(--px-ink)] mt-2 leading-snug">
                {EDUCATION.school}
              </h3>
              <p className="font-['Silkscreen'] text-xs text-[var(--px-muted)] mt-1">
                {EDUCATION.place}
              </p>
            </div>

            {/* GPA Callout */}
            <div className="p-3 xs:p-4 bg-[var(--px-panel)] border-2 border-[var(--px-gold)] pixel-corners-sm mb-4 xs:mb-6 flex items-center justify-between">
              <div>
                <span className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] uppercase block">
                  CUMULATIVE GRADE POINT AVERAGE
                </span>
                <span className="font-['Press_Start_2P'] text-sm xs:text-base sm:text-lg text-[var(--px-gold)] font-bold mt-1 block">
                  CGPA {EDUCATION.cgpa}
                </span>
              </div>
              <PixelSprite name="trophy" scale={2} color="var(--px-gold)" />
            </div>

            {/* Coursework list */}
            <div>
              <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] uppercase tracking-wider block mb-2 xs:mb-3">
                [ CORE ACADEMIC MODULES ]
              </span>
              <div className="flex flex-wrap gap-1.5 xs:gap-2">
                {EDUCATION.coursework.map((course) => (
                  <PixelChip key={course} variant="mint" size="sm">
                    {course}
                  </PixelChip>
                ))}
              </div>
            </div>
          </PixelBox>
        </div>

        {/* Bottom/Right Column: Certifications */}
        <div id="certifications" className="lg:col-span-6 flex flex-col w-full">
          <SectionHeader
            level="LEVEL 07"
            title="CERTIFICATIONS"
            subtitle="INDUSTRY & ACADEMIC CREDENTIALS"
            sprite="trophy"
            className="mb-4 sm:mb-6"
          />

          <PixelBox
            title="CREDENTIALS_VAULT.CAROUSEL"
            variant="panel"
            className="flex-1 flex flex-col justify-between w-full"
            bodyClassName="p-3 xs:p-4 flex flex-col justify-between"
          >
            {/* Screen reader plain list */}
            <div className="sr-only">
              <h3>Earned Certifications</h3>
              <ul>
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.title}>
                    {cert.title} - {cert.issuer} ({cert.date})
                  </li>
                ))}
              </ul>
            </div>

            {showStaticList ? (
              /* Plain accessible list for reduced motion or low quality tier */
              <div className="space-y-2.5 my-2">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.title}
                    className="p-3 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm flex items-center gap-3"
                  >
                    <PixelSprite name="cartridge" scale={1.4} color="var(--px-mint)" className="flex-none" />
                    <div>
                      <h4 className="font-['Silkscreen'] text-xs font-bold text-[var(--px-ink)]">
                        {cert.title}
                      </h4>
                      <p className="font-['Press_Start_2P'] text-[8px] text-[var(--px-gold)] mt-0.5">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Vertical stepping LogoLoop with pan-x touch-action so page scroll is never trapped */
              <div className="flex flex-col gap-2">
                <div
                  className="relative w-full h-[280px] xs:h-[300px] sm:h-[340px] overflow-hidden flex items-center justify-center bg-black/60 border-2 border-[var(--px-line)] pixel-corners-sm p-2 xs:p-3"
                  style={{ touchAction: 'pan-x' }}
                >
                  <LogoLoop
                    logos={certItems}
                    direction="up"
                    step={true}
                    focus={activeCertIndex}
                    labels="none"
                    muted={0.2}
                    speed={35}
                    gap={14}
                    logoHeight={isMobile ? 76 : 84}
                    className="w-full h-full"
                    ariaLabel="Certifications carousel"
                    renderItem={(item, key) => (
                      <div key={key} className="w-full py-1">
                        {item.node}
                      </div>
                    )}
                  />
                </div>

                {/* Stepping pixel buttons (Min 44x44px target) */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handlePrevCert}
                    className="px-3 py-2 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] text-[var(--px-ink)] pixel-corners-sm text-[9px] font-['Press_Start_2P'] min-h-[44px] cursor-pointer"
                    aria-label="Previous Certificate"
                  >
                    ▲ PREV
                  </button>

                  <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)]">
                    STEPPING VAULT
                  </span>

                  <button
                    type="button"
                    onClick={handleNextCert}
                    className="px-3 py-2 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] hover:border-[var(--px-mint)] text-[var(--px-ink)] pixel-corners-sm text-[9px] font-['Press_Start_2P'] min-h-[44px] cursor-pointer"
                    aria-label="Next Certificate"
                  >
                    NEXT ▼
                  </button>
                </div>
              </div>
            )}

            <p className="font-['Silkscreen'] text-[9px] xs:text-[10px] text-[var(--px-muted)] mt-2 text-center uppercase tracking-wider select-none">
              &gt; CREDENTIAL CARTRIDGES &lt;
            </p>
          </PixelBox>
        </div>
      </div>
    </div>
  );
}
