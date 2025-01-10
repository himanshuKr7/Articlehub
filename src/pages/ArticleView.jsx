import React, { useState, useEffect } from "react";
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import ReadingProgress from "../components/ReadingProgress";

const ArticleView = () => {
    const [fontSize, setFontSize] = useState(16);
    const [article, setArticle] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const currentArticle = storedArticles.find((article) => article.id === parseInt(id));
        if (currentArticle) {
            setArticle(currentArticle);
        }
    }, [id]);

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <ReadingProgress />
            <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900 flex-grow">{article.title}</h1>
                </div>
            </header>
            <main className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="mb-8 flex items-center">
                    <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                        <p className="text-lg font-medium text-gray-900">{article.author}</p>
                        <p className="text-sm text-gray-500">
                            {article.lastEdited} · {article.readingTime} read
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-8">
                    <label htmlFor="fontSize" className="text-sm font-medium text-gray-700">
                        Font Size:
                    </label>
                    <input
                        type="range"
                        id="fontSize"
                        min="12"
                        max="24"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-32"
                    />
                    <span className="text-sm text-gray-500">{fontSize}px</span>
                </div>
                <article
                    className="prose prose-lg max-w-none"
                    style={{ fontSize: `${fontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                ></article>
            </main>
        </div>
    );
};

export default ArticleView;
