const Book = require("../models/book");
const Author = require("../models/author");

const path = require("path");
const fs = require("fs");

const uploadPath = require("../models/book").coverImageBasePath;

exports.getBooks = async (req, res, next) => {
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query
    });
  } catch {
    res.redirect("/");
  }
};

exports.getNewPage = async (req, res, next) => {
  try {
    const authors = await Author.find({});
    const params = {
      authors: authors,
      book: new Book()
    };
    res.render("books/new", params);
  } catch {
    res.redirect("/books");
  }
};

exports.createBooks = async (req, res, next) => {
  const fileName = req.file != null ? req.file.filename : null;
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description
  });

  try {
    const newBook = await book.save();
    res.redirect(`books`);
  } catch {
    if (book.coverImageName != null) {
      fs.unlink(path.join(uploadPath, book.coverImageName), err => {
        if (err) console.error(err);
      });
    }
    try {
      const authors = await Author.find({});
      const params = {
        authors: authors,
        book: new Book()
      };
      res.render("books/new", params);
    } catch {
      res.redirect("/books");
    }
  }
};
