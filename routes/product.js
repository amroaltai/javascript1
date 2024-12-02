var express = require("express");
var router = express.Router();


router.get("/", function (req, res, next) {

  res.render("index", { title: "Freaky Fashion", products });
});


router.get("/products/:slug", function (req, res, next) {
  const slug = req.params.slug;
  const product = products.find((p) => p.slug === slug);

  if (product) {
   
    const relatedProducts = products.filter((p) => p.slug !== slug).slice(0, 3);

 
    res.render("product", { title: product.name, product, relatedProducts });
  } else {
   
    next(); 
  }
});

module.exports = router; 
