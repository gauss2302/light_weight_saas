const express = require('express');
const authRoutes = require('./auth.routes');
const taskRoutes = require('./task.routes');
const projectRoutes = require('./project.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;
