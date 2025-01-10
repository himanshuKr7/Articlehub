import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Homepage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [sortOrder, setSortOrder] = useState("date");
	const { theme, toggleTheme } = useTheme();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		// Load articles from localStorage
		const storedArticles = JSON.parse(localStorage.getItem("articles")) || [];
		setArticles(storedArticles);
	}, []);

	const filteredArticles = articles.filter((article) => {
		const matchesCategory =
			activeCategory === "All" || article.category === activeCategory;
		const matchesSearchTerm = article.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearchTerm;
	});

	const sortedArticles = filteredArticles.sort((a, b) => {
		if (sortOrder === "date") {
			return (
				new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
			);
		} else if (sortOrder === "readingTime") {
			return parseInt(a.readingTime) - parseInt(b.readingTime);
		}
		return 0;
	});

	const categories = ["All", "Technology", "Health", "Business"];

	return (
		<div
			className={`min-h-screen ${
				theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}`}>
			<header
				className={`border-b ${
					theme === "dark" ? "border-gray-700" : "border-gray-200"
				} sticky top-0 bg-opacity-90 backdrop-filter backdrop-blur-lg z-10`}>
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold">ArticleHub</h1>
						<div className="flex items-center space-x-4">
							<Link to="/create-article">Write</Link>
                            <Link to="/bookmarks">Bookmarks</Link>
							<div className="relative">
								<input
									type="text"
									placeholder="Search articles..."
									className={`px-4 py-2 rounded-md ${
										theme === "dark"
											? "bg-gray-800 text-white"
											: "bg-gray-100 text-gray-900"
									}`}
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								<Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
							</div>
							<button onClick={toggleTheme} className="p-2 rounded-md">
								{theme === "dark" ? "Light" : "Dark"} Mode
							</button>
						</div>
					</div>
				</div>
			</header>
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center space-x-4 mb-6">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setActiveCategory(category)}
							className={`px-4 py-2 rounded-md ${
								activeCategory === category
									? "bg-blue-500 text-white"
									: theme === "dark"
									? "bg-gray-800 text-white"
									: "bg-gray-200 text-gray-900"
							}`}>
							{category}
						</button>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{sortedArticles.length === 0 ? (
						<p>No articles , Please Write an Article by clikcing on Write button</p>
					) : (
						sortedArticles.map((article) => (
							<Link key={article.id} to={`/article/${article.id}`}>
								<ArticleCard article={article} />
							</Link>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default Homepage;
