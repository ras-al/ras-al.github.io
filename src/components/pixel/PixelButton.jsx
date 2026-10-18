import React from 'react';

export default function PixelButton({
  children,
  as = 'button',
  href,
  onClick,
  download,
  target,
  rel,
  variant = 'secondary', // 'primary' | 'secondary' | 'accent' | 'mint' | 'gold' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  className = '',
  ariaLabel,
  disabled = false,
  ...rest
}) {
  const Component = href ? 'a' : as;

  const variantStyles = {
    primary:
      'bg-[var(--px-accent)] text-[var(--px-ink)] hover:bg-[#b86dfa] border-[var(--px-ink)]',
    mint:
      'bg-[var(--px-mint)] text-[var(--px-bg)] hover:bg-[#7affd6] border-[var(--px-ink)] font-bold',
    secondary:
      'bg-[var(--px-panel-2)] text-[var(--px-ink)] hover:bg-[var(--px-line)] border-[var(--px-line)]',
    accent:
      'bg-[var(--px-panel)] text-[var(--px-mint)] border-[var(--px-mint)] hover:bg-[var(--px-panel-2)]',
    gold:
      'bg-[var(--px-gold)] text-[var(--px-bg)] hover:bg-[#ffe08f] border-[var(--px-ink)] font-bold',
    ghost:
      'bg-transparent text-[var(--px-ink)] hover:bg-[var(--px-panel-2)] border-[var(--px-line)]',
  }[variant] || 'bg-[var(--px-panel-2)] text-[var(--px-ink)] border-[var(--px-line)]';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 min-h-[44px]',
    md: 'text-sm px-4 py-2.5 min-h-[44px]',
    lg: 'text-base px-6 py-3 min-h-[48px]',
  }[size] || 'text-sm px-4 py-2.5 min-h-[44px]';

  const commonClasses = `
    inline-flex items-center justify-center gap-2 select-none font-['Silkscreen']
    border-[length:var(--px)] pixel-corners pixel-shadow
    transition-none
    hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#000000]
    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
    focus-visible:outline-3 focus-visible:outline-[var(--px-mint)] focus-visible:outline-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ${variantStyles}
    ${sizeStyles}
    ${className}
  `.trim();

  const extraProps = {};
  if (href) {
    extraProps.href = href;
    if (download) extraProps.download = download;
    if (target) {
      extraProps.target = target;
      extraProps.rel = rel || 'noreferrer noopener';
    }
  }

  return (
    <Component
      className={commonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...extraProps}
      {...rest}
    >
      {icon && <span className="flex-none">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
}
