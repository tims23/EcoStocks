import { Stock } from "@/data/Stock";

const BASE_URL = process.env.BASE_URL

export async function GET(request, {params}) {
    let {depotID} = params;
    try {
      const response = await fetch(`${BASE_URL}/Portfolio?Hash=${depotID}`, {
        method: 'GET',
        cache: 'no-store',
      });
  
      if (response.status === 404) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }
      const data = await response.json();
      console.log(data)
      const stocks = data.map((stock) => Stock.constructFromAPIJSON(stock))
      return new Response(JSON.stringify([...stocks]), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

export async function POST(request, {params}) {
    let {depotID} = params;
    const searchParams = new URL(request.url).searchParams;

    try {        
        const requestOptions = {
          method: "POST",
          cache: 'no-store',
        };
    
        const ticker = searchParams.get('ticker').toUpperCase();
        const amount = searchParams.get('amount');

        if (amount < 1) {
          return new Response(JSON.stringify({ message: 'Amount must be a positive number' }), { status: 300 });
        }
        const response = await fetch(`${BASE_URL}/StockInfo/${ticker}?PortfolioHash=${depotID}&Number=${amount}`, requestOptions)  

      if (response.status === 404) {
        return new Response(JSON.stringify({ message: 'Stock not found.' }), { status: response.status });
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      return new Response(JSON.stringify({ message: 'Added' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

export async function DELETE(request, {params}) {
    let {depotID} = params;
    const searchParams = new URL(request.url).searchParams;

    try {        
        const requestOptions = {
          method: "DELETE",
          cache: "no-store"
        };
    
        const ticker = searchParams.get('ticker');
        const response = await fetch(`${BASE_URL}/Portfolio/${depotID}?Ticker=${ticker}`, requestOptions)

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }