/**
  * Add a stock to a depot by fetching data from the proxy API.
  * @param {string} depotID - The ID of the depot.
  * @param {string} ticker - The ticker of the stock.
  * @param {number} amount - The amount of the stock.
  * @returns {Promise} - The promise object representing the result of the operation.
  * @throws {Error} - The error which was thrown during the operation.
 */ 
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