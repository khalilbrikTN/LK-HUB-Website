import './globals.css';
import PillNav from '@/src/components/PillNav';
import Footer from '@/src/components/Footer';
import ContactModal from '@/src/components/ContactModal';

export const metadata = {
  title: 'LK-HUB | Liberating Knowledge',
  description: 'Pioneering capacity building and media literacy since 2004.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/media/Logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PillNav
          logo="/assets/media/Logo-Photoroom.png"
          baseColor="rgba(250, 248, 245, 0.95)"
          pillColor="#3d0000"
          pillTextColor="#FFFFFF"
          textColor="#2d1a1a"
        />
        {children}
        <Footer />
        <ContactModal />
      </body>
    </html>
  );
}
