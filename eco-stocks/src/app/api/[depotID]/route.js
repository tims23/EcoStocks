import { Stock } from "@/data/Stock";
import next from "next";

const BASE_URL = "https://elite-impact-427220-q3.appspot.com/v1/api"

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
          next: {revalidate: 1},
        };
    
        const ticker = searchParams.get('ticker');
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