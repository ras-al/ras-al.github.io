import React from 'react';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] px-4 py-2 bg-[var(--px-mint)] text-[var(--px-bg)] font-['Silkscreen'] text-sm font-bold border-4 border-black pixel-shadow outline-none"
    >
      [ SKIP TO CONTENT ]
    </a>
  );
}
