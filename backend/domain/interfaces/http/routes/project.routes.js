const express = require('express');
const { Container } = require('backend/infrastructure/dependency-injection/index');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Get controller from DI container
const projectController = Container.get('ProjectController');

// Project routes
router.get('/', (req, res, next) => projectController.getAll(req, res, next));
router.get('/:id', (req, res, next) => projectController.getById(req, res, next));

// Protected routes
router.use(authMiddleware);

router.post('/', (req, res, next) => projectController.create(req, res, next));
router.put('/:id', (req, res, next) => projectController.update(req, res, next));
router.delete('/:id', (req, res, next) => projectController.delete(req, res, next));

module.exports = router;
