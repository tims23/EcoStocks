import { cache } from "react";

const BASE_URL = process.env.BASE_URL

export async function GET(request, {params}) {
    const searchParams = new URL(request.url).searchParams;
    const ticker = searchParams.get('ticker');

    try {

        const requestOptions = {
            method: "GET",
            cache: 'no-store',
        };
        
    // fetch data from a url endpoint
    const response = await  fetch(`${BASE_URL}/Search/${ticker}`, requestOptions)

    // return empty array if no stocks are found
      if (response.status === 404) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      // return error message if response is not ok
      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      // map data to list of ticker symbols
      const stocks = data.quotes.map((stock) => stock.symbol)

      // return error message if ticker symbol was not found
      if( stocks.includes(undefined)) { throw new Error("No stocks found")}

      // return list of ticker symbols
      return new Response(JSON.stringify([...stocks]), { status: 200 });
    } catch (error) {
      // return error message if an error while processing response occurs
          return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

