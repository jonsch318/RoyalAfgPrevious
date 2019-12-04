const appRoot = require("app-root-path");
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

module.exports = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${appRoot}/public/uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v4()}${path.extname(file.originalname)}`);
  }
});
