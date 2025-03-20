const { cache } = require('../services/cacheService.js');

function getPosts(req, res) {
  const type = req.query.type || 'latest';
  
  if (type === 'popular') {
    let maxComments = 0;
    for (const count of Object.values(cache.commentCounts)) {
      if (count > maxComments) maxComments = count;
    }
    
    const popularPosts = cache.posts.filter(post => 
      cache.commentCounts[post.id] === maxComments
    ).map(post => ({
      ...post,
      comments: cache.commentCounts[post.id]
    }));
    
    res.json({ posts: popularPosts });
  } else if (type === 'latest') {
    const latestPosts = cache.posts.slice(0, 5).map(post => ({
      ...post,
      comments: cache.commentCounts[post.id]
    }));
    
    res.json({ posts: latestPosts });
  } else {
    res.status(400).json({ error: 'Invalid type. Use "popular" or "latest"' });
  }
}

module.exports = { getPosts };