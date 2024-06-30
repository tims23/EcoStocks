using System.Text.Json.Nodes;

namespace ESGScoreCore;

public class Stock
{
    /// <summary>
    ///     constructor for a simple stock with numberheld information
    /// </summary>
    /// <param name="ticker">ticker of the stock</param>
    /// <param name="numberHeld">amount of stock held</param>
    public Stock(string ticker, short numberHeld)
    {
        Ticker = ticker;
        NumberHeld = numberHeld;
    }

    /// <summary>
    ///     constructor for a simple stock
    /// </summary>
    /// <param name="ticker">ticker of the stock</param>
    public Stock(string ticker)
    {
        Ticker = ticker;
    }

    public string Ticker { get; }

    public string? Name { get; set; }

    public float Price { get; set; }

    public float EsgScore { get; set; }

    public short NumberHeld { get; set; }

    public short TotalValue { get; set; }

    public string? Image { get; set; }
    public string? ClimateFriendliness { get; set; }
    public float PercentageOfPortfolio { get; set; }


    internal void SetNumberHeld(short numberHeld)
    {
        NumberHeld = numberHeld;
    }

    internal void SetTotalValue()
    {
        TotalValue = (short)(Price * NumberHeld);
    }

    internal string GetTicker()
    {
        return Ticker;
    }

    internal short GetTotalValue()
    {
        return TotalValue;
    }

    /// <summary>
    ///     query yahoo finance api for stock information
    /// </summary>
    /// <returns>stock with all stock information</returns>
    public async Task<Stock?> GetStockInfo()
    {
        var client = new HttpClient();
        var requestFinance = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/price/{Ticker}"),
            Headers =
            {
                { "x-rapidapi-key", "e704315ddamshb145bee15c22b6ap134854jsn89ea3b3ba27b" },
                { "x-rapidapi-host", "yahoo-finance127.p.rapidapi.com" }
            }
        };
        using (var responseFinance = await client.SendAsync(requestFinance))
        {
            responseFinance.EnsureSuccessStatusCode();
            var bodyFinance = await responseFinance.Content.ReadAsStringAsync();
            var parsedBodyFinance = JsonNode.Parse(bodyFinance);
            Name = (string)parsedBodyFinance!["longName"]!;
            Price = float.Parse(parsedBodyFinance["regularMarketPrice"]!["raw"]!.ToString());
            TotalValue = (short)(Price * NumberHeld);
        }

        var esg = new EsgScore(Ticker);
        float esgScore;
        esgScore = await esg.GetEsgScore();
        EsgScore = 100 - esgScore;
        switch (EsgScore)
        {
            case 101:
                ClimateFriendliness = ClimateFriendlinessEnum.Undefined.ToString();
                break;
            case > 80:
                ClimateFriendliness = ClimateFriendlinessEnum.High.ToString();
                break;
            case > 70:
                ClimateFriendliness = ClimateFriendlinessEnum.Medium.ToString();
                break;
            default:
                ClimateFriendliness = ClimateFriendlinessEnum.Low.ToString();
                break;
        }

        var requestImage = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://api.api-ninjas.com/v1/logo?ticker={Ticker}"),
            Headers =
            {
                { "X-API-Key", "EiqHAsGoqKMFE1d64f+hTQ==h40tSqQMQufRXKaF" }
            }
        };
        using (var responseImage = await client.SendAsync(requestImage))
        {
            responseImage.EnsureSuccessStatusCode();
            var bodyImage = await responseImage.Content.ReadAsStringAsync();
            var parsedBodyImage = JsonNode.Parse(bodyImage);
            Image = parsedBodyImage![0]!["image"]!.ToString();
        }

        return this;
    }

    private enum ClimateFriendlinessEnum
    {
        High,
        Medium,
        Low,
        Undefined
    }
}