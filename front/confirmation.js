

const orderID = document.getElementById("orderId")

window.addEventListener("load", function() {
    // Coloca aquí el código que deseas ejecutar cuando la página se carga o recarga.
    const ord =  JSON.parse(localStorage.getItem("carID")) || [];
    console.log("La página se ha cargado o recargado.");
    orderID.textContent = ord
   

  });
  let leavingPage = false;

  // Agregar un controlador de eventos para el evento beforeunload
  window.addEventListener("beforeunload", function(event) {
    if (leavingPage) {
      // Limpia los datos del Local Storage que desees
      localStorage.removeItem("carID");
    }
  });
  
  // Agregar un controlador de eventos para detectar cuando se abandona la página
  window.addEventListener("unload", function() {
    leavingPage = true;
  });
  
  // Restablecer la bandera cuando se carga la página nuevamente
  window.addEventListener("load", function() {
    leavingPage = false;
  });