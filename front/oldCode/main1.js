
const url = "http://127.0.0.1:3000/api/products";
function loadProducts() {
  fetch(url).then(data => {
    data.json().then(products => {
      const productList = document.getElementById("items");
      products.forEach(product => {
        const productElement = document.createElement("a");
        productElement.href = "./front/html/product.html?id=" + product._id
        productElement.innerHTML = `
                    <article> <img src='${product.imageUrl}' alt='${product.altTxt}'>
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p></article>`;

        productList.appendChild(productElement);
      });
    });
  }
  ).catch(error => console.log("error loading the products" + error))
}

function selectColors() {
  let col = document.querySelector('#colors');
  return col.value;
}
function setQuantity() {
  let qty = document.querySelector("#quantity");
  return qty.value;
}

function totalPrice() {
  let total = (selectColors() * setQuantity());
  return total;
}


function productsById() {
  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get("id");
  // Cargar y mostrar los detalles del producto con el ID específico
  const detalleProducto = document.querySelector(".item__img");
  const productName = document.querySelector("#title");
  const productPrice = document.querySelector("#price");
  const productDescription = document.querySelector("#description");
  const selectColor = document.querySelector('#colors');
  const botonesAgregarAlCarrito = document.querySelectorAll("#addToCart");
  const option = document.querySelector(".colorOp")
  // Aquí debes cargar los detalles del producto con el ID específico, por ejemplo, haciendo una nueva solicitud a la API o desde una fuente de datos.
  fetch(url + "/" + productoId).then(data => {
    data.json().then(product => {
      console.log(product);
      detalleProducto.innerHTML = ` <img src="${product.imageUrl}" alt="${product.altTxt}">`;
      productName.textContent = `${product.name}`;
      productPrice.textContent = `${product.price}`;
      productDescription.textContent = `${product.description}`;
      product.colors.forEach(color => {
        const colorItem = document.createElement("option");
        colorItem.textContent = color;
        selectColor.appendChild(colorItem);
      })
      botonesAgregarAlCarrito.forEach(boton => {
        boton.addEventListener("click", function () {
          const id = product._id;
          const name = product.name
          const price = product.price;
          const img = product.imageUrl;
          const numberP = setQuantity();
          const colore = selectColors();
          const idf = Math.floor(Math.random() * 1000000).toString();
          let empty = "";
          let zero = "0"
          if (colore === "--Please, select a color --") {
            alert("choose a color")
          } else if (numberP === empty || numberP === zero) {
            alert("add a quantity")
          } else {
            // Obtener el carrito actual del LocalStorage
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const productoExistente = carrito.find(producto => producto.id === id && producto.colore !== colore && producto.idf == idf);

            if (productoExistente) {
              // Si el producto ya existe, actualiza solo la cantidad
              carrito.push({ id, name, price, img, numberP: parseInt(numberP, 10), colore, idf });
              localStorage.setItem("carrito", JSON.stringify(carrito));
            } else {
              // Si el producto no existe o tiene el mismo color, actualiza la cantidad
              const productoMismoColor = carrito.find(producto => producto.id === id && producto.colore === colore && producto.idf);
              if (productoMismoColor) {
                // Si el producto no existe, agrégalo al carrito
                productoMismoColor.numberP += parseInt(numberP, 10);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert("you added " + numberP + " " + product.name + " " + colore + " to the product in the cart");
              } else {
                // Si no se encuentra un producto con el mismo ID y color, agrégalo al carrito
                carrito.push({ id, name, price, img, numberP: parseInt(numberP, 10), colore, idf });
                localStorage.setItem("carrito", JSON.stringify(carrito));
                alert("you added " + numberP + " " + product.name + " " + colore + " to the cart");
              }
            };
          }
        });
      });
    })
  })
};
loadProducts();
productsById();


