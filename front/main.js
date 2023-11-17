import { fetchData } from "./utils.js";
import { api as anotherApi } from "./utils.js";


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

loadProducts(anotherApi);



