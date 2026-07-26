import type { ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import cinzelVar from './assets/fonts/cinzel-var.woff2';
import cormorantVar from './assets/fonts/cormorant-var.woff2';
import cormorantItalic from './assets/fonts/cormorant-var-italic.woff2';

// ── Self-hosted ecclesial webfonts, injected once at module level ──────────────
const FONT_STYLE_ID = 'osd-webfont-eucharist';
if (typeof document !== 'undefined' && !document.getElementById(FONT_STYLE_ID)) {
  const style = document.createElement('style');
  style.id = FONT_STYLE_ID;
  style.textContent = `
    @font-face { font-family: 'Cinzel'; font-style: normal; font-weight: 400 700;
      font-display: swap; src: url(${cinzelVar}) format('woff2'); }
    @font-face { font-family: 'Cormorant Garamond'; font-style: normal; font-weight: 400 600;
      font-display: swap; src: url(${cormorantVar}) format('woff2'); }
    @font-face { font-family: 'Cormorant Garamond'; font-style: italic; font-weight: 400 600;
      font-display: swap; src: url(${cormorantItalic}) format('woff2'); }
  `;
  document.head.appendChild(style);
}

export const design: DesignSystem = {
  palette: { bg: '#f2ead6', text: '#241a10', accent: '#9c7b33' },
  fonts: {
    display: "'Cinzel', 'Trajan Pro', Georgia, serif",
    body: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
  },
  typeScale: { hero: 116, body: 40 },
  radius: 2,
};

// Extra tones outside the DesignSystem shape stay as plain consts.
const GILT = '#c3a24c'; // brighter gold-leaf highlight
const OXBLOOD = '#6a1f22'; // liturgical red
const CREAM = '#f7f1e2'; // the Host / luna
const INK_MUTED = '#6a5a42';

const PAPER_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
  color: 'var(--osd-text)',
  background: 'var(--osd-bg)',
} as const;

// ── Ornaments ─────────────────────────────────────────────────────────────────

const Diamond = ({ size = 8, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      background: color,
      transform: 'rotate(45deg)',
      flex: '0 0 auto',
    }}
  />
);

// Missal-style hairline frame with corner diamonds — the unifier across every page.
const Frame = () => (
  <div
    aria-hidden
    style={{ position: 'absolute', inset: 46, border: '1px solid rgba(156,123,51,0.42)', pointerEvents: 'none' }}
  >
    <div style={{ position: 'absolute', top: -5, left: -5 }}>
      <Diamond size={9} />
    </div>
    <div style={{ position: 'absolute', top: -5, right: -5 }}>
      <Diamond size={9} />
    </div>
    <div style={{ position: 'absolute', bottom: -5, left: -5 }}>
      <Diamond size={9} />
    </div>
    <div style={{ position: 'absolute', bottom: -5, right: -5 }}>
      <Diamond size={9} />
    </div>
  </div>
);

// Parchment backdrop: warm base + candlelit vignette + fine paper grain + frame.
const Paper = ({ children }: { children?: ReactNode }) => (
  <>
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(120% 120% at 50% 32%, rgba(255,250,238,0.55), rgba(0,0,0,0) 45%), radial-gradient(130% 130% at 50% 100%, rgba(58,40,18,0.14), rgba(0,0,0,0) 55%)',
      }}
    />
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: PAPER_NOISE,
        backgroundSize: '220px 220px',
        opacity: 0.05,
        mixBlendMode: 'multiply',
      }}
    />
    <Frame />
    {children}
  </>
);

