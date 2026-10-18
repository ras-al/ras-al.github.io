import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import SectionHeader from '../pixel/SectionHeader';
import PixelBox from '../pixel/PixelBox';
import PixelSprite from '../pixel/PixelSprite';
import PixelChip from '../pixel/PixelChip';
import LazyMount from '../common/LazyMount';
import { useQuality } from '../../utils/quality';
import { retroAudio } from '../../utils/audio';

const FaultyTerminalLazy = lazy(() => import('../reactbits/FaultyTerminal'));

export default function Research() {
  const quality = useQuality();
  const [isTouch, setIsTouch] = useState(false);
  const [terminalError, setTerminalError] = useState(false);
  const terminalWrapperRef = useRef(null);

  useEffect(() => {
    setIsTouch(typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024));
  }, []);

  // Idle auto-glitch trigger for touch devices
  useEffect(() => {
    if (!isTouch || quality === 'low') return;

    const interval = setInterval(() => {
      if (terminalWrapperRef.current) {
        // Dispatch synthetic click to trigger glitch effect
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 2
        });
        terminalWrapperRef.current.querySelector('canvas')?.dispatchEvent(event);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isTouch, quality]);

  const handleTerminalTap = () => {
    retroAudio.play('blip');
  };

  return (
    <section id="research" className="relative py-12 xs:py-16 sm:py-20 border-b-4 border-[var(--px-line)]">
      <div className="relative z-10">
        <SectionHeader
          level="LEVEL 03"
          title="RESEARCH SPOTLIGHT: IIT MADRAS"
          subtitle="3D SCENE RECONSTRUCTION, VISUAL SLAM & GAUSSIAN SPLATTING"
          sprite="flask"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Column A: AGCL Lab Research Details (Ordered FIRST on mobile, SECOND on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col gap-6 w-full">
            <PixelBox
              title="IIT_MADRAS_AGCL_LAB.RESEARCH"
              icon={<PixelSprite name="flask" scale={1.2} />}
              variant="raised"
              goldBorder={true}
              tag="MAY - JUN 2026"
              className="bg-[var(--px-bg)]/92"
              bodyClassName="p-4 sm:p-6"
            >
              <div className="mb-4">
                <span className="font-['Silkscreen'] text-xs text-[var(--px-gold)] uppercase tracking-wider block font-bold">
                  RESEARCH INTERNSHIP
                </span>
                <h3 className="font-['Press_Start_2P'] text-xs xs:text-sm sm:text-base text-[var(--px-ink)] mt-1">
                  Computer Vision &amp; Robotics
                </h3>
                <p className="font-['Silkscreen'] text-xs text-[var(--px-mint)] mt-1">
                  AGCL Lab, Indian Institute of Technology Madras, Chennai
                </p>
              </div>

              <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-4">
                Worked on computer vision, visual SLAM, and 3D scene reconstruction in a research-driven robotics environment. Explored and implemented research frameworks including SplaTAM and MonoGS for vision-based 3D reconstruction and SLAM.
              </p>

              <p className="font-['VT323'] text-xl sm:text-2xl text-[var(--px-ink)] leading-relaxed mb-6">
                Gained practical experience with visual perception, camera-based localization, and reconstruction pipelines for robotic systems.
              </p>

              {/* Lab Telemetry Status Box */}
              <div className="p-3 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm mb-6">
                <div className="flex items-center justify-between text-[10px] font-['Silkscreen'] text-[var(--px-muted)] mb-2 pb-1 border-b border-[var(--px-line)]">
                  <span className="text-[var(--px-gold)]">ACTIVE TELEMETRY FEED</span>
                  <span className="text-[var(--px-mint)]">ONLINE</span>
                </div>
                <div className="font-['VT323'] text-lg text-[var(--px-ink)] flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Target Node:</span>
                    <span className="text-[var(--px-gold)]">AGCL_ROBOTICS_L03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">SLAM Framework:</span>
                    <span className="text-[var(--px-mint)]">SplaTAM + MonoGS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Depth Map Density:</span>
                    <span className="text-[var(--px-mint)]">Dense Point-Cloud</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--px-muted)]">Camera Trajectory:</span>
                    <span className="text-[var(--px-ink)]">6-DoF Pose Est.</span>
                  </div>
                </div>
              </div>

              {/* Pipeline Link Callout */}
              <div className="p-3 xs:p-4 bg-[var(--px-panel)] border-2 border-[var(--px-accent)] pixel-corners-sm">
                <div className="flex items-center gap-2 mb-2">
                  <PixelSprite name="chip" scale={1.2} color="var(--px-accent)" />
                  <span className="font-['Press_Start_2P'] text-[9px] xs:text-[10px] text-[var(--px-accent)] uppercase">
                    CROSS-PROJECT PIPELINE LINK
                  </span>
                </div>
                <p className="font-['VT323'] text-lg sm:text-xl text-[var(--px-ink)] leading-normal">
                  Directly connects with the <strong className="text-[var(--px-mint)]">Autonomous Warehouse Mapping Robot</strong> project: generating synchronized RGB, depth, point-cloud, and odometry datasets to feed into COLMAP and NeRF/Gaussian Splatting-based 3D reconstruction workflows.
                </p>
              </div>
            </PixelBox>
          </div>

          {/* Column B: Dedicated Retro CRT Research Terminal Showcase (Ordered SECOND on mobile, FIRST on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col w-full">
            <div className="pixel-corners border-4 border-[var(--px-line)] bg-[var(--px-panel)] p-3 sm:p-4 pixel-shadow">
              {/* Monitor Top Bezel / Header */}
              <div className="flex flex-wrap items-center justify-between pb-3 mb-3 border-b-2 border-[var(--px-line)] gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[var(--px-mint)] inline-block pixel-blink" />
                  <span className="font-['Press_Start_2P'] text-[10px] sm:text-xs text-[var(--px-mint)]">
                    VISION_SLAM_MONITOR.CRT
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-['Silkscreen'] text-[var(--px-gold)]">
                  <span className="hidden sm:inline">AGCL LAB</span>
                  <span className="px-1.5 py-0.5 bg-[var(--px-panel-2)] border border-[var(--px-line)] text-[var(--px-mint)]">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Research Framework Badges in wrapping row */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3">
                <PixelChip variant="mint" size="sm">
                  SplaTAM
                </PixelChip>
                <PixelChip variant="accent" size="sm">
                  MonoGS
                </PixelChip>
                <PixelChip variant="gold" size="sm">
                  Visual SLAM
                </PixelChip>
                <PixelChip variant="default" size="sm">
                  3D Reconstruction
                </PixelChip>
              </div>

              {/* Terminal container: Aspect ~4:3 on mobile, responsive height */}
              <div
                ref={terminalWrapperRef}
                onClick={handleTerminalTap}
                className="w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[4/3] min-h-[260px] max-h-[500px] relative overflow-hidden pixel-corners border-2 border-[var(--px-line)] bg-black shadow-inner select-none"
                style={{ touchAction: 'pan-y' }}
              >
                <LazyMount
                  rootMargin="150px"
                  minHeight="260px"
                  unmountOnExit={isTouch}
                  className="w-full h-full relative"
                >
                  {quality !== 'low' && !terminalError ? (
                    <Suspense
                      fallback={
                        <StaticPixelTerminalFallback />
                      }
                    >
                      <FaultyTerminalLazy
                        tint="#A7EF9E"
                        glyphs="blocks"
                        scale={isTouch ? 1.2 : 1.5}
                        digitSize={isTouch ? 1.0 : 1.2}
                        timeScale={quality === 'medium' ? 0.3 : 0.5}
                        brightness={0.75}
                        glow={0.5}
                        persistence={0.5}
                        mouseStrength={isTouch ? 0.8 : 0.5}
                        mouseGlow={0.6}
                        curvature={0.1}
                        vignette={0.25}
                        clickEffect="glitch"
                        dpr={quality === 'medium' ? 1.0 : 1.25}
                        onError={() => setTerminalError(true)}
                      />
                    </Suspense>
                  ) : (
                    <StaticPixelTerminalFallback />
                  )}
                </LazyMount>
              </div>

              {/* Monitor Bottom Bezel / Interactive Controls Hint */}
              <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t-2 border-[var(--px-line)] text-[9px] font-['Silkscreen'] text-[var(--px-muted)] gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--px-mint)]">
                    {isTouch ? '⚡ TAP: GLITCH TEAR' : '● HOVER: MOUSE PHOSPHOR'}
                  </span>
                  {!isTouch && (
                    <span className="text-[var(--px-accent)]">⚡ CLICK: GLITCH</span>
                  )}
                </div>
                <div className="text-[var(--px-gold)]">
                  TELEMETRY: ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticPixelTerminalFallback() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050905] text-[#a7ef9e] font-['VT323'] text-lg select-none">
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-['Silkscreen'] text-[#5cffc8] pb-1 border-b border-[#1b381e]">
          <span>IIT_M_AGCL // SLAM_TELEMETRY</span>
          <span className="animate-pulse">STREAM_ACTIVE</span>
        </div>
        <p className="pt-2 text-base leading-snug">&gt; INIT SplaTAM Dense Radiance Field [OK]</p>
        <p className="text-base leading-snug">&gt; MonoGS 6-DoF Pose Tracking: 58.4 Hz</p>
        <p className="text-base leading-snug">&gt; Active Gaussian Splats: 142,800 clusters</p>
        <p className="text-base leading-snug">&gt; Reprojection Residual: 0.014 px RMS</p>
      </div>

      <div className="pt-2 border-t border-[#1b381e] flex items-center justify-between text-xs font-['Silkscreen']">
        <span className="text-[#ffd36e]">&gt; PHOSPHOR MATRIX LOCKED</span>
        <span className="w-2 h-2 bg-[#a7ef9e] pixel-blink" />
      </div>
    </div>
  );
}
