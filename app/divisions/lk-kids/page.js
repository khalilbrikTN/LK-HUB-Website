"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInSection from '@/src/components/FadeInSection';

const skills = [
    { title: "Critical Thinking", icon: "🤔" },
    { title: "Communication", icon: "💬" },
    { title: "Media Literacy", icon: "📱" },
    { title: "Creativity", icon: "🎨" },
    { title: "Problem Solving", icon: "🧩" },
    { title: "Emotional Intelligence", icon: "❤️" },
];

const mainPrograms = [
    {
        id: 1,
        title: "Young Entrepreneur",
        subtitle: "Business Minds for the Future",
        tagline: "Exploring the world of entrepreneurship in a fun, impactful way.",
        icon: "💡",
        audience: ["Kids with big ideas (Ages 8-14)", "School entrepreneurship clubs", "Summer camps and workshops"],
        learnings: [
            "Understand basic business concepts (value, money, planning)",
            "Practice creative problem-solving and brainstorming",
            "Develop financial awareness and responsibility",
            "Learn teamwork and leadership dynamics",
            "Build presentation and communication confidence",
            "Understand social responsibility and giving back"
        ],
        value: "Children learn to think like young innovators, turning their creative ideas into simple, actionable projects while developing a mindset of responsibility and initiative."
    },
    {
        id: 2,
        title: "Personal Growth",
        subtitle: "Building Strong Personalities",
        tagline: "A journey of self-discovery, confidence, and social intelligence.",
        icon: "🌱",
        audience: ["Children seeking confidence (Ages 6-12)", "Schools focusing on SEL (Social Emotional Learning)", "Community youth groups"],
        learnings: [
            "Identify and manage emotions effectively",
            "Build self-confidence and a positive self-image",
            "Practice active listening and empathy",
            "Navigate social situations and relationships",
            "Develop resilience when facing challenges",
            "Make thoughtful, independent decisions"
        ],
        value: "Children become more confident, emotionally aware, and capable of expressing themselves, laying a strong foundation for healthy relationships and future success."
    },
    {
        id: 3,
        title: "Pillars of Change",
        subtitle: "Character & Leadership",
        tagline: "Strengthening communication, critical thinking, and positive character.",
        icon: "🏛️",
        audience: ["Emerging young leaders (Ages 10-15)", "Student councils and leadership programs", "Youth organizations"],
        learnings: [
            "Express opinions respectfully and clearly",
            "Work effectively in diverse teams",
            "Analyze problems from multiple perspectives",
            "Engage in constructive dialogue and debate",
            "Take initiative and show responsibility",
            "Develop a mindset of positive change-making"
        ],
        value: "Participants develop stronger life skills and the belief that they can be positive agents of change in their own lives and communities."
    },
    {
        id: 4,
        title: "Active Citizenship",
        subtitle: "Community & Impact",
        tagline: "Fostering social responsibility and community participation.",
        icon: "🤝",
        audience: ["Socially conscious youth (Ages 9-16)", "Schools with service-learning programs", "Civic education initiatives"],
        learnings: [
            "Understand the concepts of community and citizenship",
            "Practice empathy and respect for others",
            "Engage in meaningful volunteering and service",
            "Understand the impact of personal choices",
            "Plan simple projects that serve the community"
        ],
        value: "Children cultivate a sense of belonging and specialized efficacy, learning that they can make a tangible difference through responsible action."
    }
];

const mediaTracks = [
    {
        title: "Media Literacy & Cyber Safety",
        desc: "Critical consumption, fact-checking, and staying safe online."
    },
    {
        title: "Creative Writing & Storytelling",
        desc: "Crafting characters, narrative structures, and engaging scripts."
    },
    {
        title: "Filmmaking & Video Editing",
        desc: "Camera basics, composition, shooting, and telling stories through video."
    },
    {
        title: "Mobile Journalism",
        desc: "Using smartphones to capture events, photos, and report stories."
    },
    {
        title: "Podcasting & Speaking",
        desc: "Voice confidence, recording techniques, and audio storytelling."
    },
    {
        title: "Social Media Creativity",
        desc: "Designing responsible content, understanding audiences, and positive campaigns."
    }
];

export default function LKKidsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="division-hero kids-hero">
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="kids-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                            <div className="hero-text-content">
                                <span className="division-label kids-label">LK-KIDS</span>
                                <h1>Empowering Kids Through Media & Creativity</h1>
                                <p className="hero-subtitle">
                                    Developing awareness, life skills, and media literacy through engaging,
                                    interactive educational experiences for the next generation.
                                </p>
                                <ul className="hero-bullets">
                                    <li>✨ Interactive, age-appropriate programs</li>
                                    <li>🛡️ Media literacy & cyber safety focus</li>
                                    <li>🎨 Creativity & life skills development</li>
                                </ul>
                                <div className="hero-ctas">
                                    <a href="#programs" className="btn btn-primary kids-btn-primary">Explore Programs</a>
                                    <button
                                        className="btn btn-secondary kids-btn-secondary"
                                        onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                    >
                                        Partner With LK-KIDS
                                    </button>
                                </div>
                            </div>

                            {/* Cool Frame Placeholder */}
                            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="kids-blob-frame">
                                    <Image
                                        src="/assets/media/lk-kids/Landing Picture LK Kids.png"
                                        alt="LK Kids Empowering Learning"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        priority
                                    />
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
                                <h2>About LK-HUB</h2>
                                <p>
                                    LK-HUB is dedicated to "liberating knowledge" and accelerating the growth
                                    of individuals and institutions. With over 20 years of experience in content
                                    creation, training, and consulting, we are trusted by major organizations
                                    like UNICEF, UNESCO, and the American University in Cairo to deliver
                                    high-quality value across all age groups.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="about-block kids-about-block">
                                <h2>About LK-KIDS</h2>
                                <p>
                                    LK-KIDS is our dedicated subdivision focused on children (ages 4–17).
                                    We combine media education, creative psychology, and interactive technology
                                    to build children's awareness and skills. Through games, stories, apps,
                                    and workshops, we prepare a generation that is creative, critical, and resilient.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="section vision-mission bg-kids-gradient">
                <div className="container">
                    <div className="vm-grid">
                        <FadeInSection direction="left">
                            <div className="vm-card kids-vm-card">
                                <div className="vm-icon">🌟</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To raise a creative, resilient, and media-literate generation
                                    that is confident, compassionate, and ready to lead in the future.
                                </p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className="vm-card kids-vm-card">
                                <div className="vm-icon">🚀</div>
                                <h3>Our Mission</h3>
                                <p>
                                    To empower children with critical thinking, communication, and
                                    creative skills through engaging workshops and media experiences
                                    that inspire learning and growth.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Objectives & Skills */}
            <section className="section kids-skills-section">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Building Future-Ready Skills</h2>
                            <p>
                                In a digital world, it is vital to teach children how to access, analyze,
                                and create media messages responsibly. We combine creative psychology with
                                media education to build confident, well-rounded personalities.
                            </p>
                        </div>
                    </FadeInSection>

                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <FadeInSection key={index} delay={index * 0.1}>
                                <div className="skill-card">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <h4>{skill.title}</h4>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Overview */}
            <section className="section programs-overview kids-programs-bg" id="programs">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Our Training Programs</h2>
                            <p>
                                Designed to build life skills, creativity, and media literacy through
                                interactive, age-appropriate experiences.
                            </p>
                        </div>
                    </FadeInSection>

                    {/* Main Programs */}
                    <div className="kids-programs-list">
                        {mainPrograms.map((program, index) => (
                            <FadeInSection key={program.id}>
                                <div className="kids-program-card">
                                    <div className="kids-card-header">
                                        <div className="program-icon-circle">{program.icon}</div>
                                        <div>
                                            <h3>{program.title}</h3>
                                            <span className="kids-subtitle">{program.subtitle}</span>
                                        </div>
                                    </div>
                                    <p className="kids-tagline">{program.tagline}</p>

                                    <div className="kids-card-body">
                                        <div className="kids-section">
                                            <h4>Who It's For</h4>
                                            <ul>
                                                {program.audience.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="kids-section">
                                            <h4>What Kids Will Learn</h4>
                                            <ul>
                                                {program.learnings.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="kids-card-footer">
                                        <strong>Outcome:</strong> {program.value}
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>

                    {/* UMedia Start Section */}
                    <FadeInSection>
                        <div className="umedia-section">
                            <div className="umedia-header">
                                <div className="umedia-title-group">
                                    <span className="umedia-icon">🎬</span>
                                    <div>
                                        <h2>UMedia Start</h2>
                                        <p>Integrated Media Skills for the Digital Age</p>
                                    </div>
                                </div>
                                <div className="umedia-desc">
                                    <p>
                                        A comprehensive program for kids and teens curious about storytelling
                                        and digital content. We turn screen time into creative time.
                                    </p>
                                </div>
                            </div>

                            <div className="media-tracks-grid">
                                {mediaTracks.map((track, index) => (
                                    <div key={index} className="track-card">
                                        <h4>{track.title}</h4>
                                        <p>{track.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="umedia-outcome text-center">
                                <p>
                                    <strong>Outcome:</strong> Children transform from passive consumers into
                                    responsible, creative producers of thoughtful media content.
                                </p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Why Choose LK-KIDS */}
            <section className="section why-choose bg-light">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>Why Families & Schools Choose Us</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        <FadeInSection delay={0.1}>
                            <div className="why-card">
                                <span className="why-icon">🏆</span>
                                <h4>Proven Experience</h4>
                                <p>Part of LK-HUB with 20+ years in media and training, and 4+ years dedicated to youth programs.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.15}>
                            <div className="why-card">
                                <span className="why-icon">🧠</span>
                                <h4>Specialist Design</h4>
                                <p>Programs crafted by experts in creative psychology and media education to match child development needs.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.2}>
                            <div className="why-card">
                                <span className="why-icon">🎮</span>
                                <h4>Interactive Learning</h4>
                                <p>Hands-on, engaging experiences that align with the realities and interests of the digital generation.</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={0.25}>
                            <div className="why-card">
                                <span className="why-icon">📈</span>
                                <h4>Measurable Impact</h4>
                                <p>Over 500 children trained with high engagement and visible growth in confidence and skills.</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section final-cta kids-cta">
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>Invest in Their Future Today</h2>
                            <p>
                                Whether you are a parent looking for meaningful programs or a school
                                seeking a tailored media workshop, we are ready to collaborate.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    className="btn btn-primary kids-btn-primary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Discuss a Program
                                </button>
                                <button
                                    className="btn btn-secondary kids-btn-secondary btn-lg"
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    Partner With LK-KIDS
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
