"use client";
import Link from 'next/link';

export default function AdminDashboard() {
    const news = [];
    const careers = [];
    const loading = false;

    const statCards = [
        { title: 'Total Projects', value: 0 },
        { title: 'Published News', value: 0 },
        { title: 'Active Jobs', value: 0 },
    ];

    return (
        <div className="dashboard-wrapper">

            {/* Stats Grid */}
            <div className="stats-grid">
                {statCards.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-content">
                            <span className="stat-label">{stat.title}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dashboard Row: Recent Activity & Quick Actions */}
            <div className="dashboard-row">
                {/* Recent News Card */}
                <div className="dashboard-card wide">
                    <div className="card-header">
                        <h3>Recent News Posts</h3>
                        <Link href="/adminLK/dashboard/news" className="view-all">View All</Link>
                    </div>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>Loading...</td></tr>
                            ) : news.length === 0 ? (
                                <tr><td colSpan={4} style={{ textAlign: 'center', color: '#999', padding: '2rem 0' }}>No news yet</td></tr>
                            ) : news.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.date}</td>
                                    <td><span className={`status-pill ${item.status.toLowerCase()}`}>{item.status}</span></td>
                                    <td>
                                        <Link href={`/adminLK/dashboard/news/edit/${item.id}`} className="edit-link">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions / Careers Summary */}
                <div className="dashboard-card narrow">
                    <div className="card-header">
                        <h3>Active Openings</h3>
                        <Link href="/adminLK/dashboard/careers" className="view-all">Manage</Link>
                    </div>
                    <div className="list-activity">
                        {loading ? (
                            <p style={{ color: '#999', fontSize: '0.9rem' }}>Loading...</p>
                        ) : careers.length === 0 ? (
                            <p style={{ color: '#999', fontSize: '0.9rem' }}>No active openings</p>
                        ) : careers.map(job => (
                            <div key={job.id} className="activity-item">
                                <div className="activity-details">
                                    <h4>{job.title}</h4>
                                    <p>{job.type} • {job.applicants} Applicants</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="quick-actions">
                        <Link href="/adminLK/dashboard/projects/new" className="btn btn-primary full-width">
                            New Project
                        </Link>
                        <Link href="/adminLK/dashboard/news/new" className="btn btn-secondary full-width">
                            Write News
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .dashboard-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    padding-top: 1rem;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                    gap: 1.5rem;
                }

                .stat-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    border-left: 4px solid var(--accent-color);
                    transition: transform 0.2s;
                }

                .stat-card:hover {
                    transform: translateY(-3px);
                }

                .stat-content {
                    display: flex;
                    flex-direction: column;
                }

                .stat-label {
                    font-size: 0.85rem;
                    color: #666;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #3d0000;
                }

                /* Dashboard Row */
                .dashboard-row {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .dashboard-card {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                }

                .wide { flex: 2; min-width: 400px; }
                .narrow { flex: 1; min-width: 300px; }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #f0f0f0;
                    padding-bottom: 1rem;
                }

                .card-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: #333;
                    font-weight: 700;
                }

                .view-all {
                    font-size: 0.85rem;
                    color: #3d0000;
                    text-decoration: none;
                    font-weight: 600;
                }

                /* Table Styles */
                .dashboard-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .dashboard-table th {
                    text-align: left;
                    padding: 0.75rem 0;
                    color: #999;
                    font-weight: 600;
                    border-bottom: 1px solid #eee;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                }

                .dashboard-table td {
                    padding: 1.25rem 0;
                    border-bottom: 1px solid #f9f9f9;
                    color: #444;
                    font-size: 0.95rem;
                }
                
                .dashboard-table tr:last-child td {
                     border-bottom: none;
                }

                .status-pill {
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .status-pill.published { background: #e8f5e9; color: #2e7d32; }
                .status-pill.draft { background: #fff3e0; color: #ef6c00; }

                .edit-link {
                    color: #3d0000;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                
                .edit-link:hover { text-decoration: underline; }

                /* Activity List */
                .list-activity {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    margin-bottom: 2rem;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: #fcfcfc;
                    border: 1px solid #f0f0f0;
                    border-radius: 8px;
                }

                .activity-details h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 0.95rem;
                    color: #333;
                    font-weight: 600;
                }

                .activity-details p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: #777;
                }

                .quick-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: auto;
                }

                .btn {
                    text-align: center;
                    padding: 0.85rem;
                    border-radius: 8px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.2s;
                    display: block;
                    font-size: 0.9rem;
                }

                .btn-primary { background: #3d0000; color: white; border: 1px solid #3d0000; }
                .btn-primary:hover { background: #5a1a1a; }

                .btn-secondary { background: white; border: 1px solid #ddd; color: #444; }
                .btn-secondary:hover { background: #f9f9f9; border-color: #3d0000; color: #3d0000; }
                
                @media (max-width: 768px) {
                    .dashboard-row { flex-direction: column; }
                    .wide, .narrow { width: 100%; }
                }
            `}</style>
        </div>
    );
}
