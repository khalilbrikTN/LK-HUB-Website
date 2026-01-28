"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeInSection from './FadeInSection';

const divisions = [
    {
        title: "LK-Communication",
        description: "Connecting ideas through consulting, media campaigns, and communication for development.",
        icon: "📢",
        link: "/divisions/lk-communication", // Assuming routes, or just # for now if not ready
        color: "#e74c3c"
    },
    {
        title: "LK-Solutions",
        description: "Integrated technological and media solutions, content creation, and digital platforms.",
        icon: "💻",
        link: "/divisions/lk-solutions",
        color: "#3498db"
    },
    {
        title: "LK-Sports",
        description: "Preparing sports professionals with psychology, marketing, and sponsorship management programs.",
        icon: "⚽",
        link: "/divisions/lk-sports",
        color: "#2ecc71"
    },
    {
        title: "LK-Development",
        description: "Supporting continuous development through research, training, and strategic workshops.",
        icon: "📈",
        link: "/divisions/lk-development",
        color: "#f1c40f"
    },
    {
        title: "LK-Education",
        description: "Managing Applied Technology Schools to meet labor market needs with strategic planning.",
        icon: "🎓",
        link: "/divisions/lk-education",
        color: "#9b59b6"
    },
    {
        title: "LK-Kids",
        description: "Educational programs, books, and interactive games for children aged 4-17.",
        icon: "🎨",
        link: "/divisions/lk-kids",
        color: "#e67e22"
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
                        >
                            <Link href={div.link} className="division-card-link">
                                <div className="card-icon-wrapper">
                                    <span className="card-icon">{div.icon}</span>
                                </div>
                                <div className="card-content">
                                    <h3>{div.title}</h3>
                                    <p>{div.description}</p>
                                </div>
                                <div className="card-arrow">→</div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
