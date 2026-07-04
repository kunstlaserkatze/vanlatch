import { useState, useEffect, useRef, useCallback } from "react";

const ACCENT = "#F07818";
const ETSY_URL = "https://kunstlaserkatze.etsy.com/de/listing/4531181942/zentrale-schubladensicherung-camper-12v";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0B0A09;
    --panel: #131110;
    --panel2: #1A1815;
    --line: rgba(255,255,255,0.07);
    --line-acc: rgba(240,120,24,0.28);
    --txt: #EDE9E3;
    --mut: #9A948B;
    --dim: #6B655C;
    --acc: #F07818;
    --acc2: #FFB35C;
    --grad: linear-gradient(92deg, #F07818 0%, #FFB35C 100%);
    --good: #3DD68C;
    --bad: #F05D5D;
    --r: 14px;
  }

  html { scroll-behavior: smooth; }
  ::selection { background: rgba(240,120,24,0.35); color: #fff; }

  body {
    background: var(--bg);
    color: var(--txt);
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 400;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  img, video { max-width: 100%; }
  a { color: inherit; }

  .disp { font-family: 'Space Grotesk', sans-serif; }
  .mono { font-family: 'JetBrains Mono', monospace; }

  .wrap { max-width: 1240px; margin: 0 auto; padding: 0 28px; }

  /* ── typography ── */
  .eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--acc); margin-bottom: 20px;
  }
  .eyebrow::before {
    content: ""; width: 28px; height: 1px; background: var(--grad); display: inline-block;
  }
  .h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
    font-size: clamp(32px, 4.6vw, 56px);
    line-height: 1.04;
    letter-spacing: -0.03em;
    margin-bottom: 22px;
  }
  .grad-text {
    background: var(--grad);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; color: transparent;
  }
  .lead { font-size: 16.5px; line-height: 1.8; color: var(--mut); font-weight: 300; max-width: 580px; }

  /* ── reveal on scroll ── */
  .rv { opacity: 0; transform: translateY(26px); transition: opacity 0.75s cubic-bezier(0.2,0.6,0.2,1), transform 0.75s cubic-bezier(0.2,0.6,0.2,1); }
  .rv.on { opacity: 1; transform: none; }
  .d1 { transition-delay: 0.08s; } .d2 { transition-delay: 0.16s; }
  .d3 { transition-delay: 0.24s; } .d4 { transition-delay: 0.32s; }
  @media (prefers-reduced-motion: reduce) {
    .rv { opacity: 1; transform: none; transition: none; }
    html { scroll-behavior: auto; }
  }

  /* ── buttons ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--grad); color: #14100B; border: none;
    padding: 16px 32px; border-radius: 999px;
    font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700;
    letter-spacing: 0.01em; cursor: pointer; text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
    box-shadow: 0 4px 24px rgba(240,120,24,0.28);
  }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(240,120,24,0.42); filter: brightness(1.05); }
  .btn:active { transform: translateY(0); }
  .btn-line {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    background: rgba(255,255,255,0.03); color: var(--txt);
    border: 1px solid rgba(255,255,255,0.16);
    padding: 15px 30px; border-radius: 999px;
    font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600;
    cursor: pointer; text-decoration: none;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .btn-line:hover { border-color: var(--acc); color: var(--acc2); background: rgba(240,120,24,0.06); }

  /* ── cards ── */
  .card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: var(--r);
    padding: 30px 28px;
    transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
  }
  .card:hover { border-color: var(--line-acc); background: var(--panel2); transform: translateY(-4px); }

  .icon-chip {
    width: 46px; height: 46px; border-radius: 12px;
    background: rgba(240,120,24,0.09); border: 1px solid rgba(240,120,24,0.18);
    display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
  }

  /* ── layout grids ── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .g2-start { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
  .cards-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .cards-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  section { padding: 110px 0; position: relative; }
  .tint { background: linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.006)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }

  /* ── nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 68px; display: flex; align-items: center;
    transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
    border-bottom: 1px solid transparent;
  }
  .nav.scrolled {
    background: rgba(11,10,9,0.82);
    backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
    border-bottom-color: var(--line);
  }
  .nav-inner { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .nav-links { display: flex; gap: 30px; }
  .nav-link {
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500;
    color: var(--mut); background: none; border: none; cursor: pointer;
    transition: color 0.2s; padding: 6px 0;
  }
  .nav-link:hover { color: var(--txt); }

  .burger { display: none; background: none; border: none; cursor: pointer; padding: 10px; }
  .burger span { display: block; width: 22px; height: 2px; background: var(--txt); margin: 5px 0; border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    position: fixed; inset: 0; z-index: 99;
    background: rgba(11,10,9,0.97); backdrop-filter: blur(20px);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
    opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: auto; }
  .mobile-menu .nav-link { font-size: 26px; font-weight: 600; padding: 12px; color: var(--txt); }

  .progress {
    position: fixed; top: 0; left: 0; height: 2px; z-index: 101;
    background: var(--grad); transition: width 0.1s linear;
  }

  /* ── hero ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    position: relative; overflow: hidden; padding: 140px 0 90px;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 45% at 18% 38%, rgba(240,120,24,0.13) 0%, transparent 60%),
      radial-gradient(ellipse 45% 40% at 85% 15%, rgba(26,144,144,0.07) 0%, transparent 55%),
      linear-gradient(180deg, #0B0A09 0%, #0E0C0A 55%, #0B0A09 100%);
  }
  .hero-grid-pattern {
    position: absolute; inset: 0; opacity: 0.5;
    background-image:
      linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%);
  }
  .h1 {
    font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: clamp(42px, 6.2vw, 82px);
    line-height: 1.0; letter-spacing: -0.035em; margin-bottom: 28px;
  }
  .hero-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px; }
  .pill {
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: 0.08em;
    color: var(--acc2); padding: 7px 14px; border-radius: 999px;
    border: 1px solid rgba(240,120,24,0.3); background: rgba(240,120,24,0.06);
  }
  .hero-stats { display: flex; gap: 44px; margin-top: 56px; padding-top: 40px; border-top: 1px solid var(--line); flex-wrap: wrap; }
  .stat-n { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; }
  .stat-l { font-size: 12px; color: var(--dim); margin-top: 4px; letter-spacing: 0.04em; }

  .media-frame {
    position: relative; border-radius: 18px; overflow: hidden;
    border: 1px solid rgba(240,120,24,0.22);
    box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(240,120,24,0.08);
  }
  .media-frame video, .media-frame img { display: block; width: 100%; }
  .status-chip {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    padding: 13px 22px; margin-top: 16px; border-radius: 12px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--line);
  }
  .status-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--acc); box-shadow: 0 0 14px var(--acc); animation: glowPulse 2.4s ease-in-out infinite; }
  @keyframes glowPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

  .scroll-cue {
    position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--dim); font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.2em;
    animation: cueBob 2.2s ease-in-out infinite;
  }
  @keyframes cueBob { 0%,100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 8px); } }

  /* ── marquee ── */
  .marquee { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 18px 0; background: rgba(255,255,255,0.012); }
  .marquee-track { display: flex; gap: 0; width: max-content; animation: marq 36s linear infinite; }
  .marquee:hover .marquee-track { animation-play-state: paused; }
  @keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item {
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--dim);
    padding: 0 34px; display: flex; align-items: center; gap: 34px; white-space: nowrap;
  }
  .marquee-item::after { content: "◆"; color: var(--acc); font-size: 8px; }

  /* ── switch (interactive demo) ── */
  .sw { display: flex; flex-direction: column; align-items: center; gap: 14px; background: none; border: none; cursor: pointer; }
  .sw-track {
    width: 118px; height: 56px; border-radius: 999px; position: relative;
    background: #201D19; border: 1px solid rgba(255,255,255,0.12);
    transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
  }
  .sw.on .sw-track { background: rgba(240,120,24,0.18); border-color: var(--acc); box-shadow: 0 0 30px rgba(240,120,24,0.25), inset 0 0 16px rgba(240,120,24,0.12); }
  .sw-knob {
    position: absolute; top: 5px; left: 5px; width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(145deg, #37332E, #23201C);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    transition: transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.35s;
  }
  .sw.on .sw-knob { transform: translateX(62px); background: var(--grad); border-color: transparent; }
  .sw-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.2em; color: var(--dim); transition: color 0.35s; }
  .sw.on .sw-label { color: var(--acc); }
  .sw-hint { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.12em; color: var(--dim); }

  /* ── steps timeline ── */
  .step-row { display: flex; gap: 26px; padding-bottom: 42px; position: relative; }
  .step-num {
    width: 52px; height: 52px; min-width: 52px; border-radius: 14px;
    border: 1px solid var(--line-acc); background: var(--panel);
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--acc);
    position: relative; z-index: 1;
  }
  .steps-line { position: absolute; left: 26px; top: 0; bottom: 0; width: 1px; background: linear-gradient(180deg, var(--acc), rgba(240,120,24,0.06)); }

  /* ── tech table ── */
  .tech-row { display: flex; justify-content: space-between; align-items: baseline; gap: 20px; padding: 15px 0; border-bottom: 1px solid var(--line); }
  .tech-row:last-child { border-bottom: none; }

  /* ── compare table ── */
  .cmp-wrap { overflow-x: auto; border: 1px solid var(--line); border-radius: var(--r); background: var(--panel); }
  .cmp { width: 100%; border-collapse: collapse; min-width: 720px; }
  .cmp th, .cmp td { padding: 15px 18px; }
  .cmp thead th { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; color: var(--mut); text-align: center; border-bottom: 1px solid var(--line); }
  .cmp thead th:first-child { text-align: left; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.15em; color: var(--dim); }
  .cmp tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); }
  .cmp tbody tr:last-child { border-bottom: none; }
  .cmp td { text-align: center; font-size: 13px; }
  .cmp td:first-child { text-align: left; color: var(--mut); }
  .cmp .hl { background: rgba(240,120,24,0.06); }
  .cmp thead th.hl { color: var(--acc); border-top: 2px solid var(--acc); }

  /* ── quiz ── */
  .quiz-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 20px 24px; border: 1px solid var(--line); border-radius: var(--r); background: var(--panel); margin-bottom: 10px; flex-wrap: wrap; }
  .quiz-btns { display: flex; gap: 8px; }
  .quiz-btn {
    padding: 9px 22px; border-radius: 999px; cursor: pointer;
    font-family: 'Space Grotesk', sans-serif; font-size: 13.5px; font-weight: 600;
    background: rgba(255,255,255,0.04); color: var(--mut); border: 1px solid rgba(255,255,255,0.12);
    transition: all 0.2s;
  }
  .quiz-btn:hover { border-color: rgba(255,255,255,0.3); color: var(--txt); }
  .quiz-btn.yes.sel { background: rgba(61,214,140,0.12); border-color: var(--good); color: var(--good); }
  .quiz-btn.no.sel { background: rgba(240,93,93,0.12); border-color: var(--bad); color: var(--bad); }
  .verdict { margin-top: 22px; padding: 28px; border-radius: var(--r); border: 1px solid; animation: verdictIn 0.4s ease; }
  @keyframes verdictIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }

  .notfall-box { margin-top: 56px; display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: center; padding: 30px; background: rgba(240,120,24,0.04); border: 1px solid rgba(240,120,24,0.2); border-radius: var(--r); }

  /* ── gallery (Masonry – Bilder immer vollständig sichtbar, kein Zuschnitt) ── */
  .gal { columns: 2; column-gap: 12px; }
  .gal-item { position: relative; overflow: hidden; border-radius: var(--r); background: #111; cursor: zoom-in; border: 1px solid var(--line); break-inside: avoid; margin-bottom: 12px; }
  .gal-item img { width: 100%; height: auto; display: block; transition: transform 0.6s cubic-bezier(0.2,0.6,0.2,1); }
  .gal-item:hover img { transform: scale(1.03); }
  .gal-cap {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.85));
    padding: 52px 18px 15px;
    font-family: 'JetBrains Mono', monospace; font-size: 10.5px; letter-spacing: 0.06em; color: #C9C4BC;
  }
  .lightbox {
    position: fixed; inset: 0; z-index: 200; background: rgba(5,4,3,0.94);
    display: flex; align-items: center; justify-content: center; padding: 40px;
    animation: fadeIn 0.25s ease; cursor: zoom-out;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .lightbox img { max-width: 92vw; max-height: 84vh; object-fit: contain; border-radius: 10px; }
  .lightbox-cap { position: absolute; bottom: 26px; left: 0; right: 0; text-align: center; color: var(--mut); font-family: 'JetBrains Mono', monospace; font-size: 12px; padding: 0 24px; }
  .lightbox-x { position: absolute; top: 22px; right: 26px; background: none; border: none; color: var(--mut); font-size: 30px; cursor: pointer; line-height: 1; }
  .lightbox-x:hover { color: var(--txt); }

  /* ── faq ── */
  .faq-item { border: 1px solid var(--line); border-radius: var(--r); background: var(--panel); margin-bottom: 10px; overflow: hidden; transition: border-color 0.3s; }
  .faq-item.open { border-color: var(--line-acc); }
  .faq-q {
    width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 20px;
    padding: 22px 26px; background: none; border: none; cursor: pointer; text-align: left;
    font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 600; color: var(--txt);
  }
  .faq-chev { transition: transform 0.35s ease; color: var(--acc); flex-shrink: 0; display: flex; }
  .faq-item.open .faq-chev { transform: rotate(180deg); }
  .faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.2,0.6,0.2,1); }
  .faq-item.open .faq-a { grid-template-rows: 1fr; }
  .faq-a-inner { overflow: hidden; }
  .faq-a-inner p { padding: 0 26px 24px; font-size: 14.5px; line-height: 1.85; color: var(--mut); }

  /* ── footer ── */
  .foot { background: #080706; border-top: 1px solid var(--line); padding: 76px 0 40px; }
  .foot-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 52px; margin-bottom: 56px; }
  .foot-h { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--acc); margin-bottom: 18px; text-transform: uppercase; }
  .foot-link { display: block; font-size: 13.5px; color: var(--dim); margin-bottom: 11px; text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; text-align: left; transition: color 0.2s; font-family: 'Inter', sans-serif; }
  .foot-link:hover { color: var(--txt); }

  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 999; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ═══ RESPONSIVE ═══ */
  @media (max-width: 960px) {
    section { padding: 80px 0; }
    .g2, .g2-start { grid-template-columns: 1fr; gap: 48px; }
    .cards-4 { grid-template-columns: repeat(2, 1fr); }
    .cards-3 { grid-template-columns: repeat(2, 1fr); }
    .foot-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
    .nav-links { display: none; }
    .nav-cta-desktop { display: none; }
    .burger { display: block; }
    .sticky-demo { position: static !important; }
  }
  @media (max-width: 620px) {
    .wrap { padding: 0 20px; }
    .cards-4, .cards-3, .cards-2 { grid-template-columns: 1fr; }
    .gal { columns: 1; }
    .hero { padding: 120px 0 70px; }
    .hero-stats { gap: 28px; }
    .foot-grid { grid-template-columns: 1fr; }
    .quiz-q { flex-direction: column; align-items: flex-start; }
    .notfall-box { grid-template-columns: 1fr; justify-items: center; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS & PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const icons = {
    lock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    unlock: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    tool: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    thermo: <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>,
    feather: <><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/></>,
    repeat: <><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></>,
    print: <><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
    box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    cpu: <><rect x="9" y="9" width="6" height="6"/><path d="M15 9V5h-2M9 9V5h2M15 15v4h-2M9 15v4h2M5 9h4M5 15h4M19 9h-4M19 15h-4"/><rect x="2" y="5" width="20" height="14" rx="2"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    chevD: <polyline points="6 9 12 15 18 9"/>,
    arrowR: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    ruler: <><path d="M21.3 8.7l-6-6a1 1 0 0 0-1.4 0l-11.2 11.2a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0L21.3 10a1 1 0 0 0 0-1.4z"/><path d="M7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2"/></>,
  };
  const strokeW = name === "check" || name === "x" ? 2.5 : 1.6;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
      {icons[name] || null}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   NAV + PROGRESS
   ═══════════════════════════════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    ["Produkt", "produkt"], ["Funktion", "funktionsweise"], ["Passt-es-Check", "check"],
    ["Installation", "installation"], ["Shop", "shop"], ["FAQ", "faq"],
  ];
  const go = id => { setOpen(false); setTimeout(() => scrollTo(id), open ? 80 : 0); };

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 11, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, background: "var(--grad)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 14px rgba(240,120,24,0.35)",
            }}>
              <Icon name="lock" size={16} color="#14100B" />
            </div>
            <span className="disp" style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Rail<span className="grad-text">Lock</span>
            </span>
          </div>

          <div className="nav-links">
            {links.map(([l, id]) => (
              <button key={id} className="nav-link" onClick={() => go(id)}>{l}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a className="btn nav-cta-desktop" href={ETSY_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 24px", fontSize: 14 }}>
              Jetzt bestellen
            </a>
            <button className={`burger${open ? " open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menü">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map(([l, id]) => (
          <button key={id} className="nav-link" onClick={() => go(id)}>{l}</button>
        ))}
        <a className="btn" href={ETSY_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: 20 }}>
          Jetzt bestellen
        </a>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg" />
      <div className="hero-grid-pattern" />

      <div className="wrap" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="g2">
          <div>
            <div className="hero-badges rv on">
              {["12 V Bordnetz", "PETG · 3D-gedruckt", "DIY-nachrüstbar", "Made in Germany"].map(b => (
                <span key={b} className="pill">{b}</span>
              ))}
            </div>

            <h1 className="h1">
              Ein Schalter.<br />
              Alle Schubladen.<br />
              <span className="grad-text">Gesichert.</span>
            </h1>

            <p className="lead" style={{ marginBottom: 42 }}>
              RailLock bringt den Komfort einer Auto-Zentralverriegelung in deinen Camper:
              Ein Schalter sichert bis zu fünf Schubladen gleichzeitig – in einer Sekunde
              verriegelt beim Losfahren, mit einem Klick wieder offen am Stellplatz.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn" href={ETSY_URL} target="_blank" rel="noopener noreferrer">
                Jetzt bei Etsy bestellen <Icon name="arrowR" size={17} />
              </a>
              <button className="btn-line" onClick={() => scrollTo("funktionsweise")}>
                So funktioniert&apos;s
              </button>
            </div>

            <div className="hero-stats">
              {[
                ["1", "Schalter für alles"],
                ["≤ 5", "Schubladen pro Schiene"],
                ["−30…75 °C", "Einsatzbereich"],
                ["12 V", "Standard-Bordnetz"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-n grad-text disp">{n}</div>
                  <div className="stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="media-frame">
              <video autoPlay muted loop playsInline style={{ width: "100%", height: "auto", display: "block" }}>
                <source src="/videos/verriegeln_stable.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="status-chip">
              <div className="status-dot" />
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--acc2)" }}>
                VERRIEGELN &middot; ENTRIEGELN &middot; EIN KNOPFDRUCK
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>SCROLL</span>
        <Icon name="chevD" size={16} color="var(--dim)" />
      </div>
    </header>
  );
}

function Marquee() {
  const items = ["Komfort auf Knopfdruck", "Zentralverriegelung", "12 V Bordnetz", "PETG statt PLA", "Vibrationsfest", "Modular bis 5 Schubladen", "DIY-Montage", "Kein Klappern", "Notfallöffnung inklusive"];
  const row = items.map(t => <span key={t} className="marquee-item">{t}</span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row}{items.map(t => <span key={t + "2"} className="marquee-item">{t}</span>)}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROBLEM
   ═══════════════════════════════════════════════════════════════════════════ */
function Problem() {
  const problems = [
    { icon: "unlock", title: "Schubladen springen auf", desc: "Vibrationen während der Fahrt öffnen Schubladen unkontrolliert – Chaos und Schäden inklusive." },
    { icon: "x", title: "Push-Locks versagen", desc: "Konventionelle Push-Locks halten Dauervibration nicht stand und müssen regelmäßig ersetzt werden." },
    { icon: "layers", title: "Einzeln sichern nervt", desc: "Jede Schublade vor jeder Abfahrt einzeln verriegeln? Ein Ritual, das man garantiert einmal vergisst." },
    { icon: "zap", title: "Klappern auf jeder Etappe", desc: "Schlecht gesicherte Schubladen bedeuten konstantes Klappern – zermürbend auf langen Strecken." },
  ];

  return (
    <section>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 64 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Das Problem</div>
          <h2 className="h2">Komfort sieht<br />anders aus.</h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Jeder Camperausbauer kennt es: Bestehende Lösungen machen aus jeder Abfahrt ein
            Ritual und aus jedem Stopp ein Gefummel – bequem ist daran gar nichts.
          </p>
        </div>

        <div className="cards-4">
          {problems.map((p, i) => (
            <div key={i} className={`card rv d${i + 1}`}>
              <div className="icon-chip" style={{ background: "rgba(240,93,93,0.08)", borderColor: "rgba(240,93,93,0.2)" }}>
                <Icon name={p.icon} size={20} color="var(--bad)" />
              </div>
              <h3 className="disp" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>{p.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.7 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 84 }} className="rv">
          <div style={{ width: 1, height: 64, background: "linear-gradient(180deg, rgba(255,255,255,0.1), var(--acc))", margin: "0 auto 28px" }} />
          <div className="eyebrow" style={{ justifyContent: "center" }}>Die Lösung</div>
          <div className="disp" style={{ fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
            Das <span className="grad-text">RailLock</span>-System
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUKT
   ═══════════════════════════════════════════════════════════════════════════ */
function Produkt() {
  const points = [
    ["Zentrale Schiene", "Eine vertikale Schiene verriegelt mehrere Schubladen gleichzeitig – mechanisch simpel und absolut zuverlässig."],
    ["Halterungen", "Halten die Schiene in Position und fixieren bei Bedarf Querstreben des Korpus. Eine Halterung pro Schublade."],
    ["Nummerierte Segmente", "Die Schienensegmente sind nummeriert – ein falscher Einbau ist praktisch ausgeschlossen."],
    ["Kleiner Ausschnitt, große Wirkung", "Ein Ausschnitt (ca. 45 × 30 mm) im Schubladenrücken genügt. Mit Schablone und Stichsäge schnell gesetzt – im eingebauten Zustand unsichtbar."],
    ["Komfort wie im Auto", "Verriegeln und Entriegeln wie mit der Zentralverriegelung deines Autos – ein Schalter statt vieler Handgriffe an jeder einzelnen Schublade."],
  ];

  return (
    <section id="produkt" className="tint">
      <div className="wrap">
        <div className="g2">
          <div className="rv">
            <div className="media-frame">
              <img
                src="/images/Queransicht3.jpg"
                alt="RailLock im Einbau – Haken und Halterung der Verriegelungsschiene greifen durch den Ausschnitt im Schubladenrücken"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          <div className="rv d1">
            <div className="eyebrow">Das Produkt</div>
            <h2 className="h2">Ein System.<br /><span className="grad-text">Alles gesichert.</span></h2>
            <p className="lead" style={{ marginBottom: 38 }}>
              Die zentrale Verriegelungsschiene verbindet alle Schubladen mechanisch.
              Ein einziger 12-V-Stellmotor bewegt die gesamte Schiene – und verriegelt alles gleichzeitig.
            </p>

            {points.map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 26, height: 26, minWidth: 26, borderRadius: 8, marginTop: 1,
                  background: "rgba(240,120,24,0.1)", border: "1px solid rgba(240,120,24,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name="check" size={13} color="var(--acc)" />
                </div>
                <div>
                  <div className="disp" style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                  <div style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.7 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TECHNISCHE ILLUSTRATION (SVG, animiert)
   ═══════════════════════════════════════════════════════════════════════════ */
function RailLockSVG({ locked = true }) {
  const railOffset = locked ? 10 : -5;
  const hookColor = locked ? "url(#svHook)" : "#3A3A3A";
  const motorColor = locked ? ACCENT : "#333";

  const drawerYs = [90, 178, 266, 354];
  const dH = 72, bwX = 80, bwT = 6, fwX = 276, wT = 4;
  const cutT = -36, cutB = -5;
  const iL = bwX + bwT, iR = fwX, iT = cutT + wT, iB = dH / 2 - wT;
  const armY = -26, armH = 10, armXS = 68, armXE = iL + 14;
  const tipXS = armXE - 10, tipXE = armXE, tipLen = 18;

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
        <linearGradient id="svHook" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F07818" />
          <stop offset="100%" stopColor="#FFB35C" />
        </linearGradient>
        <filter id="svGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <rect width="320" height="460" fill="#100E0C" rx="12" />

      {/* Ambient-Glow hinter der Schiene, wenn verriegelt */}
      <ellipse cx="57" cy="230" rx="48" ry="200" fill={ACCENT}
        opacity={locked ? 0.07 : 0} style={{ transition: "opacity 0.6s ease" }} />

      {drawerYs.map((y, i) => (
        <g key={i}>
          <rect x={iL} y={y + iT} width={iR - iL} height={iB - iT} fill="#161311" stroke="none" />
          <rect x={bwX} y={y + cutT} width={fwX - bwX + 8} height={wT} fill="url(#svWall)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <rect x={bwX} y={y + iB} width={fwX - bwX + 8} height={wT} fill="url(#svWall)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          <rect x={bwX} y={y + cutB} width={bwT} height={iB - cutB} fill="url(#svWall)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
          <rect x={fwX} y={y + cutT} width={10} height={dH} fill="#2A2A2A" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <rect x={fwX + 10} y={y - 6} width={6} height={1.5} rx="0.75" fill="#333333" />
          <rect x={fwX + 10} y={y + 5} width={6} height={1.5} rx="0.75" fill="#333333" />
          <rect x={fwX + 14} y={y - 7} width={3} height={15} rx="1.5" fill="#2E2E2E" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <rect x={bwX - 1} y={y + cutT} width={bwT + 2} height={cutB - cutT}
            fill="#0A0A0A"
            stroke={locked ? "rgba(240,120,24,0.5)" : "rgba(255,255,255,0.08)"}
            strokeWidth="1" style={{ transition: "stroke 0.4s" }} />

          {i === 0 && (
            <text x={iL + (iR - iL) / 2} y={y + 4} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="monospace" letterSpacing="1">INNEN</text>
          )}
          {i === 0 && (
            <g>
              <line x1={bwX + bwT / 2} y1={y + cutT + (cutB - cutT) / 2} x2={144} y2={y + cutT - 18} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
              <text x="147" y={y + cutT - 16} fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="0.5">AUSSCHNITT</text>
            </g>
          )}
          {i === 3 && (
            <g>
              <line x1={bwX + bwT / 2} y1={y + iB} x2="88" y2={y + iB + 22} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
              <text x="90" y={y + iB + 17} fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="0.4">SCHUBLADEN-</text>
              <text x="90" y={y + iB + 27} fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="0.4">RÜCKEN</text>
            </g>
          )}
          {i === 3 && (
            <g>
              <line x1={fwX + 5} y1={y + iB} x2="264" y2={y + iB + 22} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
              <text x="262" y={y + iB + 17} fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="0.4" textAnchor="end">SCHUBLADEN-</text>
              <text x="262" y={y + iB + 27} fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace" letterSpacing="0.4" textAnchor="end">FRONT</text>
            </g>
          )}
          {locked && (
            <text x={fwX + 5} y={y + 3} textAnchor="middle" fill={ACCENT} fontSize="7" fontFamily="monospace" style={{ transition: "fill 0.4s" }}>✕</text>
          )}
        </g>
      ))}

      <g style={{ transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1) 0.18s" }} transform={`translate(0, ${railOffset})`}>
        <rect x="46" y="30" width="22" height="370" rx="3" fill="url(#svRail)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <rect x="52" y="30" width="10" height="370" rx="2" fill="#1A1A1A" />
        <rect x="47" y="30" width="3" height="370" rx="1" fill="rgba(255,255,255,0.06)" />

        {[124, 212, 300].map((y, i) => (
          <g key={i}>
            <rect x="42" y={y - 4} width="30" height="8" rx="2" fill="#333" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
            <circle cx="57" cy={y} r="2.5" fill="#444" />
          </g>
        ))}

        <text x="57" y="22" textAnchor="middle" fill="rgba(240,120,24,0.55)" fontSize="7" fontFamily="monospace" letterSpacing="0.5">SCHIENE</text>

        {drawerYs.map((y, i) => (
          <g key={i}>
            <rect x={armXS} y={y + armY - armH / 2} width={armXE - armXS} height={armH} rx="3" fill={hookColor} opacity="0.95" style={{ transition: "fill 0.4s" }} />
            <rect x={tipXS} y={y + armY + armH / 2} width={tipXE - tipXS} height={tipLen} rx="2" fill={hookColor} opacity="0.85" style={{ transition: "fill 0.4s" }} />
            {locked && (
              <>
                <rect x={armXS - 2} y={y + armY - armH / 2 - 3} width={armXE - armXS + 4} height={armH + tipLen + 6} rx="3" fill="none" stroke={ACCENT} strokeWidth="0.7" opacity="0.35" />
                <rect x={bwX - 2} y={y + cutB - 2} width={bwT + 4} height={4} rx="1" fill={ACCENT} opacity="0.5" />
              </>
            )}
            {i === 1 && (
              <g>
                <line x1={armXS + (armXE - armXS) / 2} y1={y + armY - armH / 2 - 2} x2="30" y2={y + armY - 40} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="5" y={y + armY - 42} fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace" letterSpacing="0.5">HAKEN</text>
              </g>
            )}
          </g>
        ))}

        <rect x="54" y="400" width="9" height="22" rx="2" fill="#2E2E2E" />
        {[403, 408, 413].map(y => (
          <rect key={y} x="52" y={y} width="13" height="3" rx="1.5" fill={y === 408 ? "#282828" : "#383838"} />
        ))}
      </g>

      <rect x="49" y="415" width="19" height="8" rx="2" fill="#252525" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <rect x="46" y="418" width="30" height="42" rx="2" fill="#1E1E1E" stroke={motorColor} strokeWidth="1.5" style={{ transition: "stroke 0.4s" }} />
      <rect x="46" y="418" width="30" height="4" rx="2" fill="#272727" />
      <rect x="46" y="456" width="30" height="4" rx="2" fill="#161616" />
      <rect x="49" y="424" width="24" height="30" rx="1" fill="#191919" />
      <circle cx="61" cy="439" r="3" fill={motorColor} opacity="0.9" filter={locked ? "url(#svGlow)" : undefined} style={{ transition: "fill 0.4s" }} />
      <circle cx="61" cy="439" r="1.3" fill={locked ? "#FF9030" : "#1A1A1A"} style={{ transition: "fill 0.4s" }} />
      {locked && <ellipse cx="61" cy="461" rx="22" ry="4" fill={ACCENT} opacity="0.05" />}
      <text x="80" y="437" fill="rgba(240,120,24,0.45)" fontSize="7" fontFamily="monospace" letterSpacing="0.3">STELLMOTOR</text>

      {/* Kabel vom Schalter zum Stellmotor */}
      <path d="M 238 445 L 76 445" stroke="#2A2724" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 238 445 L 76 445" stroke={locked ? "rgba(240,120,24,0.4)" : "rgba(255,255,255,0.06)"} strokeWidth="1" fill="none" style={{ transition: "stroke 0.5s" }} />

      {/* Stromimpuls läuft bei jedem Schaltvorgang vom Schalter zum Motor */}
      <g key={locked ? "pulse-on" : "pulse-off"}>
        <circle r="3" fill="#FFB35C" filter="url(#svGlow)" opacity="0">
          <animateMotion path="M 238 445 L 76 445" dur="0.38s" begin="0s" fill="freeze" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.75;1" dur="0.5s" begin="0s" fill="freeze" />
        </circle>
      </g>

      {/* 12V-Schalter */}
      <text x="262" y="423" textAnchor="middle" fill="rgba(240,120,24,0.45)" fontSize="7" fontFamily="monospace" letterSpacing="0.3">SCHALTER</text>
      <rect x="238" y="428" width="48" height="32" rx="7" fill="#1C1916" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <rect x="245" y={locked ? 433 : 445} width="34" height="10" rx="4"
        fill={locked ? "url(#svHook)" : "#35312C"}
        style={{ transition: "y 0.25s ease, fill 0.25s" }} />

      <rect x="9" y="9" width="95" height="18" rx="4" fill={locked ? "rgba(240,120,24,0.1)" : "rgba(255,255,255,0.03)"} style={{ transition: "fill 0.4s" }} />
      <text x="56" y="21" textAnchor="middle" fill={locked ? ACCENT : "#555"} fontSize="7" fontFamily="monospace" letterSpacing="1" style={{ transition: "fill 0.4s" }}>
        {locked ? "● GESICHERT" : "○ ENTRIEGELT"}
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FUNKTIONSWEISE — interaktive Demo
   ═══════════════════════════════════════════════════════════════════════════ */
function Funktionsweise() {
  const [locked, setLocked] = useState(true);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const t = setInterval(() => setLocked(p => !p), 3200);
    return () => clearInterval(t);
  }, [touched]);

  const toggle = useCallback(() => { setTouched(true); setLocked(p => !p); }, []);

  const steps = [
    { n: "01", title: "Schalter betätigen", desc: "Ein simpler 12-V-Schalter im Cockpit oder Innenraum – intuitiv, schnell, zuverlässig." },
    { n: "02", title: "Stellmotor aktiviert", desc: "Der Zentralverriegelungs-Stellmotor erhält den Impuls und bewegt die vertikale Schiene." },
    { n: "03", title: "Schiene verriegelt", desc: "Die Haken der Schiene greifen in alle Schubladenausschnitte gleichzeitig. Kein Spielraum." },
    { n: "04", title: "Entspannt fahren", desc: "Keine aufspringenden Schubladen, kein Klappern – nur du, die Straße und Ruhe im Ausbau." },
    { n: "05", title: "Entriegeln im Stand", desc: "Schalter erneut betätigen – die Schiene hebt sich, alle Schubladen sind wieder frei zugänglich." },
  ];

  return (
    <section id="funktionsweise">
      <div className="wrap">
        <div className="g2-start">
          <div>
            <div className="rv" style={{ marginBottom: 52 }}>
              <div className="eyebrow">Funktionsweise</div>
              <h2 className="h2">So einfach<br /><span className="grad-text">funktioniert es</span></h2>
            </div>

            <div style={{ position: "relative" }} className="rv d1">
              <div className="steps-line" />
              {steps.map((s, i) => (
                <div key={i} className="step-row">
                  <div className="step-num mono">{s.n}</div>
                  <div style={{ paddingTop: 6 }}>
                    <h3 className="disp" style={{ fontSize: 21, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.7, maxWidth: 400 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky-demo rv d2" style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
            <RailLockSVG locked={locked} />
            <button className={`sw${locked ? " on" : ""}`} onClick={toggle} aria-pressed={locked} aria-label="Verriegelung umschalten">
              <span className="sw-track"><span className="sw-knob" /></span>
              <span className="sw-label">{locked ? "VERRIEGELT" : "ENTRIEGELT"}</span>
            </button>
            <span className="sw-hint">{touched ? "TECHNISCHE ILLUSTRATION · VEREINFACHT" : "▲ PROBIER'S AUS — SCHALTER KLICKEN"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════════════════════════════════════ */
function Features() {
  const features = [
    { icon: "lock", title: "Ein Knopfdruck statt fünf Handgriffe", desc: "Ein Schalter sichert alle Schubladen gleichzeitig – ohne Bücken, ohne Einzeldrücken, in einer Sekunde erledigt." },
    { icon: "unlock", title: "Dauerhaft entriegelbar", desc: "Am Stellplatz einfach offen lassen – wie zuhause. Kein ständiges Drücken wie bei Push-Locks." },
    { icon: "layers", title: "Modular bis 5 Schubladen", desc: "Erweiterbar auf bis zu fünf gestapelte Schubladen – passend zu deinem Korpus gefertigt." },
    { icon: "tool", title: "DIY-freundlich", desc: "Nachrüstung ohne Fachbetrieb. Schablone, Anleitung und Montageset inklusive." },
    { icon: "repeat", title: "Wartungsarm", desc: "Mechanisch simpel. Kein Service, keine Ersatzteile, kein Verschleißdrama." },
    { icon: "print", title: "3D-gedruckt & offen", desc: "Fertiges Kit oder STL-Dateien zum Selbstdrucken – du entscheidest." },
    { icon: "shield", title: "Vibrationsfest", desc: "Speziell für Dauervibration im Fahrbetrieb konstruiert." },
    { icon: "thermo", title: "−30 °C bis +75 °C", desc: "PETG bleibt formstabil – vom Wintertrip bis zum Hochsommer auf dem Campingplatz." },
    { icon: "box", title: "Unsichtbar verbaut", desc: "Sitzt komplett hinter den Schubladen. Von außen ist nichts zu sehen." },
    { icon: "feather", title: "Leichtgewicht", desc: "3D-Druck statt Stahlkonstruktion – minimales Zusatzgewicht im Ausbau." },
    { icon: "cpu", title: "Simpel ist zuverlässig", desc: "Nur ein 12-V-Stellmotor und ein Schalter. Was nicht kompliziert ist, geht auch nicht kaputt." },
    { icon: "truck", title: "Aus der Praxis", desc: "Von Camperausbauern entwickelt und im eigenen Fahrzeug im Dauereinsatz." },
  ];

  return (
    <section id="features" className="tint">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 64 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Features</div>
          <h2 className="h2">Alles drin.<br /><span className="grad-text">Nichts überflüssig.</span></h2>
        </div>

        <div className="cards-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))" }}>
          {features.map((f, i) => (
            <div key={i} className={`card rv d${(i % 4) + 1}`} style={{ cursor: "default" }}>
              <div className="icon-chip">
                <Icon name={f.icon} size={20} color="var(--acc)" />
              </div>
              <h3 className="disp" style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "var(--mut)", lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PASST-ES-CHECK (interaktives Quiz)
   ═══════════════════════════════════════════════════════════════════════════ */
function KompatCheck() {
  const questions = [
    { q: "Sind deine Schubladen übereinander gestapelt?", hint: "RailLock verriegelt vertikal gestapelte Schubladen – nebeneinander liegende sind nicht kompatibel." },
    { q: "Hast du mindestens 3 cm Platz hinter den Schubladenrücken?", hint: "Der Stellmotor braucht diesen Raum zwischen Schubladenrücken und Rückwand." },
    { q: "Ist ein 12-V-Anschluss in der Nähe verfügbar oder verlegbar?", hint: "Das System läuft am Standard-Bordnetz – eine Leitung zum Korpus genügt." },
    { q: "Kommst du an die Rückseite des Schubladenkorpus heran?", hint: "Für Montage und Notfallöffnung sollte die Rückseite erreichbar sein." },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const set = (i, v) => setAnswers(a => a.map((x, j) => (j === i ? v : x)));

  const answered = answers.every(a => a !== null);
  const allYes = answered && answers.every(a => a === true);
  const fails = questions.filter((_, i) => answers[i] === false);

  return (
    <section id="check">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Der Passt-es-Check</div>
          <h2 className="h2">Passt RailLock in<br /><span className="grad-text">deinen Ausbau?</span></h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Vier ehrliche Fragen – 20 Sekunden. RailLock ist nicht für jeden Aufbau geeignet,
            und das sagen wir dir lieber vor der Bestellung.
          </p>
        </div>

        <div className="rv d1">
          {questions.map((item, i) => (
            <div key={i} className="quiz-q">
              <div>
                <div className="disp" style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                  <span className="mono" style={{ color: "var(--acc)", fontSize: 11, marginRight: 10 }}>0{i + 1}</span>
                  {item.q}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--dim)", lineHeight: 1.6 }}>{item.hint}</div>
              </div>
              <div className="quiz-btns">
                <button className={`quiz-btn yes${answers[i] === true ? " sel" : ""}`} onClick={() => set(i, true)}>Ja</button>
                <button className={`quiz-btn no${answers[i] === false ? " sel" : ""}`} onClick={() => set(i, false)}>Nein</button>
              </div>
            </div>
          ))}

          {!answered && (
            <p className="mono" style={{ fontSize: 11, color: "var(--dim)", letterSpacing: "0.1em", textAlign: "center", marginTop: 18 }}>
              {answers.filter(a => a !== null).length} / {questions.length} BEANTWORTET
            </p>
          )}

          {answered && allYes && (
            <div className="verdict" style={{ borderColor: "rgba(61,214,140,0.4)", background: "rgba(61,214,140,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <Icon name="check" size={22} color="var(--good)" />
                <div className="disp" style={{ fontSize: 21, fontWeight: 700, color: "var(--good)" }}>RailLock passt zu deinem Ausbau.</div>
              </div>
              <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.8, marginBottom: 20 }}>
                Alle Voraussetzungen sind erfüllt. Miss deinen Schubladenkorpus aus und bestell dein
                passgenau gefertigtes Kit – oder die STL-Dateien für deinen eigenen Drucker.
              </p>
              <a className="btn" href={ETSY_URL} target="_blank" rel="noopener noreferrer">
                Kit bei Etsy konfigurieren <Icon name="arrowR" size={16} />
              </a>
            </div>
          )}

          {answered && !allYes && (
            <div className="verdict" style={{ borderColor: "rgba(240,120,24,0.4)", background: "rgba(240,120,24,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <Icon name="x" size={20} color="var(--acc)" />
                <div className="disp" style={{ fontSize: 21, fontWeight: 700, color: "var(--acc2)" }}>Das wird knifflig.</div>
              </div>
              <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.8, marginBottom: 14 }}>
                Mindestens eine Voraussetzung ist bei dir nicht erfüllt:
              </p>
              <ul style={{ listStyle: "none", marginBottom: 18 }}>
                {fails.map(f => (
                  <li key={f.q} style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.7, padding: "6px 0", display: "flex", gap: 10 }}>
                    <span style={{ color: "var(--bad)" }}>✕</span> {f.q}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.7 }}>
                Bei schwer zugänglicher Rückseite wird die Montage deutlich aufwendiger, nebeneinander
                liegende Schubladen sind nicht kompatibel. Im Zweifel: <a href="/kontakt.html" style={{ color: "var(--acc2)" }}>schreib uns</a> –
                wir sagen dir ehrlich, ob es passt.
              </p>
            </div>
          )}
        </div>

        {/* Notfallöffnung */}
        <div className="rv d2 notfall-box">
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--acc)", marginBottom: 12 }}>NOTFALLÖFFNUNG</div>
            <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.8 }}>
              Bei Stromausfall lässt sich die Schiene mit dem mitgelieferten <strong style={{ color: "var(--txt)", fontWeight: 500 }}>manuellen Schieber</strong> von
              der Rückseite hochschieben. Ist die Rückseite nicht erreichbar, plane vor dem Einbau eine
              individuelle Notfall-Lösung ein.
            </p>
          </div>
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(240,120,24,0.3)", flexShrink: 0 }}>
            <video autoPlay muted loop playsInline style={{ width: 150, height: 190, objectFit: "cover", display: "block" }}>
              <source src="/videos/schieber_notfall.mp4" type="video/mp4" />
            </video>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", padding: "5px 8px" }}>
              <span className="mono" style={{ fontSize: 8, color: "var(--acc)", letterSpacing: "0.1em" }}>MANUELLER SCHIEBER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TECHNISCHE DATEN
   ═══════════════════════════════════════════════════════════════════════════ */
function TechSpecs() {
  const specs = [
    ["Material", "PETG (Polyethylenterephthalat-Glykol)"],
    ["Temperaturbereich", "−30 °C bis +75 °C"],
    ["Betriebsspannung", "12 V DC (Zentralverriegelung)"],
    ["Segmentlänge", "< 25 cm je Segment"],
    ["Führungssystem", "Mittige U-Führung"],
    ["Justierbereich", "±10 mm"],
    ["Schraubenstandard", "M3 / M4"],
    ["Farbe", "Schwarz / RAL 9005"],
    ["Anwendung", "Camper, Kastenwagen, Vans"],
    ["Lieferformat", "Fertiges Kit oder STL-Dateien (kundenspezifisch)"],
  ];

  return (
    <section id="specs" className="tint">
      <div className="wrap">
        <div className="g2-start">
          <div className="rv">
            <div className="eyebrow">Technische Daten</div>
            <h2 className="h2">Technisch<br /><span className="grad-text">durchdacht</span></h2>
            <p className="lead" style={{ marginBottom: 40 }}>
              Jedes Detail ist für den Einsatz im fahrenden Fahrzeug optimiert.
              PETG statt PLA – weil Qualität keine Kompromisse kennt.
            </p>

            <div style={{ padding: 28, background: "rgba(240,120,24,0.05)", border: "1px solid rgba(240,120,24,0.2)", borderRadius: "var(--r)", marginBottom: 20 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--acc)", marginBottom: 12 }}>WARUM PETG?</div>
              <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.8 }}>
                PLA würde bei Sommerhitze im Fahrzeug erweichen. PETG bleibt bis 75 °C formstabil,
                ist schlagzäh, UV-beständig und für mechanische Dauerbelastung ausgelegt.
              </p>
            </div>

            <div className="media-frame" style={{ background: "#fff", borderColor: "var(--line)" }}>
              <img src="/images/detailbild2.png" alt="Schienensegmente und manueller Schieber – 3D-Modell" style={{ display: "block", width: "100%" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "26px 16px 12px" }}>
                <span className="mono" style={{ fontSize: 9.5, color: "#C9C4BC", letterSpacing: "0.08em" }}>
                  Schienensegmente und manueller Schieber — 3D-Modell
                </span>
              </div>
            </div>
          </div>

          <div className="rv d1" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r)", padding: "18px 30px" }}>
            {specs.map(([k, v]) => (
              <div key={k} className="tech-row">
                <span className="mono" style={{ fontSize: 11, color: "var(--dim)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{k}</span>
                <span style={{ fontSize: 14, color: "var(--txt)", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VERGLEICH
   ═══════════════════════════════════════════════════════════════════════════ */
function Vergleich() {
  const cols = [
    { name: "Pull-Lock", link: "https://www.amazon.de/dp/B07C6F9PN6", features: [false, false, false, true, true, false, false] },
    { name: "Push-Lock", link: null, features: [false, false, false, true, true, false, false] },
    { name: "Kugelschnapper", link: "https://www.amazon.de/dp/B07JFNP6JY", features: [false, false, false, true, true, false, false] },
    { name: "Magnet-Kindersicherung", link: "https://www.amazon.de/dp/B073C54BCM", features: [false, false, false, false, true, false, false] },
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
    <section id="vergleich">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Vergleich</div>
          <h2 className="h2">Der Unterschied<br />ist <span className="grad-text">messbar</span></h2>
        </div>

        <div className="cmp-wrap rv d1">
          <table className="cmp">
            <thead>
              <tr>
                <th>EIGENSCHAFT</th>
                {cols.map(c => (
                  <th key={c.name} className={c.highlight ? "hl" : ""}>
                    {c.link
                      ? <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.2)" }}>{c.name}</a>
                      : c.name}
                    {c.highlight && <div className="mono" style={{ fontSize: 9, color: "var(--acc)", marginTop: 4, letterSpacing: "0.12em" }}>EMPFOHLEN</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  <td>{row}</td>
                  {cols.map((c, ci) => (
                    <td key={ci} className={c.highlight ? "hl" : ""}>
                      {c.features[ri]
                        ? <Icon name="check" size={16} color={c.highlight ? "var(--acc)" : "var(--good)"} />
                        : <Icon name="x" size={15} color="#4A453E" />}
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

/* ═══════════════════════════════════════════════════════════════════════════
   INSTALLATION
   ═══════════════════════════════════════════════════════════════════════════ */
function Installation() {
  const steps = [
    { n: "1", title: "Maße angeben", desc: "Schubladenblock ausmessen und Maße bei der Bestellung angeben – die Segmente werden passgenau gefertigt." },
    { n: "2", title: "Schiene aufbauen", desc: "Segmente, Halterungen und Stellmotor zusammenstecken und verschrauben." },
    { n: "3", title: "Ausschnitte setzen", desc: "Mit der mitgelieferten Schablone Ausschnitte in die Schubladenrücken anzeichnen und aussägen." },
    { n: "4", title: "Anschließen & testen", desc: "Stellmotor mit 12-V-Bordnetz und Schalter verbinden, Funktion prüfen – fertig." },
  ];

  const included = [
    "Kundenspezifische Schienensegmente (PETG)",
    "Halterungen (eine pro Schublade)",
    "Stellmotor-Gehäuse",
    "Schablone für Schubladenausschnitte",
    "Manueller Schieber + Rahmen",
    "Hakenverlängerer",
    "Schrauben, Federring, Mutter",
    "Kantenschutz (optional)",
    "Detaillierte Montageanleitung",
  ];

  return (
    <section id="installation" className="tint">
      <div className="wrap">
        <div className="g2-start">
          <div className="rv">
            <div className="eyebrow">Installation</div>
            <h2 className="h2">Ein Nachmittag.<br /><span className="grad-text">Dann Ruhe.</span></h2>
            <p className="lead" style={{ marginBottom: 34 }}>
              Mit Montageset und detaillierter Anleitung rechnen erfahrene Camperausbauer mit
              ca. 2–3 Stunden. Die tatsächliche Zeit hängt von Zugänglichkeit, Korpusaufbau und Werkzeug ab.
            </p>
            <a className="btn-line" href="/montageanleitung.html" target="_blank" rel="noopener noreferrer">
              Montageanleitung ansehen <Icon name="arrowR" size={16} />
            </a>

            <div style={{ marginTop: 40, padding: 26, background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r)" }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--dim)", marginBottom: 14 }}>LIEFERUMFANG</div>
              {included.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13.5, color: "var(--mut)" }}>
                  <Icon name="check" size={12} color="var(--acc)" />
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 14, lineHeight: 1.6 }}>
                * Elektrische Komponenten (Zentralverriegelungsset inkl. Stellmotor & Steuergerät, Schalter, Kabel,
                Sicherung) sind nicht enthalten. Empfehlungen findest du in der Montageanleitung und im Shop-Bereich.
              </p>
            </div>
          </div>

          <div className="rv d1" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {steps.map((s, i) => (
              <div key={i} className="card" style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
                <div className="disp" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, minWidth: 34 }}>
                  <span className="grad-text">{s.n}</span>
                </div>
                <div>
                  <div className="disp" style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.7 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GALERIE mit Lightbox
   ═══════════════════════════════════════════════════════════════════════════ */
function Galerie() {
  const photos = [
    { src: "/images/schubladen_vorne.jpg", caption: "Eingebaut – vier Schubladen, von außen sauber und unsichtbar gesichert" },
    { src: "/images/einbau_seitenansicht.jpg", caption: "RailLock im eingebauten Zustand – Seitenansicht" },
    { src: "/images/ausschnitt_innen.jpg", caption: "Von innen – der Haken greift präzise durch den Ausschnitt im Schubladenrücken" },
    { src: "/images/schalter.jpg", caption: "Bedienung – ein Knopfdruck sichert alle Schubladen gleichzeitig" },
    { src: "/images/gallery_haken_detail.jpg", caption: "Hakendetail – der Haken blockiert die Schublade von innen" },
    { src: "/images/rueckwand.jpg", caption: "Rückseite des Korpus – manueller Schieber von außen zugänglich" },
  ];
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const h = e => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section id="galerie">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Galerie</div>
          <h2 className="h2">So sieht es<br /><span className="grad-text">im Einbau aus</span></h2>
        </div>

        <div className="gal rv d1">
          {photos.map((p, i) => (
            <div key={i} className="gal-item" onClick={() => setLightbox(i)}>
              <img src={p.src} alt={p.caption} loading="lazy" />
              <div className="gal-cap">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-x" aria-label="Schließen">×</button>
          <img src={photos[lightbox].src} alt={photos[lightbox].caption} onClick={e => e.stopPropagation()} style={{ cursor: "default" }} />
          <div className="lightbox-cap">{photos[lightbox].caption}</div>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   IN AKTION (Video + 360°)
   ═══════════════════════════════════════════════════════════════════════════ */
function InAktion() {
  return (
    <section id="aktion" style={{ background: "#070605", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 52 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>In Aktion</div>
          <h2 className="h2">Echte Verriegelung.<br /><span className="grad-text">Kein Rendering.</span></h2>
          <p className="lead" style={{ margin: "0 auto" }}>Demonstration im eingebauten Zustand – so arbeitet RailLock in echt.</p>
        </div>

        <div className="media-frame rv d1" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <video autoPlay muted loop playsInline style={{ width: "100%", display: "block", maxHeight: 600, objectFit: "contain", background: "#000" }}>
            <source src="/videos/demo.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="rv d2" style={{ marginTop: 60, textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--dim)", marginBottom: 24 }}>360°-ANSICHT — ALLE KOMPONENTEN</div>
          <div className="media-frame" style={{ display: "inline-block", maxWidth: 780 }}>
            <video autoPlay muted loop playsInline aria-label="360°-Rundumansicht des RailLock-Systems: Schiene, Haken, Stellmotor und manueller Schieber" style={{ display: "block", width: "100%", background: "#000" }}>
              <source src="/videos/rundumansicht.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHOP
   ═══════════════════════════════════════════════════════════════════════════ */
function Shop() {
  const steps = [
    { n: "1", icon: "ruler", title: "Maße ermitteln", desc: "Dicke der Schubladenrücken und Abstände zwischen den Rücken messen – bis zu 5 Schubladen." },
    { n: "2", icon: "box", title: "Etsy-Shop aufrufen", desc: "Direkt über unseren Etsy-Shop bestellen. Alle Segmente werden kundenspezifisch gefertigt." },
    { n: "3", icon: "tool", title: "Maße angeben", desc: "Anzahl der Schubladen und alle Maße im Bestellformular eintragen – ohne sie kein passendes Kit." },
    { n: "4", icon: "truck", title: "Einbauen & losfahren", desc: "Individuell gefertigtes Kit inklusive Montageanleitung erhalten und einbauen." },
  ];

  const notIncluded = [
    { text: "12V-Zentralverriegelungsset (Stellmotor & Steuergerät)", link: "https://www.amazon.de/dp/B09C89SS3L" },
    { text: "12V-Schalter", link: "https://www.amazon.de/dp/B0FP96V7N3" },
    { text: "Kabel, Sicherung, elektrische Verbinder", link: null },
    { text: "Korpus-Befestigungsschrauben", link: null },
    { text: "Werkzeug", link: null },
  ];

  return (
    <section id="shop" className="tint">
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 64 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Bestellung</div>
          <h2 className="h2">Dein Kit.<br /><span className="grad-text">Nach deinen Maßen.</span></h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Kein Produkt von der Stange: Jedes Kit wird individuell für deinen Schubladenkorpus gefertigt.
          </p>
        </div>

        <div className="cards-4" style={{ marginBottom: 56 }}>
          {steps.map((s, i) => (
            <div key={i} className={`card rv d${i + 1}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div className="icon-chip" style={{ marginBottom: 0 }}>
                  <Icon name={s.icon} size={19} color="var(--acc)" />
                </div>
                <span className="disp grad-text" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, opacity: 0.55 }}>{s.n}</span>
              </div>
              <div className="disp" style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "var(--mut)", lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Kaufoptionen */}
        <div className="cards-2 rv" style={{ marginBottom: 16, alignItems: "stretch" }}>
          <div style={{ background: "linear-gradient(160deg, rgba(240,120,24,0.1), rgba(240,120,24,0.02))", border: "1px solid rgba(240,120,24,0.35)", borderRadius: "var(--r)", padding: 34, display: "flex", flexDirection: "column" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--acc)", marginBottom: 12 }}>OPTION A — PHYSISCHES KIT</div>
            <div className="disp" style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>Fertiges Kit</div>
            <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.75, marginBottom: 26, flexGrow: 1 }}>
              Kundenspezifisch in PETG gedruckt und versandfertig. Alles dabei – auspacken, einbauen, losfahren.
            </p>
            <a className="btn" href={ETSY_URL} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
              Zum Etsy-Shop <Icon name="arrowR" size={16} />
            </a>
            <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 12, textAlign: "center" }}>Maßangabe erforderlich · individuelle Fertigung</p>
          </div>

          <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r)", padding: 34, display: "flex", flexDirection: "column" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--dim)", marginBottom: 12 }}>OPTION B — NUR DRUCKDATEN</div>
            <div className="disp" style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>STL-Dateien</div>
            <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.75, marginBottom: 14 }}>
              Für alle mit eigenem 3D-Drucker. Günstiger als das fertige Kit – du druckst selbst.
              Ausschließlich in PETG drucken.
            </p>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--mut)", marginBottom: 24, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 10, flexGrow: 0 }}>
              <span style={{ color: "var(--acc)" }}>~30 Std.</span> Druckzeit pro Schiene inkl. Zubehör · Material: PETG
            </div>
            <div style={{ flexGrow: 1 }} />
            <a className="btn-line" href={ETSY_URL} target="_blank" rel="noopener noreferrer" style={{ width: "100%" }}>
              STL-Dateien bestellen <Icon name="arrowR" size={16} />
            </a>
            <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 12, textAlign: "center" }}>Maßangabe erforderlich · kein physisches Kit</p>
          </div>
        </div>

        {/* Nicht enthalten */}
        <div className="rv d1" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "var(--r)", padding: "28px 30px" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--dim)", marginBottom: 16 }}>NICHT ENTHALTEN — SEPARAT BESCHAFFEN</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "4px 28px" }}>
            {notIncluded.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", fontSize: 13.5, color: "var(--mut)" }}>
                <Icon name="x" size={12} color="#4A453E" />
                {f.link ? (
                  <a href={f.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--acc2)", textDecoration: "underline", textDecorationColor: "rgba(240,120,24,0.35)" }}>
                    {f.text} ↗
                  </a>
                ) : f.text}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: "var(--dim)", marginTop: 14, lineHeight: 1.6 }}>
            Getestete Bezugsquellen sind verlinkt bzw. in der Montageanleitung dokumentiert.
            Die elektrische Installation liegt in der Verantwortung des Kunden.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST
   ═══════════════════════════════════════════════════════════════════════════ */
