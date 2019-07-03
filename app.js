const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const methodOverride = require("method-override");

const app = express();
dotenv.config();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", path.join(__dirname, "views", "layouts", "layout"));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/author");
const bookRouter = require("./routes/books");
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/", indexRouter);

mongoose
  .connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(result => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("server is running.");
    });
  })
  .catch(err => {
    console.log(err);
  });
