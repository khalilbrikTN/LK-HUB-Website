"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsCarousel({ testimonials }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.8, 0.25, 1]
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.4
            }
        })
    };

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            goToNext();
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section
            className="testimonials-section"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container">
                <div className="testimonials-header text-center">
                    <h2>What Our Partners Say</h2>
                    <p>Trusted by leading organizations worldwide</p>
                </div>

                <div className="testimonials-carousel">
                    <button
                        className="carousel-btn carousel-btn-prev"
                        onClick={goToPrev}
                        aria-label="Previous testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <div className="testimonial-wrapper">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="testimonial-card"
                            >
                                <div className="quote-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M11 7.05V11H6.05c0 .276-.06.54-.175.79a1.97 1.97 0 0 0-.175.79c0 .553.197 1.026.59 1.42.394.393.867.59 1.42.59.553 0 1.026-.197 1.42-.59.393-.394.59-.867.59-1.42h4.05a5.968 5.968 0 0 1-1.77 4.24A5.968 5.968 0 0 1 7.74 18.59 5.968 5.968 0 0 1 3.5 16.82 5.968 5.968 0 0 1 1.73 12.58V7.05h9.27zm12 0V11h-4.95c0 .276-.06.54-.175.79a1.97 1.97 0 0 0-.175.79c0 .553.197 1.026.59 1.42.394.393.867.59 1.42.59.553 0 1.026-.197 1.42-.59.393-.394.59-.867.59-1.42H23a5.968 5.968 0 0 1-1.77 4.24 5.968 5.968 0 0 1-4.24 1.77 5.968 5.968 0 0 1-4.24-1.77 5.968 5.968 0 0 1-1.77-4.24V7.05h11.02z" />
                                    </svg>
                                </div>

                                <blockquote className="testimonial-quote">
                                    "{currentTestimonial.quote}"
                                </blockquote>

                                <div className="testimonial-author">
                                    <div className="author-logo">
                                        {currentTestimonial.logo && (
                                            <Image
                                                src={currentTestimonial.logo}
                                                alt={currentTestimonial.organization}
                                                width={60}
                                                height={40}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        )}
                                    </div>
                                    <div className="author-info">
                                        <strong className="author-name">{currentTestimonial.author}</strong>
                                        <span className="author-position">{currentTestimonial.position}</span>
                                        <span className="author-org">{currentTestimonial.organization}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        className="carousel-btn carousel-btn-next"
                        onClick={goToNext}
                        aria-label="Next testimonial"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