function Trust() {
  const facts = [
    { icon: "check", title: "Praxiserprobt im eigenen Camper", desc: "Verriegelung und Entriegelung erfolgreich im eigenen Einbau getestet. Das System ist aktiv in Nutzung." },
    { icon: "thermo", title: "Sommerhitze bestanden", desc: "Erfolgreich bei sommerlichen Fahrzeugtemperaturen getestet – PETG-Version ohne jede Verformung im Einsatz." },
    { icon: "repeat", title: "2.000+ Schaltvorgänge", desc: "Das Holz-Vorgängersystem mit identischem Stellmotor wurde über 2.000 Mal erfolgreich geschaltet." },
  ];

  return (
    <section>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 60 }} className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Aus dem eigenen Einbau</div>
          <h2 className="h2">Praxiserprobt.<br /><span className="grad-text">Ehrlich berichtet.</span></h2>
          <p className="lead" style={{ margin: "0 auto" }}>
            Keine bezahlten Bewertungen, keine geschönten Zahlen – nur dokumentierte Ergebnisse aus dem eigenen Camper-Aufbau.
          </p>
        </div>

        <div className="cards-3">
          {facts.map((f, i) => (
            <div key={i} className={`card rv d${i + 1}`}>
              <div className="icon-chip">
                <Icon name={f.icon} size={20} color="var(--acc)" />
              </div>
              <h3 className="disp" style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13.5, color: "var(--mut)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="rv" style={{ maxWidth: 720, margin: "48px auto 0", textAlign: "center", padding: 30, background: "rgba(240,120,24,0.04)", border: "1px solid rgba(240,120,24,0.18)", borderRadius: "var(--r)" }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--acc)", marginBottom: 12 }}>PILOT-TESTPHASE</div>
          <p style={{ fontSize: 14, color: "var(--mut)", lineHeight: 1.8 }}>
            Wir suchen aktuell externe Pilot-Tester aus der Camper-Community: reale Einbauerfahrungen sammeln,
            Anleitung verbessern, Kompatibilität breiter validieren. <a href="/kontakt.html" style={{ color: "var(--acc2)" }}>Melde dich</a>, wenn du dabei sein willst.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 52, marginTop: 68, flexWrap: "wrap" }} className="rv d1">
          {[["🇩🇪", "Made in Germany"], ["♻️", "Nachhaltig produziert"], ["🔧", "DIY-Community"], ["📦", "Schneller Versand"]].map(([e, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{e}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--dim)", letterSpacing: "0.1em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["Passt das System in meinen Camper?", "Das System ist für übereinander gestapelte Schubladen in Campern ausgelegt. Voraussetzungen: mindestens 3 cm Platz hinter den Schubladenrücken (für den Stellmotor), ein 12-V-Bordnetz und eine erreichbare Rückseite des Schubladenkorpus. Mach am besten den Passt-es-Check weiter oben auf dieser Seite."],
    ["Benötige ich elektrische Kenntnisse?", "Grundkenntnisse der 12-V-Fahrzeugelektrik sind hilfreich. Im Lieferumfang ist eine kleine Verkabelungshilfe enthalten, die zeigt, wie das System im eigenen Aufbau angeschlossen wurde. Absicherung, Leitungsführung und elektrischer Anschluss liegen in der Verantwortung des Kunden."],
    ["Kann ich das System selbst drucken?", "Ja. Es gibt zwei Varianten: das fertig gedruckte Kit, versandfertig und einbaubereit – oder nur die STL-Dateien zum vollständigen Selbstdrucken. Wichtig beim Selbstdruck: nur PETG verwenden, PLA ist nicht temperaturbeständig genug."],
    ["Welche Schubladen sind kompatibel?", "Übereinander gestapelte Schubladen, in deren Rücken ein Ausschnitt (ca. 45 × 30 mm) gesetzt werden kann – die mitgelieferte Schablone erleichtert das Anzeichnen. Nebeneinander liegende Schubladen sind nicht kompatibel."],
    ["Ist das System vibrationsfest?", "Ja. Das System wurde speziell für den Einsatz in fahrenden Fahrzeugen entwickelt. Die PETG-Schiene und die mittige U-Führung sorgen für Stabilität; die Schrauben lockern sich im Betrieb nicht, da sie direkt in PETG eingeschraubt werden."],
    ["Warum PETG statt PLA?", "PLA erweicht bereits ab ca. 60 °C – ein realer Wert im Fahrzeug im Sommer. PETG bleibt bis 75 °C formstabil, ist schlagzäher, UV-beständiger und für mechanische Dauerbelastung geeignet."],
    ["Welche Zentralverriegelung wird empfohlen?", "Ein 12-V-Zentralverriegelungsset mit Stellmotor (5 Kabel), Steuergerät und passender Bauform für das gedruckte Stellmotor-Gehäuse. Ein konkreter, getesteter Bezugslink ist im Shop-Bereich dieser Seite und in der Montageanleitung hinterlegt."],
  ];

  return (
    <section id="faq" className="tint">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ marginBottom: 48 }} className="rv">
          <div className="eyebrow">Häufige Fragen</div>
          <h2 className="h2">Noch Fragen<span className="grad-text">?</span></h2>
        </div>

        <div className="rv d1">
          {faqs.map(([q, a], i) => (
            <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                {q}
                <span className="faq-chev"><Icon name="chevD" size={19} /></span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner"><p>{a}</p></div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: 14, color: "var(--dim)", textAlign: "center" }} className="rv d2">
          Deine Frage war nicht dabei? <a href="/kontakt.html" style={{ color: "var(--acc2)" }}>Schreib uns direkt.</a>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{ padding: "150px 0", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(240,120,24,0.13) 0%, transparent 70%)" }} />
      <div className="hero-grid-pattern" style={{ opacity: 0.35 }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="rv">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Bereit?</div>
          <div className="disp" style={{ fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 30 }}>
            Mehr Komfort.<br />
            Weniger Handgriffe.<br />
            <span className="grad-text">Mehr Vanlife.</span>
          </div>
          <p className="lead" style={{ margin: "0 auto 48px" }}>
            Schluss mit Push-Lock-Gefummel und aufspringenden Schubladen.
            Zeit für das, was wirklich zählt – die Reise.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn" href={ETSY_URL} target="_blank" rel="noopener noreferrer" style={{ padding: "19px 48px", fontSize: 16.5 }}>
              Jetzt Kit sichern <Icon name="arrowR" size={18} />
            </a>
            <button className="btn-line" onClick={() => scrollTo("check")} style={{ padding: "18px 36px" }}>
              Erst den Passt-es-Check machen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--grad)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="lock" size={14} color="#14100B" />
              </div>
              <span className="disp" style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em" }}>
                Rail<span className="grad-text">Lock</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8, maxWidth: 280, marginBottom: 22 }}>
              Zentrale Schubladensicherung für Camper. Entwickelt von Camperausbauern für Camperausbauer.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 12, width: "fit-content" }}>
              <img src="/images/logo.png" alt="Kunstlaserkatze Logo" style={{ width: 28, height: 28, objectFit: "contain", filter: "brightness(0.85)" }} />
              <div>
                <div className="mono" style={{ fontSize: 8, letterSpacing: "0.14em", color: "var(--dim)" }}>PRODUZIERT VON</div>
                <div className="disp" style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>KUNSTLASERKATZE</div>
              </div>
            </div>
          </div>

          <div>
            <div className="foot-h">Produkt</div>
            {[["Funktionsweise", "funktionsweise"], ["Features", "features"], ["Passt-es-Check", "check"], ["Technische Daten", "specs"], ["Installation", "installation"]].map(([l, id]) => (
              <button key={id} className="foot-link" onClick={() => scrollTo(id)}>{l}</button>
            ))}
          </div>

          <div>
            <div className="foot-h">Bestellen</div>
            <a className="foot-link" href={ETSY_URL} target="_blank" rel="noopener noreferrer">Fertiges Kit (Etsy)</a>
            <a className="foot-link" href={ETSY_URL} target="_blank" rel="noopener noreferrer">STL-Dateien (Etsy)</a>
            <a className="foot-link" href="/montageanleitung.html" target="_blank" rel="noopener noreferrer">Montageanleitung</a>
          </div>

          <div>
            <div className="foot-h">Info</div>
            <a className="foot-link" href="/ueber-uns.html">Über uns</a>
            <a className="foot-link" href="/kontakt.html">Kontakt</a>
            <a className="foot-link" href="/impressum.html">Impressum</a>
            <a className="foot-link" href="/datenschutz.html">Datenschutz</a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
          <p className="mono" style={{ fontSize: 10, color: "#3E3A34", letterSpacing: "0.1em" }}>
            © 2026 RAILLOCK · ALLE RECHTE VORBEHALTEN
          </p>
          <p style={{ fontSize: 12, color: "#3E3A34" }}>Entwickelt mit ❤️ für die Vanlife-Community</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  useReveal();
  return (
    <>
      <style>{styles}</style>
      <div className="noise" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Produkt />
        <Funktionsweise />
        <Features />
        <KompatCheck />
        <TechSpecs />
        <Vergleich />
        <Installation />
        <Galerie />
        <InAktion />
        <Shop />
        <Trust />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
