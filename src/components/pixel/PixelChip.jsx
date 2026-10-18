import React from 'react';

export default function PixelChip({
  children,
  icon = null,
  variant = 'default', // 'default' | 'mint' | 'accent' | 'gold' | 'muted'
  className = '',
  size = 'md', // 'sm' | 'md'
}) {
  const variantStyles = {
    default:
      'bg-[var(--px-panel-2)] text-[var(--px-ink)] border-[var(--px-line)]',
    mint:
      'bg-[#10382e] text-[var(--px-mint)] border-[var(--px-mint)]',
    accent:
      'bg-[#281a42] text-[var(--px-accent)] border-[var(--px-accent)]',
    gold:
      'bg-[#3a2e12] text-[var(--px-gold)] border-[var(--px-gold)]',
    muted:
      'bg-[var(--px-bg)] text-[var(--px-muted)] border-[var(--px-line)]',
  }[variant] || 'bg-[var(--px-panel-2)] text-[var(--px-ink)] border-[var(--px-line)]';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 border-2',
    md: 'text-xs px-2.5 py-1 border-2',
  }[size] || 'text-xs px-2.5 py-1 border-2';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-['Silkscreen'] pixel-corners-sm pixel-shadow-sm select-none ${variantStyles} ${sizeStyles} ${className}`}
    >
      {icon && <span className="flex-none">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
