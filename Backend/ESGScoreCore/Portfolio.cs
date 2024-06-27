using System.Collections.Concurrent;

namespace ESGScoreCore;

public class Portfolio
{
    private ConcurrentDictionary<string,Stock> PortfolioStocks { get; set; }
    public short TotalValue { get; set; }
    // public Dictionary<string,float> Percentages { get; set; }


    public Portfolio()
    {
        this.PortfolioStocks = new ConcurrentDictionary<string, Stock>();
    }
    public void AddStock(Stock stock)
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
        foreach (KeyValuePair<string, Stock> stock in PortfolioStocks)
        {
            totalValue += stock.Value.GetTotalValue();
        }
        TotalValue = totalValue;
    }
    public void SetPercentages()
    {
        
        foreach (KeyValuePair<string, Stock> stock in PortfolioStocks)
        {
            float percentage = (float)stock.Value.GetTotalValue() / TotalValue;
            stock.Value.PercentageOfPortfolio = percentage;
        }
        
    }
    public ConcurrentDictionary<string, Stock> GetPortfolio()
    {
        return PortfolioStocks;
    }
}