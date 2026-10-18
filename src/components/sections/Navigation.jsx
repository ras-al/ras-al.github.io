import React, { useState } from 'react';
import BranchedMenu from '../reactbits/BranchedMenu';
import PixelSprite from '../pixel/PixelSprite';
import PixelBox from '../pixel/PixelBox';
import PixelButton from '../pixel/PixelButton';

export default function Navigation({ activeSection, onNavigate, onReplayIntro }) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Sticky Desktop-Style Header */}
      <header className="lg:hidden sticky top-0 left-0 right-0 z-40 bg-[var(--px-panel)] border-b-2 border-[var(--px-line)] px-3 py-2 flex items-center justify-between pixel-shadow-sm select-none">
        <div className="flex items-center gap-2.5">
          <PixelSprite name="robot" scale={1.5} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Press_Start_2P'] text-[10px] text-[var(--px-ink)]">
                RASAL M.
              </span>
              <span className="font-['Silkscreen'] text-[8px] text-[var(--px-mint)] font-bold px-1 bg-[var(--px-panel-2)] border border-[var(--px-line)]">
                PLAYER 01
              </span>
            </div>
            <div className="text-[9px] font-['VT323'] text-[var(--px-muted)] flex items-center gap-2 mt-0.5">
              <span>LVL: 2024-28</span>
              <span className="text-[var(--px-gold)] font-bold">CGPA 9.48</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <PixelButton
            size="sm"
            variant={mobileOpen ? 'mint' : 'secondary'}
            onClick={() => setMobileOpen(!mobileOpen)}
            ariaLabel={mobileOpen ? 'Close System Tree' : 'Open System Tree'}
            className="text-[8px] font-['Press_Start_2P'] px-2 py-1"
          >
            {mobileOpen ? 'TREE ▲' : 'TREE ▼'}
          </PixelButton>

          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="text-[var(--px-gold)] hover:text-[var(--px-mint)] text-[9px] font-['Silkscreen'] px-1.5 py-1 border border-[var(--px-line)] bg-[var(--px-panel-2)] cursor-pointer pixel-corners-sm select-none"
              title="Replay intro boot sequence"
            >
              REBOOT
            </button>
          )}
        </div>
      </header>

      {/* Mobile Sub-Header Directory Bar: Horizontally scrollable, always open & visible */}
      <nav
        aria-label="Mobile Directory Navigation"
        className="lg:hidden sticky top-[53px] z-30 bg-[var(--px-bg)]/98 border-b-2 border-[var(--px-line)] px-2 py-1.5 flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar"
      >
        <span className="font-['Press_Start_2P'] text-[8px] text-[var(--px-gold)] flex-none pl-1 pr-1">
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

      {/* Mobile Drawer Overlay: Exact Desktop NAV_SYSTEM.SYS Window */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 bg-black/85 p-4 flex flex-col items-center justify-center overflow-y-auto"
          onClick={() => setMobileOpen(false)}
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
                      <h1 className="font-['Press_Start_2P'] text-[11px] text-[var(--px-ink)] tracking-wider">
                        RASAL M.
                      </h1>
                      <span className="font-['Silkscreen'] text-[9px] text-[var(--px-mint)] font-bold">
                        PLAYER 01
                      </span>
                    </div>
                  </div>
                  <PixelButton
                    size="sm"
                    variant="secondary"
                    onClick={() => setMobileOpen(false)}
                    ariaLabel="Close"
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

              {/* Quick Status Badge & Reboot Action */}
              <div className="pt-2 border-t-2 border-[var(--px-line)] flex items-center justify-between text-[10px] font-['Silkscreen'] px-1">
                <div className="flex items-center gap-1.5 text-[var(--px-mint)]">
                  <span className="w-1.5 h-1.5 bg-[var(--px-mint)] pixel-blink inline-block" />
                  <span>SYSTEM READY // ALL DIRECTORIES MOUNTED</span>
                </div>
                {onReplayIntro && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
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

      {/* Desktop Floating Compact Rail */}
      <aside className="hidden lg:flex fixed top-4 left-4 z-40 w-52 flex-col select-none">
        <PixelBox
          variant="panel"
          title="NAV_SYSTEM.SYS"
          className="w-full max-h-[calc(100vh-2rem)] flex flex-col pixel-shadow-sm"
          bodyClassName="p-2.5 flex flex-col gap-2 overflow-y-auto"
        >
          {/* Header / Identity Card */}
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

          {/* Tree Menu */}
          <div className="w-full flex justify-center py-0.5">
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
