"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

const pillars = [
    {
        id: 1,
        title: "Consulting Services",
        subtitle: "Inclusion & Support",
        tagline: "Technical consultations for rehabilitation and inclusive employment.",
        icon: "🩺",
        audience: [
            "Rehabilitation centers",
            "Disability rights organizations",
            "Inclusive employers",
            "Policy makers"
        ],
        learnings: [
            "Strategies for professional rehabilitation programs",
            "Communication consulting for disability inclusion",
            "Designing accessible messaging and channels",
            "Internal communication for inclusive workplaces",
            "Outreach and advocacy for employment rights"
        ],
        value: "We help organizations translate their commitment to inclusion into clear, practical communication strategies that support real opportunities for persons with disabilities."
    },
    {
        id: 2,
        title: "Communication for Development",
        subtitle: "Awareness & Change",
        tagline: "Enhancing awareness of development issues to achieve positive change.",
        icon: "📣",
        audience: [
            "International development agencies",
            "NGOs and civil society",
            "Community leaders",
            "Public health organizations"
        ],
        learnings: [
            "Designing strategies for key development themes",
            "Creating messages that drive behavior change",
            "Facilitating community dialogue and engagement",
            "Monitoring and evaluating impact",
            "Campaigns for health, education, and rights"
        ],
        value: "We help you move beyond simple information dissemination to driving real shifts in attitudes and behaviors, fostering sustainable development in communities."
    },
    {
        id: 3,
        title: "Social Responsibility Tools",
        subtitle: "Impact Narrative",
        tagline: "Enhancing the role of organizations in serving the community.",
        icon: "🤝",
        audience: [
            "Corporate CSR departments",
            "Foundations and charities",
            "Social enterprises",
            "Community initiatives"
        ],
        learnings: [
            "Translating CSR strategies into clear narratives",
            "Developing toolkits for community initiatives",
            "Storytelling around impact and partnerships",
            "Internal training for effective CSR communication",
            "Strengthening community connections"
        ],
        value: "We strengthen the visibility and credibility of your social initiatives, ensuring your contributions to society are understood, valued, and amplified."
    },
    {
        id: 4,
        title: "Media Campaigns",
        subtitle: "Integrated Execution",
        tagline: "Designing and executing integrated campaigns to achieve specific goals.",
        icon: "📡",
        audience: [
            "Brand managers",
            "Public sector bodies",
            "Advocacy groups",
            "Event organizers"
        ],
        learnings: [
            "Campaign concept and key message development",
            "Integrated planning across all channels",
            "Content production (visual, audio, digital)",
            "Media relations and management",
            "Performance monitoring and optimization"
        ],
        value: "We deliver coherent, measurable campaigns that align perfectly with your organizational goals while driving social impact and engagement."
    }
];

