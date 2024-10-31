var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Freaky Fashion", products });
});

/* Route för produktdetaljsidan */
router.get("/products/:slug", function (req, res, next) {
  const slug = req.params.slug;
  const product = products.find((p) => p.slug === slug);

  if (product) {
    // Hitta relaterade produkter (exkludera aktuell produkt)
    const relatedProducts = products.filter((p) => p.slug !== slug).slice(0, 3);
    res.render("product", { title: product.name, product, relatedProducts });
  } else {
    next(); // Om produkten inte hittas, gå till nästa middleware (404)
  }
});

module.exports = router;
