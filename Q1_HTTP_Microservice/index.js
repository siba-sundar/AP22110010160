const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const { updateCache } = require('./services/dataService');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({error: 'Something went wrong'});
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  await updateCache();
});