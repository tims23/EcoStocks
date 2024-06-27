export async function getStockSuggestions(ticker) {
    return await fetch(`/api/search?ticker=${ticker}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    })
}