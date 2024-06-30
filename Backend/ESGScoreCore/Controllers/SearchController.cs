using Microsoft.AspNetCore.Mvc;

namespace ESGScoreCore.Controllers;

[ApiController]
[Route("v1/api/Search")]
public class SearchController : ControllerBase
{
    /// <summary>
    ///     Get request to search for a stock based on its Ticker/Part of a ticker
    /// </summary>
    /// <param name="Ticker">Ticker/Part of ticker searched for</param>
    /// <returns>list of stocks with similar tickers and a 200</returns>
    [HttpGet("{Ticker}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get(string Ticker)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/search/{Ticker}"),
            Headers =
            {
                { "x-rapidapi-key", "e704315ddamshb145bee15c22b6ap134854jsn89ea3b3ba27b" },
                { "x-rapidapi-host", "yahoo-finance127.p.rapidapi.com" }
            }
        };
        using var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        var body = await response.Content.ReadAsStringAsync();
        //Console.WriteLine(body);
        return Ok(body);
    }
}