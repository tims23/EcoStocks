using System.Text.Json.Nodes;

namespace ESGScoreCore;

public class EsgScore
{
    public EsgScore(string ticker)
    { 
        Ticker = ticker;
    }

    public string Ticker { get; set; }

    /// <summary>
    ///     Get ESGScore from yahoo finance API
    /// </summary>
    /// <returns>returns ESG score</returns>
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
                { "x-rapidapi-host", "yahoo-finance127.p.rapidapi.com" }
            }
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var bodyEsg = await response.Content.ReadAsStringAsync();
            var parsedbodyEsg = JsonNode.Parse(bodyEsg);
            if (parsedbodyEsg?["message"] != null) return -1;
            {
            }
            return float.Parse(parsedbodyEsg?["totalEsg"]?["raw"]?.ToString() ?? "-1");
        }
    }
}