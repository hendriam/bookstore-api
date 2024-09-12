const express = require('express');
const bodyParser = require('body-parser');
const config = require('./configs/config');
const logger = require('./configs/logger');
const connectDB = require('./configs/database');
const errorHandler = require('./middlewares/error-handler');
const path = require('path');

const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for logging endpoints
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// mount all routes
app.use('/api/users', require('./routes/userRoutes'));
app.use(require('./routes/categoryRoutes'));
app.use(require('./routes/tagRoutes'));
app.use(require('./routes/productRoutes'));
app.use(require('./routes/addressRoutes'));

// Middleware untuk menyajikan file statis
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB();

const port = config.port;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
