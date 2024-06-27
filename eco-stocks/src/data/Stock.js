export const ClimateFriendliness = Object.freeze({
    LOW:   "low",
    MEDIUM:  "medium",
    HIGH: "high"
});

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

    constructor(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness) {
        console.log("STOCK", ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness)
        if ([ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness].includes(undefined)) {
            throw new Error("Invalid stock data")
        }
        this.ticker = ticker
        this.image = image
        this.stockName = stockName
        this.isin = "isin"
        this.price = price
        this.shares = shares
        this.wkn = "wkn"
        this.portfolioPercentage = "portfolioPercentage"
        this.totalValue = totalValue
        this.ecoScore = ecoScore
        this.climateFriendliness = climateFriendliness
    }

    static constructFromInternalJSON(fromJSON = {}) {
        return new Stock(fromJSON.ticker, fromJSON.image, fromJSON.stockName, fromJSON.price, fromJSON.shares, fromJSON.totalValue, fromJSON.ecoScore, fromJSON.climateFriendliness)
    }

    static constructFromAPIJSON(fromJSON = {}) {  
        let ticker = fromJSON.Ticker
        let stockName = fromJSON.Name
        let price = fromJSON.Price + " €"
        let ecoScore = fromJSON.ESGScore
        let shares = fromJSON.NumberHeld
        let image = fromJSON.Image
        let totalValue = fromJSON.TotalValue + " €"
        var climateFriendliness
        switch (fromJSON.ClimateFriendliness) {
            case "Low":
                climateFriendliness = ClimateFriendliness.LOW
                break;
            case "Medium":
                climateFriendliness = ClimateFriendliness.MEDIUM
                break;
            case "High":
                climateFriendliness = ClimateFriendliness.HIGH
                break;
        
            default:
                throw new Error("Invalid climate friendliness value")
        }
        return new Stock(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness)
    }
}