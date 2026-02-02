export default function AdminLayout({ children }) {
    return (
        <div className="admin-root">
            {children}
            {/* 
                GLOBAL ADMIN STYLES 
                Prevents global site styles (navbar/footer) from leaking if we don't want them here.
                Since this is a sub-layout, usually Next.js keeps root layout.
                Ideally, Admin should be a separate Root Layout group if you want to completely hide site Navbar.
                For now, the site Navbar will typically appear unless we create a (site) group route.
            */}
        </div>
    );
}
