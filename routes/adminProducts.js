const express = require("express"); // Importerar Express-ramverket
const router = express.Router(); //Skapar en router för att definiera API-rutter
const { getProducts, addProduct } = require("../utilities/db"); // Importerar funktioner för att hantera databasen

// GET: Hämta alla produkter från databasen
router.get("/products", async (req, res) => {
  try {
    // Använder getProducts-funktionen för att hämta alla produkter från databasen
    const products = await getProducts();

    // Skickar tillbaka produkterna som JSON-svar till klienten
    res.json(products);
  } catch (error) {
    // Loggar ett fel om något går fel vid hämtning av produkter
    console.error("Ett fel inträffade vid hämtning av produkter:", error);

    // Skickar tillbaka ett felmeddelande med statuskod 500
    res.status(500).json({ error: "Kunde inte hämta produkter" });
  }
});

// POST: Lägg till ny produkt i databasen
router.post("/products", (req, res) => {
  // Hämtar data från förfrågan (body) som skickats av klienten
  const { namn, sku, pris, brand, image, description } = req.body;

  // Skapar ett nytt produktobjekt baserat på de mottagna värden
  const newProduct = { namn, sku, pris, brand, image, description };

  // Använder addProduct-funktionen för att lägga till den nya produkten i databasen
  addProduct(newProduct, (err, product) => {
    if (err) {
      // Om ett fel inträffar, skicka tillbaka ett felmeddelande med statuskod 500
      res.status(500).json({ error: "Kunde inte lägga till produkten" });
    } else {
      // Om produkten lades till framgångsrikt, skicka tillbaka den nya produkten som JSON
      res.status(201).json(product);
    }
  });
});

module.exports = router; // Exporterar routern för att kunna användas i andra delar av applikationen
