 export const api ="http://127.0.0.1:3000/api/products";

export async function fetchData(url){
     try {
         const response = await fetch(url);
         if (!response.ok) {
             throw new Error("error http");
         }
         return await response.json();
     } catch (error) {
         console.error("error", error);
     }
}

  

async function loadProducts(url){
    const products = await fetchData(url);
    const productList = document.getElementById("items");
    products.forEach(product => {
        const productElement = document.createElement("a");
        productElement.href = "./front/html/product.html?id=" + product._id;
        productElement.innerHTML = `
                      <article> <img src='${product.imageUrl}' alt='${product.altTxt}'>
                      <h3 class="productName">${product.name}</h3>
                      <p class="productDescription">${product.description}</p></article>`;

        productList.appendChild(productElement);
    });}

loadProducts(api);



