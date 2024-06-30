import { PortfolioStatistics } from "@/data/PortfolioStatistics";

const BASE_URL = process.env.BASE_URL

export async function GET(request, {params}) {
    let {depotID} = params;

    try {
        const requestOptions = {
            method: "GET",
            cache: "no-store"
        };
    
        // fetch data from a url endpoint
    const response = await  fetch(`${BASE_URL}/Portfolio/Total?Hash=${depotID}`, requestOptions)

    // return error message if response is not ok
      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      
      // return error message if no data is found
      return new Response(JSON.stringify(PortfolioStatistics.fromAPIJSON(data)), { status: 200 });
    } catch (error) {
      // return error message if an error while processing response occurs
          return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