export default function LKCommunicationPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="division-hero communication-hero">
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="solutions-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                            <div className="hero-text-content">
                                <span className="division-label communication-label">LK-COMMUNICATION</span>
                                <h1>Connecting Ideas, Amplifying Impact</h1>
                                <p className="hero-subtitle">
                                    We work to connect ideas and amplify the flow of communications through channels
                                    that serve to express the values of organizations and their initiatives toward society.
                                </p>
                                <ul className="hero-bullets">
                                    <li>📢 Impact-Driven Communication Strategies</li>
                                    <li>🤝 Inclusive Consulting & CSR Tools</li>
                                    <li>🚀 Integrated Media Campaigns for Development</li>
                                </ul>
                                <div className="hero-ctas">
                                    <button
                                        className="btn btn-primary communication-btn-primary"
                                        onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                    >
                                        Design a Strategy
                                    </button>
                                    <a href="#pillars" className="btn btn-secondary communication-btn-secondary">
                                        Explore Our Services
                                    </a>
                                </div>
                            </div>

                            {/* Communication Visual Frame (Network/Pulse Style) */}
                            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="communication-visual-container">
                                    {/* Placeholder for Communication Image */}
                                    <div className="comm-image-wrapper">
                                        <div className="comm-placeholder-pattern"></div>
                                    </div>
                                    {/* Pulse/Network Animation */}
                                    <div className="comm-pulse pulse-1"></div>
                                    <div className="comm-pulse pulse-2"></div>
                                    <div className="comm-dot dot-1"></div>
                                    <div className="comm-dot dot-2"></div>
                                    <div className="comm-dot dot-3"></div>
                                    <div className="comm-line line-1"></div>
                                    <div className="comm-line line-2"></div>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* About Section */}
            <section className="section division-about">
                <div className="container">
                    <div className="about-grid">
                        <FadeInSection direction="left">
                            <div className="about-block">
                                <h2>Our Foundation</h2>
                                <p>
                                    <strong>LK-HUB</strong> is a pioneering company dedicated to liberating knowledge
                                    and supporting development through media, education, consulting, and training.
                                    We empower institutions to achieve sustainable growth and positive social change.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="about-block communication-intro-block">
                                <h2>The Communication Arm</h2>
                                <p>
                                    <strong>LK-Communication</strong> is the specialized division that designs and manages
                                    strategic communication, social impact messaging, and campaigns. We act as the bridge
                                    connecting organizations with their communities through value-driven narratives.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Communication Philosophy */}
            <section className="section communication-philosophy bg-communication-gradient">
                <div className="container">
                    <FadeInSection>
                        <div className="vm-grid">
                            <div className="vm-card communication-vm-card">
                                <div className="vm-icon">💬</div>
                                <h3>Communication With Purpose</h3>
                                <p>
                                    We believe in the power of connecting ideas, values, and society through thoughtful,
                                    strategic communication that drives real understanding and action.
                                </p>
                                <ul className="philosophy-list">
                                    <li>Centering people & communities in every message</li>
                                    <li>Aligning communication with values & goals</li>
                                    <li>Using evidence-based, ethical practices</li>
                                    <li>Measuring impact & learning from feedback</li>
                                </ul>
                            </div>
                            <div className="vm-card communication-vm-card" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="vm-icon">🌍</div>
                                <h3>Our Impact Focus</h3>
                                <p>
                                    Our work goes beyond visibility; it fosters inclusion and change. We specialize in:
                                </p>
                                <ul className="philosophy-list">
                                    <li>Giving voice to marginalized groups</li>
                                    <li>Enhancing the role of organizations in society</li>
                                    <li>Translating complex issues into clear calls to action</li>
                                    <li>Building bridges between sectors and citizens</li>
                                </ul>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Pillars Overview Header */}
            <section className="section pillars-intro text-center pb-0">
                <div className="container">
                    <FadeInSection>
                        <h2>What LK-Communication Delivers</h2>
                        <p className="lead-text">
                            We operate across four main service pillars to drive engagement and impact.
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* Detailed Pillars (Standard Block Structure) */}
            <section className="section pillars-detailed" id="pillars">
                <div className="container">
                    {pillars.map((pillar, index) => (
                        <FadeInSection key={pillar.id}>
                            <div className={`program-block communication-block ${index % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="program-header">
                                    <span className="program-icon communication-icon">{pillar.icon}</span>
                                    <div>
                                        <h3>{pillar.title}</h3>
                                        <span className="program-subtitle communication-subtitle">{pillar.subtitle}</span>
                                    </div>
                                </div>
                                <p className="program-tagline">{pillar.tagline}</p>

                                <div className="program-content-grid">
                                    <div className="program-audience">
                                        <h4>Who It's For</h4>
                                        <ul>
                                            {pillar.audience.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="program-learnings">
                                        <h4>What We Do</h4>
                                        <ul>
                                            {pillar.learnings.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="program-value communication-value">
                                    <strong>Value for Partners:</strong> {pillar.value}
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </section>

            {/* Why Choose & Use Cases */}
            <section className="section why-choose bg-light">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Why Choose LK-Communication</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        <FadeInSection delay={0.1}>
                            <div className="why-card">
                                <span className="why-icon">🏗️</span>
                                <h4>Integrated Expertise</h4>
                                <p>Combining strategy, social impact focus, and media production expertise.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.15}>
                            <div className="why-card">
                                <span className="why-icon">💜</span>
                                <h4>Social Impact Core</h4>
                                <p>Deep experience with sensitive topics like disability, inclusion, and development.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="why-card">
                                <span className="why-icon">⚖️</span>
                                <h4>Ethical & Credible</h4>
                                <p>Commitment to evidence-based communication that respects communities.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.25}>
                            <div className="why-card">
                                <span className="why-icon">🔄</span>
                                <h4>Full Service</h4>
                                <p>Ability to work across consulting, campaigns, and capacity building.</p>
                            </div>
                        </FadeInSection>
                    </div>

                    <div className="use-cases-box mt-5 text-center">
                        <h3 className="mb-3">Who We Partner With</h3>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-muted)' }}>
                            We collaborate with NGOs, UN agencies, government ministries, local authorities, and purpose-driven brands on
                            campaigns promoting inclusion, national development programs, and CSR storytelling.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section final-cta communication-cta">
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>Ready to Amplify Your Impact?</h2>
                            <p>
                                Whether you need a strategic plan, a social media campaign, or consulting on inclusion,
                                we are here to help you connect with your audience.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary communication-btn-primary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Start a Conversation
                                </button>
                                <button
                                    className="btn btn-secondary communication-btn-secondary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Plan Your Next Campaign
                                </button>
                            </div>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span>📧</span>
                                    <a href="mailto:info@liberating-knowledge.com">info@liberating-knowledge.com</a>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </>
    );
}
