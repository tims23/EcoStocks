// Description: This file contains the Stock class. This class
// represents a stock in the depot. It contains the stock's ticker,
// image, stock name, price, shares, total value, eco score, climate
// friendliness, and portfolio percentage. The class has a constructor
// that initializes the stock's properties and a static method that
// constructs a stock object from an internal JSON object or an API JSON
// object.
export class Stock {
    ticker
    image
    stockName
    price
    shares
    portfolioPercentage
    totalValue
    ecoScore
    climateFriendliness

    constructor(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness, portfolioPercentage) {
        // check if required parameters are present
        if ([ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness,portfolioPercentage].includes(undefined)) {
            throw new Error(`Invalid stock data (${[ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness,portfolioPercentage]})`)
        }
        this.ticker = ticker
        this.image = image
        this.stockName = stockName
        this.price = price
        this.shares = shares
        this.portfolioPercentage = portfolioPercentage
        this.totalValue = totalValue
        this.ecoScore = ecoScore
        this.climateFriendliness = climateFriendliness
    }

    // convert JSON from internal API to Stock object
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

    // map JSON from API to Stock object
    static constructFromAPIJSON(fromJSON = {}) {  
        let ticker = fromJSON.Ticker
        let stockName = fromJSON.Name
        let price = fromJSON.Price + "€"
        let ecoScore = fromJSON.EsgScore
        let shares = fromJSON.NumberHeld
        let image = fromJSON.Image
        let totalValue = fromJSON.TotalValue + "€"
        let portfolioPercentage = fromJSON.PercentageOfPortfolio + "%"
        // check if climate friendliness is valid
        if (["High", "Low", "Medium", "Undefined"].includes(fromJSON["ClimateFriendliness"]) == false) {
            throw new Error("Invalid climate friendliness value")
        }
        let climateFriendliness = fromJSON.ClimateFriendliness === "Undefined" ? "NotGiven" : fromJSON.ClimateFriendliness

        return new Stock(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness, portfolioPercentage)
    }
}