"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

const pillars = [
    {
        id: 1,
        title: "Media Management",
        subtitle: "Strategic Channel Excellence",
        tagline: "Achieving objectives through strategic channel supervision.",
        icon: "📢",
        audience: [
            "Media organizations and outlets",
            "Marketing departments",
            "Communication agencies",
            "Internal comms teams"
        ],
        learnings: [
            "Strategic media planning & channel mix",
            "Campaign organization and supervision",
            "Coordination with diverse media partners",
            "Performance monitoring and real-time optimization",
            "Audience segmentation strategies"
        ],
        value: "Ensure message consistency and efficient budget utilization while aligning every media effort with your broader organizational goals."
    },
    {
        id: 2,
        title: "Technology Solutions",
        subtitle: "Digital Transformation",
        tagline: "Driving digital transformation with custom platforms.",
        icon: "💻",
        audience: [
            "Educational institutions",
            "Corporate training departments",
            "Digital-first organizations",
            "Startups and tech ventures"
        ],
        learnings: [
            "Custom design & development of digital platforms",
            "E-learning portals and interactive dashboards",
            "Seamless integration of media and tech tools",
            "Scalable architecture & user-experience focus",
            "Data analytics and reporting systems"
        ],
        value: "Modernize your communication and training capabilities with tailored tools that enhance technical skills, learning, and operational success."
    },
    {
        id: 3,
        title: "Networking",
        subtitle: "Building Strategic Bridges",
        tagline: "Building bridges for maximum benefit and reach.",
        icon: "🌐",
        audience: [
            "Business development teams",
            "Partnership managers",
            "Event organizers",
            "Public relations professionals"
        ],
        learnings: [
            "Establishing relationships with key media outlets",
            "Influencer management & strategic partnerships",
            "Organizing networking events and campaigns",
            "Stakeholder engagement strategies",
            "Cross-sector collaboration models"
        ],
        value: "Expand the reach and credibility of your message by opening doors to powerful collaborations and maximizing visibility in your sector."
    },
    {
        id: 4,
        title: "Content Creation",
        subtitle: "Engaging Narrative Design",
        tagline: "Producing engaging content that drives results.",
        icon: "🎨",
        audience: [
            "Brand managers",
            "Content marketing teams",
            "Social media managers",
            "Creative directors"
        ],
        learnings: [
            "Creative concept development & scriptwriting",
            "Multimedia production (video, audio, social)",
            "Copywriting for diverse platforms",
            "Adaptation for specific target audiences",
            "Storytelling for impact"
        ],
        value: "Engage your audience with high-quality, on-brand content crafted specifically to drive awareness, engagement, and behavioral change."
    }
];

