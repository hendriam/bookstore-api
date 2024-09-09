const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const config = require('./config');

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
    level: config.levelLog, // Log level
    format: combine(
        colorize(), // Add colors to the console output
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Timestamp format
        logFormat // Custom log format
    ),
    transports: [
        new transports.Console(), // Output to console
    ],
});

// Export the logger instance
module.exports = logger;
