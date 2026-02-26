"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

export default function LatestNews() {
    const [sortedNews, setSortedNews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('/api/news')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSortedNews([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
                }
            })
            .catch(err => console.error('LatestNews fetch error:', err));
    }, []);
    const itemsPerPage = 3;

    const nextSlide = () => {
        // Move forward by 1
        setCurrentIndex((prevIndex) =>
            // If end reached, loop back to 0? Or stop? 
            // Let's loop back for infinite carousel feel
            // Max index allowed such that we can show 3 items? 
            // Actually usually carousels shift by 1.
            // If we have N items, valid indices are 0 to N-1.
            // But we want to show 3 items. If we are at index N-1, what do we show?
            // Simple logic: Wrap around.
            (prevIndex + 1) % sortedNews.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sortedNews.length - 1 : prevIndex - 1
        );
    };

    // Helper to get circular slice
    const getVisibleItems = () => {
        if (sortedNews.length === 0) return [];
        const items = [];
        for (let i = 0; i < itemsPerPage; i++) {
            const index = (currentIndex + i) % sortedNews.length;
            items.push(sortedNews[index]);
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    return (
        <section className="section latest-news-section" style={{ padding: 0 }}>
            {/* Header / Banner */}
            <div className="latest-header-band">
                <div className="container">
                    <div className="latest-header-content">
                        <h2>Latest</h2>
                        <p>Our latest updates from across our channels</p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container" style={{ position: 'relative', marginTop: '-50px', zIndex: 5, paddingBottom: '80px' }}>
                <div className="latest-grid">
                    {visibleItems.map((item, index) => (
                        <motion.div
                            key={`${item.id}-${currentIndex}`} // Unique key to force re-render/animate
                            className="latest-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <div className="latest-card-image">
                                <span className="placeholder-media-sm">News Image</span>
                                {/* If you have real images, uncomment below: */}
                                {/* <Image src={item.image} alt={item.title} fill style={{objectFit: 'cover'}} /> */}
                            </div>
                            <div className="latest-card-body">
                                <h3 className="latest-title">{item.title}</h3>
                                <p className="latest-meta">on {formatDate(item.date)}</p>
                                <div className="latest-excerpt" dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }}></div>
                                <div className="latest-footer">
                                    <Link href="/news" className="btn-blog-tag">BLOG</Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="latest-nav-arrow arrow-left" onClick={prevSlide}>←</div>
                <div className="latest-nav-arrow arrow-right" onClick={nextSlide}>→</div>
            </div>
        </section>
    );
}
