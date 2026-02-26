"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                setProjects(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch projects", err);
                setLoading(false);
            });
    };

    const toggleVisibility = async (id, currentHidden) => {
        const newHidden = !currentHidden;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Re-sending full project isn't necessary here but we can send a partial update
                // The backend controller receives req.body. Let's make sure it handles partials.
                // Wait, updateProject controller requires 'title', 'description' etc.? 
                // Let's check projects.controller.js: it just updates what's passed. So { hidden: newHidden } wait, my controller didn't map hidden.
                body: JSON.stringify({ hidden: newHidden })
            });
            if (res.ok) {
                setProjects(projects.map(p => p.id === id ? { ...p, hidden: newHidden } : p));
            } else {
                alert("Failed to update visibility.");
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-muted">Loading Projects...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <Link href="/adminLK/dashboard" className="back-link">Back to Dashboard</Link>
                    <h1>Manage Projects</h1>
                </div>
                <Link href="/adminLK/dashboard/projects/new" className="btn btn-primary">
                    Create New Project
                </Link>
            </header>

            <div className="projects-grid">
                {projects.length === 0 ? (
                    <div className="empty-state">
                        <p>No projects found. Create your first one!</p>
                    </div>
                ) : (
                    projects.map(project => (
                        <div key={project.id} className={`project-card ${project.hidden ? 'hidden-project' : ''}`}>
                            <div className="project-header">
                                <div className="header-badges">
                                    {project.hidden && <span className="badge hidden-badge">HIDDEN</span>}
                                    <span className={`status-badge ${project.division}`}>{project.division.replace('lk-', '').toUpperCase()}</span>
                                </div>
                            </div>
                            <h3>{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="project-meta">
                                <span>{project.subtitle}</span>
                            </div>
                            <div className="project-actions">
                                <Link href={`/adminLK/dashboard/projects/edit/${project.id}`} className="btn-icon edit">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => toggleVisibility(project.id, project.hidden)}
                                    className={`btn-icon ${project.hidden ? 'unhide' : 'hide'}`}
                                >
                                    {project.hidden ? 'Unhide' : 'Hide'}
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
                    margin-bottom: 3rem;
                    border-bottom: 2px solid #3d0000;
                    padding-bottom: 1.5rem;
                }

                .back-link {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #666;
                    text-decoration: none;
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .back-link:hover { color: #3d0000; }

                h1 {
                    color: #3d0000;
                    margin: 0;
                    font-size: 2.2rem;
                    font-weight: 800;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .project-card {
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    padding: 1.75rem;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }

                .project-card.hidden-project {
                    opacity: 0.7;
                    background: #f9f9f9;
                    border-style: dashed;
                }

                .project-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.06);
                    border-color: #3d0000;
                }

                .project-header {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-bottom: 1.25rem;
                }

                .header-badges {
                    display: flex;
                    gap: 0.5rem;
                }

                .badge {
                    font-size: 0.7rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    font-weight: 800;
                }

                .hidden-badge {
                    background: #333;
                    color: white;
                }

                .status-badge {
                    font-size: 0.7rem;
                    padding: 0.25rem 0.6rem;
                    border-radius: 4px;
                    background: #eee;
                    color: #666;
                    font-weight: 700;
                }
                
                .status-badge.lk-education { background: #e3f2fd; color: #1565c0; }
                .status-badge.lk-solutions { background: #e8f5e9; color: #2e7d32; }
                .status-badge.lk-sports { background: #fff3e0; color: #ef6c00; }
                .status-badge.lk-kids { background: #f3e5f5; color: #7b1fa2; }

                h3 {
                    margin: 0 0 0.75rem 0;
                    color: #333;
                    font-size: 1.3rem;
                    font-weight: 700;
                }

                .project-desc {
                    color: #666;
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    flex-grow: 1;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .project-meta {
                    font-size: 0.8rem;
                    color: #999;
                    margin-bottom: 1.5rem;
                    border-top: 1px solid #f5f5f5;
                    padding-top: 1rem;
                    font-weight: 500;
                }

                .project-actions {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: auto;
                }

                .btn-icon {
                    flex: 1;
                    padding: 0.75rem;
                    border-radius: 6px;
                    border: 1px solid #eee;
                    background: white;
                    cursor: pointer;
                    text-align: center;
                    font-size: 0.85rem;
                    color: #444;
                    transition: all 0.2s;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .btn-icon:hover {
                    background: #fcfcfc;
                    border-color: #3d0000;
                    color: #3d0000;
                }

                .btn-icon.edit:hover { background: #3d0000; color: white; border-color: #3d0000; }
                
                .empty-state {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 5rem;
                    background: #fff;
                    border: 1px dashed #ddd;
                    border-radius: 12px;
                    color: #999;
                }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    padding: 0.9rem 1.75rem;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 700;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-primary:hover {
                    background: #5c0000;
                    box-shadow: 0 4px 12px rgba(92, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
