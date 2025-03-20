const axios = require('axios');
const { cache } = require('./cacheService');
require('dotenv').config();

const BASE_URL = 'http://20.244.56.144/test';
const token = process.env.ACCESS_TOKEN;

// Create axios instance with auth header
const api = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

console.log('Data service connected to API', cache);

async function getUsers() {
  try {
    const res = await api.get(`${BASE_URL}/users`);
    return res.data.users;
  } catch (err) {
    console.log('Error getting users', err);
    return {};
  }
}

async function getPosts(userId) {
  try {
    const res = await api.get(`${BASE_URL}/users/${userId}/posts`);
    return res.data.posts || [];
  } catch (err) {
    console.log(`Error getting posts for user ${userId}`, err);
    return [];
  }
}

async function getComments(postId) {
  try {
    const res = await api.get(`${BASE_URL}/posts/${postId}/comments`);
    return res.data.comments || [];
  } catch (err) {
    console.log(`Error getting comments for post ${postId}`, err);
    return [];
  }
}

async function updateCache() {
  const users = await getUsers();
  cache.users = users;
  cache.userPosts = {};
  cache.postCounts = {};
  cache.commentCounts = {};
  cache.posts = [];

  for (const userId in users) {
    const posts = await getPosts(userId);
    cache.userPosts[userId] = posts;
    cache.postCounts[userId] = posts.length;

    for (const post of posts) {
      post.timestamp = Date.now() - Math.random() * 1000000;
      post.username = users[userId];
      cache.posts.push(post);

      const comments = await getComments(post.id);
      cache.postComments[post.id] = comments;
      cache.commentCounts[post.id] = comments.length;
    }
  }

  cache.posts.sort((a, b) => b.timestamp - a.timestamp);
  cache.lastUpdate = Date.now();
}

module.exports = { updateCache, getUsers, getPosts, getComments };