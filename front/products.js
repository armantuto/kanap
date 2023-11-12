const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id") ;
const detalleProducto = document.querySelector(".item__img");
const productName = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const selectColor = document.querySelector('#colors');

import { fetchData } from "./main.js";
import { api as anotherApi } from "./main.js";

async function productsById(url){
        const product = await fetchData(url);
        detalleProducto.innerHTML = ` <img src="${product.imageUrl}" alt="${product.altTxt}">`;
        productName.textContent = `${product.name}`;
        productPrice.textContent = `${product.price}`;
        productDescription.textContent = `${product.description}`;
            product.colors.forEach(color => {
                const colorItem = document.createElement("option");
                colorItem.textContent = color;
                selectColor.appendChild(colorItem);
        })
    }

async function addToCart(url) {
    // Obtener el botón de agregar al carrito y otros elementos necesarios
    const buttonForAdd = document.querySelector("#addToCart");
    const quantityInput = document.querySelector("#quantity");
    const colorSelect = document.querySelector("#colors");
  
    buttonForAdd.addEventListener("click", async function () {
      try {
        // Obtener la información del producto mediante una solicitud a la API
        const product = await fetchData(url);
  
        // Extraer información del producto
        const { _id: id, name, price, imageUrl } = product;
        const quantity_value = getQuantity();
        const color = getColor();
        const uniqueId = generateUniqueId(); //jahsdgjahsd, /qwe5q4we5qw7e8
        const quantity=convertToInt(quantity_value);
        console.log(quantity)
        if(quantity <=0){
          alert("Please select a quantity.");
          return;
        }
        // Validar la cantidad y el color seleccionados
        if ((!color && color==="")) {
          alert("Please select a color.");
          return;
        }
  
        // Obtener el carrito actual del localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        // Buscar el producto en el carrito
        const existingProduct = cart.find(
          (product) => product.id === id && product.color === color 
        );
  
        if (existingProduct) {
          // Actualizar la cantidad si el producto ya está en el carrito
          existingProduct.quantity += quantity;
          updateLocalStorage(cart);
          alert(`You added ${quantity} ${name} ${color} to the product in the cart.`);
        } else {
          // Agregar el producto al carrito si no existe
          cart.push({ id, name, price, imageUrl, quantity, color, uniqueId  });
          updateLocalStorage(cart);
          alert(`You added ${quantity} ${name} ${color} to the cart.`);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("An error occurred while adding the product to the cart.");
      }
    });
  
    // Función para obtener la cantidad del input
    function getQuantity() {
      return quantityInput.value.trim();
    }
  
    // Función para obtener el color seleccionado
    function getColor() {
      return colorSelect.value.trim();
    }
  
    // Función para generar un identificador único
    function generateUniqueId() {
      return Math.floor(Math.random() * 1000000).toString();
    }
  
    // Función para actualizar el localStorage con el carrito actualizado
    function updateLocalStorage(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    function convertToInt(value){
      const num=parseInt(value);
      if(isNaN(num)) return 0;
      return num;
    }
  }

productsById(anotherApi +"/"+ productId);
addToCart(anotherApi + "/" + productId)