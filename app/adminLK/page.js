"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLKLogin() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                // Store JWT token locally
                localStorage.setItem('token', data.token);
                router.push('/adminLK/dashboard'); // Redirecting to standard admin dashboard instead of /adminLK/ok 
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('System error during login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5', fontFamily: 'sans-serif' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '350px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Admin LK Login</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#555' }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#555' }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                    {error && (
                        <div style={{ color: '#d32f2f', background: '#ffebee', padding: '0.5rem', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ background: '#3d0000', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}
                    >
                        {loading ? 'Checking...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
