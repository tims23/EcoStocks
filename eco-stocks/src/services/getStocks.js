import { Stock } from "@/data/Stock";

export async function getStocks(depotID) {
    return await fetch(`/api/${depotID}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    })
    .then((json) => json.map((stock) => Stock.constructFromInternalJSON(stock)))
} 