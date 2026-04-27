import { useState, useEffect, useRef } from "react";
import hero from './assets/Abaya/first.jpg'
import wait1 from './assets/Abaya/second.jpg'
import three from './assets/Abaya/third.jpg'
import four from './assets/Abaya/nin.jpg'
import five from './assets/Abaya/sixth.jpg'
import six from './assets/Abaya/sev.jpg'
import sev from './assets/Abaya/eig.jpg'



const IMGS = {
  // Sourced specifically for Abaya and Modest Fashion aesthetics
  heroLeft:  hero, 
  waitlist1: wait1, 
  look1:     three, 
  look2:     four, 
  look3:     five, 
  look4:     six, 
  look5:     sev, 
};

const LOOKS = [
  { key: "look1", tall: true,  tag: "Look 01", name: "The Obsidian" },
  { key: "look2", tall: false, tag: "Look 02", name: "The Pearl"    },
  { key: "look3", tall: false, tag: "Look 03", name: "The Ivory"    },
  { key: "look4", tall: false, tag: "Look 04", name: "The Shadow"   },
  { key: "look5", tall: false, tag: "Look 05", name: "The Dusk"     },
];

const PILLARS = [
  { n: "01", title: "Craftsmanship", text: "Each abaya is constructed with precision stitching and hand-finished details. Premium fabric selected from artisan mills." },
  { n: "02", title: "Exclusivity",   text: "Limited quantities per drop. Not mass produced. Every collection is numbered and intentional, never abundant." },
  { n: "03", title: "Identity",      text: "Modesty as a power statement. Designed for women who wear their values with elegance and without apology." },
];

const MARQUEE = ["Pillars of Grace", "Limited Drop", "Premium Fabric", "Established 2026", "Handcrafted", "Modest Luxury"];

