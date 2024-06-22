"use client"
import InputDialog from "@/views/InputDialog";
import StockListItem, { ClimateFriendliness } from "@/views/StockListItem";
import { Add } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Home page
export default function Home({params: {depotID}}) {   
  const EDIT_PARAM = 'edit'

  //create example stock
  const exampleStock = {
    image: "https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l476432a3e85a0aa21c23f5abd2975a89b6820d63.png",
    stockName: "Apple",
    wkn: "WKN123456",
    isin: "ISIN123456",
    price: "123,45",
    shares: 123,
    portfolioPercentage: "12%",
    ecoScore: 10,
    climateFriendliness: ClimateFriendliness.HIGH
  }

  const exampleAmazonStock = {
    image: "https://api-ninjas-data.s3.us-west-2.amazonaws.com/logos/l74c0fda1054b04bf3e2365d467e32a47e3feba7b.png",
    stockName: "Amazon",
    wkn: "WKN123456",
    isin: "ISIN123456",
    price: "123,45",
    shares: 123,
    portfolioPercentage: "12%",
    ecoScore: 10,
    climateFriendliness: ClimateFriendliness.LOW
    }

  const exampleStocks = [exampleStock, exampleAmazonStock]
  
  const router = useRouter()

  // set state for stocks
  const [stocks, setstocks] = useState(exampleStocks)

  // function to delete stock
  const deleteStock = (stock) => {
    console.log("delete stock")
    setstocks(stocks.filter(s => s !== stock))
  }

  const modifyStock = (stock) => {
    console.log("modify stock")
    router.push(`/${depotID}?${EDIT_PARAM}`, undefined, { shallow: true })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack
        width={"100%"}
        height={"100%"}
        direction={"row"}
        spacing={2}
        alignItems={"center"}
      >
        <Stack
          direction={"column"}
          spacing={1}
        >
          <Stack direction={"row"} justifyContent={"center"}>
          <Link href={`/${depotID}?${EDIT_PARAM}`} shallow={true}>
            <Button color="primary">
              <Add></Add>
            </Button>
          </Link>
          </Stack>
          {stocks.map((stock, index) => 
            <StockListItem
              modifyStock={() => modifyStock(stock)}
              stock={stock} 
              deleteStock={() => deleteStock(stock)} 
              key={index}
              />
          )}
        </Stack>

        <PieChart
          slotProps={{
          pieArcLabel: {opacity: 0},
          legend: { hidden: true},
          }}
          series={[
          {
            data: [
              { id: 0, value: 10, label: 'Positive' },
              { id: 1, value: 15, label: 'Neutral' },
              { id: 2, value: 20, label: 'Negative' },
            ],
            arcLabel: (item) => item.label,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        width={400}
        height={200}
      />
      </Stack>
      <InputDialog depotID={depotID}></InputDialog>
    </main>
  );
}
