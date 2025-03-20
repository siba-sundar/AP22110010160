import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopUsers() {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sampleUsers = [
    {
      id: 1,
      name: "John Rice",
      Posts: 25,
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Priya Patel",
      Posts: 18,
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "richard Brown",
      Posts: 15,
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const userData = response.data.users || response.data;
        
        if (!userData || userData.length === 0) {
          setTopUsers(sampleUsers);
        } else {
          setTopUsers(userData);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setTopUsers(sampleUsers);
        // setError('Using sample data - Failed to fetch top users');
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div className="text-center p-6">Loading top users...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Top Users by Post Count</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topUsers.map((user, index) => (
          <div key={user.id || index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img 
                  src={user.profileImage}
                  alt={user.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <h3 className="text-lg font-medium">{user.name}</h3>
              </div>
              <p className="text-gray-700">Posts: {user.Posts}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopUsers;
