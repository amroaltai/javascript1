var express = require("express");
var router = express.Router();

let products = [
  // Exempel på produkter, kan vara tomt initialt
  {
    name: "Svart T-shirt",
    sku: "AAA111",
    price: 199,
    brand: "Levis",
    image: "/stylesheets/bilder/svart-tshirt.jpg",
    description: "En bekväm svart t-shirt.",
  },
  {
    name: "Vit T-shirt",
    sku: "BBB111",
    price: 199,
    brand: "Levis",
    image: "/stylesheets/bilder/vit-tshirt.jpg",
    description: "En enkel vit t-shirt.",
  },
];

// GET: Hämta produkter
router.get("/products", (req, res) => {
  res.json(products);
});

// POST: Lägg till ny produkt
router.post("/products", (req, res) => {
  const { name, sku, price, brand, image, description } = req.body;
  const newProduct = { name, sku, price, brand, image, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
