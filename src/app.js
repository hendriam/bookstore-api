const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./configs/config');
const logger = require('./configs/logger');
const connectDB = require('./configs/database');
const errorHandler = require('./middlewares/error-handler');
const path = require('path');

const startApp = () => {
    // Use body-parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Middleware for logging endpoints
    app.use((req, res, next) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });

    // mount all routes
    app.use('/api/v1', require('./v1/routes'));

    // Middleware untuk menyajikan file statis
    app.use('/api/v1/uploads', express.static(path.join(__dirname, '../uploads')));

    // Error handling middleware
    app.use(errorHandler);

    // Connect to database
    connectDB();

    const port = config.port;
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
    });
};

module.exports = startApp;
