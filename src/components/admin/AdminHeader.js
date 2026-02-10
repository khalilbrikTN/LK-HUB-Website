"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export default function AdminHeader() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/admin/login');
    };

    return (
        <header className="admin-header-bar">
            {/* Left: Search / Nav-Toggle */}
            <div className="header-left">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            {/* Right: Notifications & Profile */}
            <div className="header-right">
                <button className="icon-btn">
                    🔔 <span className="badge">3</span>
                </button>
                <button className="icon-btn">
                    ⚙️
                </button>
                <div className="profile-btn" onClick={handleLogout}>
                    <div className="avatar">A</div>
                    <span className="username">Admin</span>
                </div>
            </div>

            <style jsx>{`
                .admin-header-bar {
                    height: 70px;
                    background: white;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 900;
                }

                .header-left .search-input {
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    border: 1px solid #eee;
                    background: #f9f9f9;
                    width: 300px;
                    transition: width 0.3s;
                }

                .header-left .search-input:focus {
                    outline: none;
                    border-color: #ddd;
                    background: white;
                    width: 350px;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .icon-btn {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    position: relative;
                    color: #666;
                }

                .badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #e74c3c;
                    color: white;
                    font-size: 0.7rem;
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 8px;
                    transition: background 0.2s;
                }

                .profile-btn:hover {
                    background: #f0f0f0;
                }

                .avatar {
                    width: 32px;
                    height: 32px;
                    background: #3d0000;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }

                .username {
                    font-weight: 600;
                    color: #333;
                }
            `}</style>
        </header>
    );
}
