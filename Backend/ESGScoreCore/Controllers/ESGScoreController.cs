using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent; // Add this for ConcurrentDictionary
using System.Threading.Tasks;

namespace ESGScoreCore.Controllers
{
    // [ApiController]
    // [Route("/api/EsgScore")]
    // public class EsgScoreController : ControllerBase
    // {
    //     private static readonly ConcurrentDictionary<string, Stock> Cache = new();
    //
    //     private readonly ILogger<EsgScoreController> _logger;
    //
    //     public EsgScoreController(ILogger<EsgScoreController> logger)
    //     {
    //         _logger = logger;
    //     }
    //
    //     [HttpGet("{Ticker}")]
    //     public async Task<IActionResult> Get(string Ticker)
    //     {
    //         
    //         if (Cache.TryGetValue(Ticker, out Stock CacheStock))
    //         {
    //             _logger.LogInformation("Cache hit for ticker: {Ticker}", Ticker);
    //             return Ok($"ESG Score of {Ticker} is {CacheStock.GetESGScore()}");
    //         }
    //         else
    //         {
    //             _logger.LogInformation("Cache miss for ticker: {Ticker}", Ticker);
    //             Stock stock = new Stock(Ticker);
    //             ESGScore esg = new ESGScore(Ticker);
    //             var esgScore = await esg.GetEsgScore();
    //             stock.SetESGScore(esgScore);
    //             
    //             
    //             Cache[Ticker] = stock; // Assuming score.ToString() is the desired format
    //             return Ok($"ESG Score of {Ticker} is {stock.GetESGScore()}");
    //         }
    //     }
    // }
    [ApiController]
    [Route("api/StockInfo")]
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
                return Ok($"Stock Info of {Ticker} is {CacheStock.GetPrice()}");
            }
            else
            {
                _logger.LogInformation("Cache miss for ticker: {Ticker}", Ticker);
                Stock stock = new Stock(Ticker);
                stock = await stock.getStockInfo();
                Cache[Ticker] = stock; // Assuming score.ToString() is the desired format
                return Ok($"Stock Info of {Ticker} is {stock.GetPrice()}");
            }
        }
    }

    [ApiController]
    [Route("api/Portfolio")]
    public class PortfolioController : ControllerBase
    {
        public static Portfolio portfolio = new Portfolio();
        [HttpPost()]
        public async Task<OkResult> Post(string ticker)
        {
            Stock stock = new Stock(ticker);
            stock = await stock.getStockInfo();
            portfolio.AddStock(stock);
            return Ok();
        }
        [HttpDelete()]
        public OkResult Delete(string ticker)
        {
            Stock stock = new Stock(ticker);
            portfolio.RemoveStock(ticker);
            return Ok();
        }
        [HttpGet("{Option}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult Get(string Option)
        {
            if (Option == "Total")
            {
                return Ok(portfolio.GetTotalValue()); 
            }
            else if (Option == "Code")
            {
                return Ok(portfolio.GetHashCode());
            }
            else
            {
                return NotFound();
            }
        }
    }
        
    
}