"use client";
import React, { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="success-container">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>Send Another Message</button>

                <style jsx>{`
                    .success-container {
                        text-align: center;
                        padding: 3rem;
                        background: white;
                        border-radius: 20px;
                        box-shadow: var(--shadow-md);
                    }
                    .success-icon {
                        width: 80px;
                        height: 80px;
                        background: #4ade80;
                        color: white;
                        font-size: 2.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        margin: 0 auto 1.5rem;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <form className="premium-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Subject</label>
                <input
                    type="text"
                    placeholder="How can we help?"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Message</label>
                <textarea
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            <style jsx>{`
                .premium-form {
                    background: white;
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.05);
                    border: 1px solid rgba(0,0,0,0.05);
                }
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                .form-group {
                    margin-bottom: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                label {
                    font-weight: 700;
                    color: var(--color-primary);
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                input, textarea {
                    padding: 1rem 1.5rem;
                    border: 2px solid #F0EDE8;
                    border-radius: 12px;
                    font-family: var(--font-body);
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #FAF8F5;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--color-secondary);
                    background: white;
                    box-shadow: 0 5px 15px rgba(165, 124, 48, 0.1);
                }
                .submit-btn {
                    width: 100%;
                    padding: 1.2rem;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                }
                @media (max-width: 600px) {
                    .form-row { grid-template-columns: 1fr; }
                    .premium-form { padding: 2rem 1.5rem; }
                }
            `}</style>
        </form>
    );
}
