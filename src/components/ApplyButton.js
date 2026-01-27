"use client";

export default function ApplyButton({ className, style, children }) {
    return (
        <button
            className={className || "btn btn-secondary"}
            style={style}
            onClick={() => document.getElementById('contact-modal').classList.remove('hidden')}
        >
            {children || "Apply Now"}
        </button>
    );
}
