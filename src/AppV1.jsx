import { useState, useEffect, useRef } from "react";

const ACCENT = "#E8700A";
const PETROL = "#1A7A7A";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700;800;900&family=Barlow:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0D0D0D;
    --surface: #161616;
    --surface2: #1E1E1E;
    --border: rgba(255,255,255,0.08);
    --text: #F0EDE8;
    --muted: #8A8A8A;
    --accent: #E8700A;
    --petrol: #1A9090;
    --white: #FFFFFF;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .font-display { font-family: 'Barlow Condensed', sans-serif; }
  .font-mono { font-family: 'Space Mono', monospace; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes lockDrop {
    0% { transform: translateY(-100%); }
    60% { transform: translateY(8px); }
    80% { transform: translateY(-3px); }
    100% { transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
  .animate-float { animation: float 4s ease-in-out infinite; }

  .hero-bg {
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 50%, rgba(232,112,10,0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(26,144,144,0.08) 0%, transparent 40%),
      linear-gradient(180deg, #0D0D0D 0%, #111111 50%, #0A0A0A 100%);
  }

  .grid-pattern {
    background-image: 
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .accent-line {
    width: 60px;
    height: 3px;
    background: var(--accent);
    margin-bottom: 24px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border: 1px solid rgba(232,112,10,0.4);
    border-radius: 2px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    color: var(--accent);
    background: rgba(232,112,10,0.06);
  }

  .btn-primary {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 16px 36px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  }
  .btn-primary:hover {
    background: #FF8020;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(232,112,10,0.4);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 15px 36px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 6vw, 72px);
    line-height: 0.95;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 32px;
    transition: all 0.3s ease;
  }
  .card:hover {
    border-color: rgba(232,112,10,0.3);
    background: var(--surface2);
    transform: translateY(-4px);
  }

  .tech-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .tech-row:last-child { border-bottom: none; }

  .nav-link {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
    background: none;
    border: none;
  }
  .nav-link:hover { color: var(--text); }

  .lock-visual {
    width: 100%;
    max-width: 500px;
    height: 400px;
    position: relative;
    margin: 0 auto;
  }

  .compare-check { color: #22C55E; }
  .compare-x { color: #EF4444; }

  .step-number {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 80px;
    font-weight: 900;
    color: rgba(232,112,10,0.12);
    line-height: 1;
    position: absolute;
    top: -20px;
    left: -10px;
  }

  .noise-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 999;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  .faq-item {
    border-bottom: 1px solid var(--border);
    padding: 24px 0;
    cursor: pointer;
  }

  .shimmer-text {
    background: linear-gradient(90deg, var(--text) 0%, var(--accent) 50%, var(--text) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  @media (max-width: 768px) {
    .section-title { font-size: clamp(32px, 10vw, 56px); }
    .hide-mobile { display: none !important; }
  }
`;

// ── Animated Lock SVG ──────────────────────────────────────────────────────
function LockAnimation({ locked }) {
  return (
    <svg viewBox="0 0 200 300" width="180" height="270" style={{ filter: "drop-shadow(0 0 20px rgba(232,112,10,0.3))" }}>
      {/* Rail */}
      <rect x="88" y="10" width="24" height="280" rx="4" fill="#1A1A1A" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="94" y="10" width="12" height="280" rx="2" fill="#252525" />

      {/* Drawer slots */}
      {[60, 130, 200].map((y, i) => (
        <g key={i}>
          <rect x="20" y={y - 18} width="68" height="36" rx="3" fill="#1E1E1E" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x="112" y={y - 18} width="68" height="36" rx="3" fill="#1E1E1E" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          {/* Locking pins */}
          <rect
            x="84"
            y={y - 6}
            width="32"
            height="12"
            rx="2"
            fill={locked ? ACCENT : "#333"}
            style={{ transition: "fill 0.4s ease, transform 0.4s ease" }}
          />
          <circle cx="100" cy={y} r="4" fill={locked ? "#FF9030" : "#555"} style={{ transition: "fill 0.4s" }} />
        </g>
      ))}

      {/* Motor indicator */}
      <circle cx="100" cy="270" r="14" fill="#1A1A1A" stroke={locked ? ACCENT : "#333"} strokeWidth="2" style={{ transition: "stroke 0.4s" }} />
      <path d="M93,270 L100,264 L107,270 L100,276 Z" fill={locked ? ACCENT : "#444"} style={{ transition: "fill 0.4s" }} />
    </svg>
  );
}

// ── Icon components ─────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, color = "currentColor" }) => {
  const icons = {
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    unlock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    layers: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    tool: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    thermometer: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
    weight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>,
    repeat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
    print: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    package: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    shield: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="9" y="9" width="6" height="6"/><path d="M15 9V5h-2M9 9V5h2M15 15v4h-2M9 15v4h2M5 9h4M5 15h4M19 9h-4M19 15h-4"/><rect x="2" y="5" width="20" height="14" rx="2"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chevronDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>,
    chevronUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>,
    truck: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  };
  return icons[name] || null;
};

// ── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(13,13,13,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, background: ACCENT,
          clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="lock" size={14} color="#fff" />
        </div>
        <span className="font-display" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          RAIL<span style={{ color: ACCENT }}>LOCK</span>
        </span>
      </div>
      <div className="hide-mobile" style={{ display: "flex", gap: 36 }}>
        {[["Produkt", "produkt"], ["Features", "features"], ["Installation", "installation"], ["Shop", "shop"], ["FAQ", "faq"]].map(([l, id]) => (
          <button key={l} className="nav-link" onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}>{l}</button>
        ))}
      </div>
      <a href="https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>Jetzt bestellen</button>
      </a>
    </nav>
  );
}

// ── HERO ────────────────────────────────────────────────────────────────────
function Hero() {

  return (
    <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div className="hero-bg grid-pattern" />

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", background: "linear-gradient(180deg, transparent, rgba(232,112,10,0.15), transparent)" }} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "120px 40px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {["DIY-tauglich", "3D-gedruckt", "Made for Camper", "12V Kompatibel", "Modular"].map(b => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>

          <div className="section-label">Neue Generation Schubladensicherung</div>

          <h1 className="font-display" style={{
            fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 900,
            lineHeight: 0.9, letterSpacing: "-0.02em", textTransform: "uppercase",
            marginBottom: 32,
          }}>
            NIE WIEDER
            <br />
            <span style={{ color: ACCENT }}>AUFSPRINGENDE</span>
            <br />
            SCHUBLADEN.
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.7, color: "#B0ADA8", maxWidth: 480, marginBottom: 48, fontWeight: 300 }}>
            Die zentrale elektrische Schubladensicherung für Camper – robust, modular und DIY-freundlich. Ein Schalter verriegelt alles.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => document.getElementById("produkt")?.scrollIntoView({ behavior: "smooth" })}>Jetzt entdecken</button>
            <button className="btn-ghost" onClick={() => document.getElementById("funktionsweise")?.scrollIntoView({ behavior: "smooth" })}>Funktionsweise ansehen</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {[["1", "Schalter für alle"], ["100%", "DIY nachrüstbar"], ["PETG", "Industriematerial"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display" style={{ fontSize: 32, fontWeight: 900, color: ACCENT }}>{n}</div>
                <div style={{ fontSize: 12, color: "#666", letterSpacing: "0.05em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – looping demo video */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", width: "100%" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 60% 50%, rgba(232,112,10,0.12) 0%, transparent 70%)",
              zIndex: 1, pointerEvents: "none",
            }} />
            <video
              autoPlay muted loop playsInline
              style={{
                width: "100%", maxHeight: 500, objectFit: "cover",
                objectPosition: "center center",
                border: `1px solid rgba(232,112,10,0.25)`,
                display: "block",
              }}
            >
              <source src="/videos/verriegeln_stable.mp4" type="video/mp4" />
            </video>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "12px 24px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            width: "100%", justifyContent: "center",
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>
              VERRIEGELN · ENTRIEGELN · EIN KNOPFDRUCK
            </span>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(transparent, var(--bg))" }} />
    </section>
  );
}

// ── PROBLEM ─────────────────────────────────────────────────────────────────
function Problem() {
  const problems = [
    { icon: "unlock", title: "Schubladen springen auf", desc: "Vibrationen während der Fahrt öffnen Schubladen unkontrolliert – Chaos und Schäden inklusive." },
    { icon: "x", title: "Push Locks versagen", desc: "Konventionelle Push Locks halten Vibrationen nicht stand und müssen nach kurzer Zeit ersetzt werden." },
    { icon: "layers", title: "Einzelverriegelung nervt", desc: "Jede Schublade einzeln sichern? Vor jeder Abfahrt ein lästiges Ritual, das man schnell vergisst." },
    { icon: "zap", title: "Klappern & Lärm", desc: "Schlecht gesicherte Schubladen bedeuten konstantes Klappern – nervig auf langen Strecken." },
  ];

  return (
    <section style={{ padding: "120px 40px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div className="section-label" style={{ textAlign: "center" }}>Das Problem</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>KENNST DU DAS<br /><span style={{ color: ACCENT }}>AUCH?</span></h2>
        <p style={{ color: "#8A8A8A", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
          Jeder Camperbauer kennt das Problem. Bestehende Lösungen sind entweder unzuverlässig, umständlich oder einfach nicht für den Vanlife-Alltag gemacht.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
        {problems.map((p, i) => (
          <div key={i} className="card" style={{ position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, #EF4444, transparent)`,
            }} />
            <div style={{ marginBottom: 20, color: "#EF4444" }}>
              <Icon name={p.icon} size={28} color="#EF4444" />
            </div>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: "#8A8A8A", lineHeight: 1.7 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Transition to solution */}
      <div style={{ textAlign: "center", marginTop: 100, padding: "60px 0" }}>
        <div style={{ width: 1, height: 80, background: "linear-gradient(180deg, rgba(255,255,255,0.1), var(--accent))", margin: "0 auto 32px" }} />
        <div className="section-label" style={{ fontSize: 14 }}>Die Lösung</div>
        <h2 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9 }}>
          RAILLOCK<br /><span className="shimmer-text">SYSTEM</span>
        </h2>
      </div>
    </section>
  );
}

// ── PRODUCT EXPLANATION ──────────────────────────────────────────────────────
function ProductExplain() {
  return (
    <section id="produkt" style={{ padding: "80px 40px 120px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
        {/* Left: Real 3D render */}
        <div style={{ position: "relative" }}>
          <img
            src="/images/gallery_schiene_nah.jpg"
            alt="RailLock Schienensystem – eingebaut im Camper, Seitenansicht mit sichtbaren Haken und Halterungen"
            style={{ width: "100%", height: 500, objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
          <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` }} />
        </div>

        {/* Right: Text */}
        <div>
          <div className="accent-line" />
          <div className="section-label">Produkterklärung</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>EIN SYSTEM.<br /><span style={{ color: ACCENT }}>ALLES</span><br />GESICHERT.</h2>
          <p style={{ fontSize: 16, color: "#8A8A8A", lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
            Die zentrale Verriegelungsschiene verbindet alle Schubladen mechanisch. Ein einziger 12V-Stellmotor bewegt die gesamte Schiene – und verriegelt alles gleichzeitig.
          </p>

          {[
            ["Zentrale Schiene", "Eine vertikale Schiene verriegelt mehrere Schubladen gleichzeitig – mechanisch simpel und absolut zuverlässig."],
            ["Halterungen", "Halten die Schiene in Position und fixieren bei Bedarf Querstreben des Schubladenkorpus. Eine Halterung pro Schublade."],
            ["Nummerierte Segmente", "Die Schienensegmente sind nummeriert – so kann die Schiene nicht falsch eingebaut werden."],
            ["Ausschnitt im Schubladenrücken", "Ein kleiner Ausschnitt (ca. 45 × 30 mm) im Schubladenrücken ermöglicht das Einhaken. Mit der mitgelieferten Schablone und einer Stichsäge einfach herzustellen – im eingebauten Zustand nicht sichtbar."],
            ["Keine App nötig", "Einfacher Schalter. Kein Bluetooth, keine App, keine Abhängigkeiten. Funktioniert immer."],
          ].map(([t, d]) => (
            <div key={t} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 24, height: 24, minWidth: 24, marginTop: 2 }}>
                <Icon name="check" size={16} color={ACCENT} />
              </div>
              <div>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RAILLOCK SVG ILLUSTRATION (Seitenansicht, hohle Schubladen) ───────────────
function RailLockSVG({ locked = true }) {
  const railOffset = locked ? 10 : -5; // locked: rail pushed down; unlocked: arm at drawer top edge
  const hookColor = locked ? ACCENT : "#3A3A3A";
  const motorColor = locked ? ACCENT : "#333";

  const drawerYs = [90, 178, 266, 354];

  // Drawer geometry (all relative to drawerY = center)
  const dH = 72;       // total drawer height
  const bwX = 108;     // back wall left x
  const bwT = 6;       // back wall thickness
  const fwX = 276;     // front wall x
  const wT  = 4;       // top/bottom wall thickness
  const cutT = -36;    // cutout top  (= drawer top)
  const cutB = -5;     // cutout bottom (deep enough for hook to clear when unlocked)
  const iL = bwX + bwT;               // interior left
  const iR = fwX;                     // interior right
  const iT = cutT + wT;               // interior top (below top wall)
  const iB = dH / 2 - wT;             // interior bottom (above bottom wall)

  // Hook geometry (relative to drawerY)
  const armY   = -26;   // arm center (inside cutout gap)
  const armH   =  10;   // arm height
  const armXS  =  68;   // arm start x (rail right edge)
  const armXE  = iL + 18; // arm end x (18px into interior — clearly past back wall)
  const tipXS  = armXE - 10;
  const tipXE  = armXE;
  const tipLen =  18;   // tip length (hangs down inside)

  return (
    <svg viewBox="0 0 320 460" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 300, filter: "drop-shadow(0 0 30px rgba(0,0,0,0.9))" }}>
      <defs>
        <linearGradient id="svRail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2E2E2E" />
          <stop offset="60%" stopColor="#404040" />
          <stop offset="100%" stopColor="#282828" />
        </linearGradient>
        <linearGradient id="svWall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#222222" />
        </linearGradient>
      </defs>

      <rect width="320" height="460" fill="#0D0D0D" rx="3" />

      {/* ── DRAWERS (static) ── */}
      {drawerYs.map((y, i) => (
        <g key={i}>
          {/* Hollow interior */}
          <rect x={iL} y={y + iT} width={iR - iL} height={iB - iT}
            fill="#131313" stroke="none" />

          {/* Top wall */}
          <rect x={bwX} y={y + cutT} width={fwX - bwX + 8} height={wT}
            fill="url(#svWall)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Bottom wall */}
          <rect x={bwX} y={y + iB} width={fwX - bwX + 8} height={wT}
            fill="url(#svWall)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          {/* Back wall lower (below cutout) */}
          <rect x={bwX} y={y + cutB} width={bwT} height={iB - cutB}
            fill="url(#svWall)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
          {/* Front panel */}
          <rect x={fwX} y={y + cutT} width={10} height={dH}
            fill="#2A2A2A" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          {/* Front handle — subtle side view: two thin arms + slim bar */}
          <rect x={fwX + 10} y={y - 6} width={6} height={1.5} rx="0.75"
            fill="#333333"/>
          <rect x={fwX + 10} y={y + 5} width={6} height={1.5} rx="0.75"
            fill="#333333"/>
          <rect x={fwX + 14} y={y - 7} width={3} height={15} rx="1.5"
            fill="#2E2E2E" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>

          {/* Cutout gap highlight */}
          <rect x={bwX - 1} y={y + cutT} width={bwT + 2} height={cutB - cutT}
            fill="#0A0A0A"
            stroke={locked ? "rgba(232,112,10,0.5)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1"
            style={{ transition: "stroke 0.4s" }}/>

          {/* "INNEN" interior label on first drawer */}
          {i === 0 && (
            <text x={iL + (iR - iL) / 2} y={y + 4} textAnchor="middle"
              fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" letterSpacing="1">
              INNEN
            </text>
          )}

          {/* Label: AUSSCHNITT */}
          {i === 0 && (
            <g>
              <line x1={bwX + bwT / 2} y1={y + cutT + (cutB - cutT) / 2}
                x2={172} y2={y + cutT - 18}
                stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
              <text x="175" y={y + cutT - 16} fill="rgba(255,255,255,0.35)"
                fontSize="8" fontFamily="monospace" letterSpacing="0.5">AUSSCHNITT</text>
            </g>
          )}

          {/* Label: SCHUBLADENRÜCKEN — below last drawer, diagonal line up to back wall */}
          {i === 3 && (
            <g>
              <line x1={bwX + bwT / 2} y1={y + iB}
                x2="116" y2={y + iB + 22}
                stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
              <text x="118" y={y + iB + 17} fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.4">SCHUBLADEN-</text>
              <text x="118" y={y + iB + 27} fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.4">RÜCKEN</text>
            </g>
          )}

          {/* Label: SCHUBLADENFRONT — below last drawer, diagonal line up to front panel */}
          {i === 3 && (
            <g>
              <line x1={fwX + 5} y1={y + iB}
                x2="264" y2={y + iB + 22}
                stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
              <text x="262" y={y + iB + 17} fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.4" textAnchor="end">SCHUBLADEN-</text>
              <text x="262" y={y + iB + 27} fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.4" textAnchor="end">FRONT</text>
            </g>
          )}

          {/* "GESPERRT" mark on front when locked */}
          {locked && (
            <text x={fwX + 5} y={y + 3} textAnchor="middle"
              fill={ACCENT} fontSize="7" fontFamily="monospace"
              style={{ transition: "fill 0.4s" }}>✕</text>
          )}
        </g>
      ))}

      {/* ── RAIL + HOOKS ── */}
      <g style={{ transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)" }}
         transform={`translate(0, ${railOffset})`}>

        {/* Rail */}
        <rect x="46" y="30" width="22" height="370" rx="3"
          fill="url(#svRail)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="52" y="30" width="10" height="370" rx="2" fill="#1A1A1A" />
        <rect x="47" y="30" width="3" height="370" rx="1" fill="rgba(255,255,255,0.06)" />

        {[124, 212, 300].map((y, i) => (
          <g key={i}>
            <rect x="42" y={y - 4} width="30" height="8" rx="2"
              fill="#333" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <circle cx="57" cy={y} r="2.5" fill="#444"/>
          </g>
        ))}

        <text x="57" y="22" textAnchor="middle"
          fill="rgba(232,112,10,0.55)" fontSize="7" fontFamily="monospace" letterSpacing="0.5">
          SCHIENE
        </text>

        {/* ── HOOKS ── */}
        {drawerYs.map((y, i) => (
          <g key={i}>
            {/* Arm: from rail through cutout gap INTO drawer interior */}
            <rect x={armXS} y={y + armY - armH / 2} width={armXE - armXS} height={armH} rx="3"
              fill={hookColor} opacity="0.95"
              style={{ transition: "fill 0.4s" }}/>
            {/* Tip: hangs DOWN inside drawer interior */}
            <rect x={tipXS} y={y + armY + armH / 2} width={tipXE - tipXS} height={tipLen} rx="2"
              fill={hookColor} opacity="0.85"
              style={{ transition: "fill 0.4s" }}/>

            {/* Glow when locked */}
            {locked && (
              <>
                <rect x={armXS - 2} y={y + armY - armH / 2 - 3}
                  width={armXE - armXS + 4} height={armH + tipLen + 6} rx="3"
                  fill="none" stroke={ACCENT} strokeWidth="0.7" opacity="0.35"/>
                {/* Contact-point highlight at cutout edge */}
                <rect x={bwX - 2} y={y + cutB - 2} width={bwT + 4} height={4} rx="1"
                  fill={ACCENT} opacity="0.5"/>
              </>
            )}

            {i === 1 && (
              <g>
                <line x1={armXS + (armXE - armXS) / 2} y1={y + armY - armH / 2 - 2}
                  x2="30" y2={y + armY - 40}
                  stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2"/>
                <text x="5" y={y + armY - 42} fill="rgba(255,255,255,0.35)"
                  fontSize="8" fontFamily="monospace" letterSpacing="0.5">HAKEN</text>
              </g>
            )}
          </g>
        ))}

        {/* Stößel — moves with rail, slides into motor socket below */}
        <rect x="54" y="400" width="9" height="22" rx="2" fill="#2E2E2E"/>
        {[403, 408, 413].map(y => (
          <rect key={y} x="52" y={y} width="13" height="3" rx="1.5" fill={y === 408 ? "#282828" : "#383838"}/>
        ))}
      </g>

      {/* ── MOTOR (Zentralverriegelungs-Stellmotor, simplified side view) ── */}
      {/* Guide socket — static, rod slides in/out of this */}
      <rect x="49" y="415" width="19" height="8" rx="2"
        fill="#252525" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>

      {/* Motor body — tall rectangle, clearly more height than width */}
      <rect x="46" y="418" width="30" height="42" rx="2"
        fill="#1E1E1E" stroke={motorColor} strokeWidth="1.5"
        style={{ transition: "stroke 0.4s" }}/>
      {/* Top face highlight */}
      <rect x="46" y="418" width="30" height="4" rx="2" fill="#272727"/>
      {/* Bottom shadow */}
      <rect x="46" y="456" width="30" height="4" rx="2" fill="#161616"/>
      {/* Side panel detail */}
      <rect x="49" y="424" width="24" height="30" rx="1" fill="#191919"/>

      {/* Status LED */}
      <circle cx="61" cy="439" r="3"
        fill={motorColor} opacity="0.9" style={{ transition: "fill 0.4s" }}/>
      <circle cx="61" cy="439" r="1.3"
        fill={locked ? "#FF9030" : "#1A1A1A"} style={{ transition: "fill 0.4s" }}/>

      {locked && <ellipse cx="61" cy="461" rx="22" ry="4" fill={ACCENT} opacity="0.05"/>}
      <text x="80" y="437" fill="rgba(232,112,10,0.45)" fontSize="7" fontFamily="monospace" letterSpacing="0.3">STELLMOTOR</text>

      {/* ── STATUS ── */}
      <rect x="9" y="9" width="95" height="18" rx="2"
        fill={locked ? "rgba(232,112,10,0.1)" : "rgba(255,255,255,0.03)"}
        style={{ transition: "fill 0.4s" }}/>
      <text x="56" y="21" textAnchor="middle"
        fill={locked ? ACCENT : "#555"} fontSize="7" fontFamily="monospace" letterSpacing="1"
        style={{ transition: "fill 0.4s" }}>
        {locked ? "● GESICHERT" : "○ ENTRIEGELT"}
      </text>

      <path d="M 0 0 L 10 0 L 10 2 L 2 2 L 2 10 L 0 10 Z" fill={ACCENT} opacity="0.7"/>
      <path d="M 320 0 L 310 0 L 310 2 L 318 2 L 318 10 L 320 10 Z" fill={ACCENT} opacity="0.7"/>
      <path d="M 0 460 L 10 460 L 10 458 L 2 458 L 2 450 L 0 450 Z" fill={ACCENT} opacity="0.7"/>
      <path d="M 320 460 L 310 460 L 310 458 L 318 458 L 318 450 L 320 450 Z" fill={ACCENT} opacity="0.7"/>
    </svg>
  );
}

// ── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [locked, setLocked] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setLocked(p => !p), 3000);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { n: "01", title: "Schalter betätigen", desc: "Einfacher 12V-Kippschalter im Cockpit oder Innenraum – intuitiv, schnell, zuverlässig." },
    { n: "02", title: "Stellmotor aktiviert", desc: "Der Zentralverriegelungs-Stellmotor erhält den Impuls und bewegt die vertikale Schiene." },
    { n: "03", title: "Schiene verriegelt", desc: "Die Verriegelungsschiene rastet in alle Schubladenmitnehmer gleichzeitig ein. Kein Spielraum." },
    { n: "04", title: "Sicher fahren", desc: "Keine aufspringenden Schubladen mehr. Kein Klappern. Vollständige Sicherheit während der Fahrt." },
    { n: "05", title: "Entriegeln im Stand", desc: "Schalter erneut betätigen – Schiene hebt sich, alle Schubladen wieder frei zugänglich." },
  ];

  return (
    <section id="funktionsweise" style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        {/* Left: Steps */}
        <div>
          <div style={{ marginBottom: 64 }}>
            <div className="accent-line" />
            <div className="section-label">Funktionsweise</div>
            <h2 className="section-title">WIE ES<br /><span style={{ color: ACCENT }}>FUNKTIONIERT</span></h2>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: 28, top: 0, bottom: 0, width: 1,
              background: "linear-gradient(180deg, var(--accent), rgba(232,112,10,0.1))",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 40, paddingBottom: 48, position: "relative" }}>
                  <div style={{
                    width: 56, height: 56, minWidth: 56,
                    border: `2px solid ${ACCENT}`, background: "#0D0D0D",
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1,
                  }}>
                    <span className="font-mono" style={{ fontSize: 11, color: ACCENT }}>{s.n}</span>
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <h3 className="font-display" style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase", marginBottom: 10, letterSpacing: "-0.01em" }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "#8A8A8A", lineHeight: 1.7, maxWidth: 400 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Animated SVG illustration */}
        <div style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <RailLockSVG locked={locked} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${locked ? "rgba(232,112,10,0.25)" : "rgba(255,255,255,0.06)"}`, transition: "border-color 0.4s" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: locked ? ACCENT : "#444", boxShadow: locked ? `0 0 10px ${ACCENT}` : "none", transition: "all 0.4s" }} />
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: locked ? ACCENT : "#444", transition: "color 0.4s" }}>
              {locked ? "SCHIENEN VERRIEGELT" : "SCHIENEN OFFEN"}
            </span>
          </div>
          <p style={{ fontSize: 11, color: "#444", textAlign: "center", fontFamily: "'Space Mono', monospace", letterSpacing: "0.05em" }}>
            Technische Illustration — vereinfacht dargestellt
          </p>
        </div>
      </div>
    </section>
  );
}

// ── FEATURES ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: "lock", title: "Zentrale Verriegelung", desc: "Ein Schalter für alle Schubladen gleichzeitig." },
    { icon: "unlock", title: "Dauerhaft entriegelbar", desc: "Am Stellplatz einfach entriegelt lassen – fühlt sich an wie zuhause. Kein ständiges Auf- und Zudrücken wie bei Push Locks, die auch im Stand immer sofort wieder verriegeln." },
    { icon: "layers", title: "Modular anpassbar", desc: "Erweiterbar auf bis zu 5 Schubladen – vorausgesetzt, die Rückseite des Korpus ist gut zugänglich." },
    { icon: "tool", title: "DIY-freundlich", desc: "Nachrüstung ohne Fachbetrieb möglich." },
    { icon: "repeat", title: "Wartungsarm", desc: "Mechanisch simpel. Kein Service nötig." },
    { icon: "print", title: "3D-druckbar", desc: "Wahlweise fertig gedrucktes Kit oder STL-Dateien zum Selbstdrucken mit eigenem Drucker." },
    { icon: "shield", title: "Vibrationsfest", desc: "Speziell für Camper-Vibrationen optimiert." },
    { icon: "thermometer", title: "Temperaturbeständig", desc: "−30 °C bis +70 °C. Sommer und Winter." },
    { icon: "package", title: "Nachrüstbar", desc: "Einfache Montage in bestehende Aufbauten." },
    { icon: "weight", title: "Leichtgewichtig", desc: "PETG-Druck minimiert das Gesamtgewicht." },
    { icon: "cpu", title: "Keine komplexe Elektronik", desc: "Nur ein 12V-Stellmotor. Keine Steuereinheit." },
    { icon: "zap", title: "12V kompatibel", desc: "Standard-Fahrzeugelektrik. Plug & Play." },
    { icon: "truck", title: "Made for Camper", desc: "Von Camperbauern für Camperbauer entwickelt." },
  ];

  return (
    <section id="features" style={{ padding: "120px 40px", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label">Features</div>
          <h2 className="section-title">ALLES DRIN.<br />NICHTS ÜBERFLÜSSIG.<span style={{ color: ACCENT }}>.</span></h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ cursor: "default" }}>
              <div style={{
                width: 44, height: 44,
                background: "rgba(232,112,10,0.08)",
                border: "1px solid rgba(232,112,10,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                <Icon name={f.icon} size={20} color={ACCENT} />
              </div>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPATIBILITY ────────────────────────────────────────────────────────────
function Compatibility() {
  const requirements = [
    { ok: true,  title: "Stapelschubladen", desc: "Das System ist für übereinander gestapelte Schubladen ausgelegt – nicht für nebeneinander liegende." },
    { ok: true,  title: "Mindestens 3 cm Tiefe hinter den Schubladen", desc: "Zwischen Schubladenrücken und Rückwand müssen mindestens 3 cm Platz sein. Der Stellmotor benötigt diesen Raum." },
    { ok: true,  title: "12V-Bordnetz vorhanden", desc: "Ein 12V-Anschluss muss in der Nähe des Schubladenkorpus verfügbar oder verlegbar sein." },
    { ok: true,  title: "Zugang zur Rückseite möglich", desc: "Die Rückseite des Schubladenkorpus muss für die Montage erreichbar sein. Ideal: von vorne und hinten zugänglich." },
    { ok: false, title: "Schwer zugängliche Rückseite", desc: "Ist die Rückseite kaum erreichbar, wird die Montage deutlich aufwendiger. Bitte vor der Bestellung prüfen." },
    { ok: false, title: "Nebeneinander liegende Schubladen", desc: "Das System verriegelt nur vertikal gestapelte Schubladen. Einzelne oder nebeneinander angeordnete Schubladen sind nicht kompatibel." },
  ];

  return (
    <section style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 80 }}>
          <div className="accent-line" />
          <div className="section-label">Kompatibilität</div>
          <h2 className="section-title">FÜR WEN<br /><span style={{ color: ACCENT }}>PASST ES?</span></h2>
          <p style={{ color: "#8A8A8A", lineHeight: 1.8, marginTop: 24, maxWidth: 560, fontWeight: 300 }}>
            Das RailLock-System ist nicht für jeden Aufbau geeignet. Bitte prüfe vor der Bestellung, ob dein Schubladenkorpus die Voraussetzungen erfüllt.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
          {requirements.map((r, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${r.ok ? ACCENT : "#EF4444"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Icon name={r.ok ? "check" : "x"} size={18} color={r.ok ? ACCENT : "#EF4444"} />
                <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase" }}>{r.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Manual slider note */}
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", padding: 32, background: "rgba(232,112,10,0.04)", border: "1px solid rgba(232,112,10,0.2)" }}>
          <div>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 12 }}>NOTFALLÖFFNUNG</div>
            <p style={{ fontSize: 14, color: "#B0ADA8", lineHeight: 1.8 }}>
              Im Falle eines Stromausfalls muss die Schiene manuell hochgeschoben werden können. Der mitgelieferte <strong style={{ color: "#E0DDD8" }}>manuelle Schieber</strong> ermöglicht dies, wenn die Rückseite des Schubladenkorpus erreichbar ist. Wenn du keinen Zugang von beiden Seiten hast, überlege dir vor dem Einbau eine individuelle Lösung für den Notfall.
            </p>
          </div>
          <div style={{ position: "relative", border: `1px solid rgba(232,112,10,0.3)`, overflow: "hidden", flexShrink: 0 }}>
            <video
              autoPlay muted loop playsInline
              style={{ width: 160, height: 200, objectFit: "cover", objectPosition: "center center", display: "block" }}
            >
              <source src="/videos/schieber_notfall.mp4" type="video/mp4" />
            </video>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", padding: "6px 8px" }}>
              <p className="font-mono" style={{ fontSize: 8, color: ACCENT, letterSpacing: "0.1em", margin: 0 }}>MANUELLER SCHIEBER</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TECH SPECS ───────────────────────────────────────────────────────────────
function TechSpecs() {
  const specs = [
    ["Material", "PETG (Polyethylenterephthalat-Glykol)"],
    ["Temperaturbereich", "−30 °C bis +70 °C"],
    ["Betriebsspannung", "12V DC (Zentralverriegelung)"],
    ["Segmentlänge", "< 25 cm je Segment"],
    ["Führungssystem", "Mittige U-Führung"],
    ["Justierbereich", "±10 mm"],
    ["Schraubenstandard", "M3 / M4"],
    ["Farbe", "Schwarz / RAL 9005"],
    ["Anwendung", "Camper, Kastenwagen, Vans"],
    ["Lieferformat", "Fertiges Kit oder STL-Dateien zum Selbstdrucken (kundenspezifisch)"],
  ];

  return (
    <section style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <div>
          <div className="accent-line" />
          <div className="section-label">Technische Daten</div>
          <h2 className="section-title" style={{ marginBottom: 20 }}>TECHNISCH<br />DURCH<span style={{ color: ACCENT }}>DACHT</span></h2>
          <p style={{ color: "#8A8A8A", lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
            Jedes Detail wurde für den Einsatz im fahrenden Fahrzeug optimiert. PETG statt PLA – weil Qualität keine Kompromisse kennt.
          </p>

          {/* Material highlight */}
          <div style={{
            padding: 32,
            background: "rgba(232,112,10,0.05)",
            border: "1px solid rgba(232,112,10,0.2)",
            marginBottom: 24,
          }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 12 }}>WARUM PETG?</div>
            <p style={{ fontSize: 14, color: "#B0ADA8", lineHeight: 1.8 }}>
              PLA würde bei Sommerhitze im Fahrzeug erweichen. PETG bleibt bis 70°C formstabil, ist schlagzäh, UV-beständig und für mechanische Belastungen optimiert.
            </p>
          </div>

          {/* Detailbild – 3D render of motor housing + rail bracket */}
          <div style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
            <img
              src="/images/detailbild2.png"
              alt="Stellmotor-Gehäuse und Schienenbefestigung – 3D-Renderansicht"
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "24px 16px 12px" }}>
              <p className="font-mono" style={{ fontSize: 9, color: "#B0ADA8", letterSpacing: "0.08em", margin: 0 }}>
                Schienensegmente und manueller Schieber — 3D-Modell
              </p>
            </div>
          </div>
        </div>

        {/* Specs table */}
        <div style={{ paddingTop: 8 }}>
          {specs.map(([k, v]) => (
            <div key={k} className="tech-row">
              <span className="font-mono" style={{ fontSize: 11, color: "#666", letterSpacing: "0.05em" }}>{k}</span>
              <span style={{ fontSize: 14, color: "#E0DDD8", textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPARISON ───────────────────────────────────────────────────────────────
function Comparison() {
  const cols = [
    { name: "Pull Lock",              link: "https://www.amazon.de/dp/B07C6F9PN6", features: [false, false, false, true, true, false, false] },
    { name: "Push Lock",              link: null,                                   features: [false, false, false, true, true, false, false] },
    { name: "Kugelschnapper",         link: "https://www.amazon.de/dp/B07JFNP6JY", features: [false, false, false, true, true, false, false] },
    { name: "Magnetische Kindersicherung", link: "https://www.amazon.de/dp/B073C54BCM", features: [false, false, false, false, true, false, false] },
    { name: "RailLock", link: null, features: [true, true, true, true, true, true, true], highlight: true },
  ];
  const rows = [
    "Alle Schubladen gleichzeitig sichern",
    "Ein Schalter für alles",
    "Vibrationsfest",
    "Kein Schlüssel / Magnet nötig",
    "DIY-nachrüstbar",
    "Modular & erweiterbar",
    "Bleibt im Stand dauerhaft entriegelt",
  ];

  return (
    <section style={{ padding: "120px 40px", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label">Vergleich</div>
          <h2 className="section-title">DER UNTERSCHIED<br />IST <span style={{ color: ACCENT }}>KLAR</span></h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 12, color: "#555", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", fontWeight: 400 }}>EIGENSCHAFT</th>
                {cols.map(c => (
                  <th key={c.name} style={{
                    padding: "16px 16px", textAlign: "center",
                    background: c.highlight ? "rgba(232,112,10,0.1)" : "transparent",
                    borderTop: c.highlight ? `2px solid ${ACCENT}` : "2px solid transparent",
                    fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em",
                    color: c.highlight ? ACCENT : "#666",
                  }}>
                    {c.link
                      ? <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: "#888", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.15)" }}>{c.name}</a>
                      : c.name}
                    {c.highlight && <div style={{ fontSize: 9, color: ACCENT, marginTop: 4, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>EMPFOHLEN</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "14px 24px", fontSize: 13, color: "#8A8A8A" }}>{row}</td>
                  {cols.map((c, ci) => (
                    <td key={ci} style={{
                      padding: "14px 24px", textAlign: "center",
                      background: c.highlight ? "rgba(232,112,10,0.04)" : "transparent",
                    }}>
                      {c.features[ri]
                        ? <Icon name="check" size={16} color={c.highlight ? ACCENT : "#22C55E"} />
                        : <Icon name="x" size={16} color="#444" />
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ── INSTALLATION ──────────────────────────────────────────────────────────────
function Installation() {
  const steps = [
    { n: "1", title: "Maße angeben", desc: "Schubladenblock ausmessen und Maße bei der Bestellung angeben – wir fertigen die Segmente passgenau." },
    { n: "2", title: "Schiene aufbauen", desc: "Segmente, Halterungen und Stellmotor zusammenstecken und verschrauben." },
    { n: "3", title: "Ausschnitte setzen", desc: "Mit der mitgelieferten Schablone Ausschnitte in die Schubladenrücken anzeichnen und aussägen." },
    { n: "4", title: "Anschließen & testen", desc: "Stellmotor mit dem 12V-Bordnetz und Schalter verbinden, Funktion prüfen – fertig." },
  ];

  return (
    <section id="installation" style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="accent-line" />
            <div className="section-label">Installation</div>
            <h2 className="section-title" style={{ marginBottom: 24 }}>EINFACH<br /><span style={{ color: ACCENT }}>NACHRÜSTEN</span></h2>
            <p style={{ color: "#8A8A8A", lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
              Mit dem mitgelieferten Montageset und der detaillierten Anleitung rechnen erfahrene Camperausbauer mit ca. 2–3 Stunden. Die tatsächliche Zeit hängt von Zugänglichkeit, Korpusaufbau und Werkzeug ab.
            </p>
            <a href="/montageanleitung.html" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-primary">Montageanleitung ansehen</button>
            </a>

            {/* Kit contents */}
            <div style={{ marginTop: 48, padding: 28, background: "#161616", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: "#666", marginBottom: 16 }}>LIEFERUMFANG</div>
              {["Kundenspezifische Schienensegmente (PETG)", "Halterungen (eine pro Schublade)", "Stellmotor-Gehäuse", "Schablone für Schubladenausschnitte", "Manueller Schieber + Rahmen", "Hakenverlängerer", "Schrauben, Federring, Mutter", "Kantenschutz (optional)", "Detaillierte Montageanleitung"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, color: "#B0ADA8" }}>
                  <Icon name="check" size={12} color={ACCENT} />
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 11, color: "#555", marginTop: 16, lineHeight: 1.6 }}>
                * Elektrische Komponenten (Zentralverriegelungsset inkl. Stellmotor & Steuergerät, Schalter, Kabel, Sicherung) sind nicht enthalten. Empfehlungen findest du in der Montageanleitung. Alternativ zum fertigen Kit gibt es die STL-Dateien zum Selbstdrucken.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 20, padding: "20px 24px",
                background: "#161616", border: "1px solid rgba(255,255,255,0.05)",
                alignItems: "flex-start",
              }}>
                <div className="font-display" style={{ fontSize: 36, fontWeight: 900, color: ACCENT, lineHeight: 1, minWidth: 28 }}>{s.n}</div>
                <div>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────
function Gallery() {
  const photos = [
    {
      src: "/images/schubladen_vorne.jpg",
      caption: "Eingebaut – vier Schubladen, von außen sauber und unsichtbar gesichert",
      objectPosition: "center center",
      span: 2,
      height: 420,
    },
    {
      src: "/images/ausschnitt_innen.jpg",
      caption: "Von innen – der Haken greift präzise durch den Ausschnitt im Schubladenrücken",
      objectPosition: "center center",
      span: 1,
      height: 360,
    },
    {
      src: "/images/schalter.jpg",
      caption: "Bedienung – ein Knopfdruck sichert alle Schubladen gleichzeitig",
      objectPosition: "center center",
      span: 1,
      height: 360,
    },
    {
      src: "/images/gallery_haken_detail.jpg",
      caption: "Hakendetail – der Haken greift von innen in den Ausschnitt und blockiert die Schublade",
      objectPosition: "center top",
      span: 1,
      height: 340,
    },
    {
      src: "/images/rueckwand.jpg",
      caption: "Rückseite des Schubladenkorpus – manueller Schieber von außen zugänglich",
      objectPosition: "center center",
      span: 1,
      height: 340,
    },
  ];

  return (
    <section style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label">Galerie</div>
          <h2 className="section-title">SO SIEHT ES<br /><span style={{ color: ACCENT }}>IM EINBAU</span> AUS</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {photos.map((p, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", background: "#111", gridColumn: `span ${p.span}` }}>
              <img
                src={p.src}
                alt={p.caption}
                style={{
                  width: "100%", height: p.height, objectFit: "cover",
                  objectPosition: p.objectPosition,
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                padding: "48px 20px 16px",
              }}>
                <p className="font-mono" style={{ fontSize: 10, color: "#B0ADA8", letterSpacing: "0.08em", margin: 0 }}>
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RUNDUMANSICHT ─────────────────────────────────────────────────────────────
function Rundumansicht() {
  return (
    <section style={{ background: "#0A0A0A", padding: "100px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div className="section-label">360°-Ansicht</div>
        <h2 className="section-title" style={{ marginBottom: 12 }}>DAS SYSTEM<br /><span style={{ color: ACCENT }}>VON ALLEN SEITEN</span></h2>
        <p style={{ color: "#8A8A8A", fontSize: 15, marginBottom: 56 }}>
          Alle Komponenten auf einen Blick – Schiene, Haken, Stellmotor und manueller Schieber.
        </p>
        <div style={{ display: "inline-block", position: "relative", border: `1px solid rgba(232,112,10,0.2)` }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <img
            src="/images/Rundumansicht.gif"
            alt="360°-Rundumansicht des RailLock-Systems"
            style={{ display: "block", maxWidth: "100%", width: 820, maxHeight: 600, objectFit: "contain", background: "#000" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── VIDEO ─────────────────────────────────────────────────────────────────────
function VideoSection() {
  return (
    <section style={{ background: "#000", paddingBottom: 80 }}>
      <div style={{ textAlign: "center", padding: "80px 40px 48px" }}>
        <div className="section-label">In Aktion</div>
        <h2 className="section-title">SIEH ES<br /><span style={{ color: ACCENT }}>IN AKTION</span></h2>
        <p style={{ color: "#8A8A8A", marginTop: 16, fontSize: 15 }}>Demonstrationsvideo – echte Verriegelung im eingebauten Zustand</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ position: "relative", border: `1px solid rgba(232,112,10,0.2)` }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, zIndex: 2 }} />
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", display: "block", maxHeight: 620, objectFit: "contain", background: "#000" }}
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

// ── SHOP ──────────────────────────────────────────────────────────────────────
function Shop() {
  const steps = [
    { n: "1", title: "Maße ermitteln", desc: "Messe deinen Schubladenkorpus aus: Dicke der Schubladenrücken, Abstände zwischen den Schubladenrücken (bis zu 5 Schubladen)." },
    { n: "2", title: "Etsy-Shop aufrufen", desc: "Bestelle direkt über unseren Etsy-Shop. Alle Segmente werden kundenspezifisch für deinen Einbau gefertigt." },
    { n: "3", title: "Maße & Anzahl angeben", desc: "Trage Anzahl der Schubladen und alle Maße im Bestellformular ein. Ohne diese Angaben kann kein passendes Kit gefertigt werden." },
    { n: "4", title: "Kit erhalten & einbauen", desc: "Du erhältst dein individuell gefertigtes Kit inklusive Montageanleitung und allen gedruckten Komponenten." },
  ];

  const included = [
    "Kundenspezifische Schienensegmente (PETG)",
    "Halterungen (eine pro Schublade)",
    "Stellmotor-Gehäuse",
    "Schablone für Schubladenausschnitte",
    "Manueller Schieber + Rahmen",
    "Hakenverlängerer",
    "Schrauben, Federring, Mutter",
    "Kantenschutz (bei Bedarf, pro Schublade)",
    "Detaillierte Montageanleitung",
  ];

  const notIncluded = [
    { text: "12V-Zentralverriegelungsset (mit Stellmotor & Steuergerät)", link: "https://www.amazon.de/dp/B09C89SS3L" },
    { text: "12V-Schalter", link: "https://www.amazon.de/dp/B0FP96V7N3" },
    { text: "Kabel, Sicherung, elektrische Verbinder", link: null },
    { text: "Korpus-Befestigungsschrauben", link: null },
    { text: "Werkzeug", link: null },
  ];

  return (
    <section id="shop" style={{ padding: "120px 40px", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label">Bestellung</div>
          <h2 className="section-title">DEIN KIT.<br />DEIN <span style={{ color: ACCENT }}>CAMPER</span>.</h2>
          <p style={{ color: "#8A8A8A", maxWidth: 560, margin: "24px auto 0", lineHeight: 1.8 }}>
            Jedes Kit wird individuell nach deinen Maßen gefertigt. Bestellung über Etsy mit Angabe der Schubladenmaße.
          </p>
        </div>

        {/* Order process */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2, marginBottom: 80 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", padding: "32px 28px" }}>
              <div className="font-display" style={{ fontSize: 48, fontWeight: 900, color: "rgba(232,112,10,0.2)", lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
              <div className="font-display" style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Included / Not included */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 48 }}>
          <div style={{ background: "rgba(232,112,10,0.04)", border: `1px solid rgba(232,112,10,0.2)`, padding: "32px 28px" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 20 }}>IM LIEFERUMFANG ENTHALTEN</div>
            {included.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 13, color: "#B0ADA8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <Icon name="check" size={12} color={ACCENT} />
                {f}
              </div>
            ))}
          </div>
          <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", padding: "32px 28px" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: "#666", marginBottom: 20 }}>NICHT ENTHALTEN (SEPARAT BESCHAFFEN)</div>
            {notIncluded.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 13, color: "#666", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <Icon name="x" size={12} color="#555" />
                {f.link ? (
                  <a href={f.link} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "underline", textDecorationColor: "rgba(232,112,10,0.4)" }}>
                    {f.text} →
                  </a>
                ) : f.text}
              </div>
            ))}
            <p style={{ fontSize: 11, color: "#444", marginTop: 16, lineHeight: 1.6 }}>
              Empfehlungen für getestete Bezugsquellen findest du in der Montageanleitung. Die elektrische Installation liegt in der Verantwortung des Kunden.
            </p>
          </div>
        </div>

        {/* STL-only Option */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 48 }}>
          <div style={{ background: "#161616", border: `1px solid rgba(232,112,10,0.3)`, padding: "32px 28px" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 12 }}>OPTION A – PHYSISCHES KIT</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>Fertiges Kit</div>
            <p style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.7, marginBottom: 20 }}>Kundenspezifisch gedruckt und versandfertig. Alles dabei – einfach einbauen.</p>
            <a href="https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ width: "100%" }}>Zum Etsy-Shop →</button>
            </a>
            <p style={{ fontSize: 11, color: "#555", marginTop: 12 }}>Maßangabe erforderlich · individuelle Fertigung</p>
          </div>
          <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.06)", padding: "32px 28px" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: "#666", marginBottom: 12 }}>OPTION B – NUR DRUCKDATEN</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>STL-Dateien</div>
            <p style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.7, marginBottom: 8 }}>Für alle mit eigenem 3D-Drucker. Ausschließlich aus PETG drucken. Günstiger als das fertige Kit – du druckst selbst.</p>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 20, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: ACCENT }}>~30 Std.</span> Druckzeit pro Schiene inkl. Zubehör · Material: PETG
            </div>
            <a href="https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ width: "100%" }}>STL-Dateien bestellen →</button>
            </a>
            <p style={{ fontSize: 11, color: "#555", marginTop: 12 }}>Maßangabe erforderlich · nur Druckdaten, kein physisches Kit</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TRUST ──────────────────────────────────────────────────────────────────────
function Trust() {
  const facts = [
    { title: "Praxiserprobt im eigenen Camper", desc: "Verriegelung und Entriegelung erfolgreich im eigenen Einbau getestet. Das System ist aktiv in Nutzung." },
    { title: "Sommerliche Temperaturen bestanden", desc: "Erfolgreich bei sommerlichen Fahrzeugtemperaturen getestet. PETG-Version in praktischer Nutzung ohne Verformung." },
    { title: "Vorgängersystem: 2.000+ Schaltvorgänge", desc: "Das Holz-Vorgängersystem mit gleichem Stellmotor wurde über 2.000 Mal erfolgreich geschaltet." },
  ];

  return (
    <section style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label">Aus dem eigenen Einbau</div>
          <h2 className="section-title">PRAXISERPROBT.<br /><span style={{ color: ACCENT }}>EHRLICH</span> BERICHTET.</h2>
          <p style={{ color: "#8A8A8A", maxWidth: 560, margin: "24px auto 0", lineHeight: 1.8 }}>
            Keine bezahlten Bewertungen. Nur dokumentierte Ergebnisse aus dem eigenen Camper-Aufbau.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
          {facts.map((f, i) => (
            <div key={i} className="card">
              <div style={{ marginBottom: 20 }}>
                <Icon name="check" size={28} color={ACCENT} />
              </div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#8A8A8A", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 60, padding: "32px", background: "rgba(232,112,10,0.04)", border: "1px solid rgba(232,112,10,0.15)", maxWidth: 700, margin: "60px auto 0" }}>
          <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 12 }}>PILOT-TESTPHASE</div>
          <p style={{ fontSize: 14, color: "#8A8A8A", lineHeight: 1.8 }}>
            Wir suchen aktuell externe Pilot-Tester aus der Camper-Community. Ziel: reale Einbauerfahrungen sammeln, Anleitung verbessern, Kompatibilität breiter validieren.
          </p>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 80, flexWrap: "wrap" }}>
          {[["🇩🇪", "Made in Germany"], ["♻️", "Nachhaltig produziert"], ["🔧", "DIY Community"], ["📦", "Schneller Versand"]].map(([e, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{e}</div>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["Passt das System in meinen Camper?", "Das System ist für übereinander gestapelte Schubladen in Campern ausgelegt. Voraussetzungen: mindestens 3 cm Platz hinter den Schubladenrücken (für den Stellmotor), ein 12V-Bordnetz, und die Rückseite des Schubladenkorpus muss erreichbar sein. Ist die Rückseite schlecht zugänglich, bitte vor der Bestellung prüfen."],
    ["Benötige ich elektrische Kenntnisse?", "Grundkenntnisse der 12V-Fahrzeugelektrik sind hilfreich. Im Lieferumfang ist eine kleine Verkabelungshilfe enthalten, die zeigt, wie das System im eigenen Aufbau angeschlossen wurde. Absicherung, Leitungsführung und elektrischer Anschluss liegen in der Verantwortung des Kunden."],
    ["Kann ich das System selbst drucken?", "Es gibt zwei Varianten: das fertig gedruckte Kit, versandfertig und einbaubereit – oder nur die STL-Dateien zum vollständigen Selbstdrucken mit eigenem Drucker. Wichtig beim Selbstdruck: Nur PETG verwenden – PLA ist nicht temperaturbeständig genug."],
    ["Welche Schubladen sind kompatibel?", "Das System funktioniert mit übereinander gestapelten Schubladen. Voraussetzung ist, dass in den Schubladenrücken ein Ausschnitt (ca. 45 × 30 mm) gesetzt werden kann – die mitgelieferte Schablone erleichtert das Anzeichnen. Schubladen, die nebeneinander liegen, sind nicht kompatibel."],
    ["Ist das System vibrationsfest?", "Ja. Das System wurde speziell für den Einsatz in fahrenden Fahrzeugen entwickelt. Die PETG-Schiene und die mittige U-Führung sorgen für Stabilität. Die Schrauben lockern sich im Betrieb nicht, da sie direkt in PETG eingeschraubt werden."],
    ["Warum PETG statt PLA?", "PLA erweicht bereits ab ca. 60°C – ein realer Wert in einem Fahrzeug im Sommer. PETG bleibt bis 70°C formstabil, ist schlagzäher, UV-beständiger und für mechanische Dauerbelastung geeignet."],
    ["Welche Zentralverriegelung wird empfohlen?", "Empfohlen wird ein 12V-Zentralverriegelungsset mit Stellmotor (5 Kabel), Steuergerät und passender Bauform für das gedruckte Stellmotor-Gehäuse. Konkrete Bezugslinks sind weiter oben auf dieser Seite hinterlegt sowie in der Montageanleitung."],
  ];

  return (
    <section id="faq" style={{ padding: "120px 40px", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 80 }}>
          <div className="section-label">Häufige Fragen</div>
          <h2 className="section-title">FAQ<span style={{ color: ACCENT }}>.</span></h2>
        </div>

        {faqs.map(([q, a], i) => (
          <div key={i} className="faq-item" onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em" }}>{q}</h3>
              <div style={{ minWidth: 24, color: ACCENT }}>
                <Icon name={open === i ? "chevronUp" : "chevronDown"} size={20} color={ACCENT} />
              </div>
            </div>
            {open === i && (
              <p style={{ marginTop: 16, fontSize: 14, color: "#8A8A8A", lineHeight: 1.8, maxWidth: 740 }}>{a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ── FINAL CTA ─────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ padding: "160px 40px", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at center, rgba(232,112,10,0.12) 0%, transparent 70%)`,
      }} />
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="section-label" style={{ marginBottom: 24 }}>Bereit?</div>
        <h2 className="section-title" style={{ marginBottom: 40, maxWidth: 900, margin: "0 auto 40px" }}>
          MEHR SICHERHEIT.<br />
          WENIGER CHAOS.<br />
          <span style={{ color: ACCENT }}>MEHR VANLIFE.</span>
        </h2>
        <p style={{ fontSize: 17, color: "#8A8A8A", maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.8, fontWeight: 300 }}>
          Schluss mit aufspringenden Schubladen. Zeit für das, was wirklich zählt – die Reise.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ padding: "20px 56px", fontSize: 18 }}>Jetzt sichern</button>
          </a>
          <a href="https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-ghost" style={{ padding: "20px 40px" }}>Zum Etsy-Shop</button>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 40px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 28, height: 28, background: ACCENT, clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="lock" size={12} color="#fff" />
              </div>
              <span className="font-display" style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                RAIL<span style={{ color: ACCENT }}>LOCK</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.8, maxWidth: 280 }}>
              Zentrale Schubladensicherung für Camper. Entwickelt von Camperbauern für Camperbauer.
            </p>
            {/* KunstLaserkatze Logo */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", width: "fit-content" }}>
              <img src="/images/logo.png" alt="Kunstlaserkatze Logo" style={{ width: 28, height: 28, objectFit: "contain", filter: "brightness(0.85)" }} />
              <div>
                <div className="font-mono" style={{ fontSize: 8, letterSpacing: "0.12em", color: "#555" }}>PRODUZIERT VON</div>
                <div style={{ fontSize: 11, color: "#888", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>KUNSTLASERKATZE</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              {["Instagram", "YouTube", "TikTok"].map(s => (
                <button key={s} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#555", padding: "8px 14px", fontSize: 11, cursor: "pointer", fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em", transition: "all 0.2s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {[
            ["Produkt", ["Funktionsweise", "Features", "Technische Daten", "Installation"]],
            ["Shop", ["Starter Kit", "Standard Kit", "Full Kit", "Etsy-Shop"]],
            ["Info", [{ label: "Über uns", href: "/ueber-uns.html" }, { label: "Kontakt", href: "/kontakt.html" }, { label: "Impressum", href: "/impressum.html" }, { label: "Datenschutz", href: "/datenschutz.html" }]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.15em", color: ACCENT, marginBottom: 20, textTransform: "uppercase" }}>{title}</div>
              {links.map(l => {
                const label = typeof l === "string" ? l : l.label;
                const href = typeof l === "object" ? l.href : null;
                return href ? (
                  <a key={label} href={href}
                    style={{ display: "block", fontSize: 13, color: "#555", marginBottom: 12, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#B0ADA8"}
                    onMouseOut={e => e.target.style.color = "#555"}
                  >{label}</a>
                ) : (
                  <div key={label} style={{ fontSize: 13, color: "#555", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#B0ADA8"}
                    onMouseOut={e => e.target.style.color = "#555"}
                  >{label}</div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase", marginBottom: 4 }}>Newsletter</div>
            <div style={{ fontSize: 13, color: "#555" }}>Neuigkeiten, Updates und Vanlife-Inspiration.</div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <input type="email" placeholder="deine@email.com" style={{
              background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRight: "none",
              color: "#E0DDD8", padding: "12px 20px", fontSize: 13, outline: "none",
              fontFamily: "'Barlow', sans-serif", width: 260,
            }} />
            <button className="btn-primary" style={{ borderRadius: 0, padding: "12px 24px", fontSize: 12 }}>Anmelden</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p className="font-mono" style={{ fontSize: 10, color: "#333", letterSpacing: "0.08em" }}>
            © 2026 RAILLOCK. ALLE RECHTE VORBEHALTEN.
          </p>
          <p style={{ fontSize: 12, color: "#333" }}>Entwickelt mit ❤️ für die Vanlife Community</p>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="noise-overlay" />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <ProductExplain />
        <HowItWorks />
        <Features />
        <Compatibility />
        <TechSpecs />
        <Comparison />
        <Installation />
        <Gallery />
        <Rundumansicht />
        <VideoSection />
        <Shop />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
