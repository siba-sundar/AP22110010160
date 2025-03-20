const express = require('express');
const router = express.Router();
const { getTopUsers } = require('../controllers/usersController');
const { checkCache } = require('../middleware/cache.js');

router.get('/', checkCache, getTopUsers);

module.exports = router;