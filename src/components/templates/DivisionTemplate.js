"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

// --- Parallax Image Component ---
const ParallaxImage = ({ src, alt, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    if (!src) return null;

    return (
        <div ref={ref} className={`parallax-wrapper ${className}`} style={{ borderRadius: '0px', overflow: 'hidden', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
            <motion.div style={{ y, height: '130%', width: '100%', position: 'absolute', top: '-15%' }}>
                <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
            </motion.div>
        </div>
    );
};

// --- Strategic Frame Component (The "Many Frames" Feature) ---
const PortfolioFrame = ({ color, size, top, left, right, bottom, rotate, delay, label, opacity = 0.15 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        className="portfolio-frame-item"
        style={{
            position: 'absolute',
            width: size,
            height: `calc(${size} * 1.3)`,
            top, left, right, bottom,
            transform: `rotate(${rotate})`,
            border: `1.5px solid ${color}`,
            background: `${color}08`,
            padding: '12px',
            zIndex: 1,
            pointerEvents: 'none',
            borderRadius: '2px'
        }}
    >
        <div style={{ border: `1px dashed ${color}44`, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10px' }}>
            <span style={{ fontSize: '0.65rem', color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>{label || 'LK-HUB Frame'}</span>
        </div>
    </motion.div>
);

const FrameMosaic = ({ color }) => (
    <div className="frame-mosaic-overlay">
        <PortfolioFrame color={color} size="240px" top="5%" left="2%" rotate="-5deg" delay={0.1} label="Knowledge Node 01" />
        <PortfolioFrame color={color} size="190px" top="40%" left="10%" rotate="7deg" delay={0.3} label="Liberation Flow" />
        <PortfolioFrame color={color} size="280px" bottom="10%" left="4%" rotate="-3deg" delay={0.5} label="Strategic Asset" />

        <PortfolioFrame color={color} size="210px" top="10%" right="6%" rotate="4deg" delay={0.2} label="Network Hub" />
        <PortfolioFrame color={color} size="260px" top="48%" right="2%" rotate="-6deg" delay={0.4} label="Global Vision" />
        <PortfolioFrame color={color} size="230px" bottom="8%" right="8%" rotate="8deg" delay={0.6} label="Impact Point" />

        <style jsx>{`
            .frame-mosaic-overlay { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
            @media (max-width: 1000px) { .frame-mosaic-overlay { opacity: 0.5; } }
        `}</style>
    </div>
);

// --- Magazine Typography Quote ---
const MagazineQuote = ({ text, author, color }) => (
    <section className="magazine-quote-section">
        <div className="container">
            <FadeInSection>
                <div className="quote-content" style={{ borderLeft: `10px solid ${color}` }}>
                    <h2 className="quote-text">{text}</h2>
                    {author && <p className="quote-author">/ {author}</p>}
                </div>
            </FadeInSection>
        </div>
        <style jsx>{`
            .magazine-quote-section { padding: 12rem 0; background: var(--color-background-alt); position: relative; z-index: 5; }
            .quote-content { padding-left: 5rem; max-width: 1100px; margin: 0 auto; }
            .quote-text { 
                font-family: var(--font-premium); 
                font-size: clamp(2.5rem, 5vw, 4.5rem); 
                font-style: italic; 
                line-height: 1; 
                color: var(--color-primary);
                margin-bottom: 3rem;
                letter-spacing: -2px;
            }
            .quote-author { font-weight: 800; text-transform: uppercase; letter-spacing: 4px; opacity: 0.4; font-size: 1rem; }
        `}</style>
    </section>
);

// --- Hero Visual Frame ---
const HeroVisual = ({ type, image, alt, color }) => {
    const FrameDecoration = () => (
        <>
            <div style={{ position: 'absolute', inset: '-30px', border: `1px solid ${color}15`, borderRadius: 'inherit', pointerEvents: 'none', zIndex: -1 }} />
            <div style={{ position: 'absolute', inset: '-60px', border: `1px solid ${color}08`, borderRadius: 'inherit', pointerEvents: 'none', zIndex: -2 }} />
        </>
    );

    if (type === 'hexagon') {
        return (
            <div className="hero-visual-frame" style={{ position: 'relative', zIndex: 10 }}>
                <div className="solutions-tech-frame" style={{ borderColor: color, boxShadow: `0 30px 100px ${color}22` }}>
                    <div className="tech-image-container">
                        {image ? <Image src={image} alt={alt} fill style={{ objectFit: 'cover' }} priority /> : <div className="img-placeholder" />}
                    </div>
                </div>
                <FrameDecoration />
            </div>
        );
    }
    if (type === 'ball') {
        return (
            <div className="hero-visual-frame" style={{ position: 'relative', zIndex: 10 }}>
                <div className="sports-ball-frame" style={{ boxShadow: `0 30px 100px ${color}33`, borderColor: color }}>
                    {image ? <Image src={image} alt={alt} fill style={{ objectFit: 'cover' }} priority /> : <div className="img-placeholder" />}
                </div>
                <FrameDecoration />
            </div>
        );
    }
    if (type === 'blob') {
        return (
            <div className="hero-visual-frame" style={{ position: 'relative', zIndex: 10 }}>
                <div className="kids-blob-frame" style={{ boxShadow: `0 30px 100px ${color}22` }}>
                    {image ? <Image src={image} alt={alt} fill style={{ objectFit: 'cover' }} priority /> : <div className="img-placeholder" />}
                </div>
                <FrameDecoration />
            </div>
        );
    }
    return (
        <div className="hero-visual-frame" style={{ position: 'relative', zIndex: 10 }}>
            <div style={{ borderRadius: '2px', overflow: 'hidden', border: `1px solid ${color}33`, boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
                {image ? <Image src={image} alt={alt} width={650} height={450} style={{ display: 'block' }} /> : <div className="img-placeholder" style={{ width: 650, height: 450, background: `${color}11` }} />}
            </div>
            <FrameDecoration />
        </div>
    );
};

export default function DivisionTemplate({ data }) {
    const {
        id, label, title, description, heroImage, heroImageAlt, heroVisualType, heroBullets,
        theme, about, vision, mission, approach, pillarsTitle, pillarsSubtitle, pillars,
        whyTitle, whyCards, cta
    } = data;

    // Correct color mapping
    const getDivisionColor = (slug) => {
        if (slug === 'lk-sports') return 'var(--color-sports-primary)';
        return `var(--color-${slug.split('-')[1]})`;
    };

    // Correct secondary color mapping
    const getSecondaryColor = (slug) => {
        if (slug === 'lk-sports') return 'var(--color-sports-secondary)';
        if (slug === 'lk-kids') return 'var(--color-kids-secondary)';
        return getDivisionColor(slug);
    };

    const divisionColor = getDivisionColor(id);
    const accentColor = getSecondaryColor(id);

    const getDivisionFont = (slug) => {
        if (slug === 'lk-sports' || slug === 'lk-kids') return 'var(--font-sports)';
        return `var(--font-${slug.split('-')[1]})`;
    };
    const divisionFont = getDivisionFont(id);

    return (
        <div className="magazine-template">
            {/* 1. Hero: Editorial High-End */}
            <header className={`division-hero-magazine ${theme.heroClass}`} style={{ position: 'relative', overflow: 'hidden', background: '#080404' }}>
                <FrameMosaic color={divisionColor} />

                <div className="container hero-container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="magazine-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-content"
                        >
                            <span className="magazine-label" style={{ color: divisionColor, fontFamily: divisionFont, letterSpacing: '8px' }}>{label}</span>
                            <h1 className="magazine-title" style={{ fontFamily: divisionFont }}>{title}</h1>
                            <p className="magazine-subtitle">{description}</p>
                            <div className="hero-actions">
                                <Link href="/contact" className="magazine-btn-primary" style={{ backgroundColor: divisionColor, fontFamily: divisionFont, display: 'inline-block', textDecoration: 'none' }}>
                                    Partner With Us
                                </Link>
                                {heroBullets && (
                                    <div className="hero-bullets-magazine">
                                        {heroBullets.map((bullet, i) => (
                                            <div key={i} className="magazine-bullet">
                                                <span className="bullet-dot" style={{ background: accentColor }}></span>
                                                {bullet}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 80 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="hero-visual-magazine"
                        >
                            <HeroVisual type={heroVisualType} image={heroImage} alt={heroImageAlt} color={accentColor} />
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Scroll Hint */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}
                >
                    <div style={{ width: '1px', height: '60px', background: 'white' }} />
                </motion.div>
            </header>

            {/* 2. Foundation: Side-by-Side Narrative */}
            <section className="section division-narrative">
                <div className="container">
                    <div className="narrative-grid">
                        <div className="narrative-main">
                            <FadeInSection>
                                <h2 className="section-title-editorial" style={{ color: divisionColor }}>The Strategic Vision</h2>
                                <p className="narrative-lead" style={{ fontFamily: divisionFont }}>
                                    Bridging the gap Between <br /> Concept & <span style={{ color: divisionColor }}>Market Leadership</span>.
                                </p>
                            </FadeInSection>
                        </div>
                        <div className="narrative-detail">
                            <FadeInSection delay={0.2}>
                                <div className="narrative-rich-text" dangerouslySetInnerHTML={{ __html: about.text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:' + divisionColor + '; font-weight: 900;">$1</strong>') }} />
                            </FadeInSection>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Parallax Image Break: High Impact */}
            {heroImage && (
                <section className="parallax-break">
                    <ParallaxImage src={heroImage} alt="Strategic Vision" className="break-image-h" />
                </section>
            )}

            {/* 4. Vision/Mission: Editorial Mosaic */}
            <section className="section vm-magazine">
                <div className="container">
                    <div className="vm-mosaic-grid">
                        <FadeInSection direction="up">
                            <div className="editorial-mosaic-card card-dark">
                                <span className="mosaic-label">Strategic Target</span>
                                <h3 style={{ fontFamily: divisionFont }}>Our Vision</h3>
                                <p>{vision}</p>
                                <div className="mosaic-accent" style={{ background: divisionColor }}></div>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="up" delay={0.2}>
                            <div className="editorial-mosaic-card">
                                <span className="mosaic-label">Sustained Execution</span>
                                <h3 style={{ fontFamily: divisionFont }}>Our Mission</h3>
                                <p>{mission}</p>
                                <div className="mosaic-accent" style={{ background: divisionColor }}></div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* 5. Typography Quote */}
            <MagazineQuote
                text={`"Success in ${label} is built on the liberation of specific, actionable results."`}
                author="LK-HUB Executive Leadership"
                color={divisionColor}
            />

            {/* 6. Pillars: Interactive Editorial Layout */}
            <section className="section pillars-magazine" id="pillars" style={{ background: '#f8f8f8' }}>
                <div className="container">
                    <div className="magazine-section-header">
                        <span style={{ color: divisionColor, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '5px', fontSize: '0.8rem' }}>Expertise Architecture</span>
                        <h2 className="magazine-h2-large" style={{ fontFamily: divisionFont }}>{pillarsTitle}</h2>
                    </div>
                    <div className="pillars-masonry">
                        {pillars.map((pillar, i) => (
                            <FadeInSection key={pillar.id} delay={i * 0.1}>
                                <div className="magazine-pillar-block">
                                    <div className="pillar-index" style={{ color: `${divisionColor}15` }}>0{i + 1}</div>
                                    <h3 style={{ fontFamily: divisionFont }}>{pillar.title}</h3>
                                    <p className="pillar-tagline-editorial">{pillar.tagline}</p>
                                    <div className="pillar-separator" style={{ background: divisionColor, width: '60px' }}></div>
                                    <div className="pillar-outcome">
                                        <p>{pillar.value}</p>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Final CTA: High Impact */}
            <section className="magazine-cta" style={{ background: divisionColor }}>
                <div className="container text-center">
                    <FadeInSection>
                        <h2 className="cta-title-mag" style={{ fontFamily: divisionFont }}>{cta.title}</h2>
                        <p className="cta-subtitle-mag">{cta.text}</p>
                        <div className="magazine-cta-actions">
                            <Link href="/contact" className="magazine-btn-glass" style={{ fontFamily: divisionFont, display: 'inline-block', textDecoration: 'none' }}>
                                Get Started Now
                            </Link>
                        </div>
                    </FadeInSection>
                </div>

                {/* Visual Accent */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'rgba(255,255,255,0.03)', clipPath: 'polygon(100% 0, 0% 0, 100% 100%)' }} />
            </section>

            <style jsx>{`
                .magazine-template { background: white; color: var(--color-primary); }
                .division-hero-magazine { min-height: 100vh; display: flex; align-items: center; padding: 90px 0 50px; background: #080404; color: white; position: relative; }
                .magazine-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
                .magazine-label { text-transform: uppercase; letter-spacing: 5px; font-weight: 900; font-size: 0.8rem; display: block; margin-bottom: 1rem; opacity: 0.8; }
                .magazine-title { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 0.9; margin-bottom: 1.5rem; letter-spacing: -3px; color: white; }
                .magazine-subtitle { font-size: 1.1rem; opacity: 0.6; max-width: 520px; margin-bottom: 2rem; line-height: 1.6; font-family: var(--font-body); }
                .magazine-btn-primary { border: none; padding: 1rem 2.5rem; color: white; border-radius: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; cursor: pointer; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
                .magazine-btn-primary:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); filter: brightness(1.1); }
                
                .hero-bullets-magazine { display: grid; grid-template-columns: 1fr; gap: 0.8rem; margin-top: 1.5rem; }
                .magazine-bullet { font-size: 0.95rem; opacity: 0.75; display: flex; align-items: center; gap: 1rem; font-family: var(--font-body); }
                .bullet-dot { width: 8px; height: 8px; flex-shrink: 0; border-radius: 50%; }

                .narrative-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 8rem; padding: 14rem 0; }
                .section-title-editorial { font-size: 1rem; text-transform: uppercase; letter-spacing: 6px; font-weight: 900; margin-bottom: 3rem; opacity: 0.4; }
                .narrative-lead { font-size: 3.5rem; line-height: 1; color: var(--color-primary); letter-spacing: -2px; }
                .narrative-rich-text { font-size: 1.45rem; line-height: 1.9; color: var(--color-text-muted); }

                .parallax-break { height: 85vh; width: 100%; position: relative; overflow: hidden; margin: 4rem 0; }
                
                .vm-mosaic-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2.5rem; padding: 4rem 0; }
                .editorial-mosaic-card { padding: 7rem 5rem; position: relative; background: #fcfcfc; display: flex; flex-direction: column; overflow: hidden; border-radius: 2px; box-shadow: 0 40px 100px rgba(0,0,0,0.03); }
                .card-dark { background: #0d0404; color: white; }
                .mosaic-label { text-transform: uppercase; letter-spacing: 5px; font-weight: 900; font-size: 0.8rem; margin-bottom: 2.5rem; opacity: 0.5; }
                .editorial-mosaic-card h3 { font-size: 3.8rem; margin: 0; line-height: 0.9; letter-spacing: -2px; }
                .editorial-mosaic-card p { font-size: 1.35rem; line-height: 1.7; margin-top: 2.5rem; opacity: 0.75; }
                .mosaic-accent { position: absolute; bottom: 0; left: 0; width: 100%; height: 12px; }

                .magazine-section-header { margin-bottom: 10rem; }
                .magazine-h2-large { font-size: 5.5rem; letter-spacing: -3px; margin-top: 1.5rem; line-height: 0.9; color: var(--color-primary); }
                .pillars-masonry { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
                .magazine-pillar-block { position: relative; padding: 6rem; background: white; border: 1px solid #eeeeee; transition: all 0.5s ease; cursor: default; overflow: hidden; }
                .magazine-pillar-block:hover { transform: translateY(-15px); box-shadow: 0 50px 100px rgba(0,0,0,0.08); border-color: transparent; }
                .pillar-index { position: absolute; top: 2rem; right: 2rem; font-size: 4.5rem; font-weight: 950; line-height: 1; letter-spacing: -3px; opacity: 0.08; pointer-events: none; }
                .magazine-pillar-block h3 { font-size: 2rem; margin: 0; position: relative; z-index: 2; line-height: 1.1; letter-spacing: -1px; }
                .pillar-tagline-editorial { margin: 2.5rem 0; font-size: 1.4rem; opacity: 0.5; line-height: 1.6; font-style: italic; font-family: var(--font-premium); }
                .pillar-separator { height: 3px; margin-bottom: 2.5rem; }
                .pillar-outcome p { font-weight: 800; font-size: 1.3rem; line-height: 1.4; color: var(--color-primary); }

                .magazine-cta { padding: 8rem 0; color: white; position: relative; overflow: hidden; }
                .cta-title-mag { font-size: clamp(3rem, 6vw, 6rem); line-height: 0.9; margin-bottom: 2rem; letter-spacing: -3px; }
                .cta-subtitle-mag { font-size: 1.3rem; opacity: 0.85; margin-bottom: 4rem; max-width: 700px; margin-inline: auto; line-height: 1.6; }
                .magazine-btn-glass {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: white;
                    color: var(--color-primary);
                    border: 3px solid white;
                    padding: 1.1rem 3rem;
                    border-radius: 6px;
                    font-weight: 900;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    text-decoration: none !important;
                }
                .magazine-btn-glass::after { content: '→'; font-size: 1.1rem; transition: transform 0.3s ease; }
                .magazine-btn-glass:hover { background: transparent; color: white; transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
                .magazine-btn-glass:hover::after { transform: translateX(5px); }

                @media (max-width: 1200px) {
                    .magazine-grid, .narrative-grid, .vm-mosaic-grid, .pillars-masonry { grid-template-columns: 1fr; gap: 5rem; }
                    .cta-title-mag { font-size: 4.5rem; }
                    .parallax-break { height: 60vh; }
                    .narrative-lead { font-size: 2.8rem; }
                    .magazine-h2-large { font-size: 4rem; }
                    .magazine-pillar-block { padding: 4rem; }
                    .magazine-title { font-size: 4.2rem; }
                    .editorial-mosaic-card { padding: 4rem 3rem; }
                    .editorial-mosaic-card h3 { font-size: 3rem; }
                }
            `}</style>
        </div>
    );
}
