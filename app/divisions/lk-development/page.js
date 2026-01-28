"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

const pillars = [
    {
        id: 1,
        title: "Research",
        subtitle: "Evidence-Based Insight",
        tagline: "Conducting studies and analyses to identify needs and guide development.",
        icon: "📊",
        audience: [
            "Policy makers and government bodies",
            "NGOs and development agencies",
            "Educational institutions",
            "Program designers"
        ],
        learnings: [
            "Comprehensive needs assessments",
            "Baseline and diagnostic studies",
            "Sector and stakeholder analysis",
            "Program impact evaluation",
            "Data-driven strategic planning"
        ],
        value: "We give institutions a clear, evidence-based picture of their needs and gaps, ensuring that every decision and program is grounded in reality and positioned for success."
    },
    {
        id: 2,
        title: "Training",
        subtitle: "Building Human Capacity",
        tagline: "Qualifying and developing skills & capabilities across fields.",
        icon: "🎓",
        audience: [
            "Youth and students",
            "Professionals seeking upskilling",
            "Educators and trainers",
            "Corporate teams"
        ],
        learnings: [
            "Professional competency development",
            "Life skills integration (soft skills)",
            "Cultural and social intelligence",
            "Labor-market relevance alignment",
            "Curriculum enhancement"
        ],
        value: "We upgrade human capital by strengthening competencies and aligning skills with current and future market needs, fostering both professional and personal growth."
    },
    {
        id: 3,
        title: "Workshops",
        subtitle: "Focused Skill Acquisition",
        tagline: "Intensive, interactive sessions focused on specific topics.",
        icon: "🛠️",
        audience: [
            "Project teams",
            "Creative groups",
            "Community leaders",
            "Specialized professionals"
        ],
        learnings: [
            "Innovation and ideation techniques",
            "Leadership and management skills",
            "Communication and media literacy",
            "Practical, hands-on application",
            "Collaborative problem solving"
        ],
        value: "Our workshops enable participants to gain targeted skills quickly through interactive methods, allowing them to apply new knowledge directly in their work or studies."
    },
    {
        id: 4,
        title: "Project Initiation",
        subtitle: "Driving Real Change",
        tagline: "Starting new projects that serve to achieve desired goals.",
        icon: "🚀",
        audience: [
            "Donors and funders",
            "Implementation partners",
            "Community organizations",
            "Startups and incubators"
        ],
        learnings: [
            "Co-design and pilot initiatives",
            "Project planning and management",
            "Implementation support",
            "Monitoring and refinement",
            "Scaling successful models"
        ],
        value: "We help organizations move from ideas and plans to concrete, actionable projects that generate measurable development outcomes and sustainable impact."
    }
];

