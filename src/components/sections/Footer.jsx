import React from 'react';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="mt-16 pb-8 select-none">
      <PixelBox
        variant="panel"
        bodyClassName="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <PixelSprite name="robot" scale={2} color="var(--px-mint)" />
          <span className="font-['Press_Start_2P'] text-[11px] sm:text-xs text-[var(--px-ink)]">
            &copy; 2026 RASAL MUSTHAFA
          </span>
        </div>

        <PixelButton
          variant="secondary"
          size="sm"
          onClick={onScrollTop}
          ariaLabel="Back to Top"
          icon={<PixelSprite name="arrow-up" scale={1.2} />}
        >
          TOP
        </PixelButton>
      </PixelBox>
    </footer>
  );
}
