using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace ESGScoreCore.Controllers;

[ApiController]
[Route("v1/api/StockInfo")]
[Produces("application/json")]
public class StockInfoController : ControllerBase
{
    private static readonly ConcurrentDictionary<string, Stock?> Cache = new();


    /// <summary>
    ///     Simple Get request to get stock information from yahoo finance API
    /// </summary>
    /// <param name="Ticker">Ticker of the Stock that gets searched</param>
    /// <returns>returns stock information with a status of 200 or a 404 if no information is found</returns>
    [HttpGet("{Ticker}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(string Ticker)
    {
        if (Cache.TryGetValue(Ticker, out var cacheStock))
        {
            var cacheJson = JsonSerializer.Serialize(cacheStock!);
            return Ok(cacheJson);
        }

        var stock = new Stock(Ticker);
        stock = await stock.GetStockInfo();
        if (stock == null) return NotFound();
        Cache[Ticker] = stock; // Assuming score.ToString() is the desired format
        var stockJson = JsonSerializer.Serialize(stock);
        return Ok(stockJson);
    }

    /// <summary>
    ///     Post request to add a stock to a portfolio and get its information
    ///     Either adds the stock to an existing portfolio or creates a new one
    /// </summary>
    /// <param name="Ticker">Ticker for the stock wanted </param>
    /// <param name="PortfolioHash">Hash of the portfolio that should be added onto</param>
    /// <param name="NumberHeld">Number of stocks held in portfolio</param>
    /// <returns>returns 200 and stock information when everything is okay, returns not found when stock cant be found</returns>
    [HttpPost("{Ticker}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Post(string Ticker, [FromQuery(Name = "PortfolioHash")] string PortfolioHash,
        [FromQuery(Name = "Number")] short NumberHeld)
    {
        try
        {
            if (PortfolioController.SavedPortfolios.TryGetValue(PortfolioHash, out var portfolio))
            {
                if (Cache.TryGetValue(Ticker, out var cacheStock))
                {
                    cacheStock?.SetNumberHeld(NumberHeld);
                    cacheStock?.SetTotalValue();
                    portfolio?.AddStock(cacheStock);
                    portfolio?.SetTotalValue();
                    portfolio?.SetPercentages();
                    var cacheJson = JsonSerializer.Serialize(cacheStock);

                    return Ok(cacheJson);
                }

                var stock = new Stock(Ticker, NumberHeld);
                stock = await stock.GetStockInfo();
                if (stock == null) return NotFound();
                portfolio?.AddStock(stock);
                portfolio?.SetTotalValue();
                portfolio?.SetPercentages();
                var stockJson = JsonSerializer.Serialize(stock);
                Cache[Ticker] = stock;
                return Ok(stockJson);
            }
            else
            {
                if (Cache.TryGetValue(Ticker, out var cacheStock))
                {
                    cacheStock?.SetNumberHeld(NumberHeld);
                    cacheStock?.SetTotalValue();
                    cacheStock!.PercentageOfPortfolio = 100;
                    var cacheJson = JsonSerializer.Serialize(cacheStock);
                    portfolio = new Portfolio();
                    portfolio.AddStock(cacheStock);
                    PortfolioController.SavedPortfolios[PortfolioHash] = portfolio;
                    return Ok(cacheJson);
                }

                var stock = new Stock(Ticker, NumberHeld);
                stock = await stock.GetStockInfo();
                if (stock == null) return NotFound();
                stock.PercentageOfPortfolio = 100;
                portfolio = new Portfolio();
                portfolio.AddStock(stock);
                PortfolioController.SavedPortfolios[PortfolioHash] = portfolio;
                var stockJson = JsonSerializer.Serialize(stock);
                Cache[Ticker] = stock;
                return Ok(stockJson);
            }
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }
}