import React from 'react';
import PixelSprite from './PixelSprite';

export default function SectionHeader({
  level = 'LEVEL 01',
  title = 'SECTION TITLE',
  subtitle = null,
  sprite = 'robot',
  spriteNode = null,
  className = '',
}) {
  return (
    <div className={`mb-6 sm:mb-10 select-none ${className}`}>
      {/* Level Tag & Sprite */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
        {spriteNode ? (
          spriteNode
        ) : (
          <PixelSprite name={sprite} scale={1.6} />
        )}
        <span className="font-['Press_Start_2P'] text-[10px] sm:text-[11px] md:text-xs text-[var(--px-mint)] tracking-wider uppercase font-bold">
          [ {level} ]
        </span>
      </div>

      {/* Main Title */}
      <h2 className="font-['Press_Start_2P'] text-base sm:text-xl md:text-2xl lg:text-3xl text-[var(--px-ink)] leading-relaxed tracking-tight uppercase break-words">
        {title}
      </h2>

      {subtitle && (
        <p className="font-['Silkscreen'] text-[11px] sm:text-xs md:text-sm text-[var(--px-muted)] mt-1.5 sm:mt-2 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Dotted Pixel Divider */}
      <div className="mt-4 flex items-center gap-2 overflow-hidden" aria-hidden="true">
        <span className="w-4 h-2 bg-[var(--px-accent)] block flex-none" />
        <span className="w-2 h-2 bg-[var(--px-mint)] block flex-none" />
        <div className="h-1 flex-1 bg-[repeating-linear-gradient(90deg,var(--px-line),var(--px-line)_4px,transparent_4px,transparent_8px)]" />
        <span className="w-2 h-2 bg-[var(--px-gold)] block flex-none" />
      </div>
    </div>
  );
}
