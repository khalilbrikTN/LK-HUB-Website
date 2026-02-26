"use client";
import { useState, useRef, useEffect } from 'react';

export default function SettingsPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null); // success, error
    const [msg, setMsg] = useState("");
    const formRef = useRef(null);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/settings/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setUsers(data.data || []);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    // Fetch users on mount
    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const formData = new FormData(formRef.current);
        const bodyObj = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/settings/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyObj)
            });
            const result = await res.json();

            if (res.ok) {
                setStatus("success");
                setMsg(result.message);
                formRef.current.reset();
                loadUsers(); // Refresh list
            } else {
                setStatus("error");
                setMsg(result.message || "Failed to create user.");
            }
        } catch (error) {
            setStatus("error");
            setMsg("Network error creating user.");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/settings/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
                setMsg("User deleted.");
                setStatus("success");
            } else {
                const result = await res.json();
                setMsg(result.message || "Failed to delete user.");
                setStatus("error");
            }
        } catch (error) {
            setMsg("Error deleting user.");
            setStatus("error");
        }
    };

    return (
        <div className="settings-container">
            <header className="page-header">
                <h1>Settings & Access Control</h1>
                <p>Manage platform administrators and system configuration.</p>
            </header>

            <div className="settings-grid">
                {/* User Management Section */}
                <section className="settings-card access-management">
                    <div className="card-header">
                        <h2>👥 Manage Access</h2>
                        <p className="card-desc">Grant access to other team members.</p>
                    </div>

                    {/* User List */}
                    <div className="user-list">
                        <h3>Current Administrators</h3>
                        {loading ? <p>Loading users...</p> : (
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="fw-bold">{user.username}</td>
                                            <td>{user.email}</td>
                                            <td><span className={`badge role ${user.role === 'Super Admin' ? 'super' : 'admin'}`}>{user.role}</span></td>
                                            <td>
                                                {user.role !== 'Super Admin' && (
                                                    <button onClick={() => handleDeleteUser(user.id)} className="btn-icon delete" title="Revoke Access">
                                                        🗑️
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {/* Add User Form */}
                    <div className="add-user-form">
                        <h3>Add New Administrator</h3>
                        {status && <div className={`alert ${status}`}>{msg}</div>}

                        <form ref={formRef} onSubmit={handleCreateUser} className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input name="username" type="text" required placeholder="e.g. Sarah Smith" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input name="email" type="email" required placeholder="sarah@lk-hub.com" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" required placeholder="••••••••" minLength={6} />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">Create Account</button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* General Configuration Section (Placeholder) */}
                <section className="settings-card general-config">
                    <div className="card-header">
                        <h2>⚙️ General Configuration</h2>
                        <p className="card-desc">System-wide settings.</p>
                    </div>

                    <div className="config-item">
                        <label>Site Name</label>
                        <input type="text" defaultValue="LK-HUB" readOnly className="static-input" />
                    </div>

                    <div className="config-item">
                        <label>Main Contact Email</label>
                        <input type="email" defaultValue="info@lk-hub.com" readOnly className="static-input" />
                    </div>

                    <p className="note">These settings require deeper configuration changes.</p>
                </section>
            </div>

            <style jsx>{`
                .settings-container {
                    padding: 1rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .page-header {
                    margin-bottom: 2rem;
                }

                .page-header h1 { margin: 0; color: #3d0000; }
                .page-header p { color: #666; margin-top: 0.5rem; }

                .settings-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 2rem;
                }

                .settings-card {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .card-header {
                    margin-bottom: 2rem;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 1rem;
                }

                .card-header h2 { margin: 0; font-size: 1.25rem; color: #333; }
                .card-desc { color: #888; font-size: 0.9rem; margin: 0.25rem 0 0 0; }

                /* User Table */
                .user-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 2rem;
                }

                .user-table th {
                    text-align: left;
                    color: #999;
                    font-size: 0.85rem;
                    border-bottom: 1px solid #eee;
                    padding: 0.5rem;
                }

                .user-table td {
                    padding: 0.75rem 0.5rem;
                    border-bottom: 1px solid #f9f9f9;
                    color: #555;
                }

                .fw-bold { font-weight: 600; color: #333; }

                .badge {
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .badge.role.super { background: #e3f2fd; color: #1565c0; } /* Blue for Super Admin */
                .badge.role.admin { background: #f3e5f5; color: #7b1fa2; } /* Purple for others */

                .btn-icon.delete {
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.5;
                    transition: opacity 0.2s;
                }
                .btn-icon.delete:hover { opacity: 1; color: red; }

                /* Add User Form */
                .add-user-form {
                    background: #f9f9f9;
                    padding: 1.5rem;
                    border-radius: 8px;
                }

                .add-user-form h3 { margin-top: 0; font-size: 1.1rem; color: #333; margin-bottom: 1rem; }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .form-group:last-of-type {
                     grid-column: 1 / -1; /* Password takes full width or adjust */
                }

                label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #555;
                }

                input {
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-size: 0.95rem;
                }

                .form-actions {
                    grid-column: 1 / -1;
                    margin-top: 1rem;
                }

                .btn-primary {
                    width: 100%;
                    padding: 0.75rem;
                    background: #3d0000;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .btn-primary:hover { background: #5a1a1a; }

                .alert {
                    padding: 0.75rem;
                    border-radius: 6px;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }
                .alert.success { background: #e8f5e9; color: #2e7d32; }
                .alert.error { background: #ffebee; color: #c62828; }

                /* General Config Styles */
                .config-item {
                    margin-bottom: 1rem;
                }
                .static-input {
                    width: 100%;
                    background: #f5f5f5;
                    border: 1px solid #eee;
                    color: #777;
                    cursor: not-allowed;
                }
                .note {
                    font-size: 0.8rem;
                    color: #999;
                    font-style: italic;
                    margin-top: 1rem;
                }

                @media (max-width: 900px) {
                    .settings-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
