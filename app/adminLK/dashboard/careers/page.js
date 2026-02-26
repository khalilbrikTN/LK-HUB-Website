"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CareersDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/careers')
            .then(res => res.json())
            .then(data => {
                setJobs(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Remove this job posting?")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/careers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                setJobs(jobs.filter(j => j.id !== id));
            } else {
                alert("Failed to delete.");
            }
        } catch (error) {
            alert("Error deleting job.");
        }
    };

    return (
        <div className="admin-container">
            <header className="page-header">
                <div>
                    <h1>Careers</h1>
                    <p>Manage job openings, applications, and requirements.</p>
                </div>
                <Link href="/adminLK/dashboard/careers/new" className="btn btn-primary">
                    + Post Job
                </Link>
            </header>

            <div className="content-card">
                {loading ? <p>Loading jobs...</p> : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Applicants</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No jobs posted yet.</td></tr>
                            ) : (
                                jobs.map(job => (
                                    <tr key={job.id}>
                                        <td className="fw-bold">{job.title}</td>
                                        <td>{job.location}</td>
                                        <td><span className="badge type">{job.type}</span></td>
                                        <td>{job.applicants || 0} candidates</td>
                                        <td>
                                            <span className={`badge status ${job.status?.toLowerCase()}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link href={`/adminLK/dashboard/careers/edit/${job.id}`} className="icon-btn edit">✏️</Link>
                                                <button onClick={() => handleDelete(job.id)} className="icon-btn delete">🗑️</button>
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
                
                .badge.type { background: #f0f0f0; color: #555; }
                .badge.status.active { background: #e8f5e9; color: #2e7d32; }
                .badge.status.closed { background: #ffebee; color: #c62828; }

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
