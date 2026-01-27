"use client";
import { useState } from 'react';
import { newsData } from '@/src/data/news';
import NewsModal from '@/src/components/NewsModal';

// Note: metadata export doesn't work in client components, so we usually separate layout or just omit for now or use generatesMetadata in server component wrapping this.
// For simplicity in this migration step, we'll skip specific metadata or wrap it if needed. Actually we can export metadata from a separate layout.js for this route if strictly needed.

export default function News() {
    const [selectedNews, setSelectedNews] = useState(null);

    return (
        <>
            <header className="section bg-light" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-lg)' }}>
                <div className="container text-center">
                    <h1>News & Updates</h1>
                    <p>Stay informed about our latest initiatives, partnerships, and impact.</p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="grid grid-3" id="news-grid">
                        {newsData.map(item => (
                            <div key={item.id} className="news-card" onClick={() => setSelectedNews(item)}>
                                <div className="news-media">
                                    <span className="placeholder-media">News Image</span>
                                    {/* <img src={item.image} ... /> */}
                                </div>
                                <div className="news-content">
                                    <span className="news-date">{item.date}</span>
                                    <h3>{item.title}</h3>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedNews && (
                <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
            )}
        </>
    );
}
