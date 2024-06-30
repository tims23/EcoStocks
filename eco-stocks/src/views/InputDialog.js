import React, { useEffect, useState } from 'react';
import { Button, Typography, Autocomplete, Card, CardContent, Dialog, DialogTitle, Stack, TextField, Grid, Divider } from "@mui/material";
import {useSearchParams, useRouter } from "next/navigation";
import { useStockSuggestions } from '@/hooks/useStockSuggestions';

/**
 * 
 * This code defines a Material-UI dialog component for adding or editing a new stock to a depot, 
 * featuring inputs for selecting a stock ticker with auto suggestion and specifying the amount. 
 * It includes validation to ensure both fields are filled out correctly before allowing
 * the user to save the data.
 * 
 * @param {*} deportID: id of depot
 * @param {*} addStock: function to add stock to depot  
 */
const InputDialog = ({
    depotID,
    addStock = (stock) => {}
}) => {
    // Constants
    const EDIT_PARAM = 'edit'

    const router = useRouter()

    // get search params from url
    const searchParams = useSearchParams()
    const shouldEdit = searchParams.has(EDIT_PARAM)
    const stockId = searchParams.get(EDIT_PARAM)
    
    // set state ticker for stock and amount
    const [tickerValue, settickerValue] = useState(stockId || "") 
    const [amountValue, setAmountValue] = useState()

    // get suggestions logic for stock ticker
    const tickerSuggestions = useStockSuggestions(tickerValue)

    // close dialog and reset values
    const closeDialog = () => {
        settickerValue("")
        setAmountValue("")
        router.push(`/${depotID}`, undefined, { shallow: true })
    }

    // save data to depot and close dialog
    const saveData = () => {
        addStock(tickerValue, amountValue)
        closeDialog()
    }

    // get ticker suggestions when stockId changes and is not empty
    useEffect(() => {
        if (stockId) {
            settickerValue(stockId)
        }
    }, [stockId])

    // check if value is an integer
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
                        freeSolo
                        onInputChange={(_, value) => { settickerValue(value.toUpperCase()) }}
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
                                if ((isInt(newValue) && newValue > 0) || newValue === "") {
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