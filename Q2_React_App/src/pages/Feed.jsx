import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts?type=latest');
      setPosts(response.data.posts || response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch latest posts');
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLatestPosts();

    // Set up polling for real-time updates
    const intervalId = setInterval(() => {
      fetchLatestPosts();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  if (loading) return <div className="text-center p-6">Loading latest posts...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div key={post.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={`https://picsum.photos/seed/${post.id}/500/300`}
              alt="Post image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center mb-3">
                <img 
                  src={`https://randomuser.me/api/portraits/men/${(post.userid % 20) + 1}.jpg`}
                  alt={post.username}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="font-medium">{post.username}</span>
              </div>
              <p className="text-gray-800 mb-3">{post.content}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                <span>{post.comments} {post.comments === 1 ? 'comment' : 'comments'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;