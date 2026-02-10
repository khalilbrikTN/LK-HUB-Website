"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch projects from our new API route or directly call the server action if configured
        // Since we created server actions, we should stick to using them or a simple fetch if exposed.
        // For simplicity in client component, let's assume we fetch from an API route we'll create next.
        // Or better yet, we can use the server action directly if we import it.
        // But importing server actions in client components is tricky with data fetching.
        // Let's create a simple API route for fetching to keep it clean.

        // Wait, I can just fetch from the JSON file if it's public? No, it's server-side.
        // Let's create `app/api/projects/route.js` quickly.

        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
            } else {
                alert("Failed to delete project.");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading projects...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <Link href="/admin" className="back-link">← Back to Dashboard</Link>
                    <h1>Manage Projects</h1>
                </div>
                <Link href="/admin/projects/new" className="btn btn-primary">
                    + New Project
                </Link>
            </header>

            <div className="projects-grid">
                {projects.length === 0 ? (
                    <div className="empty-state">
                        <p>No projects found. Create your first one!</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-header">
                                <span className="project-icon">{project.icon || '🚀'}</span>
                                <span className={`status-badge ${project.division}`}>{project.division}</span>
                            </div>
                            <h3>{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="project-meta">
                                <span>{project.subtitle}</span>
                            </div>
                            <div className="project-actions">
                                <Link href={`/admin/projects/edit/${project.id}`} className="btn-icon edit">
                                    ✏️ Edit
                                </Link>
                                <button onClick={() => handleDelete(project.id)} className="btn-icon delete">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style jsx>{`
                .admin-container {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-top: 80px;
                }

                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .back-link {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #666;
                    text-decoration: none;
                    font-size: 0.9rem;
                }

                h1 {
                    color: #3d0000;
                    margin: 0;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .project-card {
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    flex-direction: column;
                }

                .project-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .project-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .project-icon {
                    font-size: 1.5rem;
                }

                .status-badge {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    background: #eee;
                    color: #666;
                    text-transform: uppercase;
                    font-weight: 600;
                }
                
                .status-badge.lk-education { background: #e3f2fd; color: #1565c0; }
                .status-badge.lk-solutions { background: #e8f5e9; color: #2e7d32; }
                .status-badge.lk-sports { background: #fff3e0; color: #ef6c00; }
                .status-badge.lk-kids { background: #f3e5f5; color: #7b1fa2; }

                h3 {
                    margin: 0 0 0.5rem 0;
                    color: #333;
                    font-size: 1.25rem;
                }

                .project-desc {
                    color: #666;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    flex-grow: 1;
                    /* multiline truncation */
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .project-meta {
                    font-size: 0.85rem;
                    color: #999;
                    margin-bottom: 1.5rem;
                    border-top: 1px solid #f0f0f0;
                    padding-top: 0.75rem;
                }

                .project-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: auto;
                }

                .btn-icon {
                    flex: 1;
                    padding: 0.5rem;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    background: white;
                    cursor: pointer;
                    text-align: center;
                    font-size: 0.9rem;
                    color: #555;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .btn-icon:hover {
                    background: #f9f9f9;
                    border-color: #ccc;
                }

                .btn-icon.delete:hover {
                    background: #ffebee;
                    border-color: #ffcdd2;
                    color: #c62828;
                }
                
                .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 4rem;
                    background: #f9f9f9;
                    border-radius: 12px;
                    color: #666;
                }
            `}</style>
        </div>
    );
}
