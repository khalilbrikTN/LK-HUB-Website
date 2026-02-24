"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const divisions = [
    { id: 1, title: 'COMMUNICATION', slug: 'lk-communication', color: 'var(--color-communication)', font: 'var(--font-communication)', description: 'Connecting ideas through consulting, media campaigns, and communication for development.' },
    { id: 2, title: 'SOLUTIONS', slug: 'lk-solutions', color: 'var(--color-solutions)', font: 'var(--font-solutions)', description: 'Integrated technological and media solutions, content creation, and digital platforms.' },
    { id: 3, title: 'SPORTS', slug: 'lk-sports', color: 'var(--color-sports-primary)', font: 'var(--font-sports)', description: 'Preparing sports professionals with psychology, marketing, and sponsorship management programs.' },
    { id: 4, title: 'DEVELOPMENT', slug: 'lk-development', color: 'var(--color-development)', font: 'var(--font-development)', description: 'Supporting continuous development through research, training, and strategic workshops.' },
    { id: 5, title: 'EDUCATION', slug: 'lk-education', color: 'var(--color-education)', font: 'var(--font-education)', description: 'Managing Applied Technology Schools to meet labor market needs with strategic planning.' },
    { id: 6, title: 'KIDS', slug: 'lk-kids', color: 'var(--color-kids)', font: 'var(--font-kids)', description: 'Educational programs, books, and interactive games for children aged 4-17.' },
];

