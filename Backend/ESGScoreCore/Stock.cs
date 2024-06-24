using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace ESGScoreCore;

public class Stock
{
   
    public String Ticker { get; set; }
    
    public String Name { get; set; }
    
    public float Price { get; set; }
    
    public float ESGScore { get; set; }
    
    public Int16 NumberHeld { get; set; }
    
    public Int16 TotalValue { get; set; }
    
    public String Image { get; set; }


    public  Stock(String ticker, short NumberHeld)
    {
        this.Ticker = ticker;
        this.NumberHeld = NumberHeld;
    }
    public Stock(String ticker)
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
    public float GetPrice()
    {
        return this.Price;
    }
    public float GetESGScore()
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
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/price/{Ticker}"),
            Headers =
            {
                { "x-rapidapi-key", "79fa5992e2mshd4416ba70da4b72p116227jsn39b691837dbe" },
                { "x-rapidapi-host", "yahoo-finance127.p.rapidapi.com" },
            },
        };
        using (var responseFinance = await client.SendAsync(requestFinance))
        {
            responseFinance.EnsureSuccessStatusCode();
            var bodyFinance = await responseFinance.Content.ReadAsStringAsync();
            var parsedBodyFinance = JsonNode.Parse(bodyFinance);
            Name = (String)parsedBodyFinance!["longName"]!;
            Price = float.Parse(parsedBodyFinance!["regularMarketPrice"]!["raw"]!.ToString());
         
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
            var bodyImage = await responseImage.Content.ReadAsStringAsync();
            var parsedBodyImage = JsonNode.Parse(bodyImage);
            Image = parsedBodyImage![0]!["image"]!.ToString();
        }
        return this;
}

}
