const express = require("express");
const route = express.Router();
const multer = require("multer");

const Book = require("../models/book");
const bookController = require("../controllers/book");

route.get("/", bookController.getBooks);
route.get("/new", bookController.getNewPage);

const uploadPath = require("../models/book").coverImageBasePath;
const imageMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  }
});

route.post("/", upload.single("cover"), bookController.createBooks);

module.exports = route;
