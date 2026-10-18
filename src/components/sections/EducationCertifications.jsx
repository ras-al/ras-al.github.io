import React from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelChip from '../pixel/PixelChip';
import PixelSprite from '../pixel/PixelSprite';
import LogoLoop from '../reactbits/LogoLoop';
import { EDUCATION, CERTIFICATIONS } from '../../data/site';

export default function EducationCertifications() {
  const certItems = CERTIFICATIONS.map((cert) => ({
    ...cert,
    node: (
      <div className="w-full max-w-[380px] mx-auto p-3 sm:p-4 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm pixel-shadow-sm flex items-center gap-3.5 select-none">
        <PixelSprite name="cartridge" scale={2} color="var(--px-mint)" className="flex-none" />
        <div className="flex-1 min-w-0">
          <h4 className="font-['Silkscreen'] text-xs sm:text-[13px] font-bold text-[var(--px-ink)] leading-snug">
            {cert.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5 font-['Press_Start_2P'] text-[9px]">
            <span className="text-[var(--px-gold)]">{cert.issuer}</span>
            <span className="text-[var(--px-muted)]">•</span>
            <span className="text-[var(--px-mint)]">{cert.date}</span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="py-20 border-b-4 border-[var(--px-line)]">
      {/* Container holding both #education and #certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Education */}
        <div id="education" className="lg:col-span-6 flex flex-col">
          <SectionHeader
            level="LEVEL 06"
            title="ACADEMIC RECORDS"
            subtitle="INSTITUTION & DEGREE PROGRAM"
            sprite="star"
            className="mb-6"
          />

          <PixelBox
            title="TKMCE_ACADEMIC_RECORD.DAT"
            variant="raised"
            goldBorder={true}
            tag="2024 - 2028"
            className="flex-1"
          >
            <div className="mb-4">
              <span className="font-['Silkscreen'] text-xs text-[var(--px-mint)] uppercase font-bold tracking-wider block">
                B.TECH IN COMPUTER SCIENCE &amp; ENGINEERING
              </span>
              <h3 className="font-['Press_Start_2P'] text-sm sm:text-base text-[var(--px-ink)] mt-2 leading-snug">
                {EDUCATION.school}
              </h3>
              <p className="font-['Silkscreen'] text-xs text-[var(--px-muted)] mt-1">
                {EDUCATION.place}
              </p>
            </div>

            {/* GPA Callout */}
            <div className="p-4 bg-[var(--px-panel)] border-2 border-[var(--px-gold)] pixel-corners-sm mb-6 flex items-center justify-between">
              <div>
                <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase block">
                  CUMULATIVE GRADE POINT AVERAGE
                </span>
                <span className="font-['Press_Start_2P'] text-base sm:text-lg text-[var(--px-gold)] font-bold mt-1 block">
                  CGPA {EDUCATION.cgpa}
                </span>
              </div>
              <PixelSprite name="trophy" scale={2} color="var(--px-gold)" />
            </div>

            {/* Coursework list */}
            <div>
              <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] uppercase tracking-wider block mb-3">
                [ CORE ACADEMIC MODULES ]
              </span>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course) => (
                  <PixelChip key={course} variant="mint">
                    {course}
                  </PixelChip>
                ))}
              </div>
            </div>
          </PixelBox>
        </div>

        {/* Right Column: Certifications */}
        <div id="certifications" className="lg:col-span-6 flex flex-col">
          <SectionHeader
            level="LEVEL 07"
            title="CERTIFICATIONS"
            subtitle="INDUSTRY & ACADEMIC CREDENTIALS"
            sprite="trophy"
            className="mb-6"
          />

          <PixelBox
            title="CREDENTIALS_VAULT.CAROUSEL"
            variant="panel"
            className="flex-1 flex flex-col justify-between"
            bodyClassName="p-4 flex flex-col justify-between"
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

            {/* Vertical LogoLoop Carousel */}
            <div
              style={{ height: '340px' }}
              className="relative w-full overflow-hidden flex items-center justify-center bg-black/60 border-2 border-[var(--px-line)] pixel-corners-sm p-3"
            >
              <LogoLoop
                logos={certItems}
                direction="up"
                step
                focus={0}
                labels="none"
                muted={0.2}
                speed={40}
                gap={16}
                logoHeight={84}
                className="w-full h-full"
                ariaLabel="Certifications carousel"
                renderItem={(item, key) => (
                  <div key={key} className="w-full py-1">
                    {item.node}
                  </div>
                )}
              />
            </div>

            <p className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] mt-3 text-center uppercase tracking-wider select-none">
              &gt; STEPPING CREDENTIAL CARTRIDGES &lt;
            </p>
          </PixelBox>
        </div>
      </div>
    </div>
  );
}
