import React, { useState, useEffect, useRef } from 'react';

export default function LazyMount({
  children,
  placeholder = null,
  rootMargin = '150px',
  unmountOnExit = undefined,
  minHeight = '200px',
  className = '',
  style = {},
}) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // On touch devices or small screens, aggressively unmount off-screen surfaces to protect WebGL contexts
    const isTouch = typeof window !== 'undefined' && 
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    const shouldUnmountOnExit = unmountOnExit !== undefined ? unmountOnExit : isTouch;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!shouldUnmountOnExit) {
            observer.disconnect();
          }
        } else if (shouldUnmountOnExit) {
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
      style={{ minHeight: isVisible ? 'auto' : minHeight, ...style }}
      className={`relative ${className}`}
    >
      {isVisible ? (
        children
      ) : (
        placeholder || (
          <div
            style={{ minHeight }}
            className="w-full h-full min-h-[200px] flex flex-col items-center justify-center border-4 border-[var(--px-line)] bg-[var(--px-panel)] p-6 select-none pixel-corners"
          >
            <div className="w-6 h-6 border-2 border-[var(--px-mint)] animate-pulse mb-2" />
            <span className="font-['Silkscreen'] text-[10px] text-[var(--px-muted)] uppercase tracking-wider">
              [ STANDBY // PIXEL SKELETON ]
            </span>
          </div>
        )
      )}
    </div>
  );
}
