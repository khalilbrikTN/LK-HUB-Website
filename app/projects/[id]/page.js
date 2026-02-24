"use client";
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { getProjects } from '@/app/actions/projects';

export default function ProjectDetail({ params }) {
    const resolvedParams = use(params);
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            const projects = await getProjects();
            const found = projects.find(p => p.id === resolvedParams.id);
            if (found && found.hidden) {
                setProject(null);
            } else {
                setProject(found);
            }
            setLoading(false);
        };
        fetchProject();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="project-detail-loading">
                <div className="loader"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="project-not-found">
                <h1>Project Not Found</h1>
                <Link href="/projects" className="back-link">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>
            </div>
        );
    }

    const formattedDate = project.createdAt
        ? new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    return (
        <article className="project-detail-page">
            <div className="container">
                <Link href="/projects" className="back-nav">
                    <ArrowLeft size={18} /> <span>All Projects</span>
                </Link>

                <header className="project-header">
                    <div className="project-meta">
                        <span className="division-badge">{project.division.replace('lk-', '').toUpperCase()}</span>
                        {formattedDate && <span className="date"><Clock size={14} /> {formattedDate}</span>}
                    </div>
                    <h1>{project.title}</h1>
                    <p className="subtitle">{project.subtitle}</p>
                </header>

                {project.coverImage && (
                    <div className="project-hero-image">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="hero-img"
                        />
                    </div>
                )}

                <div className="project-content-grid">
                    <div className="main-content">
                        <div className="content-body" dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }}></div>
                    </div>

                    <aside className="project-sidebar">
                        <div className="sidebar-widget">
                            <h3>Details</h3>
                            <ul className="details-list">
                                <li>
                                    <strong>Category:</strong>
                                    <span>{project.division.replace('-', ' ')}</span>
                                </li>
                                {project.icon && (
                                    <li>
                                        <strong>Icon:</strong>
                                        <span className="icon-display">{project.icon}</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {project.tags && project.tags.length > 0 && (
                            <div className="sidebar-widget">
                                <h3>Tags</h3>
                                <div className="tags-cloud">
                                    {project.tags.map((tag, index) => (
                                        <span key={index} className="tag">
                                            <Tag size={12} /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>

                {project.images && project.images.length > 0 && (
                    <section className="project-gallery">
                        <h2>Project Gallery</h2>
                        <div className="gallery-grid">
                            {project.images.map((img, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={img} alt={`${project.title} gallery image ${index + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <style jsx>{`
                .project-detail-page {
                    padding-top: 100px;
                    padding-bottom: 80px;
                    background-color: #fcfcfc;
                    min-height: 100vh;
                }
                
                .back-nav {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-text-muted, #666);
                    text-decoration: none;
                    margin-bottom: 2rem;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .back-nav:hover {
                    color: var(--color-primary);
                }

                .project-header {
                    margin-bottom: 3rem;
                    max-width: 900px;
                }

                .project-header h1 {
                    font-size: 3.5rem;
                    line-height: 1.1;
                    margin: 0.5rem 0;
                    color: var(--color-primary);
                    font-family: var(--font-heading);
                }

                .subtitle {
                    font-size: 1.5rem;
                    color: var(--color-text-muted);
                    font-weight: 300;
                    margin: 0;
                }

                .project-meta {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .division-badge {
                    background-color: var(--color-secondary);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .date {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: #888;
                    font-size: 0.85rem;
                }

                .project-hero-image {
                    width: 100%;
                    height: 500px;
                    border-radius: 20px;
                    overflow: hidden;
                    margin-bottom: 4rem;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
                }

                .hero-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .project-content-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 4rem;
                    margin-bottom: 4rem;
                }

                .content-body {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: var(--color-text);
                }

                .sidebar-widget {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    border: 1px solid #eee;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                }

                .sidebar-widget h3 {
                    margin-top: 0;
                    margin-bottom: 1.5rem;
                    font-size: 1.2rem;
                    border-bottom: 2px solid var(--color-secondary);
                    padding-bottom: 0.5rem;
                    display: inline-block;
                }

                .details-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .details-list li {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f0f0f0;
                    font-size: 0.95rem;
                }

                .details-list li:last-child {
                    border-bottom: none;
                }

                .tags-cloud {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    background: #f5f5f5;
                    padding: 0.4rem 0.8rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    color: #555;
                    transition: all 0.2s;
                }

                .tag:hover {
                    background: var(--color-secondary);
                    color: white;
                }

                .project-gallery {
                    margin-top: 4rem;
                    border-top: 1px solid #eee;
                    padding-top: 2rem;
                }

                .project-gallery h2 {
                    font-size: 2rem;
                    margin-bottom: 2rem;
                    color: var(--color-primary);
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                }

                .gallery-item {
                    height: 250px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease;
                }

                .gallery-item:hover {
                    transform: translateY(-5px);
                }

                .gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @media (max-width: 768px) {
                    .project-content-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .project-hero-image {
                        height: 300px;
                    }
                    
                    .project-header h1 {
                        font-size: 2rem;
                    }
                    
                    .gallery-grid {
                        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
                    }
                }
            `}</style>
        </article>
    );
}
