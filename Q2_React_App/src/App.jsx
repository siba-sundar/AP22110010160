import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TopUsers from './pages/TopUsers.jsx';
import TrendingPosts from './pages/TrendingPost.jsx';
import Feed from './pages/Feed.jsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-xl font-bold mb-2 sm:mb-0">Dashboard</div>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-blue-200 transition-colors">Top Users</Link>
              <Link to="/trending" className="hover:text-blue-200 transition-colors">Trending Posts</Link>
              <Link to="/feed" className="hover:text-blue-200 transition-colors">Feed</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4 mt-6">
          <Routes>
            <Route path="/" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;