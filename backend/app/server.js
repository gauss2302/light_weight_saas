const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Initialize dependency injection container
const { Container } = require('backend/infrastructure/dependency-injection/index');
Container.init();

// Import database connection
const { sequelize } = require('backend/models');

// Import routes and middlewares
const routes = require('backend/domain/interfaces/http/routes');
const errorMiddleware = require('backend/domain/interfaces/http/middlewares/error.middleware');

// Import application config
const config = require('../config/app');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// API Routes
app.use('/api', routes);

// Simple welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Clean Architecture API' });
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = config.server.port;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');

    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
