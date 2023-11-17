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
