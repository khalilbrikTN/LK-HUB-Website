"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProject() {
    const router = useRouter();
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [project, setProject] = useState({
        title: "",
        subtitle: "",
        description: "",
        content: "",
        division: "",
        tags: [],
        coverImage: "",
        images: [],
        hidden: false
    });

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
                    setProject({ ...project, images: [...project.images, data.url] });
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

    const removeGalleryImage = (idx) => {
        setProject({ ...project, images: project.images.filter((_, i) => i !== idx) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            });

            if (res.ok) {
                setStatus("success");
                setMessage("Project published successfully!");
                setTimeout(() => router.push('/admin/projects'), 1500);
            } else {
                const data = await res.json();
                setStatus("error");
                setMessage(data.error || "Failed to create project.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred.");
        }
    };

    return (
        <div className="admin-page-container">
            <form onSubmit={handleSubmit}>
                <header className="page-header">
                    <div>
                        <Link href="/admin/projects" className="back-link">Back to Projects</Link>
                        <h1>Create New Project</h1>
                    </div>
                    <div className="actions">
                        <button type="submit" className="btn btn-primary" disabled={status === "submitting" || uploading}>
                            {status === "submitting" ? "Publishing..." : "Publish Project"}
                        </button>
                    </div>
                </header>

                <div className="editor-grid">
                    <div className="main-col">
                        {status === "success" && <div className="alert success">{message}</div>}
                        {status === "error" && <div className="alert error">{message}</div>}

                        <div className="form-group">
                            <label>Project Title</label>
                            <input
                                type="text"
                                className="input-title"
                                required
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                                placeholder="Enter Project Name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Subtitle / Tagline</label>
                            <input
                                type="text"
                                className="input-field"
                                value={project.subtitle}
                                onChange={(e) => setProject({ ...project, subtitle: e.target.value })}
                                placeholder="Catchy summary for the header"
                            />
                        </div>

                        <div className="form-group">
                            <label>Short Description (Bio)</label>
                            <textarea
                                rows="3"
                                className="input-textarea"
                                required
                                value={project.description}
                                onChange={(e) => setProject({ ...project, description: e.target.value })}
                                placeholder="Summary displayed on project cards"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Full Content</label>
                            <textarea
                                rows="12"
                                className="input-textarea"
                                value={project.content}
                                onChange={(e) => setProject({ ...project, content: e.target.value })}
                                placeholder="Detailed project description and results"
                            ></textarea>
                        </div>
                    </div>

                    <aside className="sidebar-col">
                        <div className="panel">
                            <h3>Classification</h3>
                            <div className="meta-field">
                                <label>Division</label>
                                <select
                                    className="input-select"
                                    required
                                    value={project.division}
                                    onChange={(e) => setProject({ ...project, division: e.target.value })}
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
                                <label>Visibility Status</label>
                                <div className="toggle-group">
                                    <label className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            checked={project.hidden}
                                            onChange={(e) => setProject({ ...project, hidden: e.target.checked })}
                                        />
                                        <span className="checkmark"></span>
                                        Hide from main gallery
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Cover Image</h3>
                            <div className="image-preview">
                                {project.coverImage ? (
                                    <img src={project.coverImage} alt="Cover" />
                                ) : (
                                    <div className="placeholder">No Image Selected</div>
                                )}
                            </div>
                            <label className="upload-trigger">
                                {uploading ? "Uploading..." : "Select Cover"}
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} disabled={uploading} />
                            </label>
                        </div>

                        <div className="panel">
                            <h3>Project Gallery</h3>
                            <div className="gallery-mini">
                                {project.images.map((img, idx) => (
                                    <div key={idx} className="mini-item">
                                        <img src={img} alt="Gallery" />
                                        <button type="button" onClick={() => removeGalleryImage(idx)}>Remove</button>
                                    </div>
                                ))}
                                <label className="add-mini">
                                    Add Image
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} disabled={uploading} />
                                </label>
                            </div>
                        </div>
                    </aside>
                </div>
            </form>

            <style jsx>{`
                .admin-page-container { padding: 2rem; max-width: 1200px; margin: 0 auto; margin-top: 80px; background: #fdfdfd; }
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; border-bottom: 2px solid #3d0000; padding-bottom: 1.5rem; }
                .back-link { font-size: 0.85rem; color: #666; text-decoration: none; font-weight: 700; text-transform: uppercase; }
                h1 { color: #3d0000; font-size: 2.2rem; font-weight: 800; margin: 0.5rem 0 0 0; }
                
                .editor-grid { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; }
                .main-col { background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .sidebar-col { display: flex; flex-direction: column; gap: 2rem; }
                .panel { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .panel h3 { margin-top: 0; font-size: 0.9rem; border-bottom: 1px solid #f0f0f0; padding-bottom: 0.75rem; color: #3d0000; text-transform: uppercase; letter-spacing: 0.5px; }

                .form-group { margin-bottom: 2.5rem; }
                .input-title { width: 100%; font-size: 1.8rem; font-weight: 700; border: 1px solid #e0e0e0; padding: 1rem; border-radius: 4px; color: #333; }
                .input-field, .input-select, .input-textarea { width: 100%; padding: 1rem; border: 1px solid #e0e0e0; border-radius: 4px; font-family: inherit; font-size: 1rem; }
                
                label { display: block; font-weight: 700; margin-bottom: 0.75rem; color: #333; font-size: 0.85rem; text-transform: uppercase; }

                .image-preview { width: 100%; height: 180px; background: #f9f9f9; border-radius: 4px; overflow: hidden; margin-bottom: 1rem; border: 1px solid #eee; }
                .image-preview img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder { height: 100%; display: flex; align-items: center; justify-content: center; color: #aaa; font-size: 0.85rem; font-weight: 600; }
                
                .upload-trigger { display: block; text-align: center; background: #3d0000; color: white; padding: 1rem; border-radius: 4px; cursor: pointer; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; }
                .upload-trigger input { display: none; }

                .gallery-mini { display: flex; flex-direction: column; gap: 1rem; }
                .mini-item { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 4px; overflow: hidden; }
                .mini-item img { width: 100%; height: 100%; object-fit: cover; }
                .mini-item button { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.9); color: #d32f2f; border: none; padding: 0.4rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; cursor: pointer; }
                .add-mini { width: 100%; aspect-ratio: 16/9; border: 2px dashed #ddd; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
                .add-mini input { display: none; }

                .btn-primary { background: #3d0000; color: white; padding: 1rem 2rem; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; }
                .btn-primary:hover { background: #5c0000; }
                
                .checkbox-container { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 600; text-transform: none; color: #444; }
                .alert { padding: 1.25rem; border-radius: 4px; margin-bottom: 1.5rem; font-weight: 700; }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
            `}</style>
        </div>
    );
}