export default function Ayouniie() {
  const [form, setForm]       = useState({ name: "", email: "", size: "" });
  const [btnText, setBtnText] = useState("Join the Waitlist");
  const [msg, setMsg]         = useState({ text: "", type: "" });
  const [disabled, setDis]    = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const fadeRefs = useRef([]);
  fadeRefs.current = []; 

  const addToRefs = (el) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@200;300;400;500&display=swap";
    document.head.appendChild(link);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("ay-in");
          obs.unobserve(e.target); 
        }
      }),
      { threshold: 0.12 }
    );
    
    fadeRefs.current.forEach((el) => el && obs.observe(el));
    
    return () => {
      obs.disconnect();
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, size } = form;
    
    if (!name || !email) {
      setMsg({ text: "Please fill in your name and email.", type: "err" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ text: "Please enter a valid email address.", type: "err" });
      return;
    }
    
    setBtnText("Securing your place…");
    setDis(true);
    setMsg({ text: "", type: "" });
    
    try {
      const response = await fetch("https://formspree.io/f/xpwzwble", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email, size,
          source: "Ayouniie Waitlist",
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        setMsg({ text: "✦ You are on the list. We will be in touch.", type: "ok" });
        setForm({ name: "", email: "", size: "" });
        setBtnText("You're on the list ✦");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (_) {
      setMsg({ text: "Something went wrong. Please try again later.", type: "err" });
      setBtnText("Join the Waitlist");
      setDis(false);
    }
  };

  const scrollToWaitlist = () =>
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="ay">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`ay-nav ${isMenuOpen ? "ay-nav--open" : ""}`}>
        <button className="ay-hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            {isMenuOpen 
              ? <path d="M6 18L18 6M6 6l12 12" /> 
              : <path d="M3 6h18M3 12h18M3 18h18" />
            }
          </svg>
        </button>

        <ul className={`ay-nav-links ${isMenuOpen ? "ay-nav-links--open" : ""}`}>
          {["Collections", "Our Story", "Atelier"].map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={closeMenu}>
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="ay-logo">Ayouniie</div>
        <button className="ay-bag">Bag (0)</button>
      </nav>

      {/* ── HERO: 65/35 Layout ── */}
      <section className="ay-hero">
        <div className="ay-hero-left">
          <img src={IMGS.heroLeft} alt="Abaya collection hero" />
          <div className="ay-scroll-indicator">
            <div className="ay-scroll-bar" />
            <span>Explore</span>
          </div>
        </div>

        <div className="ay-hero-right">
          <div className="ay-hero-right-inner">
            <p className="ay-eyebrow">Abaya · Gulf Inspired Modesty</p>

            <h1 className="ay-hero-title">
              Modern<br /><em>Abaya</em><br />Edit
            </h1>

            <p className="ay-hero-sub">
              Refined modest wear for daily life and formal moments.
            </p>

            <button className="ay-hero-cta" onClick={scrollToWaitlist}>
              <span>Join Private List</span>
              <span className="ay-cta-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="ay-marquee-strip">
        <div className="ay-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} className="ay-marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── WAITLIST ── */}
      <section className="ay-waitlist" id="waitlist">
        <div className="ay-waitlist-grid">

          <div className="ay-imagery">
            <div className="ay-img-top">
              <img src={IMGS.waitlist1} alt="Ayouniie lookbook" />
              <div className="ay-img-label">
                <span>The Collection</span>
                <p>Silhouette<br />in Motion</p>
              </div>
            </div>
       
          </div>

          <div className="ay-form-col">
            <p className="ay-form-tag">Reserve Your Place</p>
            <h2 className="ay-form-title">
              Secure<br /><em>Early Access</em>
            </h2>
            <p className="ay-form-sub">
              Be first to experience the collection. Our drops are limited to ensure
              each piece receives the craftsmanship it deserves.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="ay-field">
                <label className="ay-field-lbl" htmlFor="name">Full Name</label>
                <div className="ay-field-wrap">
                  <input
                    className="ay-field-inp" id="name" name="name" type="text"
                    placeholder="Your name" autoComplete="name"
                    value={form.name} onChange={handleChange}
                  />
                  <span className="ay-field-ico">✦</span>
                </div>
              </div>

              <div className="ay-field">
                <label className="ay-field-lbl" htmlFor="email">Email Address</label>
                <div className="ay-field-wrap">
                  <input
                    className="ay-field-inp" id="email" name="email" type="email"
                    placeholder="your@email.com" autoComplete="email"
                    value={form.email} onChange={handleChange}
                  />
                  <span className="ay-field-ico">◈</span>
                </div>
              </div>


              <button className="ay-submit" type="submit" disabled={disabled}>
                <span>{btnText}</span>
              </button>

              {msg.text && (
                <div className={`ay-msg ay-msg--${msg.type}`}>{msg.text}</div>
              )}

              <p className="ay-form-note">No spam · Unsubscribe anytime · Your data is protected</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK GRID ── */}
      <section className="ay-lookbook" id="collections">
        <div className="ay-lookbook-inner">
          <div className="ay-section-hdr">
            <span className="ay-section-num">01 — 05</span>
            <span className="ay-section-label">The Lookbook</span>
          </div>
          <div className="ay-lookbook-grid">
            {LOOKS.map(({ key, tall, tag, name }) => (
              <div
                key={key}
                className={`ay-look${tall ? " ay-look--tall" : ""} ay-fade`}
                ref={addToRefs}
              >
                <img src={IMGS[key]} alt={name} />
                <div className="ay-look-overlay">
                  <p className="ay-look-tag">{tag}</p>
                  <p className="ay-look-name">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="ay-story" id="our-story">
        <div className="ay-story-inner">
          <p className="ay-story-lbl">Our Philosophy</p>
          <div>
            <div className="ay-story-year">2026</div>
            <h2 className="ay-story-quote ay-fade" ref={addToRefs}>
              Every abaya is designed to make you feel{" "}
              <em>confident, graceful,</em> and unapologetically yourself.
            </h2>
            <p className="ay-story-body ay-fade" ref={addToRefs}>
              Minimal design, premium fabric, timeless vibe — because modesty is the new
              modern. From casual days to special nights, our abayas wrap you in comfort
              and class. This is not just clothing. It is your identity, your aura, your
              statement.
            </p>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="ay-pillars" id="atelier">
        <div className="ay-pillars-inner">
          <div className="ay-section-hdr">
            <span className="ay-section-num">01 — 03</span>
            <span className="ay-section-label">What We Stand For</span>
          </div>
          <div className="ay-pillars-grid">
            {PILLARS.map(({ n, title, text }) => (
              <div className="ay-pillar ay-fade" key={n} ref={addToRefs}>
                <div className="ay-pillar-n">{n}</div>
                <h3 className="ay-pillar-title">{title}</h3>
                <p className="ay-pillar-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ay-footer">
        <div className="ay-footer-inner">
          <div className="ay-footer-logo">Ayouniie</div>
          <ul className="ay-footer-links">
            {["Collections", "Our Story", "Atelier", "Privacy", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase().replace(" ", "-")}`}>{l}</a></li>
            ))}
          </ul>
          <p className="ay-footer-copy">© 2026 Ayouniie</p>
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   STYLES  (all scoped with ay- prefix)
───────────────────────────────────────── */
const CSS = `
  :root {
    --choc: #1A120E;     
    --choc-mid: #3A2A22; 
    --choc-light: #8A6D5D;
    --cream: #FAF7F2;    
    --cream-dark: #EAE3D9;
    --black: #050505; 
    --white: #FFFFFF;
    --gold: #B69A6E;     
    --gold-light: #DEC59C;
  }

  .ay { font-family: 'Raleway', sans-serif; background: var(--white); color: var(--black); overflow-x: hidden; scroll-behavior: smooth; }

  /* NAV */
  .ay-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; background: transparent; transition: background 0.4s, border 0.4s; }
  .ay-nav::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%); z-index: -1; pointer-events: none; }
  .ay-nav--open { background: var(--cream); border-bottom: none; }
  .ay-nav--open::before { display: none; }
  
  .ay-hamburger { display: none; background: none; border: none; color: var(--white); cursor: pointer; z-index: 102; padding: 0; transition: color 0.3s; }
  .ay-nav--open .ay-hamburger { color: var(--choc); }
  
  .ay-nav-links { display: flex; gap: 40px; list-style: none; margin: 0; padding: 0; }
  .ay-nav-links a { font-weight: 400; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.3s; }
  .ay-nav-links a:hover { color: var(--white); }
  
  .ay-logo { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 24px; letter-spacing: 0.3em; color: var(--white); text-transform: uppercase; transition: color 0.3s; z-index: 102;}
  .ay-nav--open .ay-logo { color: var(--choc); }
  
  .ay-bag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--white); cursor: pointer; background: none; border: none; transition: opacity 0.3s, color 0.3s; z-index: 102; }
  .ay-nav--open .ay-bag { color: var(--choc); }
  .ay-bag:hover { opacity: 0.7; }

  /* HERO (65/35 Split) */
  .ay-hero { height: 100vh; min-height: 700px; display: grid; grid-template-columns: 65% 35%; overflow: hidden; background: var(--choc); }
  
  .ay-hero-left { position: relative; overflow: hidden; }
  .ay-hero-left img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; transition: transform 12s ease; display: block; filter: brightness(0.85); }
  .ay-hero:hover .ay-hero-left img { transform: scale(1.05); }
  
  .ay-scroll-indicator { position: absolute; left: 48px; bottom: 48px; display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 10; }
  .ay-scroll-indicator span { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--white); writing-mode: vertical-rl; opacity: 0.8;}
  .ay-scroll-bar { width: 1px; height: 50px; background: linear-gradient(to bottom, var(--white), transparent); animation: ayScroll 2s ease infinite; }
  @keyframes ayScroll { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform:scaleY(1);transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

  .ay-hero-right { background: var(--choc); display: flex; align-items: center; justify-content: center; position: relative; border-left: 1px solid rgba(182, 154, 110, 0.15); }
  .ay-hero-right::before { content:''; position:absolute; inset: 12px; border: 1px solid rgba(182, 154, 110, 0.08); pointer-events:none; }
  .ay-hero-right-inner { padding: 0 48px; max-width: 440px; width: 100%; }
  
  .ay-eyebrow { font-weight: 300; font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .ay-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--gold); flex-shrink: 0; }
  
  .ay-hero-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(48px, 4vw, 72px); line-height: 0.95; color: var(--cream); letter-spacing: -0.02em; margin-bottom: 24px; }
  .ay-hero-title em { font-style: italic; color: var(--gold-light); }
  
  .ay-hero-sub { font-weight: 300; font-size: 12px; letter-spacing: 0.05em; color: rgba(250,247,242,0.6); margin-bottom: 48px; line-height: 1.8; }
  
  /* CTA STYLES */
  .ay-hero-cta { 
    display: inline-flex; 
    align-items: center; 
    justify-content: center;
    gap: 16px; 
    font-family: 'Raleway', sans-serif; 
    font-size: 10px; 
    font-weight: 500;
    letter-spacing: 0.35em; 
    text-transform: uppercase; 
    color: var(--choc); 
    background: var(--gold); 
    border: none;
    padding: 18px 40px; 
    cursor: pointer; 
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); 
  }
  .ay-hero-cta::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.25);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .ay-hero-cta:hover { 
    box-shadow: 0 10px 30px rgba(182, 154, 110, 0.25);
    transform: translateY(-2px);
  }
  .ay-hero-cta:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .ay-hero-cta span { position: relative; z-index: 1; }
  .ay-cta-arrow { font-family: sans-serif; font-weight: 300; font-size: 14px; transition: transform 0.4s ease; }
  .ay-hero-cta:hover .ay-cta-arrow { transform: translateX(4px); }

  /* MARQUEE */
  .ay-marquee-strip { background: var(--gold); padding: 12px 0; overflow: hidden; white-space: nowrap; }
  .ay-marquee-track { display: inline-flex; animation: ayMarquee 22s linear infinite; }
  .ay-marquee-item { font-size: 9px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: var(--choc); padding: 0 40px; }
  .ay-marquee-item:not(:last-child)::after { content: '✦'; color: rgba(26,18,14,0.3); margin-left: 40px; font-size: 8px;}
  @keyframes ayMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* WAITLIST REFINEMENTS */
  .ay-waitlist { background: var(--black); }
  
  .ay-waitlist-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    align-items: stretch; 
  }
  
  .ay-imagery { 
    display: grid; 
    grid-template-rows: 1fr 1fr; 
    overflow: hidden; 
    min-height: 0; /* Prevents images from artificially stretching the height */
  }
  
  .ay-img-top, .ay-img-bottom { position: relative; overflow: hidden; height: 100%; min-height: 0; }
  /* Images set to absolute so they conform to the form's height perfectly */
  .ay-img-top img, .ay-img-bottom img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 7s ease; }
  .ay-img-top img { object-position: center 20%; filter: brightness(0.8); }
  .ay-img-top:hover img, .ay-img-bottom:hover img { transform: scale(1.04); }
  .ay-img-top::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 60%, var(--black) 100%); pointer-events: none; }
  .ay-img-bottom img { object-position: center 30%; filter: brightness(0.7) sepia(0.2) saturate(0.8); }
  .ay-img-bottom::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, transparent 60%, var(--black) 100%); z-index: 1; pointer-events: none; }
  
  .ay-img-label { position: absolute; bottom: 32px; left: 40px; z-index: 2; }
  .ay-img-label span { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 8px; }
  .ay-img-label p { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 24px; color: var(--white); line-height: 1.1; margin: 0;}
  .ay-img-label--btm { z-index: 3; }

  /* Form Column */
  .ay-form-col { 
    display: flex; 
    flex-direction: column; 
    justify-content: flex-start; /* Form sits right at the top! */
    padding: 80px 10%; 
    position: relative; 
  }
  .ay-form-tag { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
  .ay-form-tag::before { content: ''; width: 24px; height: 1px; background: var(--gold); }
  .ay-form-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(38px,4vw,56px); color: var(--white); line-height: 1.05; margin: 0 0 16px 0; }
  .ay-form-title em { font-style: italic; color: var(--gold-light); }
  .ay-form-sub { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.8; margin-bottom: 40px; letter-spacing: 0.04em; max-width: 360px; }

  .ay-field { margin-bottom: 20px; }
  .ay-field-lbl { display: block; font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 8px; }
  .ay-field-wrap { display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.15); transition: border-color 0.4s; position: relative; }
  .ay-field-wrap:focus-within { border-color: var(--gold); }
  .ay-field-inp { width: 100%; background: transparent; border: none; outline: none; padding: 10px 0; font-family: 'Raleway', sans-serif; font-size: 14px; font-weight: 300; color: var(--white); letter-spacing: 0.05em; }
  .ay-field-inp::placeholder { color: rgba(255,255,255,0.2); }
  .ay-field-ico { padding-left: 16px; color: var(--gold); font-size: 10px; flex-shrink: 0; }

  .ay-submit { width: 100%; padding: 18px; background: transparent; border: 1px solid var(--gold); color: var(--gold); font-family: 'Raleway', sans-serif; font-weight: 400; font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; cursor: pointer; transition: all 0.4s ease; margin-top: 12px; }
  .ay-submit:hover { background: var(--gold); color: var(--choc); }
  .ay-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  .ay-msg { padding: 14px; margin-top: 16px; font-size: 10px; letter-spacing: 0.1em; text-align: center; }
  .ay-msg--ok  { border: 1px solid rgba(182, 154, 110, 0.4); color: var(--gold); }
  .ay-msg--err { border: 1px solid rgba(220,80,80,0.5);  color: #DC5050; }
  .ay-form-note { margin-top: 20px; font-size: 8px; letter-spacing: 0.2em; color: rgba(255,255,255,0.3); text-transform: uppercase; text-align: left; margin-bottom: 0;}

  /* LOOKBOOK */
  .ay-lookbook { background: var(--cream); padding: 120px 48px; }
  .ay-lookbook-inner { max-width: 1440px; margin: 0 auto; }
  .ay-section-hdr { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid rgba(26,18,14,0.1); padding-bottom: 24px; margin-bottom: 56px; }
  .ay-section-num { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: var(--gold); letter-spacing: 0.2em; }
  .ay-section-label { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--choc); }
  
  .ay-lookbook-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; }
  .ay-look { position: relative; overflow: hidden; background: var(--cream-dark); min-height: 380px; }
  .ay-look--tall { grid-row: span 2; min-height: 776px; }
  .ay-look img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 9s ease; filter: brightness(0.9) contrast(1.05); }
  .ay-look:hover img { transform: scale(1.05); }
  .ay-look-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%); display: flex; flex-direction: column; justify-content: flex-end; padding: 32px; opacity: 0; transition: opacity 0.5s ease; }
  .ay-look:hover .ay-look-overlay { opacity: 1; }
  .ay-look-tag  { font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
  .ay-look-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 22px; color: var(--white); }

  /* STORY */
  .ay-story { background: var(--white); padding: 140px 48px; }
  .ay-story-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 80px; align-items: start; }
  .ay-story-lbl { font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--choc-light); padding-top: 12px; border-top: 1px solid rgba(26,18,14,0.1); }
  .ay-story-year { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 100px; color: var(--cream-dark); line-height: 1; margin-bottom: -24px; letter-spacing: -0.05em; }
  .ay-story-quote { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: clamp(28px,3.5vw,42px); color: var(--choc); line-height: 1.3; margin-bottom: 32px; }
  .ay-story-quote em { font-style: italic; color: var(--gold); }
  .ay-story-body { font-size: 14px; font-weight: 300; color: var(--choc-light); line-height: 2; letter-spacing: 0.03em; max-width: 560px; }

  /* PILLARS */
  .ay-pillars { background: var(--cream); padding: 120px 48px; }
  .ay-pillars-inner { max-width: 1440px; margin: 0 auto; }
  .ay-pillars-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
  .ay-pillar { background: var(--white); padding: 56px 40px; border: 1px solid rgba(26,18,14,0.05); }
  .ay-pillar-n     { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 32px; color: var(--gold); line-height: 1; margin-bottom: 24px; }
  .ay-pillar-title { font-family: 'Raleway', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.3em; color: var(--choc); margin-bottom: 16px; }
  .ay-pillar-text  { font-size: 13px; font-weight: 300; color: var(--choc-light); line-height: 1.8; }

  /* FOOTER */
  .ay-footer { background: var(--choc); padding: 64px 48px; }
  .ay-footer-inner { max-width: 1440px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 32px; }
  .ay-footer-logo  { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-size: 24px; letter-spacing: 0.3em; color: var(--cream); text-transform: uppercase; }
  .ay-footer-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; }
  .ay-footer-links a { font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: rgba(250,247,242,0.5); text-decoration: none; transition: color 0.3s; }
  .ay-footer-links a:hover { color: var(--gold); }
  .ay-footer-copy { font-size: 8px; letter-spacing: 0.2em; color: rgba(250,247,242,0.3); text-transform: uppercase; }

  /* SCROLL-REVEAL */
  .ay-fade { opacity: 0; transform: translateY(30px); transition: opacity 0.9s ease, transform 0.9s ease; }
  .ay-fade.ay-in  { opacity: 1; transform: translateY(0); }

  /* ── MOBILE ── */
  @media (max-width: 900px) {
    .ay-nav { padding: 20px 24px; }
    
    .ay-hamburger { display: block; }
    
    .ay-nav-links {
      position: fixed; top: 0; left: 0; right: 0; height: 100svh;
      background: var(--cream);
      flex-direction: column; justify-content: center; align-items: center;
      gap: 48px; z-index: 101;
      opacity: 0; pointer-events: none; transform: translateY(-20px);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .ay-nav-links--open {
      opacity: 1; pointer-events: auto; transform: translateY(0);
    }
    .ay-nav-links a { font-size: 16px; color: var(--choc); letter-spacing: 0.4em; }
    
    .ay-logo { position: absolute; left: 50%; transform: translateX(-50%); z-index: 102; font-size: 20px; }

    /* Change hero to stack vertically on mobile */
    .ay-hero { grid-template-columns: 1fr; height: auto; min-height: 100svh; display: flex; flex-direction: column; }
    .ay-hero-left { height: 60vh; order: 1; }
    .ay-scroll-indicator { display: none; }
    .ay-hero-right { order: 2; padding: 64px 24px; border-left: none; border-top: 1px solid rgba(182, 154, 110, 0.15); flex: 1; }
    .ay-hero-right::before { display: none; }
    .ay-hero-right-inner { padding: 0; max-width: 100%; }

    /* WAITLIST MOBILE REFINEMENTS - FORM FIRST! */
    .ay-waitlist-grid { display: flex; flex-direction: column; }
    
    .ay-form-col { order: 1; padding: 60px 24px 40px; justify-content: flex-start; }
    
    /* Make sure the image shows up below the form cleanly */
    .ay-imagery { order: 2; height: 350px; grid-template-rows: 1fr; display: flex; }
    .ay-img-top { height: 100%; width: 100%; }
    .ay-img-bottom { display: none; }

    .ay-lookbook { padding: 80px 24px; }
    .ay-lookbook-grid { grid-template-columns: 1fr; gap: 8px; }
    .ay-look--tall, .ay-look { min-height: 340px; grid-row: auto; }
    .ay-look-overlay { opacity: 1; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%); }

    .ay-story { padding: 80px 24px; }
    .ay-story-inner { grid-template-columns: 1fr; gap: 40px; }
    .ay-story-year { font-size: 72px; margin-bottom: 0; }

    .ay-pillars { padding: 80px 24px; }
    .ay-pillars-grid { grid-template-columns: 1fr; gap: 16px; }
    .ay-pillar { padding: 40px 24px; }

    .ay-footer { padding: 56px 24px; }
    .ay-footer-inner { flex-direction: column; align-items: flex-start; gap: 40px; }
    .ay-footer-links { flex-direction: column; gap: 24px; }
  }
`;