import { Stock } from "@/data/Stock";

/**
* Fetches the stocks from the depot by fetching data from the proxy API.
* @param {string} depotID - The ID of the depot.
* @returns {Promise} - The promise object representing the result of the operation.
* @throws {Error} - The error which was thrown during the operation.
*/
export async function getStocks(depotID) {
    return await fetch(`/api/${depotID}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    })
    .then((json) => json.map((stock) => Stock.constructFromInternalJSON(stock))) // map data to Stock objects
} 