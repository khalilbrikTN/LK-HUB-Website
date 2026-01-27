"use client";
import Link from 'next/link';
import Image from 'next/image';

import DivisionsWheel from '@/src/components/DivisionsWheel';
import TestimonialsCarousel from '@/src/components/TestimonialsCarousel';
import LogoMarquee from '@/src/components/LogoMarquee';
import FadeInSection from '@/src/components/FadeInSection';
import StatsSection from '@/src/components/StatsSection';
import { testimonialsData } from '@/src/data/testimonials';

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

      <FadeInSection>
        <section className="section about-snippet">
          <div className="container">
            <FadeInSection direction="up" delay={0.1}>
              <div className="about-text">
                <h2>Who We Are</h2>
                <p>LK-HUB is a pioneering company distinguishing itself as the first to introduce media literacy
                  programs in the region. With partnerships with global icons like UNICEF, UNESCO, and FIFA, we
                  provide the tools needed to navigate and lead in today's world.</p>
                <br />
                <Link href="/about" className="btn btn-secondary">Learn More</Link>
              </div>
            </FadeInSection>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section className="section bg-light">
          <div className="container">
            <FadeInSection delay={0.1}>
              <h2 className="text-center">Our Business Divisions</h2>
              <br />
            </FadeInSection>
            <div className="grid grid-3">
              <FadeInSection delay={0.1}>
                <div className="card">
                  <h3>LK-Communication</h3>
                  <p>Connecting ideas through consulting, media campaigns, and communication for development.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.15}>
                <div className="card">
                  <h3>LK-Solutions</h3>
                  <p>Integrated technological and media solutions, content creation, and digital platforms.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <div className="card">
                  <h3>LK-Sports</h3>
                  <p>Preparing sports professionals with psychology, marketing, and sponsorship management programs.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.25}>
                <div className="card">
                  <h3>LK-Development</h3>
                  <p>Supporting continuous development through research, training, and strategic workshops.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <div className="card">
                  <h3>LK-Education</h3>
                  <p>Managing Applied Technology Schools to meet labor market needs with strategic planning.</p>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.35}>
                <div className="card">
                  <h3>LK-Kids</h3>
                  <p>Educational programs, books, and interactive games for children aged 4-17.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Carousel */}
      <FadeInSection>
        <TestimonialsCarousel testimonials={testimonialsData} />
      </FadeInSection>

      {/* Sponsors Marquee */}
      <FadeInSection>
        <LogoMarquee speed={35} />
      </FadeInSection>
    </>
  );
}
