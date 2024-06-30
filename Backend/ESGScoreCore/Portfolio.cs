using System.Collections.Concurrent;

namespace ESGScoreCore;

public class Portfolio
{
    /// <summary>
    ///     Constructor for Portfolio
    /// </summary>
    public Portfolio()
    {
        PortfolioStocks = new ConcurrentDictionary<string, Stock?>();
    }

    private ConcurrentDictionary<string, Stock?> PortfolioStocks { get; }
    public short TotalValue { get; set; }
    public Dictionary<string, float>? Percentages { get; set; }

    /// <summary>
    ///     Adds a stock to the portfolio
    /// </summary>
    /// <param name="stock">stock to add</param>
    public void AddStock(Stock? stock)
    {
        PortfolioStocks[stock?.GetTicker()!] = stock;
    }

    /// <summary>
    ///     Removes a stock from the portfolio
    /// </summary>
    /// <param name="ticker">ticker of stock to remove</param>
    public void RemoveStock(string ticker)
    {
        PortfolioStocks.TryRemove(ticker, out _);
    }

    /// <summary>
    ///     Set total value of portfolio
    /// </summary>
    public void SetTotalValue()
    {
        short totalValue = 0;
        foreach (var stock in PortfolioStocks)
            if (stock.Value != null)
                totalValue += stock.Value.GetTotalValue();
        TotalValue = totalValue;
    }

    /// <summary>
    ///     Set individual stock percentages of portfolio
    /// </summary>
    public void SetPercentages()
    {
        foreach (var stock in PortfolioStocks)
        {
            var percentage = (float)stock.Value!.GetTotalValue() / TotalValue * 100;
            stock.Value.PercentageOfPortfolio = percentage;
        }
    }

    /// <summary>
    ///     Set climate friendliness percentages
    /// </summary>
    public void SetClimatePercentages()
    {
        var totalHigh = 0;
        var totalMedium = 0;
        var totalLow = 0;
        Percentages = new Dictionary<string, float>();
        foreach (var stock in PortfolioStocks)
            switch (stock.Value?.ClimateFriendliness)
            {
                case "High":
                    totalHigh += stock.Value.GetTotalValue();
                    break;
                case "Medium":
                    totalMedium += stock.Value.GetTotalValue();
                    break;
                case "Low":
                    totalLow += stock.Value.GetTotalValue();
                    break;
            }

        var total = totalHigh + totalMedium + totalLow;
        if (total == 0) return;
        Percentages["High"] = (float)totalHigh / total * 100;
        Percentages["Medium"] = (float)totalMedium / total * 100;
        Percentages["Low"] = (float)totalLow / total * 100;
        // Console.WriteLine(Percentages["High"]);
    }

    /// <summary>
    ///     get underlying portfolio dict
    /// </summary>
    /// <returns>portfoliodict</returns>
    public ConcurrentDictionary<string, Stock?> GetPortfolio()
    {
        return PortfolioStocks;
    }
}