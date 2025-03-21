const { updateCache } = require('../services/dataService.js');
const { cache } = require('../services/cacheService.js');

async function checkCache(req, res, next) {
  const now = Date.now();
  if (!cache.lastUpdate || now - cache.lastUpdate > 5 * 60 * 1000) {
    await updateCache();
  }
  next();
}

module.exports = { checkCache };