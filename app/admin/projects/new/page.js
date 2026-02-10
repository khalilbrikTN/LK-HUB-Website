"use client";
import { useState, useRef } from 'react';
import { createProject } from '@/app/actions/projects';
import Link from 'next/link';

export default function NewProject() {
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [message, setMessage] = useState("");
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const formData = new FormData(formRef.current);

        try {
            const result = await createProject(formData);
            if (result.success) {
                setStatus("success");
                setMessage("Project created successfully!");
                formRef.current.reset();
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
        <div className="admin-container">
            <header className="admin-header">
                <Link href="/admin/projects" className="back-link">← Back to Projects</Link>
                <h1>Create New Project</h1>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} className="project-form">
                {status === "success" && <div className="alert success">{message}</div>}
                {status === "error" && <div className="alert error">{message}</div>}

                <div className="form-group">
                    <label>Project Title *</label>
                    <input name="title" type="text" required placeholder="e.g. Media Literacy Workshop" />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <label>Division *</label>
                        <select name="division" required>
                            <option value="">Select Division...</option>
                            <option value="lk-education">LK-Education</option>
                            <option value="lk-solutions">LK-Solutions</option>
                            <option value="lk-sports">LK-Sports</option>
                            <option value="lk-kids">LK-Kids</option>
                            <option value="lk-development">LK-Development</option>
                            <option value="lk-communication">LK-Communication</option>
                        </select>
                    </div>
                    <div className="form-group half">
                        <label>Icon (Emoji) *</label>
                        <input name="icon" type="text" placeholder="e.g. 🚀" defaultValue="🚀" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Subtitle / Tagline</label>
                    <input name="subtitle" type="text" placeholder="Short impactful phrase" />
                </div>

                <div className="form-group">
                    <label>Short Description (Bio) *</label>
                    <textarea name="description" rows="3" required placeholder="Brief summary for list view..."></textarea>
                </div>

                <div className="form-group">
                    <label>Full Content</label>
                    <textarea name="content" rows="6" placeholder="Detailed project description..."></textarea>
                </div>

                <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input name="tags" type="text" placeholder="Education, Youth, Innovation" />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                        {status === "submitting" ? "Creating..." : "Create Project"}
                    </button>
                </div>
            </form>

            <style jsx>{`
                .admin-container {
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                    margin-top: 80px;
                }

                .admin-header {
                    margin-bottom: 2rem;
                }

                h1 { color: #3d0000; margin: 0; }
                .back-link { display: block; margin-bottom: 0.5rem; color: #666; text-decoration: none; }

                .project-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .form-group { margin-bottom: 1.5rem; }
                .form-row { display: flex; gap: 1rem; }
                .half { flex: 1; }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #333;
                }

                input, select, textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 1rem;
                }

                input:focus, select:focus, textarea:focus {
                    border-color: #3d0000;
                    outline: none;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                    background: #3d0000;
                    color: white;
                    font-size: 1rem;
                }

                .btn:disabled { opacity: 0.7; cursor: not-allowed; }

                .alert { padding: 1rem; margin-bottom: 1rem; border-radius: 6px; }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
            `}</style>
        </div>
    );
}
