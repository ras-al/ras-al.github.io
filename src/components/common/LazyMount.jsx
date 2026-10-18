import React, { useState, useEffect, useRef } from 'react';

export default function LazyMount({
  children,
  placeholder = null,
  rootMargin = '200px',
  unmountOnExit = false,
  minHeight = '200px',
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!unmountOnExit) {
            observer.disconnect();
          }
        } else if (unmountOnExit) {
          setIsVisible(false);
        }
      },
      { rootMargin }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [rootMargin, unmountOnExit]);

  return (
    <div
      ref={containerRef}
      style={{ minHeight: isVisible ? 'auto' : minHeight }}
      className={`relative ${className}`}
    >
      {isVisible ? (
        children
      ) : (
        placeholder || (
          <div
            style={{ minHeight }}
            className="w-full h-full flex flex-col items-center justify-center border-4 border-dashed border-[var(--px-line)] bg-[var(--px-panel)]/50 p-6 select-none"
          >
            <div className="w-8 h-8 border-4 border-[var(--px-mint)] animate-pulse mb-3" />
            <span className="font-['Silkscreen'] text-xs text-[var(--px-muted)] uppercase tracking-wider">
              [ LOADING ARTIFACT... ]
            </span>
          </div>
        )
      )}
    </div>
  );
}
