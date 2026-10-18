import React from 'react';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';

export default function Footer({ onScrollTop }) {
  return (
    <footer className="mt-12 xs:mt-16 pb-8 safe-pb select-none">
      <PixelBox
        variant="panel"
        className="w-full"
        bodyClassName="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <PixelSprite name="robot" scale={1.8} color="var(--px-mint)" />
          <div>
            <span className="font-['Press_Start_2P'] text-[10px] xs:text-[11px] sm:text-xs text-[var(--px-ink)] block">
              &copy; 2026 RASAL MUSTHAFA
            </span>
            <span className="font-['Silkscreen'] text-[9px] text-[var(--px-muted)] block mt-0.5">
              ALL ASSETS &bull; PIXEL ART &bull; AUTONOMOUS SYSTEMS
            </span>
          </div>
        </div>

        {/* Back-to-Top Button (Min 48px hit target above safe area) */}
        <PixelButton
          variant="secondary"
          size="md"
          onClick={onScrollTop}
          ariaLabel="Back to top of portfolio"
          className="w-full sm:w-auto min-h-[48px] px-5 text-xs font-bold"
          icon={<PixelSprite name="arrow-up" scale={1.3} />}
        >
          BACK TO TOP
        </PixelButton>
      </PixelBox>
    </footer>
  );
}
