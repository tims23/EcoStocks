/**
 * Fetches stock suggestions from the server
 * @param {string} ticker - The ticker of the stock.
 * @returns {Promise} - The promise object representing the result of the operation.
 * @throws {Error} - The error which was thrown during the operation.
 */
export async function getStockSuggestions(ticker) {
    return await fetch(`/api/search?ticker=${ticker}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    })
}