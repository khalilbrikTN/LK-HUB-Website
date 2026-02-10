"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { divisionsData } from '@/src/data/divisionsContent';

export default function ProjectsClient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // 1. Construct the complete list of projects
    const allProjects = useMemo(() => {
        const projects = [];

        // Helper to safely add projects
        const addProjectsFromDivision = (divisionKey, sourceArray, idPrefix, getDesc) => {
            if (divisionsData[divisionKey]?.[sourceArray]?.map) { // check if map exists to avoid errors
                divisionsData[divisionKey][sourceArray].forEach((item, index) => {
                    projects.push({
                        id: `${idPrefix}-${item.id || index}`,
                        title: item.title,
                        category: divisionsData[divisionKey].label,
                        divisionId: divisionKey,
                        description: getDesc(item),
                        link: '#', // Placeholder link
                        image: null // Placeholder image
                    });
                });
            }
        };

        // LK-EDUCATION (Media Section Tracks)
        if (divisionsData['lk-education']?.mediaSection?.tracks) {
            divisionsData['lk-education'].mediaSection.tracks.forEach((track, index) => {
                projects.push({
                    id: `edu-${index}`,
                    title: track.title,
                    category: divisionsData['lk-education'].label,
                    divisionId: 'lk-education',
                    description: track.desc,
                    link: '#',
                    image: null
                });
            });
        }

        // LK-KIDS (Media Section Tracks)
        if (divisionsData['lk-kids']?.mediaSection?.tracks) {
            divisionsData['lk-kids'].mediaSection.tracks.forEach((track, index) => {
                projects.push({
                    id: `kids-${index}`,
                    title: track.title,
                    category: divisionsData['lk-kids'].label,
                    divisionId: 'lk-kids',
                    description: track.desc,
                    link: '#',
                    image: null
                });
            });
        }

        // LK-SPORTS (Pillars)
        if (divisionsData['lk-sports']?.pillars) {
            divisionsData['lk-sports'].pillars.forEach((pillar) => {
                projects.push({
                    id: `sports-${pillar.id}`,
                    title: pillar.title,
                    category: divisionsData['lk-sports'].label,
                    divisionId: 'lk-sports',
                    description: pillar.tagline,
                    link: '#',
                    image: null
                });
            });
        }

        // LK-SOLUTIONS (Pillars)
        if (divisionsData['lk-solutions']?.pillars) {
            divisionsData['lk-solutions'].pillars.forEach((pillar) => {
                projects.push({
                    id: `sol-${pillar.id}`,
                    title: pillar.title,
                    category: divisionsData['lk-solutions'].label,
                    divisionId: 'lk-solutions',
                    description: pillar.tagline,
                    link: '#',
                    image: null
                });
            });
        }

        // LK-DEVELOPMENT (Pillars)
        if (divisionsData['lk-development']?.pillars) {
            divisionsData['lk-development'].pillars.forEach((pillar) => {
                projects.push({
                    id: `dev-${pillar.id}`,
                    title: pillar.title,
                    category: divisionsData['lk-development'].label,
                    divisionId: 'lk-development',
                    description: pillar.tagline,
                    link: '#',
                    image: null
                });
            });
        }

        // LK-COMMUNICATION (Pillars)
        if (divisionsData['lk-communication']?.pillars) {
            divisionsData['lk-communication'].pillars.forEach((pillar) => {
                projects.push({
                    id: `comm-${pillar.id}`,
                    title: pillar.title,
                    category: divisionsData['lk-communication'].label,
                    divisionId: 'lk-communication',
                    description: pillar.tagline,
                    link: '#',
                    image: null
                });
            });
        }

        return projects;
    }, []);

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
                                    <div className="placeholder-content">
                                        <span>IMAGE</span>
                                    </div>
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
