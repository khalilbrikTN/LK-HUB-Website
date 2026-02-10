"use client";
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="content">
                <AlertCircle size={80} className="icon" />
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you are looking for doesn't exist or has been moved.</p>
                <Link href="/" className="home-btn">
                    Return Home
                </Link>
            </div>

            <style jsx>{`
                .not-found-container {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                    background-color: var(--color-background);
                    color: var(--color-text);
                }

                .content {
                    max-width: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .icon {
                    color: var(--color-secondary);
                    margin-bottom: 1rem;
                }

                h1 {
                    font-size: 6rem;
                    line-height: 1;
                    margin: 0;
                    color: var(--color-primary);
                    font-family: var(--font-heading);
                }

                h2 {
                    font-size: 2rem;
                    margin: 0;
                    color: var(--color-text);
                }

                p {
                    color: var(--color-text-muted);
                    font-size: 1.1rem;
                }

                .home-btn {
                    margin-top: 1rem;
                    padding: 0.8rem 2rem;
                    background-color: var(--color-primary);
                    color: white;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .home-btn:hover {
                    background-color: var(--color-secondary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}
