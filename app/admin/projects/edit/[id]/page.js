"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProject({ params }) {
    const router = useRouter();
    const [project, setProject] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, idle, submitting, success, error
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    const { id } = params;

    useEffect(() => {
        fetchProjects();
    }, [id]);

    const fetchProjects = () => {
        fetch(`/api/projects`)
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
    };

    const handleImageUpload = async (e, type = 'cover') => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', project.division || 'general');

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                if (type === 'cover') {
                    setProject({ ...project, coverImage: data.url });
                } else {
                    const newImages = [...(project.images || []), data.url];
                    setProject({ ...project, images: newImages });
                }
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("An error occurred during upload.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = project.images.filter((_, i) => i !== index);
        setProject({ ...project, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        const formData = new FormData(e.currentTarget);
        const updatedData = {
            ...project,
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            description: formData.get('description'),
            content: formData.get('content'),
            division: formData.get('division'),
            tags: formData.get('tags').split(',').map(t => t.trim()).filter(Boolean),
            updatedAt: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (res.ok) {
                setStatus("success");
                setMessage("Project updated successfully!");
                setTimeout(() => router.push('/admin/projects'), 1500);
            } else {
                const errorData = await res.json();
                setStatus("error");
                setMessage(errorData.error || "Failed to update project.");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    if (status === "loading") return <div className="p-8 text-center text-muted">Loading Project Details...</div>;
    if (status === "error" && !project) return <div className="p-8 text-center text-red-600 font-bold">{message}</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <Link href="/admin/projects" className="back-link">Back to Projects</Link>
                    <h1>Edit Project</h1>
                </div>
            </header>

            <div className="edit-grid">
                <form onSubmit={handleSubmit} className="project-form">
                    {status === "success" && <div className="alert success">{message}</div>}
                    {status === "error" && <div className="alert error">{message}</div>}

                    <div className="form-group">
                        <label>Project Title</label>
                        <input name="title" type="text" required defaultValue={project.title} className="professional-input" />
                    </div>

                    <div className="form-row">
                        <div className="form-group full">
                            <label>Division</label>
                            <select name="division" required defaultValue={project.division} className="professional-input">
                                <option value="lk-education">LK-Education</option>
                                <option value="lk-solutions">LK-Solutions</option>
                                <option value="lk-sports">LK-Sports</option>
                                <option value="lk-kids">LK-Kids</option>
                                <option value="lk-development">LK-Development</option>
                                <option value="lk-communication">LK-Communication</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Subtitle / Tagline</label>
                        <input name="subtitle" type="text" defaultValue={project.subtitle} className="professional-input" />
                    </div>

                    <div className="form-group">
                        <label>Short Description</label>
                        <textarea name="description" rows="3" required defaultValue={project.description} className="professional-input"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Full Content</label>
                        <textarea name="content" rows="12" defaultValue={project.content} className="professional-input"></textarea>
                    </div>

                    <div className="form-group">
                        <label>Keywords (Comma Separated)</label>
                        <input name="tags" type="text" defaultValue={project.tags?.join(', ')} className="professional-input" />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={status === "submitting" || uploading}>
                            {status === "submitting" ? "Saving..." : "Update Project"}
                        </button>
                    </div>
                </form>

                <div className="media-management">
                    <div className="admin-card">
                        <h3>Project Cover</h3>
                        <div className="image-preview cover">
                            {project.coverImage ? (
                                <img src={project.coverImage} alt="Cover" />
                            ) : (
                                <div className="no-image">No Cover Uploaded</div>
                            )}
                        </div>
                        <label className="upload-btn">
                            {uploading ? "Uploading..." : "Replace Cover"}
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} disabled={uploading} />
                        </label>
                    </div>

                    <div className="admin-card">
                        <h3>Media Gallery</h3>
                        <div className="gallery-grid">
                            {project.images?.map((img, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={img} alt={`Gallery ${idx}`} />
                                    <button type="button" onClick={() => removeImage(idx)} className="remove-img">Remove</button>
                                </div>
                            ))}
                            <label className="add-gallery-item">
                                {uploading ? "..." : "Add Image"}
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} disabled={uploading} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-container {
                    padding: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-top: 80px;
                }

                .admin-header { margin-bottom: 3rem; border-bottom: 2px solid #3d0000; padding-bottom: 1.5rem; }
                h1 { color: #3d0000; margin: 0; font-weight: 800; font-size: 2.2rem; }
                .back-link { display: block; margin-bottom: 0.5rem; color: #666; text-decoration: none; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; }

                .edit-grid {
                    display: grid;
                    grid-template-columns: 1.6fr 1fr;
                    gap: 3rem;
                    align-items: start;
                }

                .project-form, .admin-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .admin-card { margin-bottom: 2rem; }
                .admin-card h3 { margin-top: 0; margin-bottom: 1.5rem; font-size: 1rem; color: #3d0000; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }

                .form-group { margin-bottom: 2rem; }
                .form-row { display: flex; gap: 1rem; }
                .full { flex: 1; }

                label { display: block; margin-bottom: 0.75rem; font-weight: 700; color: #333; font-size: 0.9rem; text-transform: uppercase; }
                .professional-input {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: 1rem;
                    background: #fdfdfd;
                    transition: all 0.2s;
                }
                .professional-input:focus {
                    border-color: #3d0000;
                    background: white;
                    outline: none;
                }

                .image-preview {
                    width: 100%;
                    height: 240px;
                    background: #f9f9f9;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #eee;
                }

                .image-preview img { width: 100%; height: 100%; object-fit: cover; }
                .no-image { color: #aaa; font-size: 0.85rem; font-weight: 600; }

                .upload-btn {
                    display: block;
                    text-align: center;
                    padding: 1rem;
                    background: #3d0000;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    letter-spacing: 0.5px;
                }
                .upload-btn input { display: none; }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .gallery-item {
                    position: relative;
                    aspect-ratio: 16/9;
                    border-radius: 4px;
                    overflow: hidden;
                    border: 1px solid #eee;
                }

                .gallery-item img { width: 100%; height: 100%; object-fit: cover; }

                .remove-img {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.9);
                    color: #d32f2f;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                }

                .add-gallery-item {
                    aspect-ratio: 16/9;
                    border: 2px dashed #ddd;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    color: #666;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    background: #fcfcfc;
                }
                .add-gallery-item input { display: none; }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    padding: 1.25rem;
                    border-radius: 4px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    width: 100%;
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

                .alert { padding: 1.25rem; margin-bottom: 2rem; border-radius: 4px; font-weight: 700; font-size: 0.95rem; }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }

                @media (max-width: 900px) {
                    .edit-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
