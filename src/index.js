const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./utils/database");
const errorHandler = require("./middlewares/error-handler");
const logger = require("./utils/logger");
const config = require("./configs/config");

const app = express();

// Middleware for logging endpoints
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes")); // Mount user routes under '/api/users'
app.use(require("./routes/categoryRoutes")); // Mount categories routes under '/api/categories'
app.use(require("./routes/tagRoutes")); // Mount categories routes under '/api/categories'

// Error handling middleware
app.use(errorHandler);

// Connect to database
connectDB();

const port = config.port;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
