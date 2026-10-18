import React, { useState } from 'react';
import BranchedMenu from '../reactbits/BranchedMenu';
import PixelSprite from '../pixel/PixelSprite';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';

export default function Navigation({ activeSection, onNavigate, onReplayIntro }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const menuItems = [
    {
      label: 'Start',
      children: [
        {
          value: 'hero',
          label: 'Home',
          icon: <PixelSprite name="robot" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'about',
          label: 'About',
          icon: <PixelSprite name="user" scale={1.2} color="var(--px-ink)" />,
        },
      ],
    },
    {
      label: 'Journey',
      children: [
        {
          value: 'experience',
          label: 'Experience',
          icon: <PixelSprite name="briefcase" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'research',
          label: 'Research',
          icon: <PixelSprite name="flask" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      label: 'Build',
      children: [
        {
          value: 'projects',
          label: 'Projects',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-accent)" />,
        },
        {
          value: 'skills',
          label: 'Skills',
          icon: <PixelSprite name="code" scale={1.2} color="var(--px-mint)" />,
        },
        {
          value: 'arcade',
          label: 'Arcade',
          icon: <PixelSprite name="cartridge" scale={1.2} color="var(--px-gold)" />,
        },
      ],
    },
    {
      label: 'Records',
      children: [
        {
          value: 'education',
          label: 'Education',
          icon: <PixelSprite name="star" scale={1.2} color="var(--px-gold)" />,
        },
        {
          value: 'certifications',
          label: 'Certifications',
          icon: <PixelSprite name="trophy" scale={1.2} color="var(--px-mint)" />,
        },
      ],
    },
    {
      value: 'contact',
      label: 'Connect',
      icon: <PixelSprite name="mail" scale={1.2} color="var(--px-accent)" />,
    },
  ];

  const handleSelect = (value) => {
    onNavigate(value);
    setMobileDrawerOpen(false);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 1. MOBILE TOP STICKY SYSTEM BAR (< lg screens)           */}
      {/* ======================================================== */}
      <header className="lg:hidden sticky top-0 z-40 bg-[var(--px-bg)]/95 backdrop-blur-sm border-b-2 border-[var(--px-line)] select-none">
        {/* Tier 1: System Title, Player ID, Tree Toggle & Reboot */}
        <div className="px-3 py-2 flex items-center justify-between border-b border-[var(--px-line)]">
          <div className="flex items-center gap-2 min-w-0">
            <PixelSprite name="robot" scale={1.3} />
            <div className="min-w-0">
              <span className="font-['Press_Start_2P'] text-[9px] text-[var(--px-ink)] block truncate">
                NAV_SYSTEM.SYS
              </span>
              <span className="font-['Silkscreen'] text-[8px] text-[var(--px-mint)] font-bold block">
                PLAYER 01 // READY
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-none">
            {/* Quick Tree Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(prev => !prev)}
              className="px-2 py-1 bg-[var(--px-panel-2)] border border-[var(--px-line)] text-[8px] font-['Press_Start_2P'] text-[var(--px-gold)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] flex items-center gap-1 active:translate-y-0.5 cursor-pointer pixel-corners-sm"
              aria-label="Toggle directory tree menu"
            >
              <span>TREE</span>
              <span className="text-[10px]">{mobileDrawerOpen ? '▲' : '▼'}</span>
            </button>

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="px-2 py-1 bg-[var(--px-panel-2)] border border-[var(--px-line)] text-[8px] font-['Silkscreen'] text-[var(--px-muted)] hover:text-[var(--px-gold)] active:translate-y-0.5 cursor-pointer pixel-corners-sm"
                title="Replay intro boot sequence"
              >
                REBOOT
              </button>
            )}
          </div>
        </div>

        {/* Tier 2: Sticky Horizontal Directory Navbar (ALREADY OPENED AT ALL TIMES) */}
        <nav
          aria-label="Mobile Section Directory"
          className="px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar"
        >
          <span className="font-['Press_Start_2P'] text-[8px] text-[var(--px-gold)] flex-none pl-1 pr-0.5">
            DIR:
          </span>
          {menuItems
            .flatMap(cat => (cat.children ? cat.children : [cat]))
            .map(item => {
              const isActive = activeSection === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleSelect(item.value)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-['Press_Start_2P'] border whitespace-nowrap cursor-pointer transition-none ${
                    isActive
                      ? 'bg-[var(--px-mint)] text-black border-[var(--px-mint)] font-bold'
                      : 'bg-[var(--px-panel)] text-[var(--px-muted)] border-[var(--px-line)] hover:text-[var(--px-ink)] hover:border-[var(--px-mint)]'
                  } pixel-corners-sm`}
                >
                  <span>{item.label.toUpperCase()}</span>
                </button>
              );
            })}
        </nav>
      </header>

      {/* ======================================================== */}
      {/* 2. MOBILE INLINE NAV_SYSTEM.SYS WINDOW (Top of Page)     */}
      {/* Rendered at top of mobile feed, ALREADY OPENED ON LOAD   */}
      {/* ======================================================== */}
      <div className="lg:hidden w-full max-w-sm mx-auto pt-4 px-3 select-none">
        <PixelBox
          variant="panel"
          title="NAV_SYSTEM.SYS"
          tag="PLAYER 01"
          className="w-full flex flex-col pixel-shadow-sm"
          bodyClassName="p-3 flex flex-col gap-2.5"
        >
          {/* Identity Card */}
          <div className="p-2.5 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm">
            <div className="flex items-center gap-2.5 mb-1.5">
              <PixelSprite name="robot" scale={1.5} />
              <div className="min-w-0">
                <h1 className="font-['Press_Start_2P'] text-[11px] text-[var(--px-ink)] tracking-wider truncate">
                  RASAL M.
                </h1>
                <span className="font-['Silkscreen'] text-[9px] text-[var(--px-mint)] font-bold">
                  PLAYER 01 // EXPLORER
                </span>
              </div>
            </div>
            <div className="mt-1 text-xs font-['VT323'] text-[var(--px-muted)] border-t border-[var(--px-line)] pt-1.5 flex justify-between">
              <span>LVL: B.TECH 2024-28</span>
              <span className="text-[var(--px-gold)] font-bold">CGPA 9.48 / 10</span>
            </div>
          </div>

          {/* Directory Tree - ALREADY OPENED EVERY TIME */}
          <div className="w-full flex justify-center py-1 bg-[var(--px-bg)]/40 border border-[var(--px-line)] pixel-corners-sm">
            <BranchedMenu
              items={menuItems}
              active={activeSection}
              defaultOpen={[0, 1, 2, 3]}
              alwaysOpen={true}
              onSelect={handleSelect}
              color="#f4efe6"
              accentColor="#5cffc8"
              lineColor="#3b2f66"
              radius={0}
              lineWidth={2}
              rowHeight={32}
              indent={36}
              fontSize={12}
              width={240}
              drawDuration={260}
              foldDuration={200}
              className="font-['Silkscreen']"
            />
          </div>

          {/* Status & Reboot Action */}
          <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[10px] font-['Silkscreen'] px-1">
            <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
              <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
              <span>SYSTEM READY // ALL DIRECTORIES MOUNTED</span>
            </div>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="text-[var(--px-gold)] hover:text-[var(--px-mint)] px-2 py-0.5 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer text-[9px] active:translate-y-0.5"
              >
                REBOOT
              </button>
            )}
          </div>
        </PixelBox>
      </div>

      {/* ======================================================== */}
      {/* 3. MOBILE MODAL DRAWER (Opened via [TREE] in sticky bar) */}
      {/* ======================================================== */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 bg-black/85 p-4 flex flex-col items-center justify-center overflow-y-auto"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <PixelBox
              variant="panel"
              title="NAV_SYSTEM.SYS"
              className="w-full flex flex-col pixel-shadow-lg"
              bodyClassName="p-3 flex flex-col gap-2.5 bg-[var(--px-panel)]"
            >
              {/* Header / Identity Card */}
              <div className="p-2.5 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2.5">
                    <PixelSprite name="robot" scale={1.5} />
                    <div className="min-w-0">
                      <h2 className="font-['Press_Start_2P'] text-[11px] text-[var(--px-ink)] tracking-wider">
                        RASAL M.
                      </h2>
                      <span className="font-['Silkscreen'] text-[9px] text-[var(--px-mint)] font-bold">
                        PLAYER 01
                      </span>
                    </div>
                  </div>
                  <PixelButton
                    size="sm"
                    variant="secondary"
                    onClick={() => setMobileDrawerOpen(false)}
                    ariaLabel="Close navigation drawer"
                    icon={<PixelSprite name="close" scale={1.2} />}
                  >
                    CLOSE
                  </PixelButton>
                </div>
                <div className="mt-1.5 text-xs font-['VT323'] text-[var(--px-muted)] border-t border-[var(--px-line)] pt-1.5 flex justify-between">
                  <span>LVL: B.TECH 2024-28</span>
                  <span className="text-[var(--px-gold)] font-bold">CGPA 9.48 / 10</span>
                </div>
              </div>

              {/* Tree Menu with all branches always open */}
              <div className="w-full flex justify-center py-1">
                <BranchedMenu
                  items={menuItems}
                  active={activeSection}
                  defaultOpen={[0, 1, 2, 3]}
                  alwaysOpen={true}
                  onSelect={handleSelect}
                  color="#f4efe6"
                  accentColor="#5cffc8"
                  lineColor="#3b2f66"
                  radius={0}
                  lineWidth={2}
                  rowHeight={34}
                  indent={36}
                  fontSize={12}
                  width={240}
                  drawDuration={260}
                  foldDuration={200}
                  className="font-['Silkscreen']"
                />
              </div>

              {/* Status & Reboot Action */}
              <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[10px] font-['Silkscreen'] px-1">
                <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
                  <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
                  <span>ALL DIRECTORIES MOUNTED</span>
                </div>
                {onReplayIntro && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      onReplayIntro();
                    }}
                    className="text-[var(--px-gold)] hover:text-[var(--px-mint)] px-2 py-0.5 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer text-[9px]"
                  >
                    REBOOT
                  </button>
                )}
              </div>
            </PixelBox>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. DESKTOP FLOATING COMPACT RAIL (>= lg screens)         */}
      {/* ======================================================== */}
      <aside className="hidden lg:flex fixed top-4 left-4 z-40 w-52 flex-col select-none">
        <PixelBox
          variant="panel"
          title="NAV_SYSTEM.SYS"
          className="w-full max-h-[calc(100vh-2rem)] flex flex-col pixel-shadow-sm"
          bodyClassName="p-2.5 flex flex-col gap-2 overflow-y-auto"
        >
          {/* Identity Card */}
          <div className="p-2 bg-[var(--px-panel-2)] border-2 border-[var(--px-line)] pixel-corners-sm">
            <div className="flex items-center gap-2.5 mb-1">
              <PixelSprite name="robot" scale={1.4} />
              <div className="min-w-0">
                <h1 className="font-['Press_Start_2P'] text-[10px] text-[var(--px-ink)] tracking-wider truncate">
                  RASAL M.
                </h1>
                <span className="font-['Silkscreen'] text-[8px] text-[var(--px-mint)] font-bold">
                  PLAYER 01
                </span>
              </div>
            </div>
            <div className="mt-1 text-[10px] font-['VT323'] text-[var(--px-muted)] border-t border-[var(--px-line)] pt-1 flex justify-between">
              <span>LVL: 2024-28</span>
              <span className="text-[var(--px-gold)]">CGPA 9.48</span>
            </div>
          </div>

          {/* Tree Menu with all directories always open */}
          <div className="w-full flex justify-center py-0.5">
            <BranchedMenu
              items={menuItems}
              active={activeSection}
              defaultOpen={[0, 1, 2, 3]}
              alwaysOpen={true}
              onSelect={onNavigate}
              color="#f4efe6"
              accentColor="#5cffc8"
              lineColor="#3b2f66"
              radius={0}
              lineWidth={2}
              rowHeight={30}
              indent={32}
              fontSize={11}
              width={176}
              drawDuration={260}
              foldDuration={200}
              className="font-['Silkscreen']"
            />
          </div>

          {/* Quick Status Badge & Reboot Action */}
          <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[9px] font-['Silkscreen'] px-0.5">
            <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
              <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
              <span>READY</span>
            </div>
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="text-[var(--px-gold)] hover:text-[var(--px-mint)] hover:border-[var(--px-mint)] transition-colors px-1.5 py-0.5 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer select-none active:translate-y-0.5"
                title="Replay intro boot sequence"
              >
                REBOOT
              </button>
            )}
          </div>
        </PixelBox>
      </aside>
    </>
  );
}
