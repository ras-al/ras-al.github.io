import React from 'react';

export default function PixelBox({
  children,
  title,
  icon,
  className = '',
  bodyClassName = 'p-4 md:p-6',
  variant = 'panel', // 'panel' | 'raised' | 'accent' | 'hero'
  goldBorder = false,
  shadow = 'normal', // 'normal' | 'large' | 'none'
  tag = null,
}) {
  const bgClasses = {
    panel: 'bg-[var(--px-panel)]',
    raised: 'bg-[var(--px-panel-2)]',
    accent: 'bg-[#241c42]',
    hero: 'bg-[var(--px-panel)]/90 backdrop-blur-none',
  }[variant] || 'bg-[var(--px-panel)]';

  const borderColor = goldBorder
    ? 'border-[var(--px-gold)]'
    : 'border-[var(--px-line)]';

  const shadowClass = {
    normal: 'pixel-shadow',
    large: 'pixel-shadow-lg',
    none: '',
  }[shadow];

  return (
    <div
      className={`relative border-4 ${borderColor} ${bgClasses} ${shadowClass} pixel-corners flex flex-col ${className}`}
    >
      {/* Retro Window Title Bar if title provided */}
      {title && (
        <div className="flex items-center justify-between border-b-4 border-[var(--px-line)] bg-[var(--px-panel-2)] px-3 py-2 select-none">
          <div className="flex items-center gap-2 overflow-hidden">
            {icon && <span className="flex-none">{icon}</span>}
            <span className="font-['Silkscreen'] text-xs uppercase tracking-wider text-[var(--px-ink)] truncate font-bold">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-none ml-2">
            {tag && (
              <span className="bg-[var(--px-gold)] text-[var(--px-bg)] font-['Press_Start_2P'] text-[9px] px-1.5 py-0.5 font-bold">
                {tag}
              </span>
            )}
            {/* Retro OS 3-square buttons */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-[var(--px-muted)] block border border-black" />
              <span className="w-2.5 h-2.5 bg-[var(--px-gold)] block border border-black" />
              <span className="w-2.5 h-2.5 bg-[var(--px-red)] block border border-black" />
            </div>
          </div>
        </div>
      )}

      {/* Box content */}
      <div className={`flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
