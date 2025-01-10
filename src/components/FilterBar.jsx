import React from "react";
import { Search } from 'lucide-react';

const FilterBar = ({
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    sortOrder,
    setSortOrder,
}) => {
    const categories = ["All", "Technology", "Business", "Health"];

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${activeCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="date">Date</option>
                            <option value="readingTime">Reading Time</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

