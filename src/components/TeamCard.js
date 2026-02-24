"use client";

import Image from 'next/image';

export default function TeamCard({ member }) {
    return (
        <div className="team-card-new">
            <div className="team-header">
                <div className="team-info-header">
                    <h3 className="team-name">{member.name}</h3>
                    <span className="team-title">{member.title}</span>
                </div>
                <div className="team-photo-circle">
                    {member.image ? (
                        <img src={member.image} alt={member.name} />
                    ) : (
                        <div className="photo-placeholder">
                            {member.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            <div className="team-bio">
                {member.bio}
            </div>

            <div className="team-contact">
                <a href={member.linkedin || "#"} className="contact-icon-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.015zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                </a>
                <a href={`mailto:${member.email || "info@liberating-knowledge.com"}`} className="contact-icon-btn" title="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                </a>
            </div>

            <style jsx>{`
                .photo-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    font-weight: 800;
                    font-family: var(--font-heading);
                }
                .contact-icon-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--color-background-alt);
                    color: var(--color-primary);
                    transition: all 0.3s ease;
                }
                .contact-icon-btn:hover {
                    background: var(--color-secondary);
                    color: white;
                    transform: translateY(-3px);
                }
            `}</style>
        </div>
    );
}

