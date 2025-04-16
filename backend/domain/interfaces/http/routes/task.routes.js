const express = require('express');
const path = require('path');

// Get the base path and load the container dynamically
const basePath = path.resolve(__dirname, '../../../../..');
const Container = require(path.join(basePath, 'backend', 'infrastructure', 'dependency-injection', 'index'));
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Get controller from DI container
const taskController = Container.get('TaskController');

// Task routes - all require authentication
router.use(authMiddleware);

router.post('/', (req, res, next) => taskController.create(req, res, next));
router.get('/', (req, res, next) => taskController.getUserTasks(req, res, next));
router.get('/:id', (req, res, next) => taskController.getById(req, res, next));
router.put('/:id', (req, res, next) => taskController.update(req, res, next));
router.delete('/:id', (req, res, next) => taskController.delete(req, res, next));

module.exports = router;
