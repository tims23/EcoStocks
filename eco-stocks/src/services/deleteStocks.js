/**
  * Deletes a stock from the depot by fetching data from the proxy API.
  * @param {string} depotID - The ID of the depot.
  * @param {string} ticker - The ticker of the stock.
  * @returns {Promise} - The promise object representing the result of the operation.
  * @throws {Error} - The error which was thrown during the operation.
  * 
  **/
export async function deleteStock(depotID, ticker) {
  return await fetch(`/api/${depotID}?ticker=${ticker}`, {method: "DELETE"})
  .then((response) => {
      if (response.ok) {
          return
      } 
      throw new Error(response.statusText)
  })
} 