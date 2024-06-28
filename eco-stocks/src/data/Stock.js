/*export const ClimateFriendliness = Object.freeze({
    LOW:   "low",
    MEDIUM:  "medium",
    HIGH: "high"
});*/

export class ClimateFriendliness {
    static LOW = "low"
    static MEDIUM = "medium"
    static HIGH = "high"
}

export class Stock {
    ticker
    image
    stockName
    wkn
    isin
    price
    shares
    portfolioPercentage
    totalValue
    ecoScore
    climateFriendliness

    constructor(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness, portfolioPercentage) {
        if ([ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness,portfolioPercentage].includes(undefined)) {
            throw new Error("Invalid stock data")
        }
        this.ticker = ticker
        this.image = image
        this.stockName = stockName
        this.isin = "isin"
        this.price = price
        this.shares = shares
        this.wkn = "wkn"
        this.portfolioPercentage = portfolioPercentage
        this.totalValue = totalValue
        this.ecoScore = ecoScore
        this.climateFriendliness = climateFriendliness
    }

    static constructFromInternalJSON(fromJSON = {}) {
        return new Stock(
            fromJSON.ticker, 
            fromJSON.image, 
            fromJSON.stockName, 
            fromJSON.price, 
            fromJSON.shares, 
            fromJSON.totalValue, 
            fromJSON.ecoScore, 
            fromJSON.climateFriendliness, 
            fromJSON.portfolioPercentage)
    }

    static constructFromAPIJSON(fromJSON = {}) {  
        let ticker = fromJSON.Ticker
        let stockName = fromJSON.Name
        let price = fromJSON.Price + "€"
        let ecoScore = fromJSON.ESGScore
        let shares = fromJSON.NumberHeld
        let image = fromJSON.Image
        let totalValue = fromJSON.TotalValue + "€"
        let portfolioPercentage = fromJSON.PercentageOfPortfolio + "%"
        var climateFriendliness = ""
        console.log("fromJjon", fromJSON)
        console.log("Climate keys: " + typeof(fromJSON), Object.keys(fromJSON))
        switch (fromJSON.ClimateFriendliness) {
            case "Low":
                console.log("Low")
                climateFriendliness = ClimateFriendliness.LOW
                break;
            case "Medium":
                console.log("Medium")
                climateFriendliness = ClimateFriendliness.MEDIUM
                break;
            case "High":
                console.log("High")
                climateFriendliness = ClimateFriendliness.HIGH
                break;
        
            default:
                throw new Error("Invalid climate friendliness value")
        }
        return new Stock(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness, portfolioPercentage)
    }
}