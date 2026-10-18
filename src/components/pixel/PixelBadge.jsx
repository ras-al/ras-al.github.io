import React from 'react';

export default function PixelBadge({
  children,
  height = 40,
  className = '',
  color = 'var(--px-ink)',
}) {
  return (
    <div
      style={{ height: `${height}px` }}
      className={`inline-flex items-center justify-center px-3 border-2 border-[var(--px-line)] bg-[var(--px-panel-2)] pixel-corners-sm pixel-shadow-sm select-none font-['Silkscreen'] text-xs font-bold whitespace-nowrap ${className}`}
    >
      <span style={{ color }}>{children}</span>
    </div>
  );
}
