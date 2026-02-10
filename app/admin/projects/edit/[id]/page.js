"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/app/actions/projects';
import Link from 'next/link';

export default function EditProject({ params }) {
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, idle, submitting, success, error
    const [message, setMessage] = useState("");
    const formRef = useRef(null);

    // Unwrap params to get id
    const { id } = params;

    useEffect(() => {
        // Fetch project data
        fetch(`/api/projects`) // In real app, fetch by ID directly or filter
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === id);
                if (found) {
                    setProject(found);
                    setStatus("idle");
                } else {
                    setStatus("error");
                    setMessage("Project not found.");
                }
            })
            .catch(() => {
                setStatus("error");
                setMessage("Failed to load project.");
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const formData = new FormData(formRef.current);

        try {
            // We pass the project id to the server action
            const result = await updateProject(id, null, formData);
            if (result.success) {
                setStatus("success");
                setMessage("Project updated successfully!");
                // Optionally redirect
                // router.push('/admin/projects');
            } else {
                setStatus("error");
                setMessage(result.message || "Failed to update project.");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    if (status === "loading") return <div className="p-8 text-center">Loading project...</div>;
    if (status === "error" && !project) return <div className="p-8 text-center text-red-600">{message}</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <Link href="/admin/projects" className="back-link">← Back to Projects</Link>
                    <h1>Edit Project: {project.title}</h1>
                </div>
            </header>

            <form ref={formRef} onSubmit={handleSubmit} className="project-form">
                {status === "success" && <div className="alert success">{message}</div>}
                {status === "error" && <div className="alert error">{message}</div>}

                <div className="form-group">
                    <label>Project Title *</label>
                    <input name="title" type="text" required defaultValue={project.title} />
                </div>

                <div className="form-row">
                    <div className="form-group half">
                        <label>Division *</label>
                        <select name="division" required defaultValue={project.division}>
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
                        <input name="icon" type="text" defaultValue={project.icon} />
                    </div>
                </div>

                <div className="form-group">
                    <label>Subtitle / Tagline</label>
                    <input name="subtitle" type="text" defaultValue={project.subtitle} />
                </div>

                <div className="form-group">
                    <label>Short Description (Bio) *</label>
                    <textarea name="description" rows="3" required defaultValue={project.description}></textarea>
                </div>

                <div className="form-group">
                    <label>Full Content</label>
                    <textarea name="content" rows="6" defaultValue={project.content}></textarea>
                </div>

                <div className="form-group">
                    <label>Tags (comma separated)</label>
                    <input name="tags" type="text" defaultValue={project.tags?.join(', ')} />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                        {status === "submitting" ? "Saving..." : "Save Changes"}
                    </button>
                    <Link href="/admin/projects" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
                        Cancel
                    </Link>
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
                    font-size: 1rem;
                    text-decoration: none;
                    display: inline-block;
                }

                .btn-primary { background: #3d0000; color: white; }
                .btn-secondary { background: #eee; color: #333; }

                .btn:disabled { opacity: 0.7; cursor: not-allowed; }

                .alert { padding: 1rem; margin-bottom: 1rem; border-radius: 6px; }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
            `}</style>
        </div>
    );
}
