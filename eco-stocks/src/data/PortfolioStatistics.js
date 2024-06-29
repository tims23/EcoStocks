
export class PortfolioStatistics {
    totalValue
    ecoPercentages

    
    constructor(totalValue, ecoPercentages = {
        "High": 0,
        "Low": 0,
        "Medium": 0,
    }) {
        if ([totalValue, ecoPercentages].includes(undefined)) {throw new Error("PortfolioStatistics: missing required parameters")}
        this.totalValue = totalValue
        this.ecoPercentages = Object.keys(ecoPercentages).length > 0 ? ecoPercentages : null
    }

    static fromAPIJSON(json) {
        return new PortfolioStatistics(
            json.TotalValue,
            json.Percentages
        )
    }
    
    static fromJSON(json) {
        return new PortfolioStatistics(
            json.totalValue,
            json.ecoPercentages
        )
    }
}