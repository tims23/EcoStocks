import { PortfolioStatistics } from "@/data/PortfolioStatistics"

/** 
 * Fetches portfolio statistics from the proxy API.
 * @param {string} depotID - The ID of the depot.
 * @returns {Promise} - The promise object representing the result of the operation.
 * @throws {Error} - The error which was thrown during the operation.
 */
export async function getPortfolioStats(depotID) {
    const data = await fetch(`/api/${depotID}/statistics`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    }).then((stats)=> {
        try {
            return PortfolioStatistics.fromJSON(stats) // map data to PortfolioStatistics object
        } catch (error) {
            return null
        }
    })
    return data
} 