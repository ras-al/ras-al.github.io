// Web Audio API Retro 8-bit Sound Synthesizer
// Completely offline, zero external audio files, instantaneous

class RetroAudio {
  constructor() {
    this.ctx = null;
    this.listeners = new Set();

    // Determine initial muted state:
    // On mobile / touch devices, default to MUTED until user toggles sound ON
    // Persist in localStorage with try/catch
    const isTouch = typeof window !== 'undefined' && 
      (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 1024);

    let saved = null;
    try {
      saved = localStorage.getItem('pixel_portfolio_sound_enabled');
    } catch {
      // Ignore storage error
    }

    if (saved !== null) {
      this.muted = saved !== 'true';
    } else {
      this.muted = isTouch; // Default off on mobile, on on desktop
    }
  }

  init() {
    if (typeof window === 'undefined') return;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Handle iOS interrupted and state change
        this.ctx.onstatechange = () => {
          if (this.ctx && this.ctx.state === 'interrupted') {
            this.ctx.resume().catch(() => {});
          }
        };
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(!this.muted));
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('pixel_portfolio_sound_enabled', (!this.muted).toString());
    } catch {
      // Ignore storage error
    }
    if (!this.muted) {
      this.init();
      this.play('blip');
    }
    this.notify();
    return this.muted;
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    try {
      localStorage.setItem('pixel_portfolio_sound_enabled', (!this.muted).toString());
    } catch {
      // Ignore
    }
    if (!this.muted) {
      this.init();
    }
    this.notify();
  }

  isMuted() {
    return this.muted;
  }

  play(type) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      if (type === 'start' || type === 'coin') {
        // 8-bit power-up arpeggio: C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.12, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.15);
        });
      } else if (type === 'blip') {
        // High frequency UI blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'laser') {
        // Sci-fi laser blast frequency sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      } else if (type === 'hit' || type === 'explosion') {
        // Crunch explosion noise
        const bufferSize = Math.floor(ctx.sampleRate * 0.16);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        noise.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'purr') {
        // 8-bit cat purr sound (frequency-modulated low warm buzz)
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, now);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(26, now); // 26Hz purr vibration
        lfoGain.gain.setValueAtTime(45, now);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.72);
        osc.stop(now + 0.72);
      } else if (type === 'gameover') {
        // Descending low notes
        const notes = [440, 392, 349, 261];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.14);
          gain.gain.setValueAtTime(0.12, now + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.14);
          osc.stop(now + i * 0.14 + 0.19);
        });
      }
    } catch {
      // Audio playback failed silently
    }
  }
}

export const retroAudio = new RetroAudio();
