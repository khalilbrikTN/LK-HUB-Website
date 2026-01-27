import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>LK<span>HUB</span></h3>
                    <p>Leading global hub in media and technology solutions.</p>
                    <p>Email: info@liberating-knowledge.com</p>
                </div>
                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/divisions">Our Divisions</Link></li>
                        <li><Link href="/projects">Projects</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="https://www.linkedin.com/company/lkhub/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://www.instagram.com/lk.hub.eg?igsh=c25zdjJoMnBpbHQy" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.facebook.com/share/16mn66vpLQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <p>&copy; 2026 LK-HUB. All rights reserved.</p>
            </div>
        </footer>
    );
}
