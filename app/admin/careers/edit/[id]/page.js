"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditCareer() {
    const { id } = useParams();
    const router = useRouter();
    const [career, setCareer] = useState(null);
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(`/api/careers/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.data) setCareer(data.data);
            })
            .catch(console.error);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        const formData = new FormData(e.target);
        const dataPayload = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/careers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataPayload)
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Job posting updated successfully!');
                setTimeout(() => router.push('/admin/careers'), 1500);
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to update job posting.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error preventing update.');
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete this job posting? This cannot be undone.')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/careers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                router.push('/admin/careers');
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to delete.');
            }
        } catch (error) {
            alert('Error deleting job posting.');
        }
    };

    if (!career) return <div style={{ padding: '2rem', marginTop: '80px', textAlign: 'center', color: '#999' }}>Loading...</div>;

    return (
        <div className="admin-page-container">
            <header className="page-header">
                <div>
                    <Link href="/admin/careers" className="back-link">Back to Careers</Link>
                    <h1>Edit Job Posting</h1>
                </div>
                <div className="actions">
                    <button type="button" onClick={handleDelete} className="btn btn-danger">
                        Delete
                    </button>
                    <button form="edit-form" type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </header>

            {status === 'success' && <div className="alert success">{message}</div>}
            {status === 'error' && <div className="alert error">{message}</div>}

            <form id="edit-form" onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                    <label>Job Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={career.title}
                        className="input-field input-title"
                        required
                    />
                </div>

                <div className="two-col">
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={career.location}
                            className="input-field"
                            placeholder="e.g. Cairo, Egypt"
                        />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            defaultValue={career.department}
                            className="input-field"
                            placeholder="e.g. LK-Education"
                        />
                    </div>
                </div>

                <div className="two-col">
                    <div className="form-group">
                        <label>Employment Type</label>
                        <select name="type" defaultValue={career.type} className="input-field">
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Volunteer">Volunteer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" defaultValue={career.status} className="input-field">
                            <option value="Active">Active</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div className="meta-row">
                    <span className="meta-label">Posted:</span>
                    <span className="meta-value">{career.date_posted}</span>
                    <span className="meta-label">Applicants:</span>
                    <span className="meta-value">{career.applicants}</span>
                </div>
            </form>

            <style jsx>{`
                .admin-page-container {
                    padding: 2rem;
                    max-width: 800px;
                    margin: 80px auto 0;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 2rem;
                    border-bottom: 2px solid #3d0000;
                    padding-bottom: 1.5rem;
                }

                .back-link {
                    font-size: 0.85rem;
                    color: #666;
                    text-decoration: none;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                .back-link:hover { color: #3d0000; }

                h1 {
                    color: #3d0000;
                    font-size: 2rem;
                    font-weight: 800;
                    margin: 0;
                }

                .actions {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: none;
                    transition: all 0.2s;
                }

                .btn-primary { background: #3d0000; color: white; }
                .btn-primary:hover { background: #5c0000; }
                .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

                .btn-danger {
                    background: #ffebee;
                    color: #c62828;
                    border: 1px solid #ffcdd2;
                }
                .btn-danger:hover { background: #c62828; color: white; border-color: #c62828; }

                .alert {
                    padding: 1rem 1.25rem;
                    border-radius: 6px;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                    font-size: 0.95rem;
                }
                .success { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
                .error { background: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }

                .edit-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }

                .form-group {
                    margin-bottom: 1.75rem;
                }

                .form-group label {
                    display: block;
                    font-weight: 700;
                    margin-bottom: 0.6rem;
                    color: #333;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .input-field {
                    width: 100%;
                    padding: 0.9rem 1rem;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-family: inherit;
                    color: #333;
                    transition: border-color 0.2s;
                    box-sizing: border-box;
                }
                .input-field:focus { outline: none; border-color: #3d0000; }

                .input-title {
                    font-size: 1.4rem;
                    font-weight: 700;
                }

                .two-col {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .meta-row {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    margin-top: 0.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid #f5f5f5;
                }
                .meta-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #999;
                    letter-spacing: 0.5px;
                }
                .meta-value {
                    font-size: 0.9rem;
                    color: #444;
                    font-weight: 600;
                    margin-right: 1rem;
                }

                @media (max-width: 600px) {
                    .two-col { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
}
