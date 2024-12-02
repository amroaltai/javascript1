document
  .getElementById("loadProductsBtn")
  .addEventListener("click", async function () {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Nätverksproblem, försök igen.");
      }

      const products = await response.json();

      const productTableBody = document.getElementById("productTableBody");
      productTableBody.innerHTML = "";

      products.forEach((product) => {
        const row = document.createElement("tr");
        t;
        row.innerHTML = ` 
          <td>${product.namn}</td> 
          <td>${product.sku}</td> 
          <td>${product.pris}</td> 
        `;
        productTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Ett fel inträffade:", error);
      alert("Kunde inte ladda produkter, försök igen senare.");
    }
  });
