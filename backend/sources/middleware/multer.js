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
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/x-zip-compressed', 'application/zip'];
  const allowedExtensions = ['.zip', '.png', '.jpeg', 'jpg'];
  const fileExtension = path.extname(file.originalname);
  const isValidFileType = allowedFileTypes.includes(file.mimetype);
  const isValidFileExtension = allowedExtensions.includes(fileExtension);
  if (isValidFileType && isValidFileExtension) {
    cb(null, true);
  } else {
    cb(new Error('File type'));
  }
};

const uploadMiddleware = multer({storage, fileFilter});

module.exports = uploadMiddleware;
