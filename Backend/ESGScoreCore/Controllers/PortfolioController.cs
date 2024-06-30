using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace ESGScoreCore.Controllers;

[ApiController]
[Route("v1/api/Portfolio")]
public class PortfolioController : ControllerBase
{
    public static readonly ConcurrentDictionary<string, Portfolio?> SavedPortfolios = new();

    /// <summary>
    ///     Delete request to remove a stock from a portfolio
    /// </summary>
    /// <param name="Hash">Portfolio hash to identify the portfolio to remove from</param>
    /// <param name="ticker">Stock ticker to identify stock to remove</param>
    /// <returns>returns 200 when stock deleted</returns>
    [HttpDelete("{Hash}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public OkResult Delete(string Hash, [FromQuery(Name = "Ticker")] string ticker)
    {
        SavedPortfolios.TryGetValue(Hash, out var portfolio);
        portfolio?.RemoveStock(ticker);
        portfolio?.SetTotalValue();
        portfolio?.SetPercentages();
        portfolio?.SetClimatePercentages();
        return Ok();
    }

    /// <summary>
    ///     Get request to get the total value of a portfolio including the percentages of each climate friendliness
    /// </summary>
    /// <param name="Hash">Porfolio hash to identify the portfolio </param>
    /// <returns>returns the total value of a portfolio and the percentages as an object with a 200</returns>
    [HttpGet("Total")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Get([FromQuery(Name = "Hash")] string Hash)
    {
        {
            try
            {
                SavedPortfolios.TryGetValue(Hash, out var portfolio);
                portfolio?.SetTotalValue();
                portfolio?.SetPercentages();
                portfolio?.SetClimatePercentages();
                return Ok(JsonSerializer.Serialize(portfolio));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest();
            }
        }
    }

    /// <summary>
    ///     Get request to get the stocks in a portfolio
    ///     if no portfolio is found a new one is created
    /// </summary>
    /// <param name="Hash">Porfolio hash to identify the portfolio</param>
    /// <returns>List of stocks</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetPortfolio([FromQuery(Name = "Hash")] string Hash)
    {
        if (SavedPortfolios.TryGetValue(Hash, out var portfolio))
        {
            portfolio?.SetTotalValue();
            portfolio?.SetPercentages();
            var value = portfolio?.GetPortfolio();
            var stocks = new HashSet<Stock?>();
            foreach (var stock in value!) stocks.Add(stock.Value);
            return Ok(JsonSerializer.Serialize(stocks));
        }

        SavedPortfolios[Hash] = new Portfolio();
        return NotFound();
    }
}