export default function LKDevelopmentPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="division-hero development-hero">
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="solutions-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                            <div className="hero-text-content">
                                <span className="division-label development-label">LK-DEVELOPMENT</span>
                                <h1>Continuous Growth & Sustainable Impact</h1>
                                <p className="hero-subtitle">
                                    Supporting and inspiring the continuous development process in various sectors,
                                    meeting needs, and bridging gaps to maintain sustained growth and innovation.
                                </p>
                                <ul className="hero-bullets">
                                    <li>🔍 Evidence-Based Research</li>
                                    <li>🌱 Practical Training & Workshops</li>
                                    <li>💡 Project Initiation for Real Change</li>
                                </ul>
                                <div className="hero-ctas">
                                    <button
                                        className="btn btn-primary development-btn-primary"
                                        onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                    >
                                        Partner With Us
                                    </button>
                                    <a href="#pillars" className="btn btn-secondary development-btn-secondary">
                                        Explore Services
                                    </a>
                                </div>
                            </div>

                            {/* Development Visual Frame (Circle/Growth Style) */}
                            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="development-visual-container">
                                    {/* Placeholder for Development Image - replace with actual asset later */}
                                    <div className="dev-image-wrapper">
                                        <div className="dev-placeholder-pattern"></div>
                                        <Image
                                            src="/assets/media/lk-development/landing_page.png"
                                            alt="LK Development Growth"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            priority
                                        />
                                    </div>
                                    {/* Growth Rings Animation */}
                                    <div className="growth-ring ring-1"></div>
                                    <div className="growth-ring ring-2"></div>
                                    <div className="growth-ring ring-3"></div>
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
                                    <strong>LK-HUB</strong> is dedicated to liberating knowledge and building human
                                    capabilities. We accelerate growth for individuals and institutions through
                                    media, education, training, consulting, and research. Our work is backed by
                                    partnerships with universities, international organizations, NGOs, and media councils.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="about-block development-intro-block">
                                <h2>The Development Arm</h2>
                                <p>
                                    <strong>LK-Development</strong> is the division that designs and delivers
                                    research, training programs, workshops, and development projects tailored
                                    to sector-specific needs. We bridge the gap between potential and performance.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Development Philosophy / Approach */}
            <section className="section development-philosophy bg-development-gradient">
                <div className="container">
                    <FadeInSection>
                        <div className="vm-grid">
                            <div className="vm-card development-vm-card">
                                <div className="vm-icon">🌱</div>
                                <h3>Development Philosophy</h3>
                                <p>
                                    We believe in supporting continuous development processes, meeting real needs,
                                    and bridging gaps so that sectors can maintain sustained growth and innovation.
                                </p>
                                <ul className="philosophy-list">
                                    <li>Starting from real needs through diagnosis & analysis</li>
                                    <li>Integrating research, training, and practice</li>
                                    <li>Focusing on both human skills & institutional capacity</li>
                                    <li>Measuring outcomes and building long-term capabilities</li>
                                </ul>
                            </div>
                            <div className="vm-card development-vm-card" style={{ background: 'rgba(255,255,255,0.1)' }}>
                                <div className="vm-icon">✨</div>
                                <h3>Training Spotlight</h3>
                                <p>
                                    Our programs act as a catalyst for potential, designed to:
                                </p>
                                <ul className="philosophy-list">
                                    <li>Enhance skills from idea generation to production</li>
                                    <li>Foster professional skills for youth & adults</li>
                                    <li>Integrate life, cultural, & labor-market skills</li>
                                    <li>Build well-rounded, adaptable personalities</li>
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
                        <h2>What LK-Development Offers</h2>
                        <p className="lead-text">
                            We work across four main components to drive holistic development.
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* Detailed Pillars (Standard Block Structure) */}
            <section className="section pillars-detailed" id="pillars">
                <div className="container">
                    {pillars.map((pillar, index) => (
                        <FadeInSection key={pillar.id}>
                            <div className={`program-block development-block ${index % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="program-header">
                                    <span className="program-icon development-icon">{pillar.icon}</span>
                                    <div>
                                        <h3>{pillar.title}</h3>
                                        <span className="program-subtitle development-subtitle">{pillar.subtitle}</span>
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

                                <div className="program-value development-value">
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
                            <h2>Why Choose LK-Development</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        <FadeInSection delay={0.1}>
                            <div className="why-card">
                                <span className="why-icon">🔬</span>
                                <h4>Evidence-Based</h4>
                                <p>Combining deep research with practical training and project experience.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.15}>
                            <div className="why-card">
                                <span className="why-icon">🧩</span>
                                <h4>Holistic Approach</h4>
                                <p>Deep understanding of human development, education, and sector needs.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="why-card">
                                <span className="why-icon">🎛️</span>
                                <h4>Tailored & Scalable</h4>
                                <p>Ability to customize programs for different age groups, sectors, and scales.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.25}>
                            <div className="why-card">
                                <span className="why-icon">🌟</span>
                                <h4>Sustainable Impact</h4>
                                <p>A focus on skills that last: life skills, cultural awareness, and market readiness.</p>
                            </div>
                        </FadeInSection>
                    </div>

                    <div className="use-cases-box mt-5 text-center">
                        <h3 className="mb-3">Who We Work With</h3>
                        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-text-muted)' }}>
                            We partner with ministries, NGOs, international organizations, universities, and schools to launch pilot projects
                            and national-level training initiatives that shape policies and build capacity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section final-cta development-cta">
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>Let's Design a Program Together</h2>
                            <p>
                                Whether you need to conduct a diagnostic study, train a team, or launch a new
                                development project, we are ready to collaborate.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary development-btn-primary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Discuss Your Needs
                                </button>
                                <button
                                    className="btn btn-secondary development-btn-secondary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Contact LK-Development
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
