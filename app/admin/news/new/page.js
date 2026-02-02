"use client";
import { useState } from 'react';
import Link from 'next/link';
import RichTextEditor from '@/src/components/admin/RichTextEditor';

export default function CreateNewsAndUpdates() {
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // This would connect to a Server Action to save
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ title, excerpt, content, isFeatured });
        alert('Saved (Mock)!');
    };

    return (
        <div className="news-editor-page">
            <header className="page-header">
                <div>
                    <Link href="/admin" className="back-link">← Back to Dashboard</Link>
                    <h1>Create News Post</h1>
                </div>
                <div className="actions">
                    <button className="btn btn-secondary btn-sm" style={{ marginRight: '1rem' }}>Save Draft</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSubmit}>Publish</button>
                </div>
            </header>

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
                        <small style={{ color: '#64748b', fontSize: '0.8rem' }}>Recommended: 15-30 words.</small>
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
                            <select className="input-field">
                                <option>Draft</option>
                                <option>Published</option>
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
                            <small style={{ display: 'block', color: '#64748b', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                                Pins this post to the top of the news section.
                            </small>
                        </div>
                        <div className="meta-field">
                            <label>Author</label>
                            <input type="text" className="input-field" defaultValue="LK-HUB Team" />
                        </div>
                        <div className="meta-field">
                            <label>Publish Date</label>
                            <input type="date" className="input-field" />
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
                            <label><input type="radio" name="cat" defaultChecked /> News</label>
                            <label><input type="radio" name="cat" /> Press Release</label>
                            <label><input type="radio" name="cat" /> Event</label>
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .news-editor-page {
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

                .meta-field {
                    margin-bottom: 1rem;
                }

                .meta-field label {
                    display: block;
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 0.25rem;
                }

                .input-field {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
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
                    transition: border-color 0.2s;
                }

                .image-uploader .placeholder:hover {
                    border-color: #94a3b8;
                    color: #475569;
                }

                .checkbox-group label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: #334155;
                }

                @media (max-width: 900px) {
                    .editor-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
