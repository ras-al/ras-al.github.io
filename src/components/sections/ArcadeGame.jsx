import React, { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';
import PixelSprite from '../pixel/PixelSprite';
import { retroAudio } from '../../utils/audio';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;

const BUG_TYPES = [
  { name: 'NULL_PTR', color: '#ff4f6d', points: 100, hp: 1, speed: 1.1, size: 16 },
  { name: 'MEM_LEAK', color: '#ffd36e', points: 150, hp: 1, speed: 1.4, size: 14 },
  { name: 'SEGFAULT', color: '#a855f7', points: 250, hp: 2, speed: 0.9, size: 20 },
];

export default function ArcadeGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('pixel_arcade_high_score') || '0', 10);
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [soundMuted, setSoundMuted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Mutable game state held in ref for 60fps RAF loop
  const engineRef = useRef({
    player: { x: CANVAS_WIDTH / 2 - 12, y: CANVAS_HEIGHT - 32, w: 24, h: 20, speed: 6 },
    keys: { left: false, right: false, fire: false },
    lasers: [],
    bugs: [],
    particles: [],
    floatingTexts: [],
    lastSpawn: 0,
    spawnInterval: 1400,
    lastFire: 0,
    score: 0,
    lives: 3,
    wave: 1,
    bugsDefeated: 0,
  });

  const toggleSound = () => {
    const isMuted = retroAudio.toggleMute();
    setSoundMuted(isMuted);
  };

  const spawnBug = (now) => {
    const engine = engineRef.current;
    const type = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const x = Math.floor(Math.random() * (CANVAS_WIDTH - type.size - 24)) + 12;
    const waveSpeedMultiplier = 1 + (engine.wave - 1) * 0.12;

    engine.bugs.push({
      ...type,
      x,
      y: -type.size,
      currentHp: type.hp,
      vy: type.speed * waveSpeedMultiplier,
    });
    engine.lastSpawn = now;
  };

  const fireLaser = useCallback(() => {
    const engine = engineRef.current;
    const now = performance.now();
    if (now - engine.lastFire < 220) return; // Fire rate limit

    engine.lasers.push({
      x: engine.player.x + engine.player.w / 2 - 2,
      y: engine.player.y - 6,
      w: 4,
      h: 10,
      vy: -8,
    });
    engine.lastFire = now;
    retroAudio.play('laser');
  }, []);

  const createExplosion = (x, y, color) => {
    const engine = engineRef.current;
    retroAudio.play('explosion');
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() * 0.5 - 0.25);
      const speed = Math.random() * 3 + 1.5;
      engine.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        size: Math.random() > 0.5 ? 3 : 2,
        life: 24,
        maxLife: 24,
      });
    }
  };

  const startGame = () => {
    const engine = engineRef.current;
    engine.player.x = CANVAS_WIDTH / 2 - 12;
    engine.lasers = [];
    engine.bugs = [];
    engine.particles = [];
    engine.floatingTexts = [];
    engine.score = 0;
    engine.lives = 3;
    engine.wave = 1;
    engine.bugsDefeated = 0;
    engine.spawnInterval = 1400;
    engine.lastSpawn = performance.now();

    setScore(0);
    setLives(3);
    setWave(1);
    setGameState('playing');
    retroAudio.play('start');
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      const engine = engineRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        engine.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        engine.keys.right = true;
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (gameState === 'playing') {
          e.preventDefault();
          fireLaser();
        } else if (gameState === 'idle' || gameState === 'gameover') {
          e.preventDefault();
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      const engine = engineRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        engine.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        engine.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, fireLaser]);

  // Main 60 FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let animId;

    const loop = (timestamp) => {
      const engine = engineRef.current;

      // Clear Canvas with pure retro black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Retro Grid Lines in Background
      ctx.strokeStyle = '#120e24';
      ctx.lineWidth = 1;
      for (let x = 0; x < CANVAS_WIDTH; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < CANVAS_HEIGHT; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      // Defense boundary baseline
      ctx.strokeStyle = '#2a1f4a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT - 16);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 16);
      ctx.stroke();

      if (gameState === 'playing') {
        // 1. Move Player
        if (engine.keys.left) {
          engine.player.x = Math.max(8, engine.player.x - engine.player.speed);
        }
        if (engine.keys.right) {
          engine.player.x = Math.min(CANVAS_WIDTH - engine.player.w - 8, engine.player.x + engine.player.speed);
        }

        // 2. Spawn Bugs
        if (timestamp - engine.lastSpawn > engine.spawnInterval) {
          spawnBug(timestamp);
        }

        // 3. Update & Draw Lasers
        for (let i = engine.lasers.length - 1; i >= 0; i--) {
          const laser = engine.lasers[i];
          laser.y += laser.vy;

          // Draw laser bolt
          ctx.fillStyle = '#5cffc8';
          ctx.fillRect(laser.x, laser.y, laser.w, laser.h);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(laser.x + 1, laser.y + 2, 2, laser.h - 4);

          // Out of bounds
          if (laser.y < -10) {
            engine.lasers.splice(i, 1);
          }
        }

        // 4. Update & Draw Bugs
        for (let i = engine.bugs.length - 1; i >= 0; i--) {
          const bug = engine.bugs[i];
          bug.y += bug.vy;

          // Collision with lasers
          let bugHit = false;
          for (let j = engine.lasers.length - 1; j >= 0; j--) {
            const laser = engine.lasers[j];
            if (
              laser.x < bug.x + bug.size &&
              laser.x + laser.w > bug.x &&
              laser.y < bug.y + bug.size &&
              laser.y + laser.h > bug.y
            ) {
              // Hit!
              engine.lasers.splice(j, 1);
              bug.currentHp--;
              if (bug.currentHp <= 0) {
                bugHit = true;
                createExplosion(bug.x + bug.size / 2, bug.y + bug.size / 2, bug.color);

                // Add points
                engine.score += bug.points;
                engine.bugsDefeated++;
                setScore(engine.score);

                // Floating text score
                engine.floatingTexts.push({
                  text: `+${bug.points}`,
                  x: bug.x,
                  y: bug.y,
                  color: bug.color,
                  life: 25,
                });

                // Update high score
                if (engine.score > highScore) {
                  setHighScore(engine.score);
                  try {
                    localStorage.setItem('pixel_arcade_high_score', engine.score.toString());
                  } catch {
                    // Ignore storage errors
                  }
                }

                // Check wave progression
                if (engine.bugsDefeated % 10 === 0) {
                  engine.wave++;
                  setWave(engine.wave);
                  engine.spawnInterval = Math.max(650, 1400 - engine.wave * 120);
                  retroAudio.play('coin');
                }
                break;
              } else {
                retroAudio.play('blip');
              }
            }
          }

          if (bugHit) {
            engine.bugs.splice(i, 1);
            continue;
          }

          // Bug reached bottom defense line
          if (bug.y > CANVAS_HEIGHT - 28) {
            engine.bugs.splice(i, 1);
            createExplosion(bug.x + bug.size / 2, CANVAS_HEIGHT - 20, '#ff4f6d');
            engine.lives--;
            setLives(engine.lives);
            retroAudio.play('hit');

            if (engine.lives <= 0) {
              setGameState('gameover');
              retroAudio.play('gameover');
              break;
            }
            continue;
          }

          // Draw Bug Pixel Art on Canvas
          ctx.fillStyle = bug.color;
          const s = bug.size;
          // Body
          ctx.fillRect(bug.x + 2, bug.y + 4, s - 4, s - 6);
          // Legs
          ctx.fillRect(bug.x, bug.y + 2, 2, 3);
          ctx.fillRect(bug.x, bug.y + s - 5, 2, 3);
          ctx.fillRect(bug.x + s - 2, bug.y + 2, 2, 3);
          ctx.fillRect(bug.x + s - 2, bug.y + s - 5, 2, 3);
          // Antennae
          ctx.fillRect(bug.x + 3, bug.y, 2, 3);
          ctx.fillRect(bug.x + s - 5, bug.y, 2, 3);
          // Eyes
          ctx.fillStyle = '#000000';
          ctx.fillRect(bug.x + 4, bug.y + 6, 2, 2);
          ctx.fillRect(bug.x + s - 6, bug.y + 6, 2, 2);
        }

        // 5. Update & Draw Particles
        for (let i = engine.particles.length - 1; i >= 0; i--) {
          const p = engine.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life--;

          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);

          if (p.life <= 0) {
            engine.particles.splice(i, 1);
          }
        }

        // 6. Floating Score Texts
        for (let i = engine.floatingTexts.length - 1; i >= 0; i--) {
          const ft = engine.floatingTexts[i];
          ft.y -= 0.8;
          ft.life--;

          ctx.font = '10px "Press Start 2P", monospace';
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);

          if (ft.life <= 0) {
            engine.floatingTexts.splice(i, 1);
          }
        }

        // 7. Draw Player Cannon (PATROL_BOT)
        const px = engine.player.x;
        const py = engine.player.y;
        // Base treads
        ctx.fillStyle = '#3b2f66';
        ctx.fillRect(px, py + 12, 24, 8);
        ctx.fillStyle = '#5cffc8';
        ctx.fillRect(px + 4, py + 14, 4, 4);
        ctx.fillRect(px + 16, py + 14, 4, 4);
        // Turret body
        ctx.fillStyle = '#5cffc8';
        ctx.fillRect(px + 4, py + 4, 16, 8);
        ctx.fillStyle = '#ffd36e';
        ctx.fillRect(px + 8, py + 6, 8, 4);
        // Cannon barrel
        ctx.fillStyle = '#f4efe6';
        ctx.fillRect(px + 10, py - 4, 4, 8);
      }

      // Draw Retro HUD directly on canvas edges
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillStyle = '#5cffc8';
      ctx.fillText(`SCORE: ${engine.score.toString().padStart(5, '0')}`, 12, 18);

      ctx.fillStyle = '#ffd36e';
      ctx.fillText(`HIGH: ${highScore.toString().padStart(5, '0')}`, 180, 18);

      ctx.fillStyle = '#a855f7';
      ctx.fillText(`WAVE: ${engine.wave}`, 360, 18);

      // Lives Display
      ctx.fillStyle = '#ff4f6d';
      for (let i = 0; i < engine.lives; i++) {
        ctx.fillRect(CANVAS_WIDTH - 24 - i * 16, 26, 10, 8);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, fireLaser, isVisible]);

  return (
    <section id="arcade" ref={containerRef} className="py-20 border-b-4 border-[var(--px-line)]">
      <SectionHeader
        level="BONUS STAGE"
        title="PIXEL BUG HUNTER"
        subtitle="ARCADE CABINET // SQUASH RUNTIME BUGS WITH THE PATROL CANNON"
        sprite="cartridge"
      />

      <div className="w-full max-w-3xl mx-auto">
        <PixelBox
          variant="panel"
          title="DEBUGGER_1984.ROM"
          icon={<PixelSprite name="cartridge" scale={1.2} color="var(--px-accent)" />}
          className="pixel-shadow-lg"
          bodyClassName="p-4 flex flex-col items-center bg-[#05030a]"
        >
          {/* Arcade Cabinet Marquee Header */}
          <div className="w-full flex items-center justify-between pb-3 mb-3 border-b-2 border-[var(--px-line)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[var(--px-mint)] pixel-blink" />
              <span className="font-['Press_Start_2P'] text-[10px] text-[var(--px-mint)]">
                1P READY // INSERT COIN
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleSound}
                className="font-['Silkscreen'] text-[10px] px-2 py-0.5 border border-[var(--px-line)] text-[var(--px-muted)] hover:text-[var(--px-ink)] hover:border-[var(--px-mint)] cursor-pointer transition-colors"
                title={soundMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                SFX: {soundMuted ? 'OFF' : 'ON'}
              </button>
              <span className="font-['Silkscreen'] text-[10px] text-[var(--px-gold)]">
                WAVE {wave}
              </span>
            </div>
          </div>

          {/* CRT Canvas Screen Container */}
          <div className="relative w-full aspect-[480/320] max-w-[640px] border-4 border-[var(--px-line)] bg-black overflow-hidden pixel-shadow-sm select-none">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              onClick={gameState === 'playing' ? fireLaser : startGame}
              className="w-full h-full block cursor-crosshair"
            />

            {/* Start Overlay */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="mb-3 animate-bounce">
                  <PixelSprite name="cartridge" scale={3} color="var(--px-mint)" />
                </div>
                <h3 className="font-['Press_Start_2P'] text-sm sm:text-base text-[var(--px-mint)] mb-2">
                  PIXEL BUG HUNTER
                </h3>
                <p className="font-['VT323'] text-lg text-[var(--px-ink)] max-w-sm mb-5 leading-snug">
                  Software bugs are attacking the production server! Defend the codebase with your debug cannon.
                </p>

                <PixelButton
                  variant="mint"
                  size="md"
                  onClick={startGame}
                  className="pixel-blink"
                  icon={<PixelSprite name="star" scale={1.2} color="#0f0b1e" />}
                >
                  START GAME
                </PixelButton>

                <span className="font-['Silkscreen'] text-[9px] text-[var(--px-muted)] mt-4">
                  [ PRESS SPACE OR CLICK BUTTON TO PLAY ]
                </span>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
                <span className="font-['Press_Start_2P'] text-base sm:text-lg text-[var(--px-alert,#ff4f6d)] mb-2 pixel-blink">
                  GAME OVER
                </span>

                <div className="p-3 my-3 bg-[var(--px-panel)] border-2 border-[var(--px-line)] pixel-corners-sm">
                  <div className="font-['Press_Start_2P'] text-xs text-[var(--px-ink)] mb-1">
                    FINAL SCORE: <span className="text-[var(--px-mint)]">{score}</span>
                  </div>
                  <div className="font-['Silkscreen'] text-[10px] text-[var(--px-gold)]">
                    BEST RECORD: {highScore}
                  </div>
                </div>

                <div className="mt-2">
                  <PixelButton
                    variant="mint"
                    size="md"
                    onClick={startGame}
                    className="pixel-blink"
                    icon={<PixelSprite name="star" scale={1.2} color="#0f0b1e" />}
                  >
                    PLAY AGAIN
                  </PixelButton>
                </div>
              </div>
            )}
          </div>

          {/* On-Screen Mobile Arcade Controls & Desktop Hints */}
          <div className="w-full mt-4 pt-3 border-t-2 border-[var(--px-line)] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Desktop Keyboard Helper */}
            <div className="text-[10px] font-['Silkscreen'] text-[var(--px-muted)] text-center sm:text-left">
              <span>KEYS: </span>
              <span className="text-[var(--px-ink)]">[A / D / ◄ / ►]</span> MOVE &bull;{' '}
              <span className="text-[var(--px-mint)]">[SPACE / CLICK]</span> FIRE
            </div>

            {/* Mobile Touch Buttons */}
            <div className="flex items-center gap-2 select-none w-full sm:w-auto justify-center">
              <button
                type="button"
                onPointerDown={() => {
                  engineRef.current.keys.left = true;
                }}
                onPointerUp={() => {
                  engineRef.current.keys.left = false;
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] text-[var(--px-ink)] active:bg-[var(--px-mint)] active:text-black font-['Press_Start_2P'] text-xs cursor-pointer pixel-corners-sm text-center"
              >
                ◀
              </button>

              <button
                type="button"
                onPointerDown={() => {
                  engineRef.current.keys.right = true;
                }}
                onPointerUp={() => {
                  engineRef.current.keys.right = false;
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[var(--px-panel)] border-2 border-[var(--px-line)] text-[var(--px-ink)] active:bg-[var(--px-mint)] active:text-black font-['Press_Start_2P'] text-xs cursor-pointer pixel-corners-sm text-center"
              >
                ▶
              </button>

              <button
                type="button"
                onClick={() => {
                  if (gameState === 'playing') {
                    fireLaser();
                  } else {
                    startGame();
                  }
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[var(--px-mint)] text-black border-2 border-[var(--px-line)] active:scale-95 font-['Press_Start_2P'] text-xs font-bold cursor-pointer pixel-corners-sm text-center"
              >
                FIRE
              </button>
            </div>
          </div>
        </PixelBox>
      </div>
    </section>
  );
}
