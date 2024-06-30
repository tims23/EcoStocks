// structure for PortfolioStatistics with predictable properties
export class PortfolioStatistics {
    totalValue
    ecoPercentages

    
    constructor(totalValue, ecoPercentages = {
        "High": 0,
        "Low": 0,
        "Medium": 0,
    }) {
        // check if required parameters are present
        if ([totalValue, ecoPercentages].includes(undefined)) {throw new Error("PortfolioStatistics: missing required parameters")}
        this.totalValue = totalValue
        this.ecoPercentages = Object.keys(ecoPercentages).length > 0 ? ecoPercentages : null
    }

    // map JSON from API to PortfolioStatistics object
    static fromAPIJSON(json) {
        return new PortfolioStatistics(
            json.TotalValue,
            json.Percentages
        )
    }
    
    // convert JSON from proxy API to PortfolioStatistics object
    static fromJSON(json) {
        return new PortfolioStatistics(
            json.totalValue,
            json.ecoPercentages
        )
    }
}