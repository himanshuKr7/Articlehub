import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ArticleView from "./pages/ArticleView";
import Bookmarks from "./pages/Bookmarks";
import CreateArticle from "./pages/CreateArticle";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/article/:id" element={<ArticleView />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/create-article" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
