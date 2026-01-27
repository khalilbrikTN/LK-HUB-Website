"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

const programs = [
    {
        id: 1,
        title: "Sports Psychology",
        subtitle: "Champion Mindset",
        tagline: "Master the mental game that separates good athletes from great ones.",
        icon: "🧠",
        audience: [
            "Professional and amateur athletes",
            "Coaches and performance directors",
            "High-performance teams and academies",
            "Sports psychologists and consultants"
        ],
        learnings: [
            "Build unshakeable confidence under pressure",
            "Develop mental toughness and resilience",
            "Master focus and attention management",
            "Manage pre-competition anxiety effectively",
            "Strengthen team cohesion and communication",
            "Set and achieve meaningful performance goals",
            "Cultivate positive self-talk patterns",
            "Overcome setbacks and performance slumps"
        ],
        value: "This program equips athletes and teams with proven psychological tools to perform consistently under pressure, bounce back from setbacks, and unlock their full competitive potential."
    },
    {
        id: 2,
        title: "Sports Branding & Marketing",
        subtitle: "Build Lasting Sports Brands",
        tagline: "Transform teams, athletes, and events into powerful, enduring brands.",
        icon: "📈",
        audience: [
            "Marketing agencies and brand managers",
            "Sports management professionals",
            "Media and communications specialists",
            "Athletes building personal brands"
        ],
        learnings: [
            "Create compelling personal brands for athletes",
            "Design creative content and campaign strategies",
            "Market events to maximize attendance and engagement",
            "Understand how global sports icons are built",
            "Develop fan engagement and community strategies",
            "Leverage market research and analytics",
            "Execute activations that drive measurable results",
            "Build digital presence across platforms"
        ],
        value: "Participants gain practical skills to build and grow sports brands that resonate with fans, attract sponsors, and create value that extends far beyond the final whistle."
    },
    {
        id: 3,
        title: "Networking in Sports",
        subtitle: "Strategic Relationship Building",
        tagline: "Build the connections that open doors in the sports industry.",
        icon: "🤝",
        audience: [
            "Business and sports management students",
            "Ambitious sports professionals",
            "Sports entrepreneurs and consultants",
            "Career changers entering the industry"
        ],
        learnings: [
            "Identify key stakeholders and decision-makers",
            "Craft compelling introductions and elevator pitches",
            "Communicate confidently at industry events",
            "Leverage digital platforms to expand your network",
            "Conduct effective informational interviews",
            "Build authentic, long-term relationships",
            "Enhance your professional image and reputation"
        ],
        value: "This program enables participants to build strategic networks that accelerate careers, create opportunities, and establish lasting influence in the sports ecosystem."
    },
    {
        id: 4,
        title: "Sports Entrepreneurship",
        subtitle: "Launch Your Sports Venture",
        tagline: "Turn innovative sports ideas into sustainable, scalable businesses.",
        icon: "🚀",
        audience: [
            "Aspiring founders and startup enthusiasts",
            "Students with sports business ideas",
            "Sports professionals seeking independence",
            "Innovation teams within sports organizations"
        ],
        learnings: [
            "Generate and validate sports venture ideas",
            "Design business models using the Business Model Canvas",
            "Prepare funding pitches for investors",
            "Navigate legal fundamentals and intellectual property",
            "Develop products and services for sports markets",
            "Plan go-to-market and launch strategies",
            "Build and lead high-performing teams"
        ],
        value: "Participants leave with a practical toolkit and actionable roadmap to transform innovative sports ideas into sustainable, scalable businesses."
    },
    {
        id: 5,
        title: "Sponsorship Management",
        subtitle: "Drive Revenue Through Partnerships",
        tagline: "Design, negotiate, and activate sponsorships that deliver mutual value.",
        icon: "💼",
        audience: [
            "Sports marketers and commercial managers",
            "Brand managers and agency professionals",
            "Club and federation commercial staff",
            "Rights holders and event organizers"
        ],
        learnings: [
            "Understand sponsorship fundamentals and value creation",
            "Identify and value sponsorable assets",
            "Prospect and approach potential sponsors",
            "Negotiate and close sponsorship deals",
            "Activate sponsorships for maximum impact",
            "Measure ROI and demonstrate value",
            "Navigate legal and contractual aspects",
            "Manage ongoing sponsor relationships"
        ],
        value: "This program prepares participants to create and manage high-impact sponsorships that drive revenue, strengthen brands, and build long-term commercial partnerships."
    },
    {
        id: 6,
        title: "Sports Logistics",
        subtitle: "Operations Behind the Game",
        tagline: "Master the logistics that make world-class sports events possible.",
        icon: "⚙️",
        audience: [
            "Operations and event management staff",
            "Logistics and supply chain professionals",
            "Venue and facility managers",
            "Those interested in sports event delivery"
        ],
        learnings: [
            "Manage equipment and venue operations (VAR, timing systems)",
            "Coordinate sports supply chains (tickets, merchandise, vendors)",
            "Plan crowd management and security protocols",
            "Design hospitality, travel, and accommodation logistics",
            "Organize transportation for teams, officials, and media",
            "Implement smart infrastructure and digital logistics",
            "Apply AI, IoT, and sustainable logistics trends"
        ],
        value: "Participants gain the skills to design and deliver efficient, safe, and memorable sports events that meet international standards."
    },
    {
        id: 7,
        title: "Sports Law & Arbitration",
        subtitle: "Navigate Legal Frameworks",
        tagline: "Understand the legal landscape and dispute resolution in global sports.",
        icon: "⚖️",
        audience: [
            "Lawyers and legal professionals",
            "Sports administrators and executives",
            "Compliance and governance officers",
            "Those handling sports contracts and disputes"
        ],
        learnings: [
            "Understand sports arbitration vs. ordinary courts",
            "Navigate key institutions (CAS, national centers)",
            "Address challenges: cost, expertise, independence",
            "Master arbitration procedures and evidence rules",
            "Draft effective arbitration clauses",
            "Enforce awards under the New York Convention",
            "Manage dispute bodies and appeals processes"
        ],
        value: "This program equips participants to handle sports disputes professionally and support fair, ethical governance across the sports industry."
    },
    {
        id: 8,
        title: "Athlete Management",
        subtitle: "Careers On & Off the Field",
        tagline: "Protect athletes' rights and maximize their long-term success.",
        icon: "🏆",
        audience: [
            "Future player agents and representatives",
            "Sports managers and talent directors",
            "Club staff working with athletes",
            "Those passionate about athlete welfare"
        ],
        learnings: [
            "Manage contracts and transfers (FIFA regulations)",
            "Build athlete brands and secure endorsements",
            "Handle media relations and public presence",
            "Guide financial planning and investments",
            "Support retirement and career transitions",
            "Address life management (mental health, education, balance)"
        ],
        value: "Participants learn to protect athletes' rights, maximize their commercial value, and secure their long-term financial, professional, and personal wellbeing."
    }
];

