const multer = require('multer');
const path = require('path');
const ResponseError = require('./response-error');

// Setup storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Folder tempat menyimpan file upload
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// Filter untuk memastikan hanya file gambar yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ResponseError('Invalid file type, image type only JPEG, PNG, and JPG are allowed', 400), false);
    }
};

const uploadImage = multer({ storage, fileFilter });

module.exports = uploadImage;
