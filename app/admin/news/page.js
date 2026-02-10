"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNews, deleteNews } from '@/app/actions/news';

export default function NewsDashboard() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNews().then(data => {
            setNews(data);
            setLoading(false);
        });
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this news post?")) return;
        const res = await deleteNews(id);
        if (res.success) {
            setNews(news.filter(n => n.id !== id));
        } else {
            alert("Failed to delete.");
        }
    };

    return (
        <div className="admin-container">
            <header className="page-header">
                <div>
                    <h1>News & Updates</h1>
                    <p>Manage press releases, blog posts, and announcements.</p>
                </div>
                <Link href="/admin/news/new" className="btn btn-primary">
                    + Create Post
                </Link>
            </header>

            <div className="content-card">
                {loading ? <p>Loading news...</p> : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No news found.</td></tr>
                            ) : (
                                news.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-bold">{item.title}</td>
                                        <td><span className="badge category">{item.category || 'General'}</span></td>
                                        <td>{item.date}</td>
                                        <td>
                                            <span className={`badge status ${item.status?.toLowerCase()}`}>
                                                {item.status || 'Draft'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="icon-btn edit">✏️</button>
                                                <button onClick={() => handleDelete(item.id)} className="icon-btn delete">🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            <style jsx>{`
                .admin-container {
                    padding: 1rem;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .page-header h1 {
                    margin: 0;
                    color: #3d0000;
                }
                
                .page-header p {
                    margin: 0.5rem 0 0 0;
                    color: #666;
                }

                .content-card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .data-table th, .data-table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .data-table th {
                    font-weight: 600;
                    color: #999;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                }

                .fw-bold { font-weight: 600; color: #333; }

                .badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }
                
                .badge.category { background: #f0f0f0; color: #555; }
                .badge.status.published { background: #e8f5e9; color: #2e7d32; }
                .badge.status.draft { background: #fff3e0; color: #ef6c00; }

                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    padding: 0.25rem;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .icon-btn:hover { opacity: 1; }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: background 0.2s;
                }
                
                .btn-primary:hover {
                    background: #5a1a1a;
                }
            `}</style>
        </div>
    );
}
