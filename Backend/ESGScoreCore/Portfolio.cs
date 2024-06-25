using System.Collections.Concurrent;

namespace ESGScoreCore;

public class Portfolio
{
    private ConcurrentDictionary<string,Stock> PortfolioStocks { get; set; }
    
    
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
    
    public Int16 GetTotalValue()
    {
        Int16 totalValue = 0;
        foreach (KeyValuePair<string, Stock> stock in PortfolioStocks)
        {
            totalValue += stock.Value.GetTotalValue();
        }
        return totalValue;
    }
    public ConcurrentDictionary<string, Stock> GetPortfolio()
    {
        return PortfolioStocks;
    }
}