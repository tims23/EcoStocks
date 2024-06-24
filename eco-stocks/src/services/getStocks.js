import { EXAMPLE_STOCKS } from "./mockData";

export async function getStocks(depotID) {
    await new Promise(r => setTimeout(r, 2000));
    return await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => EXAMPLE_STOCKS)
} 