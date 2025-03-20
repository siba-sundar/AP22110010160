const express = require('express');
const router = express.Router();
const { getPosts } = require('../controllers/postController.js');
const { checkCache } = require('../middleware/cache');

router.get('/', checkCache, getPosts);

module.exports = router;