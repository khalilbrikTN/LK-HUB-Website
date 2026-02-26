"use client";
import AdminSidebar from '@/src/components/admin/AdminSidebar';
import AdminHeader from '@/src/components/admin/AdminHeader';

export default function AdminLayout({ children }) {
    return (
        <div className="admin-root">
            <AdminSidebar />
            <div className="admin-main">
                <AdminHeader />
                <main className="admin-content">
                    {children}
                </main>
            </div>

            <style jsx global>{`
                /* Hide global site elements on admin routes */
                .pill-nav-container,
                nav.pill-nav, 
                header.site-header,
                footer.site-footer,
                footer,
                .contact-modal-overlay,
                .newsletter-modal-overlay {
                    display: none !important;
                }

                body {
                    background: #f4f7f6 !important; 
                    overflow-x: hidden;
                }
            `}</style>

            <style jsx>{`
                .admin-root {
                    display: flex;
                    min-height: 100vh;
                }

                .admin-main {
                    flex: 1;
                    padding-left: 260px; /* Sidebar width */
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    transition: padding-left 0.3s;
                }

                .admin-content {
                    padding: 2rem;
                    flex: 1;
                    background: #f4f7f6;
                    overflow-y: auto;
                }
                
                @media (max-width: 900px) {
                    .admin-main {
                         padding-left: 0;
                    }
                }
            `}</style>
        </div>
    );
}
