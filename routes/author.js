const express = require("express");
const route = express.Router();

const Author = require("../models/author");

const authorsController = require("../controllers/author");

route.get("/", authorsController.getAuthors);

route.get("/new", (req, res, next) => {
  res.render("authors/new", {
    authors: new Author()
  });
});

route.post("/", authorsController.createAuthors);

module.exports = route;
