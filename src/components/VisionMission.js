"use client";
import { motion } from 'framer-motion';
import FadeInSection from './FadeInSection';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
};

const services = [
    { name: "Strategic Planning", icon: "📊" },
    { name: "Crisis Management", icon: "🛡️" },
    { name: "Research", icon: "🔍" },
    { name: "Training & Workshops", icon: "🎓" },
    { name: "Interactive Initiatives aimed at Liberating Knowledge", icon: "💡", wide: true },
];

export default function VisionMission() {
    return (
        <section className="vision-mission-section">
            <div className="container">
                <div className="vm-grid-container">

                    {/* Vision Side - Creative Card */}
                    <FadeInSection direction="left">
                        <motion.div
                            className="vision-card-modern"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="vision-icon-overlay">👁️</div>
                            <h2>Vision</h2>
                            <p>
                                To become a leading global hub in the field of media and technology, by providing innovative services
                                and solutions, education, training, & creative content for companies, users, the public, and creators
                                of all ages.
                            </p>
                        </motion.div>
                    </FadeInSection>

                    {/* Mission Side - Dynamic List */}
                    <div className="mission-content-modern" style={{ paddingLeft: '1rem' }}>
                        <FadeInSection direction="right" delay={0.2}>
                            <h2>Mission</h2>
                            <p className="mission-intro">
                                We strive to accelerate the growth of organizations and individuals by offering various services &
                                consultations, including a wide range of activities such as:
                            </p>
                        </FadeInSection>

                        <motion.div
                            className="services-grid-animated"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    className={`service-item-modern ${service.wide ? 'wide' : ''}`}
                                    variants={itemVariants}
                                >
                                    <span className="item-icon">{service.icon}</span>
                                    <span>{service.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
