import { PortfolioStatistics } from "@/data/PortfolioStatistics"
import { ClimateFriendliness } from "@/data/Stock"

export async function getPortfolioStats(depotID) {
    return await fetch(`/api/${depotID}/statistics`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    }).then((stats)=> {
        try {
            return PortfolioStatistics.fromJSON(stats)
        } catch (error) {
            return null
        }
    })
} 