import { PortfolioStatistics } from "@/data/PortfolioStatistics"

export async function getPortfolioStats(depotID) {
    const data = await fetch(`/api/${depotID}/statistics`)
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
    await new Promise(r => setTimeout(r, 500));
    return data
} 