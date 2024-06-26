"use client"

import InputDialog from "@/views/InputDialog";
import StockListItem from "@/views/StockListItem";
import { Add } from "@mui/icons-material";
import { Alert, Backdrop, Button, CircularProgress, Divider, Grid, List, Snackbar, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAPIStocks from "../../hooks/useAPIStocks";
import usePortfolioStats from "@/hooks/usePortfolioStats";
import ToggableSkeleton from "@/views/ToggableSkeleton";

// Home page for depot using the depot ID as a parameter from the url
export default function Home({params: {depotID}}) {  
  // Constants 
  const EDIT_PARAM = 'edit'
  const SNACKBAR_DURATION = 6000

  // navigation
  const router = useRouter()

  // set state for stocks
  const {stocks, loading, error, fetchAddStock, fetchDeleteStock} = useAPIStocks(depotID)

  // set state for portfolio stats
  const {portfoliostats, portfolioloading, setupdate} = usePortfolioStats(depotID)

  // opens edit page for stock
  const modifyStock = (stock = "") => {
    router.push(`/${depotID}?${EDIT_PARAM}=${stock.ticker}`, undefined, { shallow: true })
  } 

  // update statistics when stocks change
  useEffect(() => {
    setupdate(true)
  }, [stocks])

  // Button to add new stock
  const AddButton = () => {
    return (
        <Link href={`/${depotID}?${EDIT_PARAM}`} shallow={true}>
          <Button color="primary">
            <Add></Add>
          </Button>
        </Link>
    );
  }

  // Pie chart for eco statistics
  const ecoCharts = (
    <PieChart
    slotProps={{
    pieArcLabel: {opacity: 0},
    legend: { hidden: true},
    }}
    series={[
    {
      data: [
        { id: 0, value: portfoliostats ? portfoliostats.ecoPercentages.High : 0, label: 'Positive' },
        { id: 1, value: portfoliostats ? portfoliostats.ecoPercentages.Medium : 0, label: 'Neutral' },
        { id: 2, value: portfoliostats ? portfoliostats.ecoPercentages.Low : 0, label: 'Negative' },
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
)

// List of stocks
const StockList = () => { 
  const stockItems = (
    stocks.map((stock, index) => (
      <div key={stock.ticker}>
        <StockListItem 
          loading={loading}
          stock={stock} 
          deleteStock={() => fetchDeleteStock(stock)}
          modifyStock={() => modifyStock(stock)}
          />
          {index < stocks.length - 1 ? <Divider/> : <div/>}
        </div>
      ))
  )

  // Alert if no stocks are in depot
  const noItems = (
      <Alert sx={{width:"100%"}} variant="filled" severity="info" action={
        loading ? <CircularProgress sx={{color: "white"}} size={20} /> : <div/>
      } >No stocks in depot</Alert>
  )

  if (stocks.length === 0) {
    return noItems
  }

  return (
    <List
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 350,
        '& ul': { padding: 0 },
        bgcolor: 'background.paper'
      }}
      >
        {stockItems}
    </List>
  );
}

// Snackbar Alert for errors
  const ErrorAlert = () => {
    const [open, setOpen] = useState(false);
  
    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    useEffect(() => {
      if (error) {
        setOpen(true);
      }
    }, [error])

    return (
    <div>
      <Snackbar open={open} autoHideDuration={SNACKBAR_DURATION} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
  </div>
    )
  }
 
  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <Grid container spacing={2} alignItems={"stretch"}>
        <Grid item xs={12} sm={8}>
          <Stack
            direction="column"
            spacing={1}
            >
            <Stack direction={"row"} justifyContent={"center"}>
              <AddButton/>
            </Stack>
            <StockList/>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} >
          <div style={{height: "100%"}}>
          <Stack direction={"column"} sx={{height: "100%"}} justifyContent={"center"} spacing={3}>
            <ToggableSkeleton loading={portfolioloading} >
            <Typography variant="h3" color={"white"} textAlign={"center"}>
              {portfoliostats ? portfoliostats.totalValue : "-"} € total Value
              </Typography>
            </ToggableSkeleton>
            <ToggableSkeleton loading={portfolioloading} variant="circular">
            {portfoliostats ? (portfoliostats.ecoPercentages ? ecoCharts: null) : null}
          </ToggableSkeleton>
          </Stack>
          </div>
        </Grid>
      </Grid>
      <ErrorAlert/>
      <InputDialog depotID={depotID} addStock={fetchAddStock}></InputDialog>
    </main>
  );
}