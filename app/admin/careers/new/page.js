"use client";
import { useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '@/src/components/admin/RichTextEditor';

export default function CreateCareerOpening() {
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('Remote / Hybrid');
    const [type, setType] = useState('Full-time');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [closesAt, setClosesAt] = useState('');
    const [isActive, setIsActive] = useState(true);

    // This would connect to a Server Action to save
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requirementsList = requirements.split('\n').filter(line => line.trim() !== '');

        const payload = {
            title,
            department,
            location,
            type,
            description,
            requirements: requirementsList,
            applicationLink,
            contactEmail,
            closesAt,
            isActive
        };

        console.log("Submitting Career Opening:", payload);
        alert('Saved (Mock)! Check console for payload.');
    };

    return (
        <div className="admin-editor-page">
            <header className="page-header">
                <div>
                    <Link href="/admin" className="back-link">← Back to Dashboard</Link>
                    <h1>Create Career Opening</h1>
                </div>
                <div className="actions">
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: '1rem' }}>Cancel</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Publish Opening</button>
                </div>
            </header>

            <div className="editor-grid">
                <div className="main-col">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            className="input-title"
                            placeholder="e.g. Senior Media Trainer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid-2">
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. LK-Kids, Operations"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Tunis, Remote"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Job Description</label>
                        <RichTextEditor content={description} onChange={setDescription} />
                    </div>

                    <div className="form-group">
                        <label>Requirements / Skills (One per line)</label>
                        <textarea
                            className="input-textarea"
                            rows="6"
                            placeholder="- 5+ years of experience&#10;- Fluent in English&#10;- Self-starter"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                        ></textarea>
                        <small className="help-text">Enter each requirement on a new line.</small>
                    </div>
                </div>

                <aside className="sidebar-col">
                    <div className="panel">
                        <h3>Job Details</h3>
                        <div className="meta-field">
                            <label>Employment Type</label>
                            <select
                                className="input-field"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Volunteer">Volunteer</option>
                            </select>
                        </div>
                        <div className="meta-field">
                            <label>Status</label>
                            <select
                                className="input-field"
                                value={isActive ? 'active' : 'closed'}
                                onChange={(e) => setIsActive(e.target.value === 'active')}
                            >
                                <option value="active">Active (Visible)</option>
                                <option value="closed">Closed (Hidden)</option>
                            </select>
                        </div>
                        <div className="meta-field">
                            <label>Application Deadline</label>
                            <input
                                type="date"
                                className="input-field"
                                value={closesAt}
                                onChange={(e) => setClosesAt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="panel">
                        <h3>Application Method</h3>
                        <div className="meta-field">
                            <label>Application Link (Optional)</label>
                            <input
                                type="url"
                                className="input-field"
                                placeholder="https://linkedin.com/..."
                                value={applicationLink}
                                onChange={(e) => setApplicationLink(e.target.value)}
                            />
                        </div>
                        <div className="meta-field">
                            <label>Contact Email (Optional)</label>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="careers@lk-hub.com"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .admin-editor-page {
                    padding: 2rem;
                    background: #f4f6f8;
                    min-height: 100vh;
                    margin-top: 80px; 
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                h1 {
                    margin: 0.5rem 0 0 0;
                    color: #1e293b;
                    font-size: 2rem;
                }

                .back-link {
                    color: #64748b;
                    font-size: 0.9rem;
                    text-decoration: none;
                }

                .back-link:hover {
                    text-decoration: underline;
                }

                .editor-grid {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 2rem;
                }

                .main-col {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .form-group {
                    margin-bottom: 2rem;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #334155;
                }

                .input-title {
                    width: 100%;
                    font-size: 1.5rem;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-weight: 700;
                }

                .input-field {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                }
                
                .input-textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    resize: vertical;
                    font-family: inherit;
                }

                .help-text {
                    display: block;
                    margin-top: 0.25rem;
                    color: #64748b;
                    font-size: 0.85rem;
                }

                .sidebar-col {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .panel {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .panel h3 {
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    color: #0f172a;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 0.5rem;
                }

                .meta-field {
                    margin-bottom: 1rem;
                }

                .meta-field label {
                    display: block;
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 0.25rem;
                }
                
                .grid-2 {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                @media (max-width: 900px) {
                    .editor-grid {
                        grid-template-columns: 1fr;
                    }
                    .grid-2 {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
