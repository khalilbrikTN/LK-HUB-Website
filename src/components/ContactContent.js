"use client";
import ContactForm from '@/src/components/ContactForm';

export default function ContactContent() {
    return (
        <div className="contact-page">
            <header className="page-header">
                <div className="container">
                    <span className="badge">Get In Touch</span>
                    <h1>Let's Start a <span className="highlight">Conversation</span></h1>
                    <p className="lead">Have a project in mind or want to learn more about our services? Our team is here to help you liberate knowledge.</p>
                </div>
            </header>

            <section className="section contact-main">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <div className="info-card">
                                <div className="icon">📧</div>
                                <div className="text">
                                    <h3>Email Us</h3>
                                    <p>Our team usually responds within 24 hours.</p>
                                    <a href="mailto:info@liberating-knowledge.com" className="email-link">info@liberating-knowledge.com</a>
                                </div>
                            </div>

                            <div className="info-card">
                                <div className="icon">📍</div>
                                <div className="text">
                                    <h3>Our Location</h3>
                                    <p>Cairo, Egypt</p>
                                    <span className="subtext">Serving global icons worldwide.</span>
                                </div>
                            </div>

                            <div className="social-connect">
                                <h3>Follow Our Impact</h3>
                                <div className="social-links">
                                    <a href="#" className="social-btn">LinkedIn</a>
                                    <a href="#" className="social-btn">Facebook</a>
                                    <a href="#" className="social-btn">Instagram</a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-wrapper">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .contact-page {
                    padding-top: 140px;
                }
                .page-header {
                    padding: 60px 0;
                    text-align: center;
                    background: var(--color-background);
                }
                .page-header h1 {
                    font-size: 3.5rem;
                    margin: 1.5rem 0;
                }
                .badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(165, 124, 48, 0.1);
                    color: var(--color-secondary);
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .lead {
                    max-width: 700px;
                    margin: 0 auto;
                    font-size: 1.2rem;
                    color: var(--color-text-muted);
                    line-height: 1.6;
                }
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 4rem;
                    align-items: start;
                }
                .info-card {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1.2rem;
                    padding: 1.5rem;
                    background: #F8F6F2;
                    border-radius: 16px;
                    transition: transform 0.3s ease;
                    align-items: flex-start;
                }
                .info-card:hover { font-weight: 500; transform: translateX(10px); }
                .icon {
                    font-size: 1.5rem;
                    width: 48px;
                    height: 48px;
                    min-width: 48px;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    box-shadow: var(--shadow-sm);
                    margin-top: 2px;
                }
                .text h3 { margin-bottom: 0.5rem; font-size: 1.25rem; }
                .email-link { 
                    color: var(--color-secondary); 
                    font-weight: 700; 
                    font-size: 1.1rem;
                    text-decoration: underline;
                }
                .social-connect h3 { margin-bottom: 1.5rem; }
                .social-links { display: flex; gap: 1rem; flex-wrap: wrap; }
                .social-btn {
                    padding: 0.8rem 1.5rem;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                }
                .social-btn:hover { background: var(--color-secondary); transform: translateY(-3px); }
                
                @media (max-width: 900px) {
                    .contact-grid { grid-template-columns: 1fr; }
                    .page-header h1 { font-size: 2.5rem; }
                }
            `}</style>
        </div>
    );
}
