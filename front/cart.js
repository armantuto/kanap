//FDB Cambiar nombre della funcion

function pruebas(id,color, value) {
    console.log(id,color)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //var index = cart.findIndex(x => x.uniqueId == productIds)
    var index = cart.findIndex(
      (cart_product) => cart_product.id === id && cart_product.color === color 
    );
    cart[index].quantity = value;
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(index);
    loadProductsInCart()
  };

function loadProductsInCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const priceFinal = document.querySelector("#totalPrice")
    const cartContainer = document.getElementById("cart__items");
    // Limpiar el contenido actual del carrito antes de cargar los productos
    cartContainer.innerHTML = "";
  
    cart.forEach(product => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      const total = product.quantity * product.price
      cartItem.innerHTML = `
              <article class="cart__item" data-id="${product.id}" data-color="{product-color}">
                  <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="Photo of a sofa">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>
                      <p>${product.color}</p>
                      <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Quantity :  </p> 
                        <input type="number" class="itemQuantity" name="itemQuantity" onChange="pruebas('${product.id}','${product.color}',this.value)" min="1" max="100" value="${product.quantity}">
                      </div>
                      <div><br>
                      <p>Total:  ${total} €</p>
                      </div> <br>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${product.uniqueId}">Delete</p>
                      </div>
                    </div>
                  </div>
                </article>
          `
        ;
      cartContainer.appendChild(cartItem);
      const totalCalculado = cart.reduce((acc, producto) => acc + (producto.price * producto.quantity), 0)
      priceFinal.textContent = totalCalculado;
    });
    // Agregar un evento para manejar la eliminación de productos del carrito
    const removeButtons = document.querySelectorAll(".deleteItem");
    removeButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const productIdf = event.target.getAttribute("data-id");
  
        // Eliminar el producto del carrito
        const updatedCart = cart.filter(product => product.uniqueId !== productIdf);
  
        // Guardar el carrito actualizado en el LocalStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
  
        // Vuelve a cargar los productos en el carrito
        loadProductsInCart();
        location.reload()
      });
    });
  }
  
async function sendOrderData(datx) {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/products/order", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(datx)
      });
  
      if (!response.ok) {
        throw new Error(`Error al enviar la orden: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Maneja la respuesta del backend aquí
      const ord = data.orderId;
  
      // Retorna el orderId para que puedas utilizarlo según tus necesidades
      return ord;
    } catch (error) {
      // Maneja errores aquí
      console.error(error);
      throw error; // Puedes propagar el error para manejarlo en la parte que llama a esta función
    }
  }

  // Llama a esta función para cargar los productos en el carrito al cargar la página
loadProductsInCart();

  
const subm = document.querySelector(".cart__order__form")

subm.addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const names = document.getElementById("firstName").value;
  const lastN = document.getElementById("lastName").value;
  const adress = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value
  const idProc = [];

  if (cart.length === 0) {
    alert("cart empty");
 
    return; // No envía la solicitud al servidor si el carrito está vacío
    }
  
  
  cart.forEach(product => {
      idProc.push(product.id)
      
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

  
  const orderII = await sendOrderData(datos)
  console.log(orderII)
  localStorage.clear()
  window.location.href = "confirmation.html?OrId=" + orderII

});







 