export default function LKSolutionsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="division-hero solutions-hero">
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="solutions-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                            <div className="hero-text-content">
                                <span className="division-label solutions-label">LK-SOLUTIONS</span>
                                <h1>Integrated Media & Technology Solutions</h1>
                                <p className="hero-subtitle">
                                    Delivering strategic innovation, custom platforms, and impactful content
                                    to accelerate growth for organizations and institutions.
                                </p>
                                <ul className="hero-bullets">
                                    <li>✨ Strategic Media Planning</li>
                                    <li>💻 Custom Technology Platforms</li>
                                    <li>🚀 Impactful Content & Partnerships</li>
                                </ul>
                                <div className="hero-ctas">
                                    <button
                                        className="btn btn-primary solutions-btn-primary"
                                        onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                    >
                                        Talk to Our Team
                                    </button>
                                    <a href="#pillars" className="btn btn-secondary solutions-btn-secondary">
                                        Explore Our Solutions
                                    </a>
                                </div>
                            </div>

                            {/* Tech/Hexagon Frame Placeholder */}
                            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="solutions-tech-frame">
                                    <div className="tech-image-container">
                                        <div className="tech-placeholder-overlay"></div>
                                        <Image
                                            src="/assets/media/lk-solutions/landing_page.png"
                                            alt="LK Solutions Innovation"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            priority
                                        />
                                    </div>
                                    {/* Tech Nodes/Orbits */}
                                    <div className="tech-node node-1"></div>
                                    <div className="tech-node node-2"></div>
                                    <div className="tech-node node-3"></div>
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
                                    <strong>LK-HUB</strong> is a leading company focused on liberating knowledge
                                    and accelerating growth for individuals and institutions through media,
                                    education, technology, consulting, and training. We bring years of experience
                                    working with major local and international partners—including universities,
                                    international organizations, media councils, and NGOs.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="about-block solutions-intro-block">
                                <h2>The Solutions Arm</h2>
                                <p>
                                    <strong>LK-Solutions</strong> is the specialized unit that turns this expertise
                                    into concrete reality. We provide integrated technological and media solutions
                                    tailored to your unique objectives, using a variety of tools and creative
                                    innovations to solve complex challenges.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section vision-mission bg-solutions-gradient">
                <div className="container">
                    <div className="vm-grid">
                        <FadeInSection direction="left">
                            <div className="vm-card solutions-vm-card">
                                <div className="vm-icon">👁️</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To be the premier partner for organizations seeking to transform how
                                    they communicate, teach, and engage through cutting-edge technology
                                    and strategic media innovation.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="vm-card solutions-vm-card">
                                <div className="vm-icon">🚀</div>
                                <h3>Our Mission</h3>
                                <p>
                                    To drive digital transformation and capacity building by delivering
                                    customized, high-impact media and technology solutions that align
                                    perfectly with our clients' strategic goals.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Strategy / Approach Overview */}
            <section className="section solutions-approach bg-light">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Integrated Strategy</h2>
                            <p>
                                At LK-Solutions, we develop comprehensive plans that align specialized channels,
                                innovative technology, and creative content.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="grid grid-4 strategy-grid">
                        <FadeInSection delay={0.1}>
                            <div className="strategy-card">
                                <div className="strategy-icon">🎯</div>
                                <h4>Clear Objectives</h4>
                                <p>Starting from deep insight into your audience and goals.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="strategy-card">
                                <div className="strategy-icon">🔗</div>
                                <h4>Unified Strategy</h4>
                                <p>Combining media, tech, and content into one cohesive plan.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.3}>
                            <div className="strategy-card">
                                <div className="strategy-icon">📊</div>
                                <h4>Data-Driven</h4>
                                <p>Using feedback and analytics to refine and optimize impact.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.4}>
                            <div className="strategy-card">
                                <div className="strategy-icon">🤝</div>
                                <h4>Co-Creation</h4>
                                <p>Collaborating closely with partners and stakeholders.</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Detailed Pillars (Same structure as Programs in Sports/Kids) */}
            <section className="section pillars-detailed" id="pillars">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>What LK-Solutions Delivers</h2>
                            <p>We deliver value across four integrated pillars.</p>
                        </div>
                    </FadeInSection>

                    {pillars.map((pillar, index) => (
                        <FadeInSection key={pillar.id}>
                            <div className={`program-block solutions-block ${index % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="program-header">
                                    <span className="program-icon solutions-icon">{pillar.icon}</span>
                                    <div>
                                        <h3>{pillar.title}</h3>
                                        <span className="program-subtitle solutions-subtitle">{pillar.subtitle}</span>
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

                                <div className="program-value solutions-value">
                                    <strong>Value for Clients:</strong> {pillar.value}
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
                            <h2>Why Choose LK-Solutions</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        <FadeInSection delay={0.1}>
                            <div className="why-card">
                                <span className="why-icon">🧠</span>
                                <h4>Expertise</h4>
                                <p>A unique blend of media know-how, tech capabilities, and strategic thinking.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.15}>
                            <div className="why-card">
                                <span className="why-icon">🏛️</span>
                                <h4>Credibility</h4>
                                <p>Backed by LK-HUB’s 20+ years of experience and global partnerships.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="why-card">
                                <span className="why-icon">⚡</span>
                                <h4>Flexibility</h4>
                                <p>Solutions customized to different scales, goals, and budgets.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.25}>
                            <div className="why-card">
                                <span className="why-icon">📈</span>
                                <h4>Impact</h4>
                                <p>A relentless focus on measurable results and long-term relationships.</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section final-cta solutions-cta">
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>Ready to Solve Your Media Challenges?</h2>
                            <p>
                                Whether you need a comprehensive media strategy, a custom digital platform,
                                or a partner to amplify your message, we are ready to co-design the perfect solution.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary solutions-btn-primary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Start a Project
                                </button>
                                <button
                                    className="btn btn-secondary solutions-btn-secondary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Schedule a Consultation
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
