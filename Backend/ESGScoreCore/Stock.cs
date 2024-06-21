using System.Text.Json.Nodes;

namespace ESGScoreCore;

public class Stock
{
    private String Ticker { get; set; }
    private String Name { get; set; }
    private Int16 Price { get; set; }
    private short ESGScore { get; set; }
    private Int16 NumberHeld { get; set; }
    private Int16 TotalValue { get; set; }
    private String Image { get; set; }


    public  Stock(String ticker)
    {
        this.Ticker = ticker;
    }
    public void SetName(String name)
    {
        this.Name = name;
    }
    public void SetPrice(Int16 price)
    {
        this.Price = price;
    }
    public void SetESGScore(short esgScore)
    {
        this.ESGScore = esgScore;
    }
    public void SetNumberHeld(Int16 numberHeld)
    {
        this.NumberHeld = numberHeld;
    }
    public void SetTotalValue(Int16 totalValue)
    {
        this.TotalValue = totalValue;
    }
    public String GetTicker()
    {
        return this.Ticker;
    }
    public String GetName()
    {
        return this.Name;
    }
    public Int16 GetPrice()
    {
        return this.Price;
    }
    public Int16 GetESGScore()
    {
        return this.ESGScore;
    }
    public Int16 GetNumberHeld()
    {
        return this.NumberHeld;
    }
    public Int16 GetTotalValue()
    {
        return this.TotalValue;
    }

    public async Task<Stock> getStockInfo()
    {
        var client = new HttpClient();
        var requestFinance = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/esg-score/{Ticker}"),
            Headers =
            {
                { "X-RapidAPI-Key", "2c0e585181msh2408993a65654bfp184d11jsnba98037211d3" },
                { "X-RapidAPI-Host", "yahoo-finance127.p.rapidapi.com" },
            },
        };
        using (var responseFinance = await client.SendAsync(requestFinance))
        {
            responseFinance.EnsureSuccessStatusCode();
            var body = await responseFinance.Content.ReadAsStringAsync();
            var test = JsonNode.Parse(body);
            Name = (String)test!["longName"]!;
            Price = (Int16)test["regularMarketPrice"]!["raw"]!;
        }
        ESGScore esg = new ESGScore(Ticker);
        var esgScore = await esg.GetEsgScore();
        this.ESGScore = esgScore;
        var requestImage = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://api.api-ninjas.com/v1/logo?ticker={Ticker}"),
            Headers =
            {
                { "X-API-Key", "EiqHAsGoqKMFE1d64f+hTQ==h40tSqQMQufRXKaF" },
            },
        };
        using (var responseImage = await client.SendAsync(requestImage))
        {
            responseImage.EnsureSuccessStatusCode();
            var body = await responseImage.Content.ReadAsStringAsync();
            var test = JsonNode.Parse(body);
            Image = (String)test!["image"]!;
        }
        return this;
}

}
