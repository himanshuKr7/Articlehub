import React, { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext';
import ArticleCard from "../components/ArticleCard";

const Bookmarks = () => {
    const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
    const { theme } = useTheme();

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        const articles = bookmarks.map((id) => ({
            id,
            title: `Article ${id}`,
            excerpt: "This is a bookmarked article.",
            thumbnail: "/placeholder.svg?height=150&width=150",
            category: "Technology",
            readingTime: "5 min",
            lastEdited: "Jan 10, 2025",
            author: "John Doe",
            authorAvatar: "/placeholder.svg?height=40&width=40",
        }));
        setBookmarkedArticles(articles);
    }, []);

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
            <h1 className="text-3xl font-semibold mb-8">Bookmarked Articles</h1>
            {bookmarkedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookmarkedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                    No bookmarks yet. Start exploring and save your favorite articles!
                </p>
            )}
        </div>
    );
};

export default Bookmarks;

