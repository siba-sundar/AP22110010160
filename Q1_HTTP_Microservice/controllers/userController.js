const { cache } = require('../services/cacheService');

function getTopUsers(req, res) {
  const users = [];
  for (const userId in cache.postCounts) {
    users.push({
      id: userId,
      name: cache.users[userId],
      posts: cache.postCounts[userId]
    });
  }

  const topUsers = users.sort((a, b) => b.posts - a.posts).slice(0, 5);
  res.json({ users: topUsers });
}

module.exports = { getTopUsers };