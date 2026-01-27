"use client";
import { useState } from 'react';

export default function Careers() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cv: null
    });
    const [submitted, setSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, cv: file }));
            setFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', cv: null });
        setFileName('');
        setSubmitted(false);
    };

    return (
        <>
            <header className="hero" style={{ padding: 'var(--spacing-lg) 0', background: 'var(--color-background)' }}>
                <div className="container text-center">
                    <h1>Join Our <span className="highlight">Team</span></h1>
                    <p style={{ margin: '0 auto', maxWidth: '700px' }}>
                        Join a passionate team dedicated to accelerating capacity building and making a global impact.
                    </p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="grid grid-2">
                        <div>
                            <h2>Why LK-HUB?</h2>
                            <p>
                                At LK-HUB, we believe that great people make great companies. We foster an environment of
                                innovation, continuous learning, and collaboration. Working with us means contributing
                                to meaningful projects that span education, sports, and development.
                            </p>
                            <br />
                            <p>
                                We offer opportunities to work with international partners like UNICEF, FIFA, and UNESCO,
                                solving real-world challenges through creative media and technology solutions.
                            </p>
                        </div>
                        <div className="graphic-box" style={{ height: 'auto', minHeight: '300px' }}>
                            <h3>Impact</h3>
                            <p>Global Reach. Local Roots.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="application-form-wrapper">
                        <div className="application-header text-center">
                            <h2>Spontaneous Application</h2>
                            <p>We're always looking for talented individuals. Submit your application and we'll reach out when a suitable position becomes available.</p>
                        </div>

                        {!submitted ? (
                            <form className="application-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        placeholder="+20 123 456 7890"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cv">Upload CV *</label>
                                    <div className="file-upload-wrapper">
                                        <input
                                            type="file"
                                            id="cv"
                                            name="cv"
                                            className="file-input"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            required
                                        />
                                        <label htmlFor="cv" className="file-upload-label">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            <span>{fileName || 'Choose a file or drag it here'}</span>
                                            <span className="file-types">PDF, DOC, DOCX (Max 5MB)</span>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn">
                                    Submit Application
                                </button>
                            </form>
                        ) : (
                            <div className="success-message">
                                <div className="success-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
                                <h3>Application Submitted!</h3>
                                <p>Thank you for your interest in joining LK-HUB. We will review your application and contact you if a suitable vacancy becomes available.</p>
                                <button onClick={resetForm} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>
                                    Submit Another Application
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
