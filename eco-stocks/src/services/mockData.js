import { ClimateFriendliness } from "@/data/Stock"

//create example stock
export const EXAMPLE_APPLE_STOCK = {
    image: "https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l476432a3e85a0aa21c23f5abd2975a89b6820d63.png",
    stockName: "Apple",
    wkn: "WKN123456",
    isin: "ISIN123456",
    price: "123,45",
    shares: 123,
    portfolioPercentage: "12%",
    ecoScore: 10,
    ticker: "AAPL",
    totalValue: 10,
    climateFriendliness: ClimateFriendliness.HIGH
  }

export const EXAMPLE_AMAZON_STOCK = {
    image: "https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l74c0fda1054b04bf3e2365d467e32a47e3feba7b.png",
    stockName: "Amazon",
    wkn: "WKN123456",
    isin: "ISIN123456",
    price: "123,45",
    shares: 123,
    portfolioPercentage: "12%",
    ecoScore: 10,
    ticker: "AMZN",
    totalValue: 10,
    climateFriendliness: ClimateFriendliness.LOW
    }

export const EXAMPLE_STOCKS = [
    EXAMPLE_APPLE_STOCK,
    EXAMPLE_AMAZON_STOCK,
    EXAMPLE_APPLE_STOCK,
]

export const LONG_EXAMPLE_STOCKS = [
    EXAMPLE_APPLE_STOCK,
    EXAMPLE_AMAZON_STOCK,
    EXAMPLE_APPLE_STOCK,
    EXAMPLE_AMAZON_STOCK,
    EXAMPLE_APPLE_STOCK,
    EXAMPLE_AMAZON_STOCK,
]