"use client";
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="error-container">
            <div className="content">
                <div className="icon-wrapper">
                    <AlertTriangle size={60} />
                </div>
                <h2>Something went wrong!</h2>
                <p>We encountered an unexpected error. Please try again.</p>
                <button onClick={() => reset()} className="retry-btn">
                    <RefreshCw size={18} />
                    Try Again
                </button>
            </div>

            <style jsx>{`
                .error-container {
                    min-height: 70vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 2rem;
                    background-color: var(--color-background);
                }

                .content {
                    max-width: 450px;
                    background: white;
                    padding: 3rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .icon-wrapper {
                    color: #ef4444;
                    background: #fee2e2;
                    padding: 1rem;
                    border-radius: 50%;
                    margin-bottom: 0.5rem;
                }

                h2 {
                    margin: 0;
                    color: var(--color-text);
                    font-size: 1.8rem;
                }

                p {
                    margin: 0;
                    color: var(--color-text-muted);
                    font-size: 1rem;
                }

                .retry-btn {
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.8rem 1.5rem;
                    background-color: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .retry-btn:hover {
                    background-color: var(--color-secondary);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
