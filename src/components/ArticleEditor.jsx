import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import React, { useState } from 'react';
import { Bold, Italic, UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Link2, List, ListOrdered, Heading1, Heading2, Quote, Undo, Redo } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const MenuBar = ({ editor }) => {
    const [linkUrl, setLinkUrl] = useState('');
    const [showLinkInput, setShowLinkInput] = useState(false);
    const { theme } = useTheme();

    if (!editor) {
        return null;
    }

    const setLink = () => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
        }
        setShowLinkInput(false);
        setLinkUrl('');
    };

    const addHeading = (level) => {
        editor.chain().focus().toggleHeading({ level }).run();
    };

    const buttonClass = `p-2 rounded hover:bg-opacity-20 hover:bg-primary ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`;
    const activeButtonClass = `${buttonClass} bg-primary bg-opacity-20`;

    return (
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pb-3 mb-4`}>
            <div className="flex flex-wrap gap-1 mb-2">
                <div className="flex space-x-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? activeButtonClass : buttonClass}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? activeButtonClass : buttonClass}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? activeButtonClass : buttonClass}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </button>
                </div>
                <div className="flex space-x-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? activeButtonClass : buttonClass}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? activeButtonClass : buttonClass}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? activeButtonClass : buttonClass}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                </div>
                <div className="flex space-x-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => addHeading(1)}
                        className={editor.isActive('heading', { level: 1 }) ? activeButtonClass : buttonClass}
                        title="Heading 1"
                    >
                        <Heading1 size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => addHeading(2)}
                        className={editor.isActive('heading', { level: 2 }) ? activeButtonClass : buttonClass}
                        title="Heading 2"
                    >
                        <Heading2 size={16} />
                    </button>
                </div>
                <div className="flex space-x-1 border-r pr-2 mr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? activeButtonClass : buttonClass}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? activeButtonClass : buttonClass}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                </div>

                {/* Additional Controls */}
                <div className="flex space-x-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? activeButtonClass : buttonClass}
                        title="Quote"
                    >
                        <Quote size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowLinkInput(!showLinkInput)}
                        className={editor.isActive('link') ? activeButtonClass : buttonClass}
                        title="Add Link"
                    >
                        <Link2 size={16} />
                    </button>
                </div>
                <div className="flex space-x-1 ml-auto">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        className={`${buttonClass} disabled:opacity-50`}
                        title="Undo"
                    >
                        <Undo size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        className={`${buttonClass} disabled:opacity-50`}
                        title="Redo"
                    >
                        <Redo size={16} />
                    </button>
                </div>
            </div>
            {showLinkInput && (
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="Enter URL"
                        className={`flex-1 p-1 border rounded ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    />
                    <button
                        type="button"
                        onClick={setLink}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Link
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowLinkInput(false)}
                        className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

const ArticleEditor = ({ setContent }) => {
    const { theme } = useTheme();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
            Color,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: `prose max-w-none focus:outline-none min-h-[200px] ${theme === 'dark' ? 'prose-invert' : ''}`,
            },
        },
    });

    return (
        <div className={`border rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <MenuBar editor={editor} />
            <div className="px-4 py-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default ArticleEditor;

