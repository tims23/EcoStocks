"use client"
import * as React from "react";
import { Typography, useTheme, ListItem, Grid } from "@mui/material";
import OptionsButton from "./OptionsButton";
import ToggableSkeleton from "./ToggableSkeleton";
import {Stock } from "@/data/Stock";

/**
*   
* This code defines a Material-UI list item component for displaying a stock in a list.
* It includes the stock image, name, ticker, price, shares, total value and eco statistics.
* The component also includes a button to open a menu with options to edit or delete the stock.
* 
* @param {*} stock: stock object to display
* @param {*} loading: boolean to indicate if the stock is loading to display a skeleton
* @param {*} deleteStock: function to execute when delete option is clicked
* @param {*} modifyStock: function to execute when edit option is clicked
* 
**/
const StockListItem = ({
    stock = new Stock(),
    loading = false,
    deleteStock = () => {},
    modifyStock = () => {}
})  => {
    // Constants
    const BEST_ECO_SCORE = 100
    const ITEM_HEIGHT = 100;

    // map climate friendliness to image
    const getClimateFriendlinessImage = (climateFriendliness) => {
        switch (climateFriendliness) {
            case "Low":
                return "images/negative_climate.png"
            case "Medium":
                return "images/medium_climate.png"
            case "High":
                return "images/positive_climate.png"
        }
    }

    // map climate friendliness to text
    const getClimateFriendlinessText = (climateFriendliness) => {
        switch (climateFriendliness) {
            case "Low":
                return "Negative Climate Impact"
            case "Medium":
                return "Medium Climate Impact"
            case "High":
                return "Positive Climate Impact"
        }
    }

    // Eco statistics showing esg score and climate friendliness as image
    const ecoStatistics = (
            <div>
            <ToggableSkeleton variant="text" loading={loading}>
            <Typography color={"text.primary"} variant="h5">
                    {stock.ecoScore} / {BEST_ECO_SCORE}
                </Typography>
                </ToggableSkeleton>
                <ToggableSkeleton variant="rounded" loading={loading}>
                <img 
                src={getClimateFriendlinessImage(stock.climateFriendliness)}
                alt={getClimateFriendlinessText(stock.climateFriendliness)}
                style={{ height: 40 , width: "fit-content", justifyContent: "center"}}
                ></img>
                </ToggableSkeleton>
                </div>
    )

return (
    <ListItem sx={{height: ITEM_HEIGHT, overflow: "hidden"}}>
        <Grid container spacing={1} alignItems={"center"}>
            <Grid item xs={2} >
                <ToggableSkeleton variant="rounded" loading={loading}>
                    <img src={stock.image} style={{maxWidth: "90%", objectFit: "contain"}} alt={stock.stockName} className="stock-list-item__image" />
                </ToggableSkeleton>
            </Grid>
            <Grid item xs={3}>
                <ToggableSkeleton variant="text" loading={loading}>
                <Typography variant="h6" color={"text.primary"}>
                    {stock.stockName}
                </Typography>
                </ToggableSkeleton>
                <ToggableSkeleton variant="text"loading={loading} >
                <Typography variant="subtitle2" color="text.secondary">
                    {stock.ticker}
                </Typography>
                </ToggableSkeleton>
               
            </Grid>
            <Grid item xs={3}>
            <ToggableSkeleton variant="text" loading={loading}>
            <Typography variant="h6" color="text.primary">
            {stock.price}
            </Typography>
            </ToggableSkeleton>
            <ToggableSkeleton variant="text" loading={loading}>
          <Typography  variant="subtitle2" color="text.secondary">
            {stock.shares} shares
          </Typography>
          </ToggableSkeleton>
          <ToggableSkeleton variant="text" loading={loading}>
          <Typography variant="subtitle2" color="text.secondary">
            {stock.totalValue} ({stock.portfolioPercentage})
          </Typography>
            </ToggableSkeleton>
            </Grid>
            <Grid item xs={3}>
                 {stock.climateFriendliness !== "NotGiven" ? 
                 ecoStatistics : 
                 <ToggableSkeleton variant="text" loading={loading}>
                 <Typography variant="h6" color={"Highlight"}>
                    No informations given
                </Typography>
                </ToggableSkeleton>}
            </Grid>
            <Grid item xs={1}>
                {loading ? <div/> : <OptionsButton deleteAction={deleteStock} editAction={modifyStock}/>}
            </Grid>
        </Grid>
    </ListItem>
);


};

export default StockListItem;