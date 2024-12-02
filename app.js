var createError = require("http-errors"); 
var express = require("express"); 
var path = require("path"); 
var cookieParser = require("cookie-parser"); 
var logger = require("morgan"); 

const Database = require("sqlite3"); 

var indexRouter = require("./routes/index"); 
var productRouter = require("./routes/product");
var adminProductsRouter = require("./routes/adminProducts"); 
var adminRouter = require("./routes/admin"); 

var app = express(); 


app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs"); 


app.use(logger("dev")); 
app.use(express.json());  
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter); 
app.use("/products", productRouter); 
app.use("/api", adminProductsRouter); 
app.use("/admin", adminRouter); 


app.use(function (req, res, next) {
  
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message; 
  res.locals.error = req.app.get("env") === "development" ? err : {}; 

  
  res.status(err.status || 500); 
  res.render("error"); 
});

module.exports = app; 
