"use client";
import { useState, useRef } from 'react';
import { createProject } from '@/app/actions/projects';
import Link from 'next/link';
import RichTextEditor from '@/src/components/admin/RichTextEditor';

export default function NewProject() {
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [message, setMessage] = useState("");
    const [content, setContent] = useState("");
    const [division, setDivision] = useState("");
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const formData = new FormData(formRef.current);

        // Append rich text content manually since it's not a native input
        formData.set('content', content);

        try {
            const result = await createProject(formData);
            if (result.success) {
                setStatus("success");
                setMessage("Project created successfully!");
                formRef.current.reset();
                setContent("");
                setDivision("");
            } else {
                setStatus("error");
                setMessage(result.message || "Failed to create project.");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="admin-page-container">
            <form ref={formRef} onSubmit={handleSubmit}>
                <header className="page-header">
                    <div>
                        <Link href="/admin/projects" className="back-link">← Back to Projects</Link>
                        <h1>Create New Project</h1>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-secondary">Save Draft</button>
                        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                            {status === "submitting" ? "Publishing..." : "Publish Project"}
                        </button>
                    </div>
                </header>

                {status === "success" && <div className="alert success">{message}</div>}
                {status === "error" && <div className="alert error">{message}</div>}

                <div className="editor-grid">
                    {/* Main Column */}
                    <div className="main-col">
                        <div className="form-group">
                            <label>Project Title</label>
                            <input
                                name="title"
                                type="text"
                                className="input-title"
                                placeholder="e.g. Media Literacy Workshop 2025"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Subtitle / Tagline</label>
                            <input
                                name="subtitle"
                                type="text"
                                className="input-field"
                                placeholder="A short, catchy description..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Short Description (Bio)</label>
                            <textarea
                                name="description"
                                rows="3"
                                className="input-textarea"
                                placeholder="Brief summary displayed on project cards..."
                                required
                            ></textarea>
                            <small className="hint">Recommended: 20-40 words.</small>
                        </div>

                        <div className="form-group">
                            <label>Full Content</label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="sidebar-col">
                        <div className="panel">
                            <h3>Project Details</h3>

                            <div className="meta-field">
                                <label>Division</label>
                                <select
                                    name="division"
                                    className="input-select"
                                    required
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                >
                                    <option value="">Select Division...</option>
                                    <option value="lk-education">LK-Education</option>
                                    <option value="lk-solutions">LK-Solutions</option>
                                    <option value="lk-sports">LK-Sports</option>
                                    <option value="lk-kids">LK-Kids</option>
                                    <option value="lk-development">LK-Development</option>
                                    <option value="lk-communication">LK-Communication</option>
                                </select>
                            </div>

                            <div className="meta-field">
                                <label>Status</label>
                                <select name="status" className="input-select">
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div className="meta-field">
                                <label>Icon (Emoji)</label>
                                <input name="icon" type="text" className="input-field" placeholder="e.g. 🚀" defaultValue="🚀" />
                            </div>

                            <div className="meta-field">
                                <label>Start Date</label>
                                <input name="date" type="date" className="input-field" />
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Project Image</h3>
                            <div className="image-uploader">
                                <div className="placeholder">
                                    <span>+ Upload Cover Image</span>
                                </div>
                                <input type="hidden" name="coverImage" />
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Tags</h3>
                            <div className="meta-field">
                                <label>Keywords</label>
                                <input name="tags" type="text" className="input-field" placeholder="Education, Youth..." />
                                <small className="hint">Comma separated</small>
                            </div>
                        </div>
                    </aside>
                </div>
            </form>

            <style jsx>{`
                .admin-page-container {
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
                    font-size: 1.8rem;
                }

                .back-link {
                    color: #64748b;
                    font-size: 0.9rem;
                    text-decoration: none;
                    font-weight: 500;
                }

                .back-link:hover { text-decoration: underline; }

                .actions {
                    display: flex;
                    gap: 1rem;
                }

                .editor-grid {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 2rem;
                }

                .main-col {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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

                .form-group { margin-bottom: 2rem; }
                .meta-field { margin-bottom: 1.25rem; }

                label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #334155;
                    font-size: 0.95rem;
                }

                .input-title {
                    width: 100%;
                    font-size: 1.5rem;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-weight: 700;
                    color: #1e293b;
                }

                .input-field, .input-select, .input-textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-family: inherit;
                    color: #334155;
                }

                .input-textarea { resize: vertical; }

                .input-title:focus, .input-field:focus, .input-select:focus, .input-textarea:focus {
                    outline: none;
                    border-color: #3d0000;
                    box-shadow: 0 0 0 3px rgba(61, 0, 0, 0.1);
                }

                .hint {
                    display: block;
                    margin-top: 0.5rem;
                    color: #94a3b8;
                    font-size: 0.85rem;
                }

                .image-uploader .placeholder {
                    border: 2px dashed #cbd5e1;
                    border-radius: 8px;
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: #f8fafc;
                    font-weight: 500;
                }

                .image-uploader .placeholder:hover {
                    border-color: #94a3b8;
                    color: #475569;
                    background: #f1f5f9;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    border: 1px solid #3d0000;
                }
                .btn-primary:hover { background: #5a1a1a; }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

                .btn-secondary {
                    background: white;
                    color: #334155;
                    border: 1px solid #e2e8f0;
                }
                .btn-secondary:hover { background: #f1f5f9; }

                .alert {
                    padding: 1rem;
                    margin-bottom: 2rem;
                    border-radius: 8px;
                    font-weight: 500;
                }
                .success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
                .error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

                @media (max-width: 1024px) {
                    .editor-grid { grid-template-columns: 1fr; }
                    .sidebar-col { flex-direction: row; flex-wrap: wrap; }
                    .panel { flex: 1; min-width: 250px; }
                }
            `}</style>
        </div>
    );
}
