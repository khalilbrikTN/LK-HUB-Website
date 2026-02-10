"use client";
import Link from 'next/link';
import Image from 'next/image';

import DivisionsWheel from '@/src/components/DivisionsWheel';
import LogoMarquee from '@/src/components/LogoMarquee';
import FadeInSection from '@/src/components/FadeInSection';
import StatsSection from '@/src/components/StatsSection';
import VisionMission from '@/src/components/VisionMission';
import BusinessDivisions from '@/src/components/BusinessDivisions';
import LatestNews from '@/src/components/LatestNews';

import NewsletterSection from '@/src/components/NewsletterSection';

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <FadeInSection direction="up" delay={0.1}>
              <div className="hero-text">
                <h1>Accelerating Capacity Building & <span className="highlight">Liberating Knowledge</span></h1>
                <p>Pioneering media literacy and innovative solutions for a media-driven world. 20+ years of expertise
                  empowering individuals and organizations.</p>
                <div className="hero-buttons">
                  <Link href="/divisions" className="btn btn-primary">Explore Divisions</Link>
                  <button className="btn btn-secondary" onClick={() => document.getElementById('contact-modal').classList.remove('hidden')}>Contact Us</button>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection direction="up" delay={0.3}>
              <div className="hero-visual">
                <DivisionsWheel />
              </div>
            </FadeInSection>
          </div>
        </div>
      </header>

      <VisionMission />

      <BusinessDivisions />

      {/* Stats Section */}
      <StatsSection />

      {/* Latest Updates Section */}
      <LatestNews />

      {/* Sponsors Marquee */}
      <FadeInSection>
        <LogoMarquee speed={35} />
      </FadeInSection>

      {/* Newsletter Section */}
      <FadeInSection>
        <NewsletterSection />
      </FadeInSection>
    </>
  );
}
