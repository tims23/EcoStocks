import React, { useEffect, useState } from 'react';
import { Button, Typography, Autocomplete, Card, CardContent, Dialog, DialogTitle, Stack, TextField, Grid, Divider } from "@mui/material";
import {useSearchParams, useRouter } from "next/navigation";

const InputDialog = ({
    depotID,
    addStock = (stock) => {}
}) => {
    const EDIT_PARAM = 'edit'
    const LETTERS_FOR_SUGGESTIONS = 2

    const router = useRouter()

    const searchParams = useSearchParams()
    const shouldEdit = searchParams.has(EDIT_PARAM)
    const stockId = searchParams.get(EDIT_PARAM)

    const [tickerValue, settickerValue] = useState(stockId || "") 
    const [amountValue, setAmountValue] = useState()
    const [tickerSuggestions, settickerSuggestions] = useState([])
    const updateTickerAutoSuggestions =  (ticker) => {
      if (ticker.length < LETTERS_FOR_SUGGESTIONS) {
        settickerSuggestions([])
      } else {
        settickerSuggestions(["AAPL", "AMZN"])
      }
    }

    const closeDialog = () => {
        settickerValue("")
        setAmountValue("")
        router.push(`/${depotID}`, undefined, { shallow: true })
    }

    const saveData = () => {
        addStock()
        closeDialog()
    }

    useEffect(() => {
        console.log("stockId", stockId)
        if (stockId) {
            settickerValue(stockId)
        }
    }, [stockId])

    useEffect(() => {
        console.log("amountValue", amountValue)
    } , [amountValue])

    const isInt = (value) => {
        if (isNaN(value)) {
          return false;
        }
        var x = parseFloat(value);
        return (x | 0) === x;
      }

    return (
        <Dialog 
            onClose={closeDialog} 
            open={shouldEdit}
            sx={{maxWidth: 450}}
            >
            <Card>
                <DialogTitle>Add new Stock to depot</DialogTitle>
                <CardContent>
                <Grid container spacing={1} alignItems={'center'}>
                    
                    <Grid item xs={4}>
                        <Typography>Choose Stock</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <div>
                        <Autocomplete
                        onInputChange={(_, newIputVal)=>updateTickerAutoSuggestions(newIputVal)}
                        freeSolo
                        sx={{ maxWidth: 228}}
                        options={tickerSuggestions}
                        value={tickerValue}
                        onChange={(_, value) => settickerValue(value)}
                        disabled={stockId !== ""}
                        renderInput={(params) => <TextField {...params} label="Ticker"/>}
                        />
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>Amount of Stocks</Typography>
                    </Grid>
                    <Grid item xs={8}>     
                        <TextField 
                            label="Amount" 
                            variant="outlined" 
                            value={amountValue}
                            onChange={(event) => {
                                const newValue = event.target.value
                                if (isInt(newValue) || newValue === "") {
                                    setAmountValue(newValue);
                                }
                            }}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={closeDialog}>
                                    Discard
                            </Button>
                            <Button 
                                disabled={amountValue === "" || tickerValue === ""} 
                                variant="outlined" color="primary" 
                                onClick={saveData}>
                                    Save
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </Dialog>
    );
};

export default InputDialog;