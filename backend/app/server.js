const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Debug the current directory and file structure
console.log('Server starting...');
console.log('Current directory:', __dirname);

// Explicitly construct the path relative to the app directory
// Since we know server.js is in the app directory, we need to go up one level
// to reach the project root, then into the backend directory
const backendPath = path.join(__dirname, '..', 'backend');
console.log('Backend path:', backendPath);

// Check if the backend directory exists
if (!fs.existsSync(backendPath)) {
  console.error(`Backend directory not found at ${backendPath}`);
  process.exit(1);
}

// Construct the path to the dependency injection container
const containerPath = path.join(backendPath, 'infrastructure', 'dependency-injection', 'index.js');
console.log('Container path:', containerPath);

// Check if the container file exists
if (!fs.existsSync(containerPath)) {
  console.error(`Container file not found at ${containerPath}`);
  process.exit(1);
}

// Import the container with explicit path
try {
  const Container = require(containerPath);
  console.log('Container loaded:', typeof Container);

  if (typeof Container.init !== 'function') {
    console.error('Container.init is not a function');
    process.exit(1);
  }

  // Initialize the container
  Container.init();
  console.log('Container initialized successfully');

  // Import other modules with explicit paths
  const { sequelize } = require(path.join(backendPath, 'models'));
  const routes = require(path.join(backendPath, 'domain', 'interfaces', 'http', 'routes'));
  const errorMiddleware = require(path.join(backendPath, 'domain', 'interfaces', 'http', 'middlewares', 'error.middleware'));
  const config = require(path.join(backendPath, 'config', 'app'));

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

  const PORT = config.server.port || 5489;

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

} catch (error) {
  console.error('Server initialization failed:', error);
  process.exit(1);
}
