import { PortfolioStatistics } from "@/data/PortfolioStatistics";

const BASE_URL = process.env.BASE_URL

export async function GET(request, {params}) {
    let {depotID} = params;

    try {

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            cache: "no-store"
        };
        
    const response = await  fetch(`${BASE_URL}/Portfolio/Total?Hash=${depotID}`, requestOptions)

      if (response.status === 404) {
        return new Response(JSON.stringify(), { status: 200 });
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      
      return new Response(JSON.stringify(PortfolioStatistics.fromAPIJSON(data)), { status: 200 });
    } catch (error) {
          return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

