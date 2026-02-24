"use client";

import TeamCard from '@/src/components/TeamCard';
import { teamData } from '@/src/data/team';

export default function AboutContent() {
    return (
        <div className="about-page">
            {/* Premium Hero Section */}
            <header className="about-hero">
                <div className="container">
                    <div className="hero-content">
                        <span className="badge">Our Legacy</span>
                        <h1>Liberating Knowledge Through <span className="highlight">Innovation</span></h1>
                        <p className="hero-lead">Pioneering capacity building and media literacy for over over two decades, empowering individuals and organizations to navigate a media-driven world.</p>
                    </div>
                </div>
                <div className="hero-shape"></div>
            </header>

            <section className="section about-story">
                <div className="container">
                    {/* Big editorial headline */}
                    <div className="story-header">
                        <span className="story-eyebrow">Our Story</span>
                        <h2 className="story-big-title">The LK-HUB Story</h2>
                    </div>

                    {/* Two-column body */}
                    <div className="story-body-grid">
                        <div className="story-pull-quote">
                            <p className="pull-quote-text">
                                &ldquo;The first to introduce media literacy programs in the region — pioneering a mission of
                                <span className="highlight"> Liberating Knowledge.</span>&rdquo;
                            </p>
                        </div>
                        <div className="story-body-text">
                            <p>LK-HUB is a pioneering company in accelerating capacity building, striving to achieve its mission of Liberating Knowledge. We distinguish ourselves as the first to introduce media literacy programs in the region.</p>
                            <p>With 20+ years of expertise, we have partnered with global icons like <strong>UNICEF, UNESCO, FIFA, and AUC</strong> to deliver high-quality solutions and programs. From children to decision-makers, we provide the tools needed to lead in today's complex media landscape.</p>
                        </div>
                    </div>

                    {/* Full-width stats strip */}
                    <div className="story-stats-strip">
                        <div className="story-stat">
                            <span className="story-stat-num">20+</span>
                            <span className="story-stat-label">Years of Excellence</span>
                        </div>
                        <div className="story-stat-divider" />
                        <div className="story-stat">
                            <span className="story-stat-num">50+</span>
                            <span className="story-stat-label">Global Partners</span>
                        </div>
                        <div className="story-stat-divider" />
                        <div className="story-stat">
                            <span className="story-stat-num">6</span>
                            <span className="story-stat-label">Core Divisions</span>
                        </div>
                        <div className="story-stat-divider" />
                        <div className="story-stat">
                            <span className="story-stat-num">100+</span>
                            <span className="story-stat-label">Programs Delivered</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission with premium cards */}
            <section className="section mission-vision bg-light-alt">
                <div className="container">
                    <div className="grid grid-2">
                        <div className="glass-card vision-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                            </div>
                            <h3>Our Vision</h3>
                            <p>To become a leading global hub in the field of media and technology, by providing innovative
                                services and solutions, education, training, & creative content for creators of all ages.</p>
                        </div>
                        <div className="glass-card mission-card">
                            <div className="card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16 12-4-4-4 4" /><path d="M12 16V8" /></svg>
                            </div>
                            <h3>Our Mission</h3>
                            <p>We strive to accelerate growth by offering strategic consultations, training, workshops,
                                & interactive initiatives aimed at Liberating Knowledge and fostering digital resilience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Excellence Grid */}
            <section className="section excellence">
                <div className="container">
                    <div className="text-center mb-lg">
                        <h2 className="section-title">Driving Excellence</h2>
                        <p className="subtitle">Our core pillars that define every project we undertake.</p>
                    </div>
                    <div className="grid grid-3">
                        <div className="pillar-card">
                            <div className="pillar-index">01</div>
                            <h3>Innovation</h3>
                            <p>Providing cutting-edge services and creative content that pushes boundaries.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-index">02</div>
                            <h3>Empowerment</h3>
                            <p>Enhancing cognitive capabilities of future generations through education.</p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-index">03</div>
                            <h3>Impact</h3>
                            <p>Achieving positive change through communication for development strategies.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="section leadership bg-light">
                <div className="container">
                    <div className="text-center mb-lg">
                        <span className="badge">Leadership</span>
                        <h2>Meet Our Visionaries</h2>
                        <p className="subtitle">The experts driving our mission to liberate knowledge.</p>
                    </div>

                    <div className="team-container-centered">
                        <div className="team-grid-two">
                            {teamData.map((member) => (
                                <TeamCard key={member.id} member={member} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-hero {
                    padding: 180px 0 100px;
                    background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
                    color: white;
                    position: relative;
                    overflow: hidden;
                }
                .hero-content {
                    max-width: 800px;
                    position: relative;
                    z-index: 2;
                }
                .hero-content h1 {
                    color: white;
                    font-size: 4rem;
                    margin: 1.5rem 0;
                }
                .hero-lead {
                    font-size: 1.25rem;
                    opacity: 0.9;
                    line-height: 1.8;
                }
                .badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(165, 124, 48, 0.2);
                    color: var(--color-secondary);
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border: 1px solid var(--color-secondary);
                }
                .hero-shape {
                    position: absolute;
                    top: -10%;
                    right: -5%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
                    opacity: 0.15;
                    filter: blur(60px);
                }
                /* Story Section */
                .about-story { padding: 8rem 0; }
                .story-header { margin-bottom: 5rem; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 3rem; }
                .story-eyebrow { text-transform: uppercase; letter-spacing: 5px; font-size: 0.8rem; font-weight: 900; color: var(--color-secondary); display: block; margin-bottom: 1.5rem; }
                .story-big-title { font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 800; line-height: 0.95; letter-spacing: -3px; color: var(--color-primary); margin: 0; }

                .story-body-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; margin-bottom: 6rem; }
                .story-pull-quote { border-left: 4px solid var(--color-secondary); padding-left: 2.5rem; }
                .pull-quote-text { font-size: 1.6rem; line-height: 1.5; font-family: var(--font-premium); font-style: italic; color: var(--color-primary); margin: 0; }
                .story-body-text p { font-size: 1.1rem; line-height: 1.9; color: var(--color-text-muted); margin-bottom: 1.5rem; }
                .story-body-text p:last-child { margin-bottom: 0; }

                .story-stats-strip { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; align-items: center; border-top: 1px solid rgba(0,0,0,0.08); border-bottom: 1px solid rgba(0,0,0,0.08); padding: 3rem 0; gap: 2rem; }
                .story-stat { text-align: center; }
                .story-stat-num { display: block; font-size: 3.5rem; font-weight: 900; color: var(--color-primary); line-height: 1; letter-spacing: -2px; }
                .story-stat-label { display: block; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: var(--color-text-muted); font-weight: 700; margin-top: 0.5rem; }
                .story-stat-divider { width: 1px; height: 60px; background: rgba(0,0,0,0.1); justify-self: center; }
                .bg-light-alt {
                    background-color: #F8F6F2;
                }
                .glass-card {
                    background: white;
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .glass-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 60px rgba(0,0,0,0.1);
                }
                .card-icon {
                    width: 60px;
                    height: 60px;
                    background: var(--color-background-alt);
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary);
                    margin-bottom: 1.5rem;
                }
                .pillar-card {
                    padding: 2.5rem;
                    background: white;
                    border-radius: 20px;
                    position: relative;
                    transition: all 0.3s ease;
                }
                .pillar-card:hover {
                    background: var(--color-primary);
                    color: white;
                }
                .pillar-card:hover h3 {
                    color: var(--color-secondary);
                }
                .pillar-card:hover .pillar-index {
                    color: rgba(255,255,255,0.1);
                }
                .pillar-index {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    font-size: 3rem;
                    font-weight: 800;
                    color: rgba(0,0,0,0.05);
                    line-height: 1;
                    transition: all 0.3s ease;
                }
                .mb-lg {
                    margin-bottom: 4rem;
                }
                .subtitle {
                    font-size: 1.2rem;
                    color: var(--color-text-muted);
                    max-width: 600px;
                    margin: 0.5rem auto 0;
                }
                .team-container-centered {
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .team-grid-two {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                }
                @media (max-width: 900px) {
                    .hero-content h1 { font-size: 3rem; }
                    .team-grid-two { grid-template-columns: 1fr; }
                    .stats-mini { justify-content: center; }
                }
            `}</style>
        </div>
    );
}