const programOverview = [
    "Sports Psychology – Champion Mindset",
    "Sports Branding & Marketing",
    "Networking in the Sports Industry",
    "Sports Entrepreneurship",
    "Sponsorship Management",
    "Sports Logistics",
    "Sports Law & Arbitration",
    "Athlete Management"
];

export default function LKSportsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="division-hero sports-hero">
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="division-hero-content">
                            <span className="division-label">LK-Sports</span>
                            <h1>Empowering the Future of Sports</h1>
                            <p className="hero-subtitle">
                                Specialized programs that develop the skills, mindset, and networks
                                needed to thrive in the global sports industry.
                            </p>
                            <ul className="hero-bullets">
                                <li>🎯 Industry-expert designed curricula</li>
                                <li>🌍 Global perspectives with local relevance</li>
                                <li>🤝 Direct pathways to sports careers</li>
                            </ul>
                            <div className="hero-ctas">
                                <a href="#programs" className="btn btn-primary">Explore Programs</a>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Talk to Our Team
                                </button>
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
                                <h2>About LK-HUB</h2>
                                <p>
                                    LK-HUB (Liberating Knowledge) is dedicated to empowering individuals
                                    and organizations through innovative programs, research, consulting,
                                    and workshops. We develop human capabilities and unlock potential
                                    across industries. Trusted by leading institutions including the
                                    American University in Cairo, UNICEF, and UNESCO, we bring credibility
                                    and expertise to every program we deliver.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="about-block">
                                <h2>About LK-Sports</h2>
                                <p>
                                    LK-Sports is our specialized division focused on sports, education,
                                    media, and technology. We offer innovative programs and creative
                                    content tailored to athletes, organizations, agencies, and professionals
                                    across the sports ecosystem. Our collaboration with international sports
                                    organizations, including FIFA, positions us at the forefront of sports
                                    development globally.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                    <FadeInSection>
                        <div className="trust-badges">
                            <span>Trusted by:</span>
                            <div className="badge-logos">
                                <span className="trust-badge">American University in Cairo</span>
                                <span className="trust-badge">UNICEF</span>
                                <span className="trust-badge">UNESCO</span>
                                <span className="trust-badge">FIFA</span>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section vision-mission bg-dark">
                <div className="container">
                    <div className="vm-grid">
                        <FadeInSection direction="left">
                            <div className="vm-card">
                                <div className="vm-icon">👁️</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To be the leading catalyst for sports excellence in the region,
                                    shaping future leaders who drive innovation, integrity, and
                                    sustainable growth across the global sports industry.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="vm-card">
                                <div className="vm-icon">🎯</div>
                                <h3>Our Mission</h3>
                                <p>
                                    To empower individuals and organizations in the sports industry
                                    through high-impact programs, practical workshops, and expert
                                    consulting that develop essential skills and create meaningful
                                    career opportunities.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Programs Overview */}
            <section className="section programs-overview" id="programs">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Our Program Portfolio</h2>
                            <p>
                                LK-Sports offers a comprehensive portfolio of specialized programs
                                covering the psychological, commercial, managerial, legal, and
                                logistical dimensions of the sports industry.
                            </p>
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <div className="program-list-overview">
                            {programOverview.map((program, index) => (
                                <motion.div
                                    key={index}
                                    className="program-pill"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <span className="pill-number">{index + 1}</span>
                                    {program}
                                </motion.div>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Detailed Programs */}
            <section className="section programs-detailed">
                <div className="container">
                    {programs.map((program, index) => (
                        <FadeInSection key={program.id}>
                            <div className={`program-block ${index % 2 === 1 ? 'reverse' : ''}`}>
                                <div className="program-header">
                                    <span className="program-icon">{program.icon}</span>
                                    <div>
                                        <h3>{program.title}</h3>
                                        <span className="program-subtitle">{program.subtitle}</span>
                                    </div>
                                </div>
                                <p className="program-tagline">{program.tagline}</p>

                                <div className="program-content-grid">
                                    <div className="program-audience">
                                        <h4>Who It's For</h4>
                                        <ul>
                                            {program.audience.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="program-learnings">
                                        <h4>What You'll Learn</h4>
                                        <ul>
                                            {program.learnings.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="program-value">
                                    <strong>Program Value:</strong> {program.value}
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </section>

            {/* Why Choose LK-Sports */}
            <section className="section why-choose bg-light">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Why Choose LK-Sports</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        <FadeInSection delay={0.1}>
                            <div className="why-card">
                                <span className="why-icon">👨‍🏫</span>
                                <h4>Expert-Led Programs</h4>
                                <p>Programs designed and delivered by experienced industry professionals with proven track records.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.15}>
                            <div className="why-card">
                                <span className="why-icon">💡</span>
                                <h4>Practical & Applied</h4>
                                <p>Hands-on content with real-world case studies, simulations, and actionable frameworks.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="why-card">
                                <span className="why-icon">🌐</span>
                                <h4>Global Network</h4>
                                <p>Strong reputation and partnerships with AUC, UNICEF, UNESCO, and international sports bodies including FIFA.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.25}>
                            <div className="why-card">
                                <span className="why-icon">📈</span>
                                <h4>Future-Focused</h4>
                                <p>Empowering youth, professionals, and organizations to drive sustainable growth in the sports industry.</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section final-cta">
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>Ready to Advance Your Sports Career?</h2>
                            <p>
                                Whether you're looking to join a program, explore collaboration
                                opportunities, or discuss a tailored solution for your organization,
                                we're here to help you take the next step.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Request Program Details
                                </button>
                                <button
                                    className="btn btn-secondary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Book a Discovery Call
                                </button>
                            </div>
                            <div className="contact-info">
                                <div className="contact-item">
                                    <span>📧</span>
                                    <a href="mailto:sports@lk-hub.com">sports@lk-hub.com</a>
                                </div>
                                <div className="contact-item">
                                    <span>📞</span>
                                    <a href="tel:+20123456789">+20 123 456 789</a>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>
        </>
    );
}
