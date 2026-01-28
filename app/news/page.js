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
            {/* Premium News Hero with Newsletter Signup */}
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
                                onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}
                            >
                                <span className="icon">▶</span> Sign up to our newsletter
                            </button>
                        </div>
                    </div>
                </div>
                {/* Abstract Waves/Particles decoration (optional, implemented via CSS background) */}
            </section>

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
