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
    public async Task<short> GetEsgScore()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri($"https://yahoo-finance127.p.rapidapi.com/esg-score/{Ticker}"),
            Headers =
            {
                { "X-RapidAPI-Key", "2c0e585181msh2408993a65654bfp184d11jsnba98037211d3" },
                { "X-RapidAPI-Host", "yahoo-finance127.p.rapidapi.com" },
            },
        };
        using (var response = await client.SendAsync(request))
        {
            response.EnsureSuccessStatusCode();
            var body = await response.Content.ReadAsStringAsync();
            var test = JsonNode.Parse(body);
            return  (short)test["totalEsg"]["raw"];
        }
    }
}