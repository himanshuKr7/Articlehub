import React, { useState } from "react";
import ArticleEditor from "../components/ArticleEditor";
import ThumbnailUpload from "../components/ThumbnailUpload";
import TagInput from "../components/TagInput";
import { Eye, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const CATEGORIES = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Business" },
    { id: 3, name: "Design" },
    { id: 4, name: "Marketing" }
];

const TAG_SUGGESTIONS = [
    "React", "JavaScript", "Web Development", "UI/UX", "Programming",
    "Tutorial", "Guide", "Tips", "Best Practices"
];

const CreateArticle = () => {
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [],
        thumbnail: null,
    });
    const [isPreview, setIsPreview] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { theme } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'tags') {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else {
                    submitData.append(key, formData[key]);
                }
            });
            const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
            const newArticle = { id: Date.now(), ...formData }; 
            storedArticles.push(newArticle);
            console.log("New article:", newArticle);
            localStorage.setItem("articles", JSON.stringify(storedArticles));
            alert("Article saved successfully!");
        } catch (error) {
            console.error("Error saving article:", error);
            alert("Error saving article. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Create Article</h1>
                    <div className="space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsPreview(!isPreview)}
                            className={`px-4 py-2 border rounded-md ${theme === 'dark' ? 'hover:bg-gray-800 border-gray-700' : 'hover:bg-gray-100 border-gray-300'}`}
                        >
                            <Eye className="inline-block mr-2" size={16} />
                            {isPreview ? "Edit" : "Preview"}
                        </button>
                        <button
                            type="submit"
                            form="article-form"
                            disabled={isSaving}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            <Save className="inline-block mr-2" size={16} />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                {isPreview ? (
                    <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
                        <h1>{formData.title}</h1>
                        {formData.thumbnail && (
                            <img
                                src={typeof formData.thumbnail === 'string'
                                    ? formData.thumbnail
                                    : URL.createObjectURL(formData.thumbnail)}
                                alt={formData.title}
                                className="w-full h-64 object-cover rounded-lg mb-6"
                            />
                        )}
                        <p className="text-lg">{formData.excerpt}</p>
                        <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                    </div>
                ) : (
                    <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 font-semibold">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateFormData('title', e.target.value)}
                                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Excerpt</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => updateFormData('excerpt', e.target.value)}
                                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                                rows="3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => updateFormData('category', e.target.value)}
                                className={`w-full p-2 border rounded-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
                                required
                            >
                                <option value="">Select a category</option>
                                {CATEGORIES.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Tags</label>
                            <TagInput
                                tags={formData.tags}
                                setTags={(tags) => updateFormData('tags', tags)}
                                suggestions={TAG_SUGGESTIONS}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Thumbnail</label>
                            <ThumbnailUpload
                                thumbnail={formData.thumbnail}
                                setThumbnail={(thumbnail) => updateFormData('thumbnail', thumbnail)}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">Content</label>
                            <ArticleEditor setContent={(content) => updateFormData('content', content)} />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateArticle;
