/* eslint-disable max-len */
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'sources/upload/');
  },
  filename: function(req, file, cb) {
    cb(null, `fileSystem-${nanoid(10)}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleware = multer({storage, fileFilter});

module.exports = uploadMiddleware;
