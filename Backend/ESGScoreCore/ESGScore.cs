using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace ESGScoreCore;

public class ESGScore
{
    public string Ticker { get; set; }
   
    
    public ESGScore(string Ticker)
    {
        this.Ticker = Ticker;
    }
    public async Task<float> GetEsgScore()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/esg-score/{Ticker}"),
            Headers =
            {
                { "x-rapidapi-key", "e704315ddamshb145bee15c22b6ap134854jsn89ea3b3ba27b" },
                { "x-rapidapi-host", "yahoo-finance127.p.rapidapi.com" },
            },
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var bodyESG = await response.Content.ReadAsStringAsync();
            var parsedbodyESG = JsonNode.Parse(bodyESG);
            return  float.Parse(parsedbodyESG["totalEsg"]["raw"].ToString());
        }
    }
}