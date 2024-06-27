import { Stock } from "@/data/Stock";
import next from "next";

const BASE_URL = "https://elite-impact-427220-q3.appspot.com/v1/api"

export async function GET(request, {params}) {
    const searchParams = new URL(request.url).searchParams;
    const ticker = searchParams.get('ticker');

    try {

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            cache: "no-store"
        };
        
    const response = await  fetch(`${BASE_URL}/Search/${ticker}`, requestOptions)
  
      if (response.status === 404) {
        return new Response(JSON.stringify([]), { status: 200 });
      }

      if (!response.ok) {
        return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: response.status });
      }

      const data = await response.json();
      const stocks = data.quotes.map((stock) => stock.symbol)
      if( stocks.includes(undefined)) { throw new Error("No stocks found")}
      return new Response(JSON.stringify([...stocks]), { status: 200 });
    } catch (error) {
        console.log("ERROR", error)
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

