import React, { useState } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';
import { PROFILE } from '../../data/site';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { retroAudio } from '../../utils/audio';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [transmitted, setTransmitted] = useState(false);

  const handleFocus = (e) => {
    // Ensure focused field is never obscured by mobile virtual keyboard
    setTimeout(() => {
      e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 280);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    retroAudio.play('start');
    setTransmitted(true);

    const subject = encodeURIComponent(`[Portfolio Transmission] Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Sender: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="py-12 xs:py-16 sm:py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="LEVEL 08"
        title="CONNECT PORT"
        subtitle="INITIALIZE TWO-PLAYER COMMUNICATION"
        sprite="mail"
      />

      <div className="w-full max-w-3xl mx-auto space-y-6">
        {/* Transmission Terminal Form */}
        <PixelBox
          title="TRANSMIT_TERMINAL.NET"
          variant="raised"
          goldBorder={true}
          tag="READY 2P"
          className="w-full"
          bodyClassName="p-4 xs:p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[var(--px-line)]">
            <PixelSprite name="mail" scale={2} color="var(--px-mint)" />
            <div>
              <h3 className="font-['Press_Start_2P'] text-xs xs:text-sm text-[var(--px-ink)]">
                DISPATCH SECURE TRANSMISSION
              </h3>
              <p className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] mt-0.5">
                DIRECT FREQUENCY TO RASAL MUSTHAFA
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field 1: Sender Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold block mb-1.5 uppercase"
              >
                &gt; CALL-SIGN / NAME:
              </label>
              <input
                id="contact-name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleFocus}
                placeholder="Agent / Recruiter / Collaborator"
                className="w-full min-h-[48px] px-3.5 py-2.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] focus:border-[var(--px-mint)] text-[var(--px-ink)] placeholder:text-[var(--px-muted)] font-['VT323'] text-xl pixel-corners-sm outline-none transition-colors scroll-mt-24"
                style={{ fontSize: '18px' }}
              />
            </div>

            {/* Field 2: Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold block mb-1.5 uppercase"
              >
                &gt; COMM CHANNEL / EMAIL:
              </label>
              <input
                id="contact-email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                enterKeyHint="next"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={handleFocus}
                placeholder="your.frequency@domain.com"
                className="w-full min-h-[48px] px-3.5 py-2.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] focus:border-[var(--px-mint)] text-[var(--px-ink)] placeholder:text-[var(--px-muted)] font-['VT323'] text-xl pixel-corners-sm outline-none transition-colors scroll-mt-24"
                style={{ fontSize: '18px' }}
              />
            </div>

            {/* Field 3: Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="font-['Silkscreen'] text-xs text-[var(--px-mint)] font-bold block mb-1.5 uppercase"
              >
                &gt; TRANSMISSION PAYLOAD / MESSAGE:
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={handleFocus}
                placeholder="Let's build intelligent robotics, computer vision pipelines, or web platforms..."
                className="w-full min-h-[96px] px-3.5 py-2.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] focus:border-[var(--px-mint)] text-[var(--px-ink)] placeholder:text-[var(--px-muted)] font-['VT323'] text-xl pixel-corners-sm outline-none transition-colors resize-y scroll-mt-24"
                style={{ fontSize: '18px' }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <PixelButton
                variant="mint"
                size="lg"
                type="submit"
                className="w-full text-center justify-center min-h-[52px] text-xs xs:text-sm font-bold tracking-wider"
                icon={<PixelSprite name="star" scale={1.2} color="#0f0b1e" />}
              >
                {transmitted ? 'TRANSMITTING PACKET...' : 'TRANSMIT SIGNAL'}
              </PixelButton>

              {transmitted && (
                <div className="mt-2 text-center text-xs font-['Silkscreen'] text-[var(--px-mint)] animate-fade-in">
                  &gt; SIGNAL DISPATCHED! OPENING MAIL SYSTEM... &lt;
                </div>
              )}
            </div>
          </form>
        </PixelBox>

        {/* 2x2 Grid Social Channels (56px Height for Touch Ergonomics) */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <PixelButton
            variant="mint"
            size="lg"
            href={`mailto:${PROFILE.email}`}
            icon={<FaEnvelope className="w-5 h-5 text-[var(--px-bg)]" />}
            className="w-full text-center justify-center min-h-[56px] text-xs xs:text-sm"
          >
            EMAIL
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            icon={<FaLinkedin className="w-5 h-5 text-[#0077b5]" />}
            className="w-full text-center justify-center min-h-[56px] text-xs xs:text-sm"
          >
            LINKEDIN
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer noopener"
            icon={<SiGithub className="w-5 h-5" />}
            className="w-full text-center justify-center min-h-[56px] text-xs xs:text-sm"
          >
            GITHUB
          </PixelButton>

          <PixelButton
            variant="secondary"
            size="lg"
            href={PROFILE.links.leetcode}
            target="_blank"
            rel="noreferrer noopener"
            icon={<SiLeetcode className="w-5 h-5 text-[#ffa116]" />}
            className="w-full text-center justify-center min-h-[56px] text-xs xs:text-sm"
          >
            LEETCODE
          </PixelButton>
        </div>
      </div>
    </section>
  );
}
