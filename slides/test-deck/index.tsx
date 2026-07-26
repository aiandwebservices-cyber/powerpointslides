import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#0b0713', text: '#f7f5ff', accent: '#a855f7' },
  fonts: {
    display: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    body: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  },
  typeScale: { hero: 200, body: 40 },
  radius: 24,
};

// Extra colors outside the DesignSystem shape stay as plain consts.
const muted = '#b7a9d6';
const glowA = 'rgba(168, 85, 247, 0.45)'; // violet
const glowB = 'rgba(56, 89, 255, 0.40)'; // indigo
const glowC = 'rgba(236, 72, 153, 0.32)'; // fuchsia

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  color: 'var(--osd-text)',
  position: 'relative',
  overflow: 'hidden',
} as const;

// Decorative gradient backdrop. Two radial glows over the base bg;
// each page positions them differently so the pages feel related but distinct.
const Backdrop = ({ a, b }: { a: string; b: string }) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(circle at ${a}, ${glowA}, transparent 42%), radial-gradient(circle at ${b}, ${glowB}, transparent 46%), var(--osd-bg)`,
    }}
  />
);

const eyebrow = {
  fontSize: 26,
  letterSpacing: '0.34em',
  fontWeight: 700,
  color: 'var(--osd-accent)',
  textTransform: 'uppercase',
} as const;

// 1 — Cover
const Cover: Page = () => (
  <div style={{ ...fill }}>
    <Backdrop a="18% 22%" b="88% 84%" />
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <div style={eyebrow}>Test Deck · open-slide</div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 168,
          fontWeight: 900,
          lineHeight: 1.02,
          margin: '36px 0 40px',
          letterSpacing: '-0.03em',
        }}
      >
        Slides, in code.
      </h1>
      <p style={{ fontSize: 44, color: muted, maxWidth: 1200, lineHeight: 1.4, margin: 0 }}>
        One <code style={{ color: 'var(--osd-text)', fontFamily: 'ui-monospace, monospace' }}>index.tsx</code>. Zero PowerPoint.
      </p>
    </div>
  </div>
);

// 2 — Big statement
const OneFile: Page = () => (
  <div style={{ ...fill }}>
    <Backdrop a="82% 20%" b="12% 86%" />
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 160px',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          margin: 0,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(120deg, #ffffff 0%, #c9b8ff 60%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        One file.
      </h2>
      <p style={{ fontSize: 46, color: muted, marginTop: 48, lineHeight: 1.4 }}>
        Every page is just a React component.
      </p>
    </div>
  </div>
);

// 3 — Big number: the fixed canvas
const Canvas: Page = () => (
  <div style={{ ...fill }}>
    <Backdrop a="50% 10%" b="50% 110%" />
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 140px',
      }}
    >
      <div style={{ ...eyebrow, marginBottom: 40 }}>One fixed canvas</div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 210,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
        }}
      >
        <span>1920</span>
        <span style={{ color: 'var(--osd-accent)', fontSize: 140 }}>×</span>
        <span>1080</span>
      </div>
      <p style={{ fontSize: 42, color: muted, marginTop: 48, lineHeight: 1.4 }}>
        Design in real pixels. No guesswork.
      </p>
    </div>
  </div>
);

// 4 — Statement: hot reload
const Live: Page = () => (
  <div style={{ ...fill }}>
    <Backdrop a="16% 84%" b="90% 24%" />
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 160px',
      }}
    >
      <div style={eyebrow}>Instant feedback</div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 176,
          fontWeight: 900,
          margin: '36px 0 0',
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
        }}
      >
        Edit. Save.
        <br />
        <span
          style={{
            background: 'linear-gradient(120deg, #a855f7 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          It's live.
        </span>
      </h2>
    </div>
  </div>
);

// 5 — Closing / CTA
const Closing: Page = () => (
  <div style={{ ...fill }}>
    <Backdrop a="50% 120%" b="50% -10%" />
    <div
      style={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 160px',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 120,
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}
      >
        Now make your own.
      </h2>
      <div
        style={{
          marginTop: 64,
          padding: '28px 56px',
          borderRadius: 'var(--osd-radius)',
          border: '1px solid rgba(168, 85, 247, 0.5)',
          background: 'rgba(168, 85, 247, 0.12)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 48,
          fontWeight: 600,
        }}
      >
        <span style={{ color: 'var(--osd-accent)' }}>$</span> npm run dev
      </div>
    </div>
  </div>
);

// Subtle motion — the "Rise" house transition (6px Y + opacity), Cover uses "Settle".
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

Cover.transition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

export const meta: SlideMeta = {
  title: 'Test Deck',
  createdAt: '2026-07-26T18:52:24.454Z',
};

export default [Cover, OneFile, Canvas, Live, Closing] satisfies Page[];
