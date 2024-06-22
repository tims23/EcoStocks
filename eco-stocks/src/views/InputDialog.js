import React, { useState } from 'react';
import { Button, Typography, Autocomplete, Card, CardContent, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import {useSearchParams, useRouter } from "next/navigation";

const InputDialog = ({depotID}) => {
    const EDIT_PARAM = 'edit'

    const router = useRouter()

    const searchParams = useSearchParams()
    const shouldEdit = searchParams.has(EDIT_PARAM)

    const [tickerSuggestions, settickerSuggestions] = useState([])
    const updateTickerAutoSuggestions =  (ticker) => {
      if (ticker.length < 3) {
        settickerSuggestions([])
      } else {
        settickerSuggestions(["AAPL", "AMZN"])
      }
    }

    const closeDialog = () => {
        router.push(`/${depotID}`, undefined, { shallow: true })
    }

    const saveData = () => {
        console.log("Save data")
        closeDialog()
    }

    return (
        <Dialog 
            fullWidth={true}
            onClose={closeDialog} 
            open={shouldEdit}>
            <Card>
                <DialogTitle>Add new Stock to depot</DialogTitle>
                <Stack direction={"column"} spacing={1}>
                <CardContent>
                    <Stack direction={"column"} spacing={1}>
                        <Stack direction={"row"} spacing={1}>
                            <Typography>Choose Stock</Typography>
                            <Autocomplete
                            onInputChange={(_, newIputVal)=>updateTickerAutoSuggestions(newIputVal)}
                            sx={{ width: 300 }}
                            freeSolo
                            options={tickerSuggestions}
                            renderInput={(params) => <TextField {...params} label="Ticker"/>}
                            />
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                            <Typography>Amount of Stocks</Typography>
                            
                            <TextField label="Amount" variant="outlined" />
                        </Stack>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                        <Button variant="outlined" color="secondary" onClick={closeDialog}>Discard</Button>
                        <Button variant="outlined" color="primary" onClick={saveData}>Save</Button>
                    </Stack>
                </CardContent>
                </Stack>
            </Card>
        </Dialog>
    );
};

export default InputDialog;