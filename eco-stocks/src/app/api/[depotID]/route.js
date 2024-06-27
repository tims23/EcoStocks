import { Stock } from "@/data/Stock";

const BASE_URL = "https://elite-impact-427220-q3.appspot.com/v1/api"

export async function GET(request, {params}) {
    let {depotID} = params;
    try {
      const response = await fetch(`${BASE_URL}/Portfolio?Hash=${depotID}`, {
        method: 'GET',
        next: {revalidate: 2}
      });
  
      if (response.status === 404) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      const stocks = data.map((stock) => Stock.constructFromAPIJSON(stock))
      console.log("STOCKS", stocks)
      return new Response(JSON.stringify([...stocks]), { status: 200 });
    } catch (error) {
        console.log("ERROR", error)
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

export async function POST(request, {params}) {
    console.log("POST")
    let {depotID} = params;
    const searchParams = new URL(request.url).searchParams;

    console.log("SEARCH", searchParams.get('ticker'), searchParams.get('amount'))
    try {        
        const requestOptions = {
          method: "POST",
          redirect: "follow",
          next: {revalidate: 200}
        };
    
        const ticker = searchParams.get('ticker');
        const amount = searchParams.get('amount');
        const response = await fetch(`${BASE_URL}/StockInfo/${ticker}?PortfolioHash=${depotID}&Number=${amount}`, requestOptions)
  
        console.log("RESPONSE", response.status)

      if (response.status === 404) {
        console.log("404", response)
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      console.log("DATA", data)
      return new Response(JSON.stringify(Stock.constructFromAPIJSON(data)), { status: 200 });
    } catch (error) {
        console.log("ERROR", error)
      //return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }