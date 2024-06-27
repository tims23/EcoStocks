import { Stock } from "@/data/Stock";

export async function addStock(depotID, ticker, amount) {
  return await fetch(`/api/${depotID}?ticker=${ticker}&amount=${amount}`, {method: "POST"})
  .then((response) => {
      if (response.ok) {
          return response.json()
      } 
      throw new Error(response.statusText)
  })
  .then((json) => Stock.constructFromInternalJSON(json))
} 