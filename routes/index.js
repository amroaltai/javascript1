var express = require("express");
var router = express.Router();


const products = [
  {
    name: "Gråa Jeans",
    price: "599 SEK",
    brand: "Levis",
    image: "produktbild1.jpg",
    slug: "graa-jeans", 
    description: "Ett par klassiska gråa jeans från Levis.",
  },
  {
    name: "Blå jeans",
    price: "499 SEK",
    brand: "Levis",
    image: "produktbild2.png",
    slug: "bla-jeans",
    description: "Ett par bekväma blåa jeans.",
  },
  {
    name: "Svarta jeans",
    price: "499 SEK",
    brand: "Levis",
    image: "produktbild3.jpg",
    slug: "svarta-jeans",
    description: "Svarta jeans för alla tillfällen.",
  },
  {
    name: "Ljusblåa jeans",
    price: "399 SEK",
    brand: "Levis",
    image: "produktbild4.jpg",
    slug: "ljusbla-jeans",
    description: "Trendiga ljusblåa jeans.",
  },
  {
    name: "Grå tröja",
    price: "299 SEK",
    brand: "Levis",
    image: "produktbild5.jpg",
    slug: "gra-troja",
    description: "En varm grå tröja för kalla dagar.",
  },
  {
    name: "Svart T-shirt",
    price: "199 SEK",
    brand: "Levis",
    image: "produktbild6.jpg",
    slug: "svart-tshirt",
    description: "En klassisk svart T-shirt.",
  },
  {
    name: "Ljusgråa jeans",
    price: "499 SEK",
    brand: "Levis",
    image: "produktbild7.jpg",
    slug: "ljusgraa-jeans",
    description: "Snygga ljusgråa jeans.",
  },
  {
    name: "Vit T-shirt",
    price: "199 SEK",
    brand: "Levis",
    image: "produktbild8.jpg",
    slug: "vit-tshirt",
    description: "En stilren vit T-shirt.",
  },
];


router.get("/", function (req, res, next) {
 
  res.render("index", { title: "Freaky Fashion", products });
});


router.get('/products/:slug', function(req, res, next) {
  const slug = req.params.slug;
  const product = products.find(p => p.slug === slug);

  if (product) {
   
    const relatedProducts = products.filter(p => p.slug !== slug).slice(0, 3);
    
    res.render('product', { title: product.name, product, relatedProducts });
  } else {
    next();  
  }
});


module.exports = router; 
