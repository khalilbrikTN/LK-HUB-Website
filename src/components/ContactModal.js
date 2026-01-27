"use client";

export default function ContactModal() {
    return (
        <div id="contact-modal" className="modal-overlay hidden">
            <div className="modal-content" style={{ maxWidth: '600px' }}>
                <button className="close-btn" onClick={() => document.getElementById('contact-modal').classList.add('hidden')}>&times;</button>
                <div className="modal-header">
                    <h2>Contact Us</h2>
                    <p>Have a question or want to collaborate? <br /> Reach out to us at <span className="text-primary">info@liberating-knowledge.com</span></p>
                </div>
                <div className="modal-body">
                    <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); document.getElementById('contact-modal').classList.add('hidden'); }}>
                        <div className="form-group">
                            <label htmlFor="contact-name">Full Name</label>
                            <input type="text" id="contact-name" className="form-control" placeholder="Your Full Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">Email Address</label>
                            <input type="email" id="contact-email" className="form-control" placeholder="name@example.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" className="form-control" placeholder="How can we help you?" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
