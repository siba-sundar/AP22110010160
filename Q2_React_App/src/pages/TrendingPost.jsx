import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // unable to get the data as the token expired
  const samplePosts = [
    {
      id: 1,
      userid: 1,
      username: "John Smith",
      content: "loreum ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: "2023-07-20T10:30:00Z",
      comments: 25,
      imageUrl: "https://images.unsplash.com/photo-1742268350523-70a032f3520d",
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      userid: 2,
      username: "Emma Wilson",
      content: "lorem ipsum dolor sit amet, consectetur adipiscing elite sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: "2023-07-19T15:45:00Z",
      comments: 18,
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      userid: 3,
      username: "Michael Brown",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: "2023-07-18T09:15:00Z",
      comments: 15,
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts?type=popular');
        const postsData = response.data.posts || response.data;
        
        if (!postsData || postsData.length === 0) {
          setTrendingPosts(samplePosts);
        } else {
          setTrendingPosts(postsData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        // setError("Failed to fetch trending posts");
        setTrendingPosts(samplePosts);
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) return <div className="text-center p-6">Loading trending posts...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Posts with Most Comments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingPosts.map((post, index) => (
          <div key={post.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={post.imageUrl}
              alt="Post image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center mb-3">
                <img 
                  src={post.profileImage}
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

export default TrendingPosts;
