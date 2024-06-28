export async function deleteStock(depotID, ticker) {
  return await fetch(`/api/${depotID}?ticker=${ticker}`, {method: "DELETE"})
  .then((response) => {
      if (response.ok) {
          return
      } 
      throw new Error(response.statusText)
  })
} 