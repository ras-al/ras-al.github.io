import React from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';
import { PROFILE } from '../../data/site';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 08"
        title="CONNECT PORT"
        subtitle="INITIALIZE TWO-PLAYER COMMUNICATION"
        sprite="mail"
      />

      <PixelBox
        title="COMMUNICATION_TERMINAL.NET"
        variant="raised"
        goldBorder={true}
        className="max-w-3xl mx-auto text-center"
        bodyClassName="p-6 sm:p-10"
      >
        <div className="mb-4 inline-block">
          <PixelSprite name="mail" scale={3} color="var(--px-mint)" />
        </div>

        <h3 className="font-['Press_Start_2P'] text-xl sm:text-2xl md:text-3xl text-[var(--px-ink)] mb-4 uppercase">
          READY PLAYER TWO?
        </h3>

        <p className="font-['VT323'] text-2xl sm:text-3xl text-[var(--px-mint)] mb-3">
          Open to projects, research collaborations and internships.
        </p>

        <p className="font-['VT323'] text-xl text-[var(--px-muted)] max-w-xl mx-auto mb-8">
          Whether you want to discuss robotics, 3D reconstruction, full-stack systems, or just chat about emerging tech, hit the link below.
        </p>

        {/* 4 Large Pixel Link Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
          <PixelButton
            variant="mint"
            size="lg"
            href={`mailto:${PROFILE.email}`}
            icon={<FaEnvelope className="w-5 h-5 text-[var(--px-bg)]" />}
            className="w-full text-center"
          >
            SEND EMAIL
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.linkedin}
            target="_blank"
            icon={<FaLinkedin className="w-5 h-5 text-[#0077b5]" />}
            className="w-full text-center"
          >
            LINKEDIN
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.github}
            target="_blank"
            icon={<SiGithub className="w-5 h-5" />}
            className="w-full text-center"
          >
            GITHUB
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.leetcode}
            target="_blank"
            icon={<SiLeetcode className="w-5 h-5 text-[#ffa116]" />}
            className="w-full text-center"
          >
            LEETCODE
          </PixelButton>
        </div>

        {/* Optional Phone Number rendering if showPhone is true */}
        {PROFILE.showPhone && PROFILE.phone && (
          <div className="mt-4 p-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] inline-block pixel-corners-sm">
            <span className="font-['Silkscreen'] text-xs text-[var(--px-gold)] font-bold">
              TEL: {PROFILE.phone}
            </span>
          </div>
        )}
      </PixelBox>
    </section>
  );
}
