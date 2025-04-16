const express = require('express');
const { Container } = require('backend/infrastructure/dependency-injection/index');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

// Get controller from DI container
const authController = Container.get('AuthController');

// Auth routes
router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/refresh', (req, res, next) => authController.refreshToken(req, res, next));
router.post('/logout', (req, res, next) => authController.logout(req, res, next));
router.get('/verify', authMiddleware, (req, res, next) => authController.verify(req, res, next));

module.exports = router;
