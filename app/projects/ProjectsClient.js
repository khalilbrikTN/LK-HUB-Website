"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/src/data/divisionsContent';

export default function ProjectsClient({ dbProjects = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // 1. Construct the complete list of projects
    const allProjects = useMemo(() => {
        const projects = [];

        // Only use Database Projects (from projects.json)
        if (Array.isArray(dbProjects)) {
            dbProjects.forEach(p => {
                if (p.hidden) return; // Skip hidden projects
                projects.push({
                    id: p.id,
                    title: p.title,
                    category: divisionsData[p.division]?.label || p.division, // Fallback if division key matches
                    divisionId: p.division,
                    description: p.description, // Use short description for card
                    link: p.link || `/projects/${p.id}`, // Generate link if not provided
                    image: p.coverImage || null,
                    tags: p.tags
                });
            });
        }

        return projects;
    }, [dbProjects]);

    // 2. Filter Logic
    const filteredProjects = allProjects.filter(project => {
        // Filter by Category
        const matchesCategory = activeFilter === 'all' || project.divisionId === activeFilter;

        // Filter by Search
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            project.title.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.category.toLowerCase().includes(searchLower);

        return matchesCategory && matchesSearch;
    });

    // 3. Define Filters
    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'lk-education', label: 'Education' },
        { id: 'lk-kids', label: 'Kids' },
        { id: 'lk-sports', label: 'Sports' },
        { id: 'lk-solutions', label: 'Solutions' },
        { id: 'lk-development', label: 'Development' },
        { id: 'lk-communication', label: 'Communication' }
    ];

    // Helper for badges (same as before)
    const getBadgeClass = (divisionId) => {
        switch (divisionId) {
            case 'lk-education': return 'badge-education';
            case 'lk-kids': return 'badge-kids';
            case 'lk-sports': return 'badge-sports';
            case 'lk-solutions': return 'badge-solutions';
            case 'lk-development': return 'badge-development';
            case 'lk-communication': return 'badge-communication';
            default: return 'badge-default';
        }
    };

    return (
        <div className="projects-page">
            <div className="container">
                <div className="projects-header">
                    <h1>Our Projects & Programs</h1>
                    <p>
                        Discover the diverse initiatives driving change across Education, Sports, Media, and Development.
                    </p>
                </div>

                {/* Filter & Search Controls */}
                <div className="projects-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <div className="filter-buttons">
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''} ${filter.id !== 'all' ? `filter-${filter.id}` : ''}`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="projects-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <Link
                                key={project.id}
                                href={project.link}
                                className="project-card"
                            >
                                <div className="project-card-image">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="card-img"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="placeholder-content">
                                            {/* CSS Pattern Background */}
                                        </div>
                                    )}
                                    <div className={`project-badge ${getBadgeClass(project.divisionId)}`}>
                                        {project.category}
                                    </div>
                                </div>

                                <div className="project-card-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="project-link-action">
                                        <span>Learn More</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                                className="reset-btn"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
