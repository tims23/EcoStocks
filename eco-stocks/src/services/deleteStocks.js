import { EXAMPLE_APPLE_STOCK } from "./mockData";

export async function deleteStock(depotID, stock) {
    await new Promise(r => setTimeout(r, 2000));
    return await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => EXAMPLE_APPLE_STOCK)
} 