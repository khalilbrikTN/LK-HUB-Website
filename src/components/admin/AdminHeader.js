"use client";
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        if (confirm("Are you sure you want to sign out?")) {
            await logout();
            router.push('/admin/login');
        }
    };

    return (
        <header className="admin-header-bar">
            {/* Left: Search */}
            <div className="header-left">
                <input type="text" placeholder="Quick Search..." className="search-input" />
            </div>

            {/* Right: Notifications & Profile */}
            <div className="header-right">
                <div className="system-status">
                    <span className="status-indicator"></span>
                    System Online
                </div>
                <div className="profile-btn" onClick={handleLogout}>
                    <div className="avatar pseudo-professional">AD</div>
                    <div className="profile-details">
                        <span className="username">Administrator</span>
                        <span className="sign-out">Sign Out</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .admin-header-bar {
                    height: 70px;
                    background: white;
                    border-bottom: 1px solid #eaeaea;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2.5rem;
                    position: sticky;
                    top: 0;
                    z-index: 900;
                    font-family: 'Inter', sans-serif;
                }

                .header-left .search-input {
                    padding: 0.75rem 1.25rem;
                    border-radius: 4px;
                    border: 1px solid #f0f0f0;
                    background: #fcfcfc;
                    width: 320px;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    color: #333;
                }

                .header-left .search-input:focus {
                    outline: none;
                    border-color: #3d0000;
                    background: white;
                    width: 400px;
                    box-shadow: 0 4px 12px rgba(61, 0, 0, 0.05);
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                }

                .system-status {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #2e7d32;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    padding: 0.5rem 1rem;
                    background: #e8f5e9;
                    border-radius: 4px;
                }

                .status-indicator {
                    width: 8px;
                    height: 8px;
                    background: #4caf50;
                    border-radius: 50%;
                }

                .profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    padding: 0.5rem 0.75rem;
                    border-radius: 4px;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }

                .profile-btn:hover {
                    background: #f9f9f9;
                    border-color: #eee;
                }

                .avatar.pseudo-professional {
                    width: 36px;
                    height: 36px;
                    background: #3d0000;
                    color: white;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 0.85rem;
                    letter-spacing: 1px;
                }

                .profile-details {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }

                .username {
                    font-weight: 700;
                    color: #333;
                    font-size: 0.9rem;
                }

                .sign-out {
                    font-size: 0.75rem;
                    color: #3d0000;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </header>
    );
}
