const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, title: 'Software Engineer', company: 'TechCorp' },
    { id: 2, title: 'Product Manager', company: 'StartupXYZ' }
  ]);
});

app.get('/api/jobs/:id', (req, res) => {
  const job = { id: parseInt(req.params.id), title: 'Software Engineer', company: 'TechCorp' };
  res.json(job);
});

app.post('/api/jobs', (req, res) => {
  const job = { id: Date.now(), ...req.body };
  res.status(201).json(job);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;