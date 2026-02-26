"use client";
import { useState } from 'react';
import NewsModal from '@/src/components/NewsModal';

function formatDate(dateStr) {
    if (!dateStr) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }
    return dateStr;
}

export default function NewsClient({ newsItems }) {
    const [selectedNews, setSelectedNews] = useState(null);

    const sorted = [...newsItems].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
            <section className="news-hero">
                <div className="container">
                    <div className="news-hero-content">
                        <div className="news-title-column">
                            <h1 className="news-main-title">News</h1>
                        </div>
                        <div className="news-cta-column">
                            <p className="news-cta-text">Keep up to date with what's happening at LK-HUB!</p>
                            <button
                                className="btn-newsletter"
                                onClick={() => document.getElementById('newsletter-modal')?.classList.remove('hidden')}
                            >
                                <span className="icon">▶</span> Sign up to our newsletter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {sorted.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#999', padding: '4rem 0' }}>No news articles yet.</p>
                    ) : (
                        <div className="grid grid-3" id="news-grid">
                            {sorted.map(item => (
                                <div key={item.id} className="news-card" onClick={() => setSelectedNews(item)}>
                                    <div className="news-media">
                                        <span className="placeholder-media">News Image</span>
                                    </div>
                                    <div className="news-content">
                                        <span className="news-date">{formatDate(item.date)}</span>
                                        <h3>{item.title}</h3>
                                        <div style={{ fontSize: '0.9rem', opacity: 0.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {selectedNews && (
                <NewsModal
                    item={{ ...selectedNews, date: formatDate(selectedNews.date) }}
                    onClose={() => setSelectedNews(null)}
                />
            )}
        </>
    );
}
