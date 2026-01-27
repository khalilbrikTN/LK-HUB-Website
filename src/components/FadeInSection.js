"use client";
import { motion } from 'framer-motion';

export default function FadeInSection({
    children,
    className = "",
    delay = 0,
    direction = "up", // up, down, left, right
    duration = 0.6,
    once = true // Only animate once
}) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    };

    const initial = {
        opacity: 0,
        ...directions[direction]
    };

    return (
        <motion.div
            className={className}
            initial={initial}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{
                once,
                margin: "-100px" // Trigger slightly before element enters viewport
            }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1] // Smooth easing
            }}
        >
            {children}
        </motion.div>
    );
}
