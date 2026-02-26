"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();
    const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-brand">
                <div className="logo-container">
                    <Image
                        src="/assets/media/Logo-Photoroom.png"
                        alt="LK-HUB Logo"
                        width={40}
                        height={40}
                        className="brand-logo"
                    />
                    <div className="brand-text">
                        <span className="brand-title">LK-HUB</span>
                        <span className="brand-subtitle">Console</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-menu">
                <div className="menu-category">Overview</div>

                <Link href="/adminLK/dashboard" className={`menu-item ${pathname === '/adminLK/dashboard' ? 'active' : ''}`}>
                    <span className="label">Dashboard</span>
                </Link>

                <div className="menu-category">Management</div>

                <Link href="/adminLK/dashboard/projects" className={`menu-item ${isActive('/adminLK/dashboard/projects') ? 'active' : ''}`}>
                    <span className="label">Projects</span>
                </Link>

                <Link href="/adminLK/dashboard/news" className={`menu-item ${isActive('/adminLK/dashboard/news') ? 'active' : ''}`}>
                    <span className="label">News & Articles</span>
                </Link>

                <Link href="/adminLK/dashboard/careers" className={`menu-item ${isActive('/adminLK/dashboard/careers') ? 'active' : ''}`}>
                    <span className="label">Job Openings</span>
                </Link>

                <div className="menu-category">Administration</div>

                <Link href="/adminLK/dashboard/settings" className={`menu-item ${isActive('/adminLK/dashboard/settings') ? 'active' : ''}`}>
                    <span className="label">System Settings</span>
                </Link>
            </nav>

            <style jsx>{`
                .admin-sidebar {
                    width: 260px;
                    background: #ffffff;
                    height: 100vh;
                    position: fixed;
                    left: 0;
                    top: 0;
                    border-right: 1px solid #eaeaea;
                    display: flex;
                    flex-direction: column;
                    z-index: 1000;
                    font-family: 'Inter', sans-serif;
                }

                .sidebar-brand {
                    padding: 2rem 1.5rem;
                    border-bottom: 2px solid #3d0000;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                }

                .brand-title {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 800;
                    color: #3d0000;
                    font-size: 1.4rem;
                    letter-spacing: -0.5px;
                }

                .brand-subtitle {
                    font-size: 0.7rem;
                    color: #999;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    margin-top: 2px;
                }

                .sidebar-menu {
                    padding: 2rem 1.25rem;
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }

                .menu-category {
                    font-size: 0.70rem;
                    text-transform: uppercase;
                    color: #999;
                    font-weight: 800;
                    margin: 1.75rem 0 0.75rem 0.5rem;
                    letter-spacing: 1.2px;
                }
                
                .menu-category:first-of-type {
                    margin-top: 0;
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    padding: 1rem 1.25rem;
                    color: #444;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                    font-weight: 600;
                    font-size: 0.9rem;
                    width: 100%;
                }

                .menu-item:hover {
                    background: #f9f9f9;
                    color: #3d0000;
                }

                .menu-item.active {
                    background: #3d0000;
                    color: white;
                    box-shadow: 0 4px 12px rgba(61, 0, 0, 0.1);
                }

                .label {
                    letter-spacing: 0.2px;
                }
            `}</style>
        </aside>
    );
}
