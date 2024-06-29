export async function addStock(depotID, ticker, amount) {
  const data = await fetch(`/api/${depotID}?ticker=${ticker}&amount=${amount}`, {method: "POST"})
  .then((response) => {
      if (response.ok) {
          return response.json()
      } 
      throw new Error(response.statusText)
  })
  return data
} 