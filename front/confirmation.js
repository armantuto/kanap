const orderID = document.getElementById("orderId")

window.addEventListener("DOMContentLoaded", async function() {
  const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("OrId") 
  orderID.textContent = productId;

   
})