import React, { useMemo } from 'react';

// Pure CSS stepped twinkling 4px pixel starfield fallback
export default function PixelStarfield({ count = 80, className = '' }) {
  const stars = useMemo(() => {
    const starList = [];
    const colors = [
      'var(--px-ink)',
      'var(--px-accent)',
      'var(--px-mint)',
      'var(--px-gold)',
      '#ffffff'
    ];

    for (let i = 0; i < count; i++) {
      starList.push({
        id: i,
        top: `${(Math.sin(i * 997) * 0.5 + 0.5) * 100}%`,
        left: `${(Math.cos(i * 733) * 0.5 + 0.5) * 100}%`,
        color: colors[i % colors.length],
        size: i % 7 === 0 ? 6 : 4,
        animDuration: `${1.2 + (i % 5) * 0.4}s`,
        animDelay: `${(i % 10) * 0.2}s`,
        animSteps: 2 + (i % 3),
      });
    }
    return starList;
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `2px 2px 0 #000`,
            animation: `pixel-star-twinkle ${star.animDuration} steps(${star.animSteps}) infinite`,
            animationDelay: star.animDelay,
          }}
        />
      ))}
      <style>{`
        @keyframes pixel-star-twinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
