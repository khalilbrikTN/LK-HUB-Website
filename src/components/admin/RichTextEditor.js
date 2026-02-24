"use client";
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Quote, Image as ImageIcon, Heading1, Heading2 } from 'lucide-react';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }

    return (
        <div className="editor-menu">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
                title="Bold"
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
                title="Italic"
                type="button"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                title="Heading 1"
                type="button"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                title="Heading 2"
                type="button"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
                title="Bullet List"
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
                title="Ordered List"
                type="button"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
                title="Quote"
                type="button"
            >
                <Quote size={18} />
            </button>
            <button
                onClick={addImage}
                title="Add Image"
                type="button"
            >
                <ImageIcon size={18} />
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[150px]',
            },
        },
        immediatelyRender: false,
    });

    // Handle external content updates
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="rich-editor-container">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="editor-content" />

            <style jsx global>{`
                .rich-editor-container {
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    overflow: hidden;
                    background: white;
                }
                
                .editor-menu {
                    background: #f8fafc;
                    padding: 0.5rem;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .editor-menu button {
                    background: none;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    padding: 0.25rem;
                    color: #475569;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .editor-menu button:hover {
                    background: #e2e8f0;
                    color: #1e293b;
                }
                
                .editor-menu button.is-active {
                    background: #cbd5e1;
                    color: #0f172a;
                }
                
                .editor-content {
                    padding: 1rem;
                    min-height: 200px;
                }
                
                .ProseMirror {
                    outline: none;
                }

                .ProseMirror p {
                    margin-bottom: 1em;
                }
                
                .ProseMirror h1 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                }
                
                .ProseMirror h2 {
                    font-size: 1.25em;
                    font-weight: bold;
                    margin-top: 1em;
                    margin-bottom: 0.5em;
                }

                .ProseMirror ul, .ProseMirror ol {
                    padding-left: 1.5em;
                    margin-bottom: 1em;
                }
                
                .ProseMirror ul {
                    list-style-type: disc;
                }
                
                .ProseMirror ol {
                    list-style-type: decimal;
                }

                .ProseMirror blockquote {
                    border-left: 3px solid #cbd5e1;
                    padding-left: 1rem;
                    margin-left: 0;
                    color: #64748b;
                    font-style: italic;
                }

                .ProseMirror img {
                    max-width: 100%;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
