using System.Collections.Concurrent;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

namespace ESGScoreCore.Controllers;


[ApiController]                                                        
[Route("api/Portfolio")]                                               
public class PortfolioController : ControllerBase                      
{                                        
                                             
    public static ConcurrentDictionary<string, Portfolio?> savedPortfolios = new();       
                                                                       
    [HttpDelete("{Hash}")]                                             
    public OkResult Delete(string Hash, [FromQuery(Name = "Ticker")] string ticker)      
    {                                                                  
        savedPortfolios.TryGetValue(Hash, out Portfolio? portfolio);
        portfolio.RemoveStock(ticker);                                 
        return Ok();                                                   
    }                                                                  
                                                                       
    [HttpGet("Total")]                                                 
    [ProducesResponseType(StatusCodes.Status200OK)]                    
    [ProducesResponseType(StatusCodes.Status404NotFound)]              
    public IActionResult Get([FromQuery(Name = "Hash")] string Hash)                                         
    {                                                                  
        {                                                              
            try                                                        
            { 
                savedPortfolios.TryGetValue(Hash, out Portfolio? portfolio);
                var value = portfolio.GetTotalValue();                 
                return Ok(value);                                      
            }                                                          
            catch (Exception e)                                        
            {                                                          
                Console.WriteLine(e);                                  
                return BadRequest();                                   
            }                                                          
        }                                                              
    }                                                                  
    [HttpGet()]                                                        
    public IActionResult GetPortfolio([FromQuery(Name = "Hash")] string Hash)   
    {                                                                  
        //Query Database and return portfolio if present               
        if (savedPortfolios.TryGetValue(Hash, out Portfolio portfolio))
        {      
           var value = portfolio.GetPortfolio();
           StringBuilder sb = new StringBuilder();
           foreach (KeyValuePair<string, Stock> stock in value)
           {
               sb.Append(JsonSerializer.Serialize(stock.Value));
           }
           Console.WriteLine(sb);
            return Ok(sb.ToString());                                      
        }                                                              
        //If not present return not found and create new portfolio     
        else                                                           
        {                                                              
            savedPortfolios[Hash] = new Portfolio();                   
            return NotFound();                                         
        }                                                              
    }                                                                  
                                                                       
}                                                                      
