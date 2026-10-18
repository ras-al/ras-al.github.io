import { useState, useEffect } from 'react';

/**
 * Performance tier hook for responsive performance scaling.
 * Returns 'low' | 'medium' | 'high'.
 * Allows manual override via query param: ?quality=low|medium|high
 */
export function getInitialQuality() {
  if (typeof window === 'undefined') return 'medium';

  // 1. URL Query Override
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('quality');
    if (q === 'low' || q === 'medium' || q === 'high') {
      return q;
    }
  } catch {
    // Ignore URL parse error
  }

  // 2. Reduced motion preference -> low tier
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }

  // 3. Network Save-Data mode -> low tier
  if (navigator.connection && navigator.connection.saveData) {
    return 'low';
  }

  // 4. Hardware indicators
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4; // in GB
  const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const width = window.innerWidth;

  // Extremely constrained devices (budget phones, <= 2GB RAM, <= 4 cores, tiny screen)
  if (memory <= 2 || cores <= 2 || (isTouch && width < 380 && memory <= 4)) {
    return 'low';
  }

  // Mid-tier devices (most phones, tablets, or mid-range machines)
  if (isTouch || memory <= 4 || cores <= 6 || width < 1024) {
    return 'medium';
  }

  // High-performance desktop
  return 'high';
}

export function useQuality() {
  const [quality, setQuality] = useState(getInitialQuality);

  useEffect(() => {
    // Listen for quality changes if URL changes or on popstate
    const handleLocationChange = () => {
      setQuality(getInitialQuality());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return quality;
}
