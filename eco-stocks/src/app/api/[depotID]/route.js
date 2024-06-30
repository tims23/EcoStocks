import { Stock } from "@/data/Stock";

const BASE_URL = process.env.BASE_URL

// get all stocks in depot
export async function GET(request, {params}) {
    let {depotID} = params;
    try {
      // fetch data from a url endpoint
      const response = await fetch(`${BASE_URL}/Portfolio?Hash=${depotID}`, {
        method: 'GET',
        cache: 'no-store',
      });
  
      // return empty array if no stocks are found
      if (response.status === 404) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      // return error message if response is not ok
      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }
      const data = await response.json();
      // map data to Stock objects
      const stocks = data.map((stock) => Stock.constructFromAPIJSON(stock))
      return new Response(JSON.stringify([...stocks]), { status: 200 });
    } catch (error) {
      // return error message if an error while processing response occurs
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
    
        // get ticker and amount from search params
        const ticker = searchParams.get('ticker').toUpperCase();
        const amount = searchParams.get('amount');

        // return error message if amount is not a positive number
        if (amount < 1 || Number.parseInt(amount) === NaN) {
          return new Response(JSON.stringify({ message: 'Amount must be a positive number' }), { status: 300 });
        }

        // fetch data from a url endpoint
        const response = await fetch(`${BASE_URL}/StockInfo/${ticker}?PortfolioHash=${depotID}&Number=${amount}`, requestOptions)  

      // return error message if stock is not found
      if (response.status === 404) {
        return new Response(JSON.stringify({ message: 'Stock not found.' }), { status: response.status });
      }

      // return error message if response is not ok
      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      // return success message if stock is added
      return new Response(JSON.stringify({ message: 'Added' }), { status: 200 });
    } catch (error) {
      // return error message if an error while processing response occurs
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
    
        // get ticker from search params
        const ticker = searchParams.get('ticker');

        // fetch data from a url endpoint
        const response = await fetch(`${BASE_URL}/Portfolio/${depotID}?Ticker=${ticker}`, requestOptions)

        // return error message if stock is not found
      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      // return success message if stock is deleted
      return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
    } catch (error) {
      // return error message if an error while processing response occurs
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }