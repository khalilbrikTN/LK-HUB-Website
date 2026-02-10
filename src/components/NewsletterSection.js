"use client";
import React, { useState } from 'react';

export default function NewsletterSection() {
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ email, company, department, privacyAccepted });
        alert("Thank you for subscribing!");
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-grid">
                    {/* Left Side: Text */}
                    <div className="newsletter-text">
                        <h2>Subscribe to our newsletter</h2>
                        <p>Join our community and receive our latest tech news and insights every week!</p>
                    </div>

                    {/* Right Side: Form */}
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company Name*</label>
                                <input
                                    type="text"
                                    id="company"
                                    required
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Your Company"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Which department do you work in?*</label>
                            <select
                                id="department"
                                required
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <option value="" disabled>Please select</option>
                                <option value="Management">Management / Executive</option>
                                <option value="IT">IT / Technology</option>
                                <option value="Marketing">Marketing / Communications</option>
                                <option value="HR">Human Resources</option>
                                <option value="Sales">Sales</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-checkbox">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    required
                                    checked={privacyAccepted}
                                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                                />
                                <span className="checkmark"></span>
                                <span className="checkbox-label">I accept the <a href="/privacy-policy">privacy policy</a>*</span>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-secondary newsletter-btn">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
