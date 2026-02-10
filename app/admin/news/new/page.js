"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import RichTextEditor from '@/src/components/admin/RichTextEditor';
import { createNews } from '@/app/actions/news';

export default function CreateNewsAndUpdates() {
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // Using a ref for the form to easily grab other standard inputs
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        // Construct FormData manually or from formRef
        const formData = new FormData();
        formData.append('title', title);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('isFeatured', isFeatured);
        formData.append('status', formRef.current.status.value);
        formData.append('author', formRef.current.author.value);
        formData.append('date', formRef.current.date.value);
        formData.append('category', formRef.current.cat.value);

        try {
            const result = await createNews(formData);

            if (result.success) {
                setStatus("success");
                setMessage("News post created successfully!");
                // Reset form
                setTitle('');
                setExcerpt('');
                setContent('');
                setIsFeatured(false);
                if (formRef.current) formRef.current.reset();
            } else {
                setStatus("error");
                setMessage(result.message || "Failed to create post.");
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
                        <Link href="/admin/news" className="back-link">← Back to News</Link>
                        <h1>Create News Post</h1>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-secondary">Save Draft</button>
                        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
                            {status === "submitting" ? "Publishing..." : "Publish Post"}
                        </button>
                    </div>
                </header>

                {status === "success" && <div className="alert success">{message}</div>}
                {status === "error" && <div className="alert error">{message}</div>}

                <div className="editor-grid">
                    <div className="main-col">
                        <div className="form-group">
                            <label>Post Title</label>
                            <input
                                type="text"
                                className="input-title"
                                placeholder="Enter a catchy headline..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Excerpt (Short Summary)</label>
                            <textarea
                                className="input-excerpt"
                                rows="2"
                                placeholder="A brief summary for card previews..."
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            />
                            <small className="hint">Recommended: 15-30 words.</small>
                        </div>

                        <div className="form-group">
                            <label>Content</label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>
                    </div>

                    <aside className="sidebar-col">
                        <div className="panel">
                            <h3>Publishing</h3>
                            <div className="meta-field">
                                <label>Status</label>
                                <select name="status" className="input-select">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="meta-field checkbox-field">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                    />
                                    Featured Post
                                </label>
                                <small className="hint">
                                    Pins this post to the top of the news section.
                                </small>
                            </div>
                            <div className="meta-field">
                                <label>Author</label>
                                <input type="text" name="author" className="input-field" defaultValue="LK-HUB Team" />
                            </div>
                            <div className="meta-field">
                                <label>Publish Date</label>
                                <input type="date" name="date" className="input-field" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Featured Image</h3>
                            <div className="image-uploader">
                                <div className="placeholder">
                                    <span>+ Upload Image</span>
                                </div>
                            </div>
                        </div>

                        <div className="panel">
                            <h3>Category</h3>
                            <div className="checkbox-group">
                                <label><input type="radio" name="cat" value="News" defaultChecked /> News</label>
                                <label><input type="radio" name="cat" value="Press Release" /> Press Release</label>
                                <label><input type="radio" name="cat" value="Event" /> Event</label>
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
                }

                .back-link:hover { text-decoration: underline; }

                .actions { display: flex; gap: 1rem; }

                .editor-grid {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 2rem;
                }

                .main-col {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }

                .form-group { margin-bottom: 2rem; }

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
                    color: #1e293b;
                }
                
                .input-title:focus, .input-excerpt:focus, .input-field:focus, .input-select:focus {
                    outline: none;
                    border-color: #3d0000;
                    box-shadow: 0 0 0 3px rgba(61, 0, 0, 0.1);
                }

                .input-excerpt {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 1rem;
                    resize: vertical;
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

                .meta-field { margin-bottom: 1rem; }

                .meta-field label {
                    display: block;
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 0.25rem;
                    font-weight: 600;
                }

                .input-field, .input-select {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    font-size: 0.95rem;
                }

                .image-uploader .placeholder {
                    border: 2px dashed #cbd5e1;
                    border-radius: 8px;
                    height: 150px;
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

                .checkbox-group label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: #334155;
                    cursor: pointer;
                }
                
                .hint {
                    display: block;
                    margin-top: 0.25rem;
                    color: #94a3b8;
                    font-size: 0.8rem;
                }
                
                .btn {
                    padding: 0.6rem 1.2rem;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 0.9rem;
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

                @media (max-width: 900px) {
                    .editor-grid { grid-template-columns: 1fr; }
                    .sidebar-col { flex-direction: row; flex-wrap: wrap; }
                    .panel { flex: 1; min-width: 250px; }
                }
            `}</style>
        </div>
    );
}
