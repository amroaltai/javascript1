const sqlite3 = require("sqlite3").verbose(); // Importerar SQLite3-biblioteket och aktiverar "verbose" för detaljerad felsökning
const path = require("path"); // Importerar path-modulen för att hantera fil- och katalogvägar

// Definierar sökvägen till SQLite-databasen
const dbPath = path.join(__dirname, "produkter.db"); // Skapar en fullständig sökväg till databasen "produkter.db"
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    // Om ett fel uppstår vid anslutning till databasen, logga felet
    console.error("Kunde inte ansluta till databasen:", err.message);
  } else {
    // Om anslutningen lyckas, skriv ut ett meddelande i konsolen
    console.log("Ansluten till SQLite-databasen.");
  }
});

// Funktion för att hämta alla produkter från databasen
function getProducts() {
  return new Promise((resolve, reject) => {
    // Returnerar ett Promise för att stödja asynkron hantering
    const query = "SELECT * FROM produkter"; // SQL-fråga för att hämta alla rader från tabellen "produkter"
    db.all(query, [], (err, rows) => {
      // Kör SQL-frågan
      if (err) {
        // Om ett fel uppstår, avbryt med `reject` och skicka felet
        reject(err);
      } else {
        // Om lyckat, returnera raderna (produkterna) med `resolve`
        resolve(rows);
      }
    });
  });
}

// Funktion för att lägga till en ny produkt i databasen
function addProduct(product, callback) {
  // SQL-fråga för att lägga till en ny rad i tabellen "produkter"
  const query =
    "INSERT INTO produkter (namn, sku, pris, brand, image, description) VALUES (?, ?, ?, ?, ?, ?)";
  // Parametrar för SQL-frågan, baserat på produktdata
  const params = [
    product.namn,
    product.sku,
    product.pris,
    product.brand,
    product.image,
    product.description,
  ];

  // Kör SQL-frågan med parametrarna
  db.run(query, params, function (err) {
    if (err) {
      // Om ett fel uppstår vid insättning i databasen, logga felet
      console.error("Fel vid insättning i databasen:", err.message);
      callback(err, null);
    } else {
      // Om insättningen lyckas, returnera det nya produkt-ID:t och produktens data
      callback(null, { id: this.lastID, ...product });
    }
  });
}

// Exporterar funktionerna så att de kan användas i andra filer
module.exports = { getProducts, addProduct };
