using System.Collections.Concurrent;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
// Add this for ConcurrentDictionary

namespace ESGScoreCore.Controllers
{
    [ApiController]
    [Route("api/StockInfo")]
    [Produces("application/json")]
    public class StockInfoController : ControllerBase
    {
        private static readonly ConcurrentDictionary<string, Stock> Cache = new();

        private readonly ILogger<StockInfoController> _logger;
        
        
        

        public StockInfoController(ILogger<StockInfoController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{Ticker}")]
        public async Task<IActionResult> Get(string Ticker)
        {

            if (Cache.TryGetValue(Ticker, out Stock CacheStock))
            {
                _logger.LogInformation("Cache hit for ticker: {Ticker}", Ticker);
                return Ok(CacheStock);
            }
            else
            {
                _logger.LogInformation("Cache miss for ticker: {Ticker}", Ticker);
                Stock stock = new Stock(Ticker);
                stock = await stock.getStockInfo();
                Cache[Ticker] = stock; // Assuming score.ToString() is the desired format
                var stockJson = JsonSerializer.Serialize<Stock>(stock);
                return Ok(stockJson);
            }
        }

        [HttpPost("{Ticker}")]
        public async Task<IActionResult> Post(string Ticker, [FromQuery(Name = "PortfolioHash")] string PortfolioHash, [FromQuery(Name = "Number")]short NumberHeld)
        {
            if (PortfolioController.savedPortfolios.TryGetValue(PortfolioHash, out Portfolio? portfolio))
            {
                if (Cache.TryGetValue(Ticker, out Stock CacheStock))
                {
                    String CacheJson = JsonSerializer.Serialize<Stock>(CacheStock);
                    portfolio.AddStock(CacheStock);
                    return Ok(CacheJson); 
                }
                else
                {
                    Stock stock = new Stock(Ticker,NumberHeld);                      
                    stock = await stock.getStockInfo();                              
                    portfolio.AddStock(stock);                                       
                    String stockJson = JsonSerializer.Serialize<Stock>(stock);       
                    return Ok(stockJson);                                            
                }
            }
            else
            {
                if (Cache.TryGetValue(Ticker, out Stock CacheStock))                      
                {                                                                         
                    String CacheJson = JsonSerializer.Serialize<Stock>(CacheStock);    
                    portfolio = new Portfolio();                                    
                    portfolio.AddStock(CacheStock);                                      
                    PortfolioController.savedPortfolios[PortfolioHash] = portfolio; 
                    return Ok(CacheJson);                                                 
                }
                else
                {
                    Stock stock = new Stock(Ticker, NumberHeld);
                    stock = await stock.getStockInfo();
                    portfolio = new Portfolio();
                    portfolio.AddStock(stock);
                    PortfolioController.savedPortfolios[PortfolioHash] = portfolio;
                    String stockJson = JsonSerializer.Serialize<Stock>(stock);
                    return Ok(stockJson);
                }
            }
        }
    }
}