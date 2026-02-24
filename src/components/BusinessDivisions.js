"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeInSection from './FadeInSection';

const divisions = [
    {
        title: "LK-Communication",
        description: "Connecting ideas through consulting, media campaigns, and communication for development.",
        link: "/divisions/lk-communication",
        color: "var(--color-communication)",
        font: "var(--font-communication)"
    },
    {
        title: "LK-Solutions",
        description: "Integrated technological and media solutions, content creation, and digital platforms.",
        link: "/divisions/lk-solutions",
        color: "var(--color-solutions)",
        font: "var(--font-solutions)"
    },
    {
        title: "LK-Sports",
        description: "Preparing sports professionals with psychology, marketing, and sponsorship management programs.",
        link: "/divisions/lk-sports",
        color: "var(--color-sports-primary)",
        font: "var(--font-sports)"
    },
    {
        title: "LK-Development",
        description: "Supporting continuous development through research, training, and strategic workshops.",
        link: "/divisions/lk-development",
        color: "var(--color-development)",
        font: "var(--font-development)"
    },
    {
        title: "LK-Education",
        description: "Managing Applied Technology Schools to meet labor market needs with strategic planning.",
        link: "/divisions/lk-education",
        color: "var(--color-education)",
        font: "var(--font-education)"
    },
    {
        title: "LK-Kids",
        description: "Educational programs, books, and interactive games for children aged 4-17.",
        link: "/divisions/lk-kids",
        color: "var(--color-kids)",
        font: "var(--font-kids)"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function BusinessDivisions() {
    return (
        <section className="section divisions-section-premium">
            <div className="container">
                <FadeInSection>
                    <div className="text-center mb-5">
                        <h2 className="section-title-premium">Our Business Divisions</h2>
                        <div className="title-underline"></div>
                    </div>
                </FadeInSection>

                <motion.div
                    className="divisions-grid-premium"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {divisions.map((div, index) => (
                        <motion.div
                            key={index}
                            className="division-card-premium"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            style={{ borderTop: `4px solid ${div.color}` }}
                        >
                            <Link href={div.link} className="division-card-link">
                                <div className="card-content">
                                    <h3 style={{ fontFamily: div.font }}>{div.title}</h3>
                                    <p>{div.description}</p>
                                </div>
                                <div className="card-arrow" style={{ color: div.color }}>→</div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
