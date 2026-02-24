"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DivisionsWheel from '@/src/components/DivisionsWheel';
import LogoMarquee from '@/src/components/LogoMarquee';
import FadeInSection from '@/src/components/FadeInSection';
import StatsSection from '@/src/components/StatsSection';
import VisionMission from '@/src/components/VisionMission';
import BusinessDivisions from '@/src/components/BusinessDivisions';
import LatestNews from '@/src/components/LatestNews';
import NewsletterSection from '@/src/components/NewsletterSection';

// --- Kinetic Particle Component ---
const KnowledgeNodes = ({ activeColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const particleCount = 60;

    // Convert CSS Var color to HEX/RGBA
    const getActiveColor = () => {
      if (activeColor.startsWith('var')) {
        if (activeColor.includes('education')) return '#034A8D';
        if (activeColor.includes('communication')) return '#9A7531';
        if (activeColor.includes('solutions')) return '#3D0000';
        if (activeColor.includes('development')) return '#D4C0AC';
        if (activeColor.includes('sports')) return '#F6AE02';
        if (activeColor.includes('kids')) return '#F6AE02';
        return '#a57c30';
      }
      return activeColor;
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getActiveColor();

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Lines between close particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `${color}${Math.floor((1 - dist / 150) * 0.15 * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeColor]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} />;
};

export default function Home() {
  const [activeDivision, setActiveDivision] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const currentColor = activeDivision ? activeDivision.color : 'var(--color-secondary)';

  return (
    <>
      <header className="hero main-splash" style={{
        '--active-color': currentColor,
        transition: 'background var(--transition-slow)'
      }}>
        {/* Kinetic Nodes Layer */}
        <KnowledgeNodes activeColor={currentColor} />

        {/* Dynamic Background Overlay */}
        <div className="splash-bg-overlay" style={{
          opacity: activeDivision ? 1 : 0,
          background: activeDivision ? `radial-gradient(circle at 75% 50%, ${activeDivision.color}33 0%, transparent 70%)` : 'transparent'
        }}></div>

        <div className="container splash-container">
          <div className="hero-grid splash-grid">
            <div className="hero-text-wrapper" style={{ opacity: 1, visibility: 'visible' }}>
              <div className="hero-text splash-text">
                <h1 className="premium-heading">
                  Accelerating Capacity Building & <br />
                  <span className="highlight-playfair">Liberating Knowledge</span>
                </h1>
                <p className="splash-subtext">
                  Pioneering media literacy and innovative solutions for a media-driven world.
                  Leveraging 20+ years of expertise to empower individuals and global organizations.
                </p>
                <div className="hero-buttons splash-buttons">
                  <Link
                    href="/projects"
                    className="btn btn-primary-premium adaptive-btn"
                    style={{ '--btn-accent': activeDivision ? activeDivision.color : 'var(--color-secondary)' }}
                  >
                    See Our Projects
                  </Link>
                  <Link href="/contact" className="btn btn-outline-premium">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-visual splash-visual">
                <DivisionsWheel onHover={setActiveDivision} />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="splash-watermark">
          <AnimatePresence mode="wait">
            {activeDivision && (
              <motion.span
                key={activeDivision.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 0.08, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="watermark-text"
              >
                {activeDivision.title}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </header>

      <div className="content-rest">
        <VisionMission />
        <BusinessDivisions />
        <StatsSection />
        <LatestNews />
        <FadeInSection>
          <LogoMarquee speed={35} />
        </FadeInSection>
        <FadeInSection>
          <NewsletterSection />
        </FadeInSection>
      </div>

      <style jsx>{`
        .main-splash {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: #0d0404;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
          padding-bottom: 40px;
          z-index: 10;
        }

        .splash-bg-overlay {
          position: absolute;
          inset: 0;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1;
        }

        .splash-container {
          position: relative;
          z-index: 5;
        }

        .splash-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          align-items: center;
          gap: 4rem;
          min-height: 70vh;
        }

        .hero-buttons {
          display: flex;
          gap: 1.2rem;
          margin-top: 0;
        }

        .premium-heading {
          font-family: var(--font-premium);
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          margin-bottom: 1.2rem;
          color: white;
          letter-spacing: -2px;
        }

        .highlight-playfair {
          font-style: italic;
          color: var(--color-secondary);
          display: block;
          margin-top: 0.4rem;
          background: linear-gradient(90deg, var(--color-secondary), #e5b96f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .splash-subtext {
          font-size: 1.05rem;
          max-width: 520px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.8rem;
          font-weight: 400;
          line-height: 1.7;
          font-family: var(--font-body);
        }

        .splash-watermark {
          position: absolute;
          bottom: 2%;
          left: 5%;
          z-index: 2;
          pointer-events: none;
        }

        .watermark-text {
          font-size: 15vw;
          font-weight: 900;
          color: white;
          text-transform: uppercase;
          white-space: nowrap;
          display: block;
          opacity: 0.08;
          font-family: var(--font-premium);
        }

        @media (max-width: 1100px) {
          .splash-grid {
             grid-template-columns: 1fr;
             gap: 6rem;
             padding: 100px 0 100px 0;
             text-align: center;
          }
          .splash-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .splash-subtext { margin-inline: auto; }
          .watermark-text { font-size: 20vw; bottom: 8%; opacity: 0.05 !important; }
        }
      `}</style>
    </>
  );
}
