"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <Link href="/" className="logo">
                    <Image
                        src="/assets/media/Logo.png"
                        alt="LK-HUB Logo"
                        width={70}
                        height={70}
                        style={{ width: 'auto', height: '70px' }}
                        priority
                    />
                </Link>
                <div className="nav-links">
                    <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About Us</Link>
                    <Link href="/services" className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>Services</Link>

                    <div className="dropdown">
                        <span className="nav-link dropbtn" style={{ cursor: 'pointer' }}>Divisions ▾</span>
                        <div className="dropdown-content">
                            <Link href="/divisions/lk-communication">LK-Communication</Link>
                            <Link href="/divisions/lk-solutions">LK-Solutions</Link>
                            <Link href="/divisions/lk-sports">LK-Sports</Link>
                            <Link href="/divisions/lk-development">LK-Development</Link>
                            <Link href="/divisions/lk-education">LK-Education</Link>
                            <Link href="/divisions/lk-kids">LK-Kids</Link>
                        </div>
                    </div>

                    <Link href="/projects" className={`nav-link ${pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
                    <Link href="/news" className={`nav-link ${pathname === '/news' ? 'active' : ''}`}>News</Link>
                    {/* Note: Contact Modal logic will be handled by a global Context or Prop if needed, or we can keep it simple first */}
                    <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }} onClick={() => document.getElementById('contact-modal')?.classList.remove('hidden')}>Contact</button>
                </div>
            </div>
        </nav>
    );
}
