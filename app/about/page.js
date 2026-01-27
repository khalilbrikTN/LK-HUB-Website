import TeamCard from '@/src/components/TeamCard';
import { teamData } from '@/src/data/team';

export const metadata = {
    title: 'About Us | LK-HUB',
};

export default function About() {
    return (
        <>
            <header className="hero" style={{ padding: 'var(--spacing-lg) 0', background: 'var(--color-background)' }}>
                <div className="container text-center">
                    <h1>Our Story & Mission</h1>
                    <p style={{ margin: '0 auto', maxWidth: '700px' }}>Pioneering capacity building and media literacy for over two decades.</p>
                </div>
            </header>

            <section className="section">
                <div className="container">
                    <div className="grid grid-2">
                        <div>
                            <h2>About LK-HUB</h2>
                            <p>LK-HUB is a pioneering company in accelerating capacity building, striving to achieve its mission
                                of Liberating Knowledge. We distinguish ourselves as the first to introduce media literacy
                                programs in the region.</p>
                            <br />
                            <p>With 20+ years of expertise, we have partnered with global icons like UNICEF, UNESCO, FIFA, and
                                AUC to deliver high-quality solutions and programs. From children to decision-makers, we provide
                                the tools needed to navigate and lead in today’s media-driven world.</p>
                        </div>
                        <div className="graphic-box" style={{ height: 'auto', minHeight: '300px' }}>
                            <h3>20+ Years</h3>
                            <p>Of Global Partnerships & Impact</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-light" style={{ backgroundColor: '#E8E4DD' }}>
                <div className="container">
                    <div className="grid grid-2">
                        <div className="card" style={{ borderTopColor: 'var(--color-primary)' }}>
                            <h3>Our Vision</h3>
                            <p>To become a leading global hub in the field of media and technology, by providing innovative
                                services and solutions, education, training, & creative content for companies, users, the
                                public, and creators of all ages.</p>
                        </div>
                        <div className="card" style={{ borderTopColor: 'var(--color-secondary)' }}>
                            <h3>Our Mission</h3>
                            <p>We strive to accelerate the growth of organizations and individuals by offering various services
                                & consultations. Including strategic planning, crisis management, research, training, workshops,
                                & interactive initiatives aimed at Liberating Knowledge.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="text-center">Driving Excellence</h2>
                    <br />
                    <div className="grid grid-3">
                        <div className="card">
                            <h3>Innovation</h3>
                            <p>Providing cutting-edge services and creative content.</p>
                        </div>
                        <div className="card">
                            <h3>Empowerment</h3>
                            <p>Enhancing cognitive and technical capabilities of future generations.</p>
                        </div>
                        <div className="card">
                            <h3>Impact</h3>
                            <p>Achieving positive change through communication for development.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-light">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '3rem' }}>
                        <h2>Leadership Team</h2>
                        <p>Meet the experts driving our mission to liberate knowledge.</p>
                    </div>

                    <div className="team-grid">
                        {teamData.map((member, index) => (
                            <TeamCard key={member.id} member={member} isOdd={index % 2 === 0} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
