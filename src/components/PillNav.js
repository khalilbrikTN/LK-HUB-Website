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
    textColor = "#2d1a1a",
    initialTextColor = "#FFFFFF", // Default to white for transparent headers
    className = ""
}) {
    const pathname = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpandedIndex, setMobileExpandedIndex] = useState(null);

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

    // Default items
    const navItems = items.length > 0 ? items : [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
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

    const currentPillIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    // Determine if the current page has a dark hero section
    // Homepage and Division pages have dark/colored heros.
    // Other pages (About, Projects, etc.) have light backgrounds.
    const hasDarkHero = pathname === '/' || pathname.startsWith('/divisions');
    const dynamicInitialColor = hasDarkHero ? '#FFFFFF' : textColor;

    // Custom Logo Logic
    const isKidsPage = pathname.startsWith('/divisions/lk-kids');
    const displayLogo = isKidsPage ? '/assets/media/lk-kids/logo.png' : logo;

    // Determine current text color
    const currentTextColor = (scrolled || mobileMenuOpen) ? textColor : dynamicInitialColor;

    return (
        <nav
            className={`pill-nav ${className}`}
            style={{
                backgroundColor: scrolled || mobileMenuOpen ? baseColor : 'transparent',
                transition: 'background-color 0.3s ease',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '0.8rem 0',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                height: 'auto'
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                {/* Logo */}
                <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    {displayLogo ? (
                        <Image
                            src={displayLogo}
                            alt={logoAlt}
                            width={70}
                            height={70}
                            style={{
                                objectFit: 'contain',
                                width: 'auto',
                                height: '60px',
                                filter: (hasDarkHero && !scrolled && !mobileMenuOpen && !isKidsPage) ? 'brightness(0) invert(1)' : 'none',
                                transition: 'filter 0.3s ease'
                            }}
                            priority
                        />
                    ) : (
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: currentTextColor }}>
                            LK<span style={{ color: '#a57c30' }}>HUB</span>
                        </div>
                    )}
                </Link>

                {/* DESKTOP NAV ITEMS */}
                <div
                    className="nav-items"
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
                                    className="desktop-link"
                                    style={{
                                        position: 'relative',
                                        padding: '0.6rem 1.2rem',
                                        borderRadius: '50px',
                                        color: isSelected ? pillTextColor : currentTextColor,
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
                                        <span style={{ fontSize: '0.6em', opacity: 0.8 }}>▼</span>
                                    )}
                                </Link>

                                {/* Dropdown Menu (Desktop) */}
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
                                                transform: 'translateX(-50%)',
                                                marginTop: '10px',
                                                backgroundColor: '#fff',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                                padding: '8px 0',
                                                minWidth: '220px',
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

                {/* MOBILE MENU TOGGLE BUTTON */}
                <button
                    className="mobile-menu-btn hidden"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    style={{ background: 'none', border: 'none', marginLeft: 'auto' }}
                >
                    <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            {/* MOBILE MENU OVEPLAY */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu-overlay"
                        style={{
                            position: 'fixed',
                            top: '80px', // Below navbar
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: baseColor,
                            zIndex: 999,
                            padding: '2rem 1.5rem',
                            overflowY: 'auto',
                            borderTop: '1px solid rgba(0,0,0,0.05)'
                        }}
                    >
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {navItems.map((item, index) => (
                                <li key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.5rem' }}>
                                    <div
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                        onClick={() => {
                                            if (item.dropdown) {
                                                setMobileExpandedIndex(mobileExpandedIndex === index ? null : index);
                                            } else {
                                                setMobileMenuOpen(false);
                                                if (item.onClick) item.onClick();
                                            }
                                        }}
                                    >
                                        {item.dropdown ? (
                                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: pillColor, cursor: 'pointer' }}>
                                                {item.label}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                style={{ fontSize: '1.25rem', fontWeight: '700', color: pillColor, textDecoration: 'none', display: 'block', width: '100%' }}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                        {item.dropdown && (
                                            <span style={{ transform: mobileExpandedIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown */}
                                    <AnimatePresence>
                                        {item.dropdown && mobileExpandedIndex === index && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ listStyle: 'none', padding: '1rem 0 0 1rem', overflow: 'hidden' }}
                                            >
                                                {item.dropdown.map((sub, i) => (
                                                    <li key={i} style={{ marginBottom: '0.8rem' }}>
                                                        <Link
                                                            href={sub.href}
                                                            style={{ fontSize: '1rem', color: textColor, textDecoration: 'none' }}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .nav-items {
                    display: flex;
                    position: relative;
                    background: transparent;
                    padding: 5px;
                    border-radius: 50px;
                    gap: 2px;
                }
                .dropdown-item:hover {
                    background-color: rgba(184, 147, 92, 0.1);
                    color: ${pillColor} !important;
                }

                .hamburger {
                    width: 30px;
                    height: 20px;
                    position: relative;
                    transform: rotate(0deg);
                    transition: .5s ease-in-out;
                    cursor: pointer;
                }

                .hamburger span {
                    display: block;
                    position: absolute;
                    height: 3px;
                    width: 100%;
                    background: ${currentTextColor};
                    border-radius: 9px;
                    opacity: 1;
                    left: 0;
                    transform: rotate(0deg);
                    transition: .25s ease-in-out;
                }

                .hamburger span:nth-child(1) { top: 0px; }
                .hamburger span:nth-child(2) { top: 9px; }
                .hamburger span:nth-child(3) { top: 18px; }

                .hamburger.open span:nth-child(1) { top: 9px; transform: rotate(135deg); }
                .hamburger.open span:nth-child(2) { opacity: 0; left: -60px; }
                .hamburger.open span:nth-child(3) { top: 9px; transform: rotate(-135deg); }

                @media (max-width: 900px) {
                    .nav-items {
                        display: none !important;
                    }
                    .mobile-menu-btn {
                        display: block !important;
                        cursor: pointer;
                        font-weight: bold;
                        color: ${currentTextColor};
                    }
                }
            `}</style>
        </nav>
    );
}

