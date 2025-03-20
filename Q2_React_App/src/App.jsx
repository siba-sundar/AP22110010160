import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TopUsers from './pages/TopUsers.jsx';
import TrendingPosts from './pages/TrendingPost.jsx';
import Feed from './pages/Feed.jsx';
import './index.css';

// Defining the routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <TopUsers />,
  },
  {
    path: "/trending",
    element: <TrendingPosts />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
