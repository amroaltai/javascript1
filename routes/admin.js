var express = require("express");
var router = express.Router();

// Temporär array för att lagra produkter i minnet
const products = [];

// Rutt för att rendera administratörsvyn
router.get('/products', (req, res) => {
  res.render('admin'); // Renderar admin.ejs
});

// GET: Hämta alla produkter (API för att visa i tabellen)
router.get('/products/list', (req, res) => {
  res.json(products); // Returnerar alla produkter som JSON
});

// Visa formuläret för att lägga till en ny produkt
router.get('/products/new', (req, res) => {
  res.render('newProduct'); // Rendera newProduct.ejs
});

// POST: Lägg till ny produkt
router.post("/products", (req, res) => {
  const { namn, sku, pris, brand, image, description } = req.body;
  const newProduct = { namn, sku, pris, brand, image, description };
  products.push(newProduct);
  res.status(201).json(newProduct); // Skickar tillbaka den skapade produkten som JSON
});




module.exports = router;
