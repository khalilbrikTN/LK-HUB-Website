"use client";
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

const sponsors = [
    { name: "UNICEF", logo: "/assets/media/Sponsors/unicef.png" },
    { name: "UNESCO", logo: "/assets/media/Sponsors/UNESCO.svg" },
    { name: "Banque Misr", logo: "/assets/media/Sponsors/Banque Misr.png" },
    { name: "Egyptian Industries", logo: "/assets/media/Sponsors/Egyptian Industries.png" },
    { name: "Saleh Kamel Foundation", logo: "/assets/media/Sponsors/Kamel.png" },
    { name: "Ministry of Education", logo: "/assets/media/Sponsors/Ministry of Education.png" },
    { name: "FEB", logo: "/assets/media/Sponsors/FEB.png" },
    { name: "AHK", logo: "/assets/media/Sponsors/AHK.png" },
    { name: "IFA", logo: "/assets/media/Sponsors/ifa.png" },
    { name: "Shaghalni", logo: "/assets/media/Sponsors/Shagalni.png" },
    { name: "Sherif", logo: "/assets/media/Sponsors/Sherif.png" },
    { name: "FIFA", logo: "/assets/media/Sponsors/Fifa.jpg" },
];

export default function LogoMarquee({ speed = 30 }) {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate the sponsors array to create seamless loop
    const duplicatedSponsors = [...sponsors, ...sponsors];

    return (
        <section className="sponsors-section">
            <div className="container">
                <h2 className="text-center">Trusted Partners</h2>
                <p className="text-center" style={{ marginBottom: '2rem', opacity: 0.8 }}>
                    Collaborating with global icons to deliver impact.
                </p>
            </div>

            <div
                className="marquee-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="marquee-track"
                    style={{
                        animationDuration: `${speed}s`,
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {duplicatedSponsors.map((sponsor, index) => (
                        <div key={index} className="marquee-item">
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                title={sponsor.name}
                                width={180}
                                height={100}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
