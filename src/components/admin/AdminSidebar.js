"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// SVG Icons as components for cleaner usage
const DashboardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);

const ProjectIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
);

const NewsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
);

const CareerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);

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
                        <span className="brand-subtitle">Admin Panel</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-menu">
                <div className="menu-category">Main</div>

                <Link href="/admin" className={`menu-item ${pathname === '/admin' ? 'active' : ''}`}>
                    <span className="icon"><DashboardIcon /></span>
                    <span className="label">Dashboard</span>
                </Link>

                <div className="menu-category">Content Management</div>

                <Link href="/admin/projects" className={`menu-item ${isActive('/admin/projects') ? 'active' : ''}`}>
                    <span className="icon"><ProjectIcon /></span>
                    <span className="label">Projects</span>
                </Link>

                <Link href="/admin/news" className={`menu-item ${isActive('/admin/news') ? 'active' : ''}`}>
                    <span className="icon"><NewsIcon /></span>
                    <span className="label">News & Updates</span>
                </Link>

                <Link href="/admin/careers" className={`menu-item ${isActive('/admin/careers') ? 'active' : ''}`}>
                    <span className="icon"><CareerIcon /></span>
                    <span className="label">Careers</span>
                </Link>

                <div className="menu-category">System</div>

                <Link href="/admin/settings" className={`menu-item ${isActive('/admin/settings') ? 'active' : ''}`}>
                    <span className="icon"><SettingsIcon /></span>
                    <span className="label">Settings</span>
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
                    padding: 1.5rem;
                    border-bottom: 1px solid #f5f5f5;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .brand-title {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 700;
                    color: #3d0000;
                    font-size: 1.2rem;
                }

                .brand-subtitle {
                    font-size: 0.75rem;
                    color: #888;
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .sidebar-menu {
                    padding: 1.5rem 1rem;
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .menu-category {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: #a0a0a0;
                    font-weight: 600;
                    margin: 1.5rem 0 0.75rem 0.75rem;
                    letter-spacing: 1px;
                }
                
                .menu-category:first-of-type {
                    margin-top: 0.5rem;
                }

                .menu-item {
                    display: flex;
                    align-items: center;
                    padding: 0.85rem 1rem;
                    color: #666;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: all 0.2s ease;
                    font-weight: 500;
                    font-size: 0.95rem;
                    width: 100%;
                }

                .menu-item:hover {
                    background: #f8f9fa;
                    color: #3d0000;
                }

                .menu-item.active {
                    background: #3d0000;
                    color: white;
                    box-shadow: 0 4px 12px rgba(61, 0, 0, 0.15);
                }

                .menu-item.active .icon {
                    color: white; /* Ensure icon uses current text color */
                }

                .menu-item .icon {
                    display: flex;
                    align-items: center;
                    margin-right: 1rem;
                    color: #999;
                    transition: color 0.2s;
                }
                
                .menu-item:hover .icon {
                    color: #3d0000;
                }

                .menu-item.active:hover .icon {
                    color: white;
                }

                .label {
                    font-weight: 500;
                    letter-spacing: -0.2px;
                }
            `}</style>
        </aside>
    );
}