// Monstrance sunburst with the Host at centre — two ray layers + gilded luna.
const Monstrance = ({ size }: { size: number }) => (
  <div aria-hidden style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background:
          `repeating-conic-gradient(from 0deg, ${GILT} 0deg 0.55deg, transparent 0.55deg 6deg)`,
        WebkitMaskImage:
          'radial-gradient(circle, transparent 30%, #000 41%, #000 63%, transparent 82%)',
        maskImage: 'radial-gradient(circle, transparent 30%, #000 41%, #000 63%, transparent 82%)',
        opacity: 0.95,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background:
          `repeating-conic-gradient(from 3deg, ${design.palette.accent} 0deg 0.4deg, transparent 0.4deg 6deg)`,
        WebkitMaskImage:
          'radial-gradient(circle, transparent 30%, #000 38%, #000 50%, transparent 60%)',
        maskImage: 'radial-gradient(circle, transparent 30%, #000 38%, #000 50%, transparent 60%)',
        opacity: 0.8,
      }}
    />
    {/* The luna / Host */}
    <div
      style={{
        position: 'absolute',
        inset: '33%',
        borderRadius: '50%',
        background: `radial-gradient(circle at 50% 40%, ${CREAM}, #efe6d1)`,
        border: `2px solid var(--osd-accent)`,
        boxShadow: `inset 0 0 0 5px ${CREAM}, inset 0 0 0 6px rgba(156,123,51,0.5), 0 6px 24px rgba(58,40,18,0.18)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: size * 0.02,
      }}
    >
      {/* small cross above the Christogram */}
      <div style={{ position: 'relative', width: size * 0.09, height: size * 0.09 }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 2,
            height: '100%',
            background: 'var(--osd-accent)',
            transform: 'translateX(-50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '34%',
            left: 0,
            width: '100%',
            height: 2,
            background: 'var(--osd-accent)',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 600,
          fontSize: size * 0.15,
          letterSpacing: '0.1em',
          color: 'var(--osd-accent)',
          textIndent: '0.1em',
        }}
      >
        IHS
      </div>
    </div>
  </div>
);

const Label = ({ children, color = 'var(--osd-accent)' }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '0.42em',
      textIndent: '0.42em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

// Ornamental divider: hairline — diamond — hairline.
const Divider = ({ width = 260 }: { width?: number }) => (
  <div aria-hidden style={{ display: 'flex', alignItems: 'center', gap: 18, width, justifyContent: 'center' }}>
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, rgba(156,123,51,0.7))' }} />
    <Diamond size={9} />
    <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(156,123,51,0.7), transparent)' }} />
  </div>
);

const centered = {
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '120px 160px',
} as const;

// ── 1 · Cover ──────────────────────────────────────────────────────────────────
const Cover: Page = () => (
  <div style={fill}>
    <Paper>
      <div style={centered}>
        <Label>Sanctissimum Sacramentum</Label>
        <div style={{ height: 44 }} />
        <Monstrance size={252} />
        <div style={{ height: 48 }} />
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 700,
            fontSize: 104,
            letterSpacing: '0.06em',
            textIndent: '0.06em',
            lineHeight: 1.02,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          The Real Presence
        </h1>
        <div style={{ height: 32 }} />
        <Divider width={300} />
        <div style={{ height: 30 }} />
        <p
          style={{
            fontSize: 42,
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: INK_MUTED,
            maxWidth: 1120,
            margin: 0,
          }}
        >
          Jesus Christ — truly, really, and substantially present under the appearances of bread and wine.
        </p>
      </div>
    </Paper>
  </div>
);

// ── 2 · The words of Christ ─────────────────────────────────────────────────────
const Words: Page = () => (
  <div style={fill}>
    <Paper>
      <div style={centered}>
        <Label>At the Last Supper</Label>
        <div style={{ height: 56 }} />
        <blockquote
          style={{
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 92,
            lineHeight: 1.16,
            letterSpacing: '0.005em',
            maxWidth: 1400,
          }}
        >
          “This is my Body, which <span style={{ color: 'var(--osd-accent)' }}>is</span> given for you.”
        </blockquote>
        <div style={{ height: 44 }} />
        <Label color={OXBLOOD}>Luke 22 : 19</Label>
        <div style={{ height: 40 }} />
        <p style={{ fontSize: 38, color: INK_MUTED, margin: 0, maxWidth: 1000, lineHeight: 1.45 }}>
          He did not say it <em style={{ fontStyle: 'italic' }}>signifies</em> his Body. He said it <em style={{ color: 'var(--osd-text)' }}>is</em>.
        </p>
      </div>
    </Paper>
  </div>
);

// ── 3 · Transubstantiation ──────────────────────────────────────────────────────
const Word = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontWeight: 600,
      fontSize: 62,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </span>
);

const Fullness = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 26, justifyContent: 'center', flexWrap: 'nowrap' }}>
    <Word>Body</Word>
    <Diamond size={10} />
    <Word>Blood</Word>
    <Diamond size={10} />
    <Word>Soul</Word>
    <Diamond size={10} />
    <Word>Divinity</Word>
  </div>
);

const Transubstantiation: Page = () => (
  <div style={fill}>
    <Paper>
      <div style={centered}>
        <Label>What Happens at the Altar</Label>
        <div style={{ height: 52 }} />
        <Fullness />
        <div style={{ height: 46 }} />
        <p style={{ fontSize: 42, lineHeight: 1.5, color: 'var(--osd-text)', maxWidth: 1180, margin: 0 }}>
          At the words of consecration the bread and wine become the whole Christ. Only the
          appearances remain — the reality is the Lord himself.
        </p>
        <div style={{ height: 52 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 70, height: 1, background: 'rgba(156,123,51,0.7)' }} />
          <span
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontWeight: 600,
              fontSize: 24,
              letterSpacing: '0.24em',
              textIndent: '0.24em',
              color: 'var(--osd-accent)',
              textTransform: 'uppercase',
            }}
          >
            Transubstantiation
          </span>
          <div style={{ width: 70, height: 1, background: 'rgba(156,123,51,0.7)' }} />
        </div>
        <div style={{ height: 16 }} />
        <p style={{ fontSize: 30, fontStyle: 'italic', color: INK_MUTED, margin: 0 }}>
          the change of the whole substance of bread and wine into Christ.
        </p>
      </div>
    </Paper>
  </div>
);

// ── 4 · How we respond ──────────────────────────────────────────────────────────
const Practice = ({ numeral, children }: { numeral: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 40, width: '100%' }}>
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 600,
        fontSize: 40,
        color: 'var(--osd-accent)',
        width: 92,
        flex: '0 0 auto',
        letterSpacing: '0.04em',
      }}
    >
      {numeral}
    </span>
    <span style={{ fontSize: 46, lineHeight: 1.3 }}>{children}</span>
  </div>
);

const Respond: Page = () => (
  <div style={fill}>
    <Paper>
      <div style={{ ...centered, alignItems: 'flex-start', textAlign: 'left', padding: '120px 200px' }}>
        <Label>How We Respond</Label>
        <div style={{ height: 40 }} />
        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 700,
            fontSize: 92,
            letterSpacing: '0.05em',
            textIndent: '0.05em',
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Come, and Adore
        </h2>
        <div style={{ height: 20 }} />
        <Divider width={220} />
        <div style={{ height: 52 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, width: '100%', maxWidth: 1280 }}>
          <Practice numeral="I">
            Genuflect before the tabernacle — the King is truly at home there.
          </Practice>
          <Practice numeral="II">Receive Him in a state of grace, with faith and reverence.</Practice>
          <Practice numeral="III">Rest with Him a while in Eucharistic Adoration.</Practice>
        </div>
      </div>
    </Paper>
  </div>
);

// ── 5 · Benediction ─────────────────────────────────────────────────────────────
const Benediction: Page = () => (
  <div style={fill}>
    <Paper>
      <div style={centered}>
        <Monstrance size={186} />
        <div style={{ height: 52 }} />
        <p
          style={{
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 60,
            lineHeight: 1.32,
            margin: 0,
            maxWidth: 1320,
          }}
        >
          O Sacrament most holy, O Sacrament divine,
          <br />
          all praise and all thanksgiving be every moment Thine.
        </p>
        <div style={{ height: 44 }} />
        <Divider width={280} />
        <div style={{ height: 28 }} />
        <Label>The Divine Praises</Label>
      </div>
    </Paper>
  </div>
);

// ── Motion: a single quiet "dissolve" family — reverent, never showy ────────────
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 180, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 260,
    delay: 90,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

Cover.transition = {
  duration: 320,
  exit: { duration: 200, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 320,
    delay: 120,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(10px)', filter: 'blur(3px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};
Benediction.transition = Cover.transition;

export const meta: SlideMeta = {
  title: 'The Real Presence',
  createdAt: '2026-07-26T19:14:39.232Z',
};

export default [Cover, Words, Transubstantiation, Respond, Benediction] satisfies Page[];
