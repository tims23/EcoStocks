using System.Collections.Concurrent;

namespace ESGScoreCore;

public class Portfolio
{
    private ConcurrentDictionary<string, Stock?> PortfolioStocks { get; set; }
    public short TotalValue { get; set; }
    public Dictionary<string,float> Percentages { get; set; }


    public Portfolio()
    {
        this.PortfolioStocks = new ConcurrentDictionary<string, Stock?>();
    }
    public void AddStock(Stock? stock)
    {
        this.PortfolioStocks[stock.GetTicker()] = stock;
    }
    public void RemoveStock(String ticker)
    {
        this.PortfolioStocks.TryRemove(ticker, out Stock stock);
    }
    
    public void SetTotalValue()
    {
        Int16 totalValue = 0;
        foreach (KeyValuePair<string, Stock?> stock in PortfolioStocks)
        {
            if (stock.Value != null) totalValue += stock.Value.GetTotalValue();
        }
        TotalValue = totalValue;
    }
    public void SetPercentages()
    {
        
        foreach (KeyValuePair<string, Stock?> stock in PortfolioStocks)
        {
            float percentage = (float)stock.Value.GetTotalValue() / TotalValue;
            stock.Value.PercentageOfPortfolio = percentage;
        }
        
    }

    public void SetClimatePercentages()
    {
        var totalHigh = 0;
        var totalMedium = 0;
        var totalLow = 0;
        Percentages = new Dictionary<string, float>();
        foreach (KeyValuePair<string, Stock?> stock in PortfolioStocks)
        {
            switch (stock.Value.ClimateFriendliness)
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
        }
        var total = totalHigh + totalMedium + totalLow;
        if (total == 0)
        {
            return;
        }
        Percentages["High"] = (float)totalHigh / total * 100;
        Percentages["Medium"] = (float)totalMedium / total * 100;
        Percentages["Low"] = (float)totalLow / total * 100;
        // Console.WriteLine(Percentages["High"]);
    }
    public ConcurrentDictionary<string, Stock?> GetPortfolio()
    {
        return PortfolioStocks;
    }
}