"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from '@/src/components/admin/RichTextEditor';

export default function CreateNewsPost() {
    const router = useRouter();
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [author, setAuthor] = useState('LK-HUB Team');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('News');
    const [postStatus, setPostStatus] = useState('Draft');
    const [featuredImage, setFeaturedImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'news');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                setFeaturedImage(data.url);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        const newsData = {
            title,
            excerpt,
            content,
            isFeatured,
            status: postStatus,
            author,
            date,
            category,
            image: featuredImage
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newsData)
            });
            const result = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("News post published successfully!");
                setTimeout(() => router.push('/adminLK/dashboard/news'), 1500);
            } else {
                setStatus("error");
                setMessage(result.message || "Failed to create post.");
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
                        <Link href="/adminLK/dashboard/news" className="back-link">Back to News</Link>
                        <h1>Create News Post</h1>
                    </div>
                    <div className="actions">
                        <button type="submit" className="btn btn-primary" disabled={status === "submitting" || uploading}>
                            {status === "submitting" ? "Publishing..." : "Publish Article"}
                        </button>
                    </div>
                </header>

                {status === "success" && <div className="alert success">{message}</div>}
                {status === "error" && <div className="alert error">{message}</div>}

                <div className="editor-grid">
                    <div className="main-col">
                        <div className="form-group">
                            <label>Article Title</label>
                            <input
                                type="text"
                                className="input-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a professional headline..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Short Excerpt (Bio)</label>
                            <textarea
                                className="input-excerpt"
                                rows="3"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Brief summary for list previews..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Full Content</label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>
                    </div>

                    <aside className="sidebar-col">
                        <div className="panel">
                            <h3>Publishing</h3>
                            <div className="meta-field">
                                <label>Initial Status</label>
                                <select
                                    value={postStatus}
                                    onChange={(e) => setPostStatus(e.target.value)}
                                    className="input-select"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Published">Published</option>
                                </select>
                            </div>
                            <div className="meta-field">
                                <label className="pseudo-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    Featured Article
                                </label>
                            </div>
                            <div className="meta-field">
                                <label>Author</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="meta-field">
                                <label>Publish Date</label>
                                <input
                                    type="date"
                                    className="input-field"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Lead Image</h3>
                            <div className="image-preview-box">
                                {featuredImage ? (
                                    <img src={featuredImage} alt="Featured" />
                                ) : (
                                    <div className="placeholder">No Image Selected</div>
                                )}
                            </div>
                            <label className="professional-upload">
                                {uploading ? "Uploading..." : "Upload Image"}
                                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                            </label>
                        </div>

                        <div className="panel">
                            <h3>Article Type</h3>
                            <div className="radio-group">
                                {['News', 'Press Release', 'Event'].map(cat => (
                                    <label key={cat} className="radio-label">
                                        <input
                                            type="radio"
                                            name="cat-radio"
                                            value={cat}
                                            checked={category === cat}
                                            onChange={() => setCategory(cat)}
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </form>

            <style jsx>{`
                .admin-page-container {
                    padding: 2rem;
                    background: #fdfdfd;
                    min-height: 100vh;
                    margin-top: 80px; 
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2.5rem;
                    border-bottom: 2px solid #3d0000;
                    padding-bottom: 1.5rem;
                }

                h1 {
                    margin: 0.5rem 0 0 0;
                    color: #3d0000;
                    font-size: 2.2rem;
                    font-weight: 800;
                }

                .back-link {
                    color: #666;
                    font-size: 0.85rem;
                    text-decoration: none;
                    text-transform: uppercase;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .back-link:hover { color: #3d0000; }

                .editor-grid {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 3rem;
                }

                .main-col {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .form-group { margin-bottom: 2.5rem; }

                .form-group label {
                    display: block;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    color: #333;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                }

                .input-title {
                    width: 100%;
                    font-size: 1.8rem;
                    padding: 1rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-weight: 700;
                    color: #333;
                    background: #fdfdfd;
                }
                
                .input-title:focus {
                    outline: none;
                    border-color: #3d0000;
                    background: white;
                }

                .input-excerpt {
                    width: 100%;
                    padding: 1rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-family: inherit;
                    font-size: 1rem;
                    resize: vertical;
                    background: #fdfdfd;
                }

                .sidebar-col {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .panel {
                    background: white;
                    padding: 1.75rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .panel h3 {
                    font-size: 0.9rem;
                    margin-bottom: 1.25rem;
                    color: #3d0000;
                    border-bottom: 1px solid #f0f0f0;
                    padding-bottom: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 700;
                }

                .meta-field { margin-bottom: 1.5rem; }

                .meta-field label {
                    display: block;
                    font-size: 0.8rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .input-field, .input-select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: 0.95rem;
                    background: #fdfdfd;
                }

                .pseudo-checkbox {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    font-weight: 700 !important;
                    text-transform: none !important;
                    font-size: 0.9rem !important;
                    color: #444 !important;
                }

                .image-preview-box {
                    width: 100%;
                    height: 180px;
                    background: #f9f9f9;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 1.25rem;
                    border: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-preview-box img { width: 100%; height: 100%; object-fit: cover; }
                .placeholder { color: #aaa; font-weight: 700; font-size: 0.85rem; }

                .professional-upload {
                    display: block;
                    text-align: center;
                    background: #3d0000;
                    color: white;
                    padding: 0.85rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    letter-spacing: 0.5px;
                }

                .radio-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .radio-label {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #444;
                    cursor: pointer;
                }
                
                .btn {
                    padding: 0.9rem 2rem;
                    border-radius: 4px;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .btn-primary {
                    background: #3d0000;
                    color: white;
                    border: none;
                }
                .btn-primary:hover { background: #5c0000; box-shadow: 0 4px 12px rgba(92, 0, 0, 0.2); }
                .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
                
                .alert {
                    padding: 1.25rem;
                    margin-bottom: 2.5rem;
                    border-radius: 4px;
                    font-weight: 700;
                }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }

                @media (max-width: 900px) {
                    .editor-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
