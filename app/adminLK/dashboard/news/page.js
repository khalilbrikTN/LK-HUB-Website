"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NewsDashboard() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch('/api/news');
            const data = await res.json();
            setNews(data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleVisibility = async (id, currentHidden) => {
        const newHidden = !currentHidden;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/news/${id}/visibility`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ hidden: newHidden })
            });

            if (res.ok) {
                setNews(news.map(n => n.id === id ? { ...n, hidden: newHidden } : n));
            } else {
                alert("Failed to update visibility.");
            }
        } catch (error) {
            alert("Error updating visibility.");
        }
    };

    return (
        <div className="admin-container">
            <header className="page-header">
                <div>
                    <h1>News & Updates</h1>
                    <p>Manage press releases, articles, and public announcements.</p>
                </div>
                <Link href="/adminLK/dashboard/news/new" className="btn btn-primary">
                    Create New Article
                </Link>
            </header>

            <div className="content-card">
                {loading ? <p className="loading-text">Synchronizing news data...</p> : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No articles found.</td></tr>
                            ) : (
                                news.map(item => (
                                    <tr key={item.id} className={item.hidden ? 'row-hidden' : ''}>
                                        <td className="fw-bold">
                                            {item.title}
                                            {item.hidden && <span className="mini-badge-hidden">Hidden</span>}
                                        </td>
                                        <td><span className="badge-category">{item.category || 'General'}</span></td>
                                        <td className="date-cell">{item.date}</td>
                                        <td>
                                            <span className={`status-pill ${item.status?.toLowerCase()}`}>
                                                {item.status || 'Draft'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link href={`/adminLK/dashboard/news/edit/${item.id}`} className="btn-action edit">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleToggleVisibility(item.id, item.hidden)}
                                                    className={`btn-action visibility ${item.hidden ? 'unhide' : 'hide'}`}
                                                >
                                                    {item.hidden ? 'Unhide' : 'Hide'}
                                                </button>
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
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-top: 80px;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                    border-bottom: 2px solid #3d0000;
                    padding-bottom: 1.5rem;
                }

                .page-header h1 {
                    margin: 0;
                    color: #3d0000;
                    font-size: 2.2rem;
                    font-weight: 800;
                }
                
                .page-header p {
                    margin: 0.5rem 0 0 0;
                    color: #666;
                    font-weight: 500;
                    font-size: 0.95rem;
                }

                .content-card {
                    background: white;
                    border-radius: 8px;
                    padding: 2rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .loading-text { text-align: center; color: #999; font-weight: 600; padding: 2rem; }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .data-table th, .data-table td {
                    padding: 1.25rem 1rem;
                    text-align: left;
                    border-bottom: 1px solid #f5f5f5;
                }
                
                .data-table th {
                    font-weight: 800;
                    color: #999;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .fw-bold { font-weight: 700; color: #333; font-size: 1rem; }

                .row-hidden { background: #fcfcfc; opacity: 0.7; }

                .mini-badge-hidden {
                    margin-left: 0.75rem;
                    background: #333;
                    color: white;
                    font-size: 0.65rem;
                    padding: 0.15rem 0.4rem;
                    border-radius: 3px;
                    text-transform: uppercase;
                    font-weight: 800;
                }

                .badge-category {
                    background: #f0f0f0;
                    color: #666;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .date-cell { color: #888; font-size: 0.9rem; font-weight: 500; }

                .status-pill {
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    text-transform: uppercase;
                }
                
                .status-pill.published { background: #e8f5e9; color: #2e7d32; }
                .status-pill.draft { background: #fff3e0; color: #ef6c00; }
                .status-pill.archived { background: #f5f5f5; color: #999; }

                .action-buttons {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: center;
                }

                .btn-action {
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    cursor: pointer;
                    text-decoration: none;
                    text-align: center;
                    transition: all 0.2s;
                    min-width: 80px;
                }

                .btn-action.edit {
                    background: white;
                    color: #3d0000;
                    border: 1px solid #3d0000;
                }
                .btn-action.edit:hover { background: #3d0000; color: white; }

                .btn-action.visibility {
                    background: #f9f9f9;
                    color: #444;
                    border: 1px solid #eee;
                }
                .btn-action.visibility:hover { border-color: #3d0000; color: #3d0000; }
                .btn-action.visibility.unhide { color: #2e7d32; }
                .btn-action.visibility.hide { color: #c62828; }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                
                .btn-primary:hover {
                    background: #5c0000;
                    box-shadow: 0 4px 12px rgba(92, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
