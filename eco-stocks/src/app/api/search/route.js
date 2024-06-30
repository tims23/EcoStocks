const BASE_URL = process.env.BASE_URL

export async function GET(request, {params}) {
    const searchParams = new URL(request.url).searchParams;
    const ticker = searchParams.get('ticker');

    try {

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            next: {revalidate: 1}
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
          return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }

