"use client";
import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '@/src/components/FadeInSection';

// Helper component for Hero Visuals to keep the main template clean
const HeroVisual = ({ type, image, alt }) => {
    if (type === 'hexagon') {
        return (
            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="solutions-tech-frame">
                    <div className="tech-image-container">
                        <div className="tech-placeholder-overlay"></div>
                        <Image
                            src={image}
                            alt={alt}
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
        );
    }
    if (type === 'ball') {
        return (
            <div className="hero-visual-frame" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div className="sports-ball-frame">
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
                {/* Orbiting Animations */}
                <div className="orbit-ball orbit-1">🏀</div>
                <div className="orbit-ball orbit-2">⚽</div>
                <div className="orbit-ball orbit-3">🎾</div>
                <div className="orbit-ball orbit-4">🏐</div>
            </div>
        );
    }
    if (type === 'blob') {
        return (
            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="kids-blob-frame">
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>
        );
    }
    if (type === 'rings') {
        return (
            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="development-visual-container">
                    <div className="dev-image-wrapper">
                        <div className="dev-placeholder-pattern"></div>
                        <Image
                            src={image}
                            alt={alt}
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
        );
    }
    if (type === 'pulse') {
        return (
            <div className="hero-visual-frame" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="communication-visual-container">
                    {/* Placeholder for Communication Image */}
                    {image && (
                        <div className="comm-image-wrapper">
                            {/* <div className="comm-placeholder-pattern"></div> */}
                            <Image
                                src={image}
                                alt={alt}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    )}
                    {!image && (
                        <div className="comm-image-wrapper">
                            <div className="comm-placeholder-pattern"></div>
                        </div>
                    )}
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
        );
    }
    return null;
};

export default function DivisionTemplate({ data }) {
    const {
        id, label, title, description, heroImage, heroImageAlt, heroVisualType, heroBullets,
        theme, about, vision, mission, approach, pillarsTitle, pillarsSubtitle, pillars,
        whyTitle, whyCards, cta
    } = data;

    return (
        <>
            {/* Hero Section */}
            <section className={`division-hero ${theme.heroClass}`}>
                <div className="container">
                    <FadeInSection direction="up">
                        <div className="solutions-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                            <div className="hero-text-content">
                                <span className={`division-label ${theme.labelClass}`}>{label}</span>
                                <h1>{title}</h1>
                                <p className="hero-subtitle">{description}</p>
                                {heroBullets && (
                                    <ul className="hero-bullets">
                                        {heroBullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                                    </ul>
                                )}
                                <div className="hero-ctas">
                                    <button
                                        className={`btn btn-primary ${theme.btnPrimaryClass}`}
                                        onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                    >
                                        Talk to Our Team
                                    </button>
                                    <a href="#pillars" className={`btn btn-secondary ${theme.btnSecondaryClass}`}>
                                        Explore Our Solutions
                                    </a>
                                </div>
                            </div>

                            {/* Visual Frame */}
                            <HeroVisual type={heroVisualType} image={heroImage} alt={heroImageAlt} />
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
                            <div className={`about-block ${theme.introBlockClass}`}>
                                <h2>{about.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: about.text }} />
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className={`section vision-mission ${theme.vmBgClass}`}>
                <div className="container">
                    <div className="vm-grid">
                        <FadeInSection direction="left">
                            <div className={`vm-card ${theme.vmCardClass}`}>
                                <div className="vm-icon">👁️</div>
                                <h3>Our Vision</h3>
                                <p>{vision}</p>
                            </div>
                        </FadeInSection>
                        <FadeInSection direction="right">
                            <div className={`vm-card ${theme.vmCardClass}`}>
                                <div className="vm-icon">🚀</div>
                                <h3>Our Mission</h3>
                                <p>{mission}</p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* Strategy / Approach Overview - Optional */}
            {approach && (
                <section className="section solutions-approach bg-light">
                    <div className="container">
                        <FadeInSection>
                            <div className="section-header text-center">
                                <h2>{approach.title}</h2>
                                <p>{approach.description}</p>
                            </div>
                        </FadeInSection>

                        <div className="grid grid-4 strategy-grid">
                            {approach.steps.map((step, i) => (
                                <FadeInSection key={i} delay={0.1 * (i + 1)}>
                                    <div className="strategy-card">
                                        <div className="strategy-icon">{step.icon}</div>
                                        <h4>{step.title}</h4>
                                        <p>{step.text}</p>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Pillars */}
            <section className="section pillars-detailed" id="pillars">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>{pillarsTitle}</h2>
                            <p>{pillarsSubtitle}</p>
                        </div>
                    </FadeInSection>

                    {data.pillarsLayout === 'grid' ? (
                        <div className={theme.pillarsContainerClass || "grid-2"}>
                            {pillars.map((pillar) => (
                                <FadeInSection key={pillar.id}>
                                    <div className={`program-block ${theme.blockClass}`}>
                                        <div className={theme.headerClass || "program-header"}>
                                            <div className={theme.iconClass || "program-icon"}>{pillar.icon}</div>
                                            <div>
                                                <h3>{pillar.title}</h3>
                                                <span className={`program-subtitle ${theme.subtitleClass}`}>{pillar.subtitle}</span>
                                            </div>
                                        </div>
                                        <p className="program-tagline">{pillar.tagline}</p>

                                        <div className="program-content-grid" style={theme.blockClass === 'kids-program-card' ? { gridTemplateColumns: '1fr' } : {}}>
                                            <div className="program-audience">
                                                <h4>{pillar.audienceTitle || "Who It's For"}</h4>
                                                <ul>
                                                    {pillar.audience.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="program-learnings">
                                                <h4>{pillar.learningsTitle || "What We Do"}</h4>
                                                <ul>
                                                    {pillar.learnings.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className={`program-value ${theme.valueClass}`}>
                                            <strong>{theme.valueLabel || "Outcome"}:</strong> {pillar.value}
                                        </div>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>
                    ) : (
                        pillars.map((pillar, index) => (
                            <FadeInSection key={pillar.id}>
                                <div className={`program-block ${theme.blockClass} ${index % 2 === 1 ? 'reverse' : ''}`}>
                                    <div className="program-header">
                                        <span className={`program-icon ${theme.iconClass}`}>{pillar.icon}</span>
                                        <div>
                                            <h3>{pillar.title}</h3>
                                            <span className={`program-subtitle ${theme.subtitleClass}`}>{pillar.subtitle}</span>
                                        </div>
                                    </div>
                                    <p className="program-tagline">{pillar.tagline}</p>

                                    <div className="program-content-grid">
                                        <div className="program-audience">
                                            <h4>{pillar.audienceTitle || "Who It's For"}</h4>
                                            <ul>
                                                {pillar.audience.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="program-learnings">
                                            <h4>{pillar.learningsTitle || "What We Do"}</h4>
                                            <ul>
                                                {pillar.learnings.map((item, i) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`program-value ${theme.valueClass}`}>
                                        <strong>Value for Clients:</strong> {pillar.value}
                                    </div>
                                </div>
                            </FadeInSection>
                        ))
                    )}

                    {/* Optional Media Section (For LK-KIDS) */}
                    {data.mediaSection && (
                        <FadeInSection>
                            <div className="umedia-section" style={{ marginTop: '4rem' }}>
                                <div className="umedia-header">
                                    <div className="umedia-title-group">
                                        <span className="umedia-icon" style={{ fontSize: '3rem' }}>🎬</span>
                                        <div>
                                            <h2 style={{ color: '#e9c46a' }}>{data.mediaSection.title}</h2>
                                            <p style={{ color: 'white' }}>{data.mediaSection.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="umedia-desc">
                                        <p>{data.mediaSection.description}</p>
                                    </div>
                                </div>

                                <div className="media-tracks-grid">
                                    {data.mediaSection.tracks.map((track, index) => (
                                        <div key={index} className="track-card">
                                            <h4>{track.title}</h4>
                                            <p>{track.desc}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="umedia-outcome text-center">
                                    <p>
                                        <strong>Outcome:</strong> {data.mediaSection.outcome}
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>
                    )}
                </div>
            </section>

            {/* Why Choose */}
            <section className="section why-choose bg-light">
                <div className="container">
                    <FadeInSection>
                        <div className="section-header text-center">
                            <h2>{whyTitle}</h2>
                        </div>
                    </FadeInSection>
                    <div className="why-grid">
                        {whyCards.map((card, i) => (
                            <FadeInSection key={i} delay={0.1 + (i * 0.05)}>
                                <div className="why-card">
                                    <span className="why-icon">{card.icon}</span>
                                    <h4>{card.title}</h4>
                                    <p>{card.text}</p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={`section final-cta ${theme.ctaClass}`}>
                <div className="container">
                    <FadeInSection>
                        <div className="cta-content text-center">
                            <h2>{cta.title}</h2>
                            <p>{cta.text}</p>
                            <div className="cta-buttons">
                                <button
                                    className={`btn btn-primary ${theme.btnPrimaryClass} btn-lg`}
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    {cta.primaryBtn || "Start a Project"}
                                </button>
                                <button
                                    className={`btn btn-secondary ${theme.btnSecondaryClass} btn-lg`}
                                    onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                                >
                                    {cta.secondaryBtn || "Contact Us"}
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
