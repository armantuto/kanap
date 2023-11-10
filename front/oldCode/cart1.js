
function prueba(productId, value) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var index = carrito.findIndex(x => x.idf == productId)
    carrito[index].numberP = value;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(index);
    loadProductsInCart()
  }


function loadProductsInCart() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const priceFinal = document.querySelector("#totalPrice")
    const cartContainer = document.getElementById("cart__items");
    // Limpiar el contenido actual del carrito antes de cargar los productos
    cartContainer.innerHTML = "";
  
    carrito.forEach(product => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      const total = product.numberP * product.price
      cartItem.innerHTML = `
              <article class="cart__item" data-id="${product.id}" data-color="{product-color}">
                  <div class="cart__item__img">
                    <img src="${product.img}" alt="Photo of a sofa">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${product.colore}</p>
                      <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Quantity :  </p> 
                        <input type="number" class="itemQuantity" name="itemQuantity" onChange="prueba('${product.idf}',this.value)" min="1" max="100" value="${product.numberP}">
                      </div>
                      <div><br>
                      <p>Total:  ${total} €</p>
                      </div> <br>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${product.idf}">Delete</p>
                      </div>
                    </div>
                  </div>
                </article>
          `
        ;
      cartContainer.appendChild(cartItem);
      const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.price * producto.numberP), 0)
      priceFinal.textContent = totalCalculado;
    });
    // Agregar un evento para manejar la eliminación de productos del carrito
    const removeButtons = document.querySelectorAll(".deleteItem");
    removeButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const productIdf = event.target.getAttribute("data-id");
  
        // Eliminar el producto del carrito
        const updatedCart = carrito.filter(product => product.idf !== productIdf);
  
        // Guardar el carrito actualizado en el LocalStorage
        localStorage.setItem("carrito", JSON.stringify(updatedCart));
  
        // Vuelve a cargar los productos en el carrito
        loadProductsInCart();
        location.reload()
      });
    });
  }
  
  // Llama a esta función para cargar los productos en el carrito al cargar la página
  loadProductsInCart();

  

document.querySelector(".cart__order__form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const names = document.getElementById("firstName").value;
  const lastN = document.getElementById("lastName").value;
  const adress = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value
  const idProc = [];
  
  carrito.forEach(producto => {
      idProc.push(producto.id)
      
  })
  console.log(idProc);
   
  // Crea un objeto con los datos del formulario
  const datos = {
       contact:{
          firstName: names,
          lastName: lastN,
          address: adress,
          city: city,
          email: email
      },
      products: idProc
  };

  console.log(datos)
    // Recopila los datos del formulario
    // Envía los datos al backend (puedes usar Fetch o una librería de AJAX como Axios)
 
fetch("http://127.0.0.1:3000/api/products/order", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(data => {
      // Maneja la respuesta del backend aquí
      const ord = data.orderId;
      localStorage.clear()
     console.log(ord);
     const carID = JSON.parse(localStorage.getItem("carID")) || [];
     carID.push(ord);
     localStorage.setItem("carID", JSON.stringify(carID));
     
    window.location.href = "confirmation.html";
    })
    .catch(error => {
      // Maneja errores aquí
      console.error(error);
    });
});

