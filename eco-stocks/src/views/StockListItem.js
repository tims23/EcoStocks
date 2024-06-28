"use client"
import * as React from "react";
import { Typography, useTheme, ListItem, Grid } from "@mui/material";
import OptionsButton from "./OptionsButton";
import ToggableSkeleton from "./ToggableSkeleton";
import { ClimateFriendliness, Stock } from "@/data/Stock";

const StockListItem = ({
    stock = new Stock(),
    loading = false,
    deleteStock = () => {},
    modifyStock = () => {}
})  => {
    const BEST_ECO_SCORE = 100
    const ITEM_HEIGHT = 100;

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const getClimateFriendlinessImage = (climateFriendliness) => {
        switch (climateFriendliness) {
            case ClimateFriendliness.LOW:
                return "images/negative_climate.png"
            case ClimateFriendliness.MEDIUM:
                return "images/medium_climate.png"
            case ClimateFriendliness.HIGH:
                return "images/positive_climate.png"
        }
    }

    const getClimateFriendlinessText = (climateFriendliness) => {
        switch (climateFriendliness) {
            case ClimateFriendliness.LOW:
                return "Negative Climate Impact"
            case ClimateFriendliness.MEDIUM:
                return "Medium Climate Impact"
            case ClimateFriendliness.HIGH:
                return "Positive Climate Impact"
        }
    }

    const theme = useTheme();

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
                    {stock.wkn}
                </Typography>
                </ToggableSkeleton>
                <ToggableSkeleton variant="text" loading={loading}>
                <Typography variant="subtitle2" color="text.secondary">
                    {stock.isin}
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
            </Grid>
            <Grid item xs={1}>
                {loading ? <div/> : <OptionsButton deleteAction={deleteStock} editAction={modifyStock}/>}
            </Grid>
        </Grid>
    </ListItem>
);


};

// what icon could be good to express medium climate impact?

export default StockListItem;

/**
 *         
    	<div className="stock-list-item">
            <div className="stock-list-item__image-container">
                <img src={stock.image} alt={stock.name} className="stock-list-item__image" />
            </div>
            <div className="stock-list-item__generalInformations">
                <div className="stock-list-item__name">{stock.name}</div>
                <div className="stock-list-item__wkn">{stock.wkn}</div>
                <div className="stock-list-item__isin">{stock.isin}</div>
            </div>
            <div className="stock-list-item__priceInformations">
                <div className="stock-list-item__price">{stock.price}</div>
                <div className="stock-list-item__shares">
                    <div className="stock-list-item__shares__number">{stock.shares}</div>
                    <div className="stock-list-item__shares__percentage">{stock.portfolioPercentage}</div>
                </div>
            </div>
            <div className="stock-list-item__eco-score">{stock.ecoScore}/{BEST_ECO_SCORE}</div>
        </div>
 */