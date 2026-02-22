const path = require('path');
const express = require('express');
const multer = require('multer');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/'));
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post('/', protect, authorize('admin'), upload.single('image'), (req, res) => {
    console.log('Upload Request Headers:', req.headers);
    if (!req.file) {
        console.log('No file received in request');
        return res.status(400).send({ message: 'No file uploaded' });
    }
    console.log('File received:', req.file);
    res.send({
        message: 'Image Uploaded',
        image: `/uploads/${req.file.filename}`,
    });
});

module.exports = router;
