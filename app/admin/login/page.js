"use client";
import { useState } from 'react';
import Image from 'next/image';
import { login } from '@/app/actions/auth';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData) {
        setLoading(true);
        setError('');

        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    }

    return (
        <div className="admin-login-container">
            <div className="login-card">
                <div className="login-logo">
                    <Image
                        src="/assets/media/Logo-Photoroom.png"
                        alt="LK-HUB Admin"
                        width={100}
                        height={100}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                <h1>Admin Portal</h1>
                <p className="subtitle">Please sign in to continue</p>

                <form action={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="admin@lk-hub.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="btn btn-primary full-width" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>

            <style jsx>{`
                .admin-login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #3d0000 0%, #1a0000 100%);
                    padding: 1rem;
                }

                .login-card {
                    background: rgba(255, 255, 255, 0.98);
                    padding: 3rem;
                    border-radius: 16px;
                    width: 100%;
                    max-width: 440px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    text-align: center;
                }

                .login-logo {
                    margin-bottom: 1.5rem;
                    display: flex;
                    justify-content: center;
                }

                h1 {
                    color: #3d0000;
                    font-size: 1.75rem;
                    margin-bottom: 0.5rem;
                }

                .subtitle {
                    color: #6b5050;
                    margin-bottom: 2rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                    text-align: left;
                }

                label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #2d1a1a;
                    margin-bottom: 0.5rem;
                }

                input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 2px solid #e8e2da;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.2s;
                }

                input:focus {
                    outline: none;
                    border-color: #a57c30;
                }

                .btn {
                    margin-top: 1rem;
                }

                .full-width {
                    width: 100%;
                }

                .error-message {
                    color: #d32f2f;
                    background: #ffebee;
                    padding: 0.75rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }
            `}</style>
        </div>
    );
}
