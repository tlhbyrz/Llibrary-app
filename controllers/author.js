const Author = require("../models/author");

exports.getAuthors = (req, res, next) => {
  let searchOptions = {};
  if (req.query.name !== "" && req.query.name != null) {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  Author.find(searchOptions)
    .then(authors => {
      res.render("authors/index", {
        errMessage: "",
        authors: authors
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
};

exports.createAuthors = (req, res, next) => {
  const name = req.body.name;
  const author = new Author({
    name: name
  });
  author
    .save()
    .then(author => {
      res.redirect("/authors");
    })
    .catch(err => {
      console.log(err);
      res.render("authors/new", {
        errMessage: "Opps. Author could not be saved!",
        authors: []
      });
    });
};
