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
        if (["High", "Low", "Medium", "Undefined"].includes(fromJSON["ClimateFriendliness"]) == false) {
            throw new Error("Invalid climate friendliness value")
        }
        let climateFriendliness = fromJSON.ClimateFriendliness === "Undefined" ? "NotGiven" : fromJSON.ClimateFriendliness
        let wkn

        return new Stock(ticker, image, stockName, price, shares, totalValue, ecoScore, climateFriendliness, portfolioPercentage)
    }
}