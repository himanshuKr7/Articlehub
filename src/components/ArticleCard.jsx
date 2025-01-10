import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon } from 'lucide-react';

const ArticleCard = ({ article }) => {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarked(bookmarks.includes(article.id));
    }, [article.id]);

    const toggleBookmark = (e) => {
        e.preventDefault();
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        if (bookmarked) {
            const updatedBookmarks = bookmarks.filter((id) => id !== article.id);
            localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        } else {
            bookmarks.push(article.id);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        }
        setBookmarked(!bookmarked);
    };

    return (
        <article className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
            <div className="relative">
                <Link to={`/article/${article.id}`}>
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                </Link>
                <button
                    onClick={toggleBookmark}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-sm hover:shadow transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <BookmarkIcon
                        className={`h-5 w-5 ${bookmarked
                                ? "text-blue-500 fill-current"
                                : "text-gray-600 hover:text-blue-500"
                            }`}
                    />
                </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/article/${article.id}`} className="group flex-grow">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                    </p>
                </Link>

                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                    <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900">{article.author}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(article.lastEdited).toLocaleDateString()} · {article.readingTime} read
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleCard;