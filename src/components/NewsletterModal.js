"use client";

export default function NewsletterModal() {
    return (
        <div id="newsletter-modal" className="modal-overlay hidden">
            <div className="modal-content" style={{ maxWidth: '480px' }}>
                <button className="close-btn" onClick={() => document.getElementById('newsletter-modal').classList.add('hidden')}>&times;</button>
                <div className="modal-header">
                    <h2>Join Our Newsletter</h2>
                    <p>Stay updated with our latest news and events.</p>
                </div>
                <div className="modal-body">
                    <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); document.getElementById('newsletter-modal').classList.add('hidden'); }}>
                        <div className="form-group">
                            <label htmlFor="newsletter-name">Full Name</label>
                            <input type="text" id="newsletter-name" className="form-control" placeholder="Your Full Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newsletter-email">Email Address</label>
                            <input type="email" id="newsletter-email" className="form-control" placeholder="name@example.com" required />
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Subscribe</button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                /* Reuse existing modal styles from globals.css usually, but here are specific overrides if needed */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                    backdrop-filter: blur(4px);
                }

                .modal-overlay:not(.hidden) {
                    opacity: 1;
                    pointer-events: auto;
                }

                .hidden {
                    display: none; /* Fallback */
                    opacity: 0;
                    pointer-events: none;
                }

                .modal-content {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 16px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                    position: relative;
                    transform: translateY(20px);
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .modal-overlay:not(.hidden) .modal-content {
                    transform: translateY(0);
                }

                .close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1.5rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: #666;
                    cursor: pointer;
                    line-height: 1;
                    padding: 0;
                }

                .modal-header {
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .modal-header h2 {
                    font-size: 2rem;
                    color: #3d0000;
                    margin-bottom: 0.5rem;
                }

                .modal-header p {
                    color: #666;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                    color: #333;
                }

                .form-control {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    font-family: inherit;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                .form-control:focus {
                    outline: none;
                    border-color: #a57c30;
                }

                .submit-btn {
                    width: 100%;
                    padding: 1rem;
                    font-size: 1.1rem;
                }
            `}</style>
        </div>
    );
}
