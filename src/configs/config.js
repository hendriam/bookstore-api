const dotenv = require("dotenv");
dotenv.config(); // Load .env file

module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRED,
    levelLog: process.env.LEVEL_LOG,
};
