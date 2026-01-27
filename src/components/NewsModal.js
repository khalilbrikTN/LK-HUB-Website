"use client";

export default function NewsModal({ item, onClose }) {
    if (!item) return null;

    return (
        <div id="news-modal" className="modal-overlay flex-center" style={{ opacity: 1, pointerEvents: 'auto' }}>
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2 id="modal-title">{item.title}</h2>
                    <span id="modal-date" className="modal-date">{item.date}</span>
                </div>
                <div className="modal-body">
                    {/* If we had an image, we would display it here properly */}
                    <div className="modal-image-container">
                        {/* Placeholder for now or actual image if available in public */}
                        <div style={{ color: '#888', fontWeight: 600 }}>News Image</div>
                        {/* <img src={item.image} alt={item.title} style={{width:'100%', height:'100%', objectFit:'cover'}} /> */}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
            </div>
        </div>
    );
}
