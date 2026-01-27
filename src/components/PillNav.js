"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PillNav({
    logo,
    logoAlt = "Logo",
    items = [],
    baseColor = "rgba(250, 248, 245, 0.95)",
    pillColor = "#3d0000",
    pillTextColor = "#FFFFFF",
    textColor = "#2d1a1a", // Default text color
    hoveredPillTextColor = "#FFFFFF",
    className = ""
}) {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll for sticky transparency effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Find active index based on pathname
    const activeIndex = items.findIndex(item => item.href === pathname);

    // Default items matching the original Navbar structure
    const navItems = items.length > 0 ? items : [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        {
            label: 'Divisions',
            href: '/divisions',
            dropdown: [
                { label: 'LK-Communication', href: '/divisions/lk-communication' },
                { label: 'LK-Solutions', href: '/divisions/lk-solutions' },
                { label: 'LK-Sports', href: '/divisions/lk-sports' },
                { label: 'LK-Development', href: '/divisions/lk-development' },
                { label: 'LK-Education', href: '/divisions/lk-education' },
                { label: 'LK-Kids', href: '/divisions/lk-kids' },
            ]
        },
        { label: 'Projects', href: '/projects' },
        { label: 'News', href: '/news' },
        { label: 'Contact', href: '#', onClick: () => document.getElementById('contact-modal')?.classList.remove('hidden') }
    ];

    // Effective active is either hovered or current route
    // The user request implies a "pill" that moves.
    // Usually "PillNav" has a pill for the ACTIVE state, and maybe a lighter one for HOVER?
    // Or the pill moves on HOVER?
    // "React Bits" PillNav usually moves the main pill on hover, and snaps back to active?
    // Let's implement: Pill follows Hover. If not hovering, stays on Active.

    const currentPillIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

    return (
        <nav
            className={`pill-nav ${className}`}
            style={{
                backgroundColor: scrolled ? baseColor : 'transparent',
                transition: 'background-color 0.3s ease',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0.8rem 0', // Reduced padding closer to original 70px height
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                height: 'auto'
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                {/* Logo */}
                <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    {logo ? (
                        <Image src={logo} alt={logoAlt} width={70} height={70} style={{ objectFit: 'contain', width: 'auto', height: '80px' }} priority />
                    ) : (
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: pillColor }}>
                            LK<span style={{ color: '#a57c30' }}>HUB</span>
                        </div>
                    )}
                </Link>

                {/* Nav Items */}
                <div
                    className="nav-items"
                    style={{
                        display: 'flex',
                        position: 'relative',
                        background: 'transparent',
                        padding: '5px',
                        borderRadius: '50px',
                        gap: '2px'
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {navItems.map((item, index) => {
                        const isSelected = currentPillIndex === index;
                        const hasDropdown = item.dropdown && item.dropdown.length > 0;
                        const isHovered = hoveredIndex === index;

                        return (
                            <div
                                key={index}
                                style={{ position: 'relative' }}
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                <Link
                                    href={item.href}
                                    onClick={(e) => {
                                        if (item.onClick) {
                                            e.preventDefault();
                                            item.onClick();
                                        }
                                    }}
                                    style={{
                                        position: 'relative',
                                        padding: '0.6rem 1.2rem', // Adjusted sizing
                                        borderRadius: '50px',
                                        color: isSelected ? pillTextColor : textColor,
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        fontSize: '0.95rem',
                                        zIndex: 2,
                                        transition: 'color 0.2s relative',
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor: pillColor,
                                                borderRadius: '50px',
                                                zIndex: -1
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {item.label}
                                    {hasDropdown && (
                                        <span style={{ fontSize: '0.8em', opacity: 0.8 }}>▼</span>
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {hasDropdown && isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: '50%',
                                                transform: 'translateX(-50%)', // Center it
                                                marginTop: '10px',
                                                backgroundColor: '#fff',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                padding: '8px 0',
                                                minWidth: '200px',
                                                zIndex: 1001,
                                                borderTop: `3px solid ${pillColor}`
                                            }}
                                        >
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={subItem.href}
                                                    className="dropdown-item"
                                                    style={{
                                                        display: 'block',
                                                        padding: '10px 20px',
                                                        color: textColor,
                                                        textDecoration: 'none',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                <style jsx>{`
    .dropdown-item:hover {
        background-color: rgba(184, 147, 92, 0.1);
        color: ${pillColor} !important;
    }

    @media (max-width: 768px) {
        .nav-items {
            display: none !important;
        }
        .mobile-menu-btn {
            display: block !important;
            cursor: pointer;
            font-weight: bold;
            color: ${pillColor};
        }
    }
`}</style>


                {/* Mobile Menu Placeholder (Hidden on desktop) */}
                <div className="mobile-menu-btn hidden">
                    Menu
                </div>
            </div>
        </nav>
    );
}
