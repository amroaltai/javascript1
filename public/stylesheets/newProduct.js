document
  .getElementById("addProductForm") 
  .addEventListener("submit", async function (event) { 
    event.preventDefault(); 

    const formData = new FormData(event.target); 
    const data = Object.fromEntries(formData); 

    try {
      const response = await fetch("/api/products", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(data), 
      });

      if (!response.ok) { 
        throw new Error("Nätverksproblem, försök igen."); 
      }

      const newProduct = await response.json(); 
      alert(`Produkten ${newProduct.namn} har lagts till!`); 
      event.target.reset(); 
    } catch (error) {
      console.error("Ett fel inträffade:", error);
      alert("Kunde inte lägga till produkten, försök igen senare."); 
    }
  });
