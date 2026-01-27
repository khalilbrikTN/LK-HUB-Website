"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
    { value: 20, suffix: "+", label: "Years of", sublabel: "Experience" },
    { value: 50, suffix: "+", label: "Qualified", sublabel: "Experts" },
    { value: 200, suffix: "+", label: "Projects", sublabel: "Delivered" },
    { value: 15, suffix: "+", label: "International", sublabel: "Partners" },
];

function CountUpNumber({ end, suffix = "", duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime;
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // Easing function for smooth count
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(easeOut * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className="stat-number">
            {count}{suffix}
        </span>
    );
}

export default function StatsSection() {
    return (
        <section className="stats-section">
            <div className="container">
                <motion.h2
                    className="stats-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    We're Good with Numbers
                </motion.h2>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-item"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CountUpNumber end={stat.value} suffix={stat.suffix} duration={2} />
                            <span className="stat-label">{stat.label}</span>
                            <span className="stat-sublabel">{stat.sublabel}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
