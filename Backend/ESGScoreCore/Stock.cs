using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.HttpResults;

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
    public String ClimateFriendliness { get; set; }
    public float PercentageOfPortfolio { get; set; }
    
    private enum ClimateFriendlinessEnum
    {
        High,
        Medium,
        Low,
    }


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
    public void SetTotalValue()
    {
        TotalValue = (Int16)(Price * NumberHeld);
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

    public async Task<Stock?> getStockInfo()
    {
        
        var client = new HttpClient();
        var requestFinance = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/price/{Ticker}"),
            Headers =
            {
                { "x-rapidapi-key", "e704315ddamshb145bee15c22b6ap134854jsn89ea3b3ba27b" },
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
            TotalValue = (Int16)(Price * NumberHeld);
        }
        ESGScore esg = new ESGScore(Ticker);
        float esgScore;
        esgScore = await esg.GetEsgScore();
        if (esgScore == 0)
        {
            return null;
        }
        this.ESGScore = esgScore;
        switch (esgScore)
        {
            case < 20:
                ClimateFriendliness = ClimateFriendlinessEnum.High.ToString();
                break;
            case < 40:
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
