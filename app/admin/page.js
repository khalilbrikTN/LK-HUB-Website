"use client";
import { logout } from '@/app/actions/auth';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button onClick={() => logout()} className="btn btn-secondary btn-sm">Sign Out</button>
            </header>

            <div className="dashboard-content">
                <div className="welcome-card">
                    <h3>Welcome back!</h3>
                    <p>Select a section to manage content.</p>
                </div>

                <div className="grid grid-2">
                    <Link href="/admin/news/new" className="action-card">
                        <span className="icon">📝</span>
                        <span className="label">Write New Post</span>
                    </Link>

                    <Link href="/admin/careers/new" className="action-card">
                        <span className="icon">💼</span>
                        <span className="label">Create Job Opening</span>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .dashboard-container {
                    padding: 2rem;
                    background: #f4f6f8;
                    min-height: 100vh;
                    margin-top: 80px;
                }

                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .welcome-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    margin-bottom: 2rem;
                }

                .grid {
                    display: grid;
                    gap: 1.5rem;
                }
                
                .grid-2 {
                    grid-template-columns: repeat(2, 1fr);
                }

                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .action-card {
                    background: #3d0000;
                    color: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(61, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                    text-decoration: none;
                }

                .action-card:hover {
                    transform: translateY(-5px);
                }

                .action-card .icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .action-card .label {
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .count {
                    display: block;
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #3d0000;
                }

                .label {
                    color: #666;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .action-card .label {
                    color: white;
                }

                @media (max-width: 900px) {
                    .grid-2 {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