export default function DivisionsWheel({ onHover }) {
    const router = useRouter();
    const [activeId, setActiveId] = useState(null);

    const handleMouseEnter = (id) => {
        setActiveId(id);
        if (onHover) {
            const div = divisions.find(d => d.id === id);
            onHover(div);
        }
    };

    const handleMouseLeave = () => {
        setActiveId(null);
        if (onHover) onHover(null);
    };
    const radius = 220;
    const innerRadius = 160; // Much larger hub
    const center = 250;

    // Helper to calculate SVG path for an arc
    const describeArc = (x, y, innerRadius, outerRadius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, outerRadius, endAngle);
        const end = polarToCartesian(x, y, outerRadius, startAngle);
        const start2 = polarToCartesian(x, y, innerRadius, endAngle);
        const end2 = polarToCartesian(x, y, innerRadius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
            "M", start.x, start.y,
            "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
            "L", end2.x, end2.y,
            "A", innerRadius, innerRadius, 0, largeArcFlag, 1, start2.x, start2.y,
            "Z"
        ].join(" ");

        return d;
    };

    // Helper to describe a simple arc path for text
    const describeTextArc = (x, y, radius, startAngle, endAngle) => {
        // Correct text orientation for bottom half
        // Angles are 0 to 360 starting from top? No, usually 0 is right (3 o'clock) or top (12 o'clock) depending on math.
        // My polarToCartesian does `angleInDegrees - 90` which implies 0 input = -90 rad = Top (12 o'clock).
        // So 0=Top, 90=Right, 180=Bottom, 270=Left.
        // Divisions start at 0. Bottom half is index 2, 3 (approx 120-240).
        // Wait, index * 60:
        // 0: 0-60 (Top Right)
        // 1: 60-120 (Right Bottom) -> Part of this is upside down?
        // 2: 120-180 (Bottom) -> Upside down
        // 3: 180-240 (Bottom Left) -> Upside down
        // 4: 240-300 (Left Top) 
        // 5: 300-360 (Top Left)

        let shouldFlip = false;
        const midAngle = (startAngle + endAngle) / 2;
        if (midAngle > 90 && midAngle < 270) {
            shouldFlip = true;
        }

        let start, end, largeArcFlag, sweepFlag;

        if (shouldFlip) {
            // Drawn counter-clockwise for bottom text to read right-up? 
            // Actually usually we draw it "backwards" (end to start) creates the flip effect
            start = polarToCartesian(x, y, radius, startAngle);
            end = polarToCartesian(x, y, radius, endAngle);
            largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            sweepFlag = "0"; // Counter-clockwise
        } else {
            // Clockwise (Standard)
            start = polarToCartesian(x, y, radius, endAngle);
            end = polarToCartesian(x, y, radius, startAngle);
            largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            sweepFlag = "0"; // Standard SVG arc logic often tricky.
            // SVG Arc: M start A rx ry rot flow sweep end
            // My original code: M endAngle A ... 0 end.x (startAngle)
            // Original `describeTextArc` was:
            // start = polar(endAngle) (which is clockwise ahead)
            // end = polar(startAngle)
            // Path M (ahead) -> A ... (behind). That is counter-clockwise?
            // Wait, polarToCartesian(0) is top. polarToCartesian(60) is right-ish.
            // If I Move to 60 and Arc to 0, that is toggle sweep 0 (CCW).

            // Let's stick to consistent logic:
            // To read "Top" text: Left-to-Right (Clockwise arc: 300 -> 0 -> 60)
            // To read "Bottom" text: Left-to-Right (Counter-Clockwise arc: 120 -> 180 -> 240)
        }

        // Let's Simplify:
        // Top Half: Path from West to East (Clockwise)
        // Bottom Half: Path from West to East (Counter-Clockwise)

        if (shouldFlip) {
            // 120 -> 240 range. We want path to go 120 -> 240 (CW?) No.
            // If text is "SPORTS" at bottom. S is left, S is right.
            // Path must go Left -> Right.
            // Left at bottom is 240deg? No, 180 is bottom.
            // 270 is Left. 90 is Right.
            // So bottom path must go from 270-side towards 90-side?
            // i.e. increasing angle? OR decreasing?

            // Actually simplest is: 
            // Regular: StartAngle -> EndAngle (CW)
            // Flipped: EndAngle -> StartAngle (CCW)

            // My original describeArc does:
            // M (endAngle) -> A ... 0 (startAngle) => CCW?
            // Start=0, End=60. Move(60) Arc(0). This is CCW.
            // If I have text on CCW path at top, it reads Right-to-Left? (60->0). 
            // Yes, so my previous generic function might have been backwards for text?
            // Let's ensure top text flows Start->End (0->60).

            // Let's rewrite strictly:

            if (shouldFlip) {
                // Bottom: Read Left-to-Right. i.e. Flow from Right(90) to Left(270) via bottom?
                // No, "SPORTS" (center 150). S(130), P(140)...
                // Angle increases? 
                // Let's assume standard Clockwise flow is what we want for top.
                // 0->60.
                start = polarToCartesian(x, y, radius, startAngle); // 0
                end = polarToCartesian(x, y, radius, endAngle);   // 60
                sweepFlag = "1"; // Clockwise
            } else {
                // Top? Wait, 0 degrees is Top.
                // Text "Communication" centered at 30.
                // C (10deg) ... n (50deg). 
                // So we want path 0->60.
                start = polarToCartesian(x, y, radius, startAngle);
                end = polarToCartesian(x, y, radius, endAngle);
                sweepFlag = "1"; // CW
            }

            // Wait, standard theory:
            // Top text: Clockwise (Arc 9 -> 3)
            // Bottom text: Counter-Clockwise (Arc 3 -> 9)
        }

        // Re-evaluating based on observation.
        // Let's try explicit reversal for bottom half.

        if (shouldFlip) {
            // Reversed path (End -> Start)
            start = polarToCartesian(x, y, radius, endAngle);
            end = polarToCartesian(x, y, radius, startAngle);
            sweepFlag = "0"; // CCW
        } else {
            // Normal path (Start -> End)
            start = polarToCartesian(x, y, radius, startAngle);
            end = polarToCartesian(x, y, radius, endAngle);
            sweepFlag = "1"; // CW
        }

        largeArcFlag = "0"; // Assume small sectors (<180)

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
        ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    return (
        <div className="wheel-container">
            <svg width="500" height="500" viewBox="0 0 500 500">
                <defs>
                    {divisions.map((_, i) => {
                        const startAngle = (i * 60);
                        const endAngle = ((i + 1) * 60);
                        const midRadius = innerRadius + (radius - innerRadius) / 2;

                        // We need a path that goes continuously clockwise for the text
                        // However, to make bottom text readable, we might need to flip the path direction for angles > 90 and < 270
                        // For this iteration, let's keep it simple and see. 
                        // Actually, let's define the path for the text to sit on.
                        const textPath = describeTextArc(center, center, midRadius, startAngle, endAngle);
                        return (
                            <path id={`textPath-${i}`} key={i} d={textPath} />
                        );
                    })}
                </defs>

                {divisions.map((division, index) => {
                    const startAngle = (index * 60);
                    const endAngle = ((index + 1) * 60);
                    // Add a small gap between slices
                    const gap = 2;
                    const path = describeArc(center, center, innerRadius, radius, startAngle + gap / 2, endAngle - gap / 2);

                    const isActive = activeId === division.id;

                    return (
                        <motion.g
                            key={division.id}
                            onMouseEnter={() => handleMouseEnter(division.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => router.push(`/divisions/${division.slug}`)}
                            initial={false}
                            animate={{
                                scale: isActive ? 1.05 : 1,
                                filter: isActive ? 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))' : 'none'
                            }}
                            style={{ transformOrigin: '250px 250px', cursor: 'pointer' }}
                        >
                            <path
                                d={path}
                                fill={division.color}
                            />

                            <text dy="5" fontSize="13" fontWeight="bold" fill="white" style={{ fontFamily: division.font, pointerEvents: 'none', textTransform: 'uppercase' }}>
                                <textPath href={`#textPath-${index}`} startOffset="50%" textAnchor="middle">
                                    {division.title}
                                </textPath>
                            </text>
                        </motion.g>
                    );
                })}
            </svg>

            {/* Central Hub */}
            <div className="wheel-hub">
                <AnimatePresence mode='wait'>
                    {activeId ? (
                        <motion.div
                            key="active"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="hub-content"
                        >
                            <h3 className="hub-title" style={{ color: divisions.find(d => d.id === activeId)?.color }}>
                                {divisions.find(d => d.id === activeId)?.title}
                            </h3>
                            {/* Keep description short or scrollable */}
                            <p className="hub-desc">{divisions.find(d => d.id === activeId)?.description}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="default"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="hub-default"
                        >
                            <Image
                                src="/assets/media/Logo-Photoroom.png"
                                alt="LK-HUB"
                                width={180}
                                height={180}
                                style={{ objectFit: 'contain' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .wheel-container {
                    position: relative;
                    width: 500px;
                    height: 500px;
                    max-width: 100%;
                    max-height: 100vw;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }
                .wheel-hub {
                    position: absolute;
                    width: 62%;
                    height: 62%;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 1rem;
                    box-shadow: 0 0 30px rgba(0,0,0,0.05);
                    pointer-events: none;
                }
                .hub-title {
                    font-size: clamp(0.7rem, 2vw, 0.9rem);
                    font-weight: 800;
                    margin-bottom: 0.25rem;
                }
                .hub-desc {
                    font-size: clamp(0.6rem, 1.5vw, 0.75rem);
                    color: var(--color-text-main);
                    line-height: 1.2;
                }
                
                svg {
                    width: 100%;
                    height: auto;
                }

                @media (max-width: 600px) {
                   .wheel-container {
                       width: 100%;
                       height: auto;
                       aspect-ratio: 1/1;
                   }
                }
            `}</style>
        </div >
    );
}
