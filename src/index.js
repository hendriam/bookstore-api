const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./utils/database');
const errorHandler = require('./middlewares/error-handler');
const logger = require('./utils/logger');
const config = require('./configs/config');
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

app.use('/api/users', require('./routes/userRoutes')); // Mount user routes under '/api/users'
app.use(require('./routes/categoryRoutes')); // Mount categories routes under '/api/categories'
app.use(require('./routes/tagRoutes')); // Mount tags routes under '/api/tags'
app.use(require('./routes/productRoutes')); // Mount products routes under '/api/products'

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
