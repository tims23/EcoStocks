"use client"
import * as React from "react";
import { number, string } from "prop-types";
import { Stack, Card, CardContent, CardMedia, Typography, useTheme  } from "@mui/material";
import OptionsButton from "./OptionsButton";

export const ClimateFriendliness = Object.freeze({
    LOW:   Symbol("low"),
    MEDIUM:  Symbol("medium"),
    HIGH: Symbol("high")
});

const StockListItem = ({
    stock = {
        image: Image,
        stockName: string,
        wkn: string,
        isin: string,
        price: number,
        shares: number,
        portfolioPercentage: number,
        ecoScore: number,
        climateFriendliness: ClimateFriendliness
    },
    deleteStock = () => {},
    modifyStock = () => {}
})  => {

    const BEST_ECO_SCORE = 10
    const ITEM_HEIGHT = 48;
    
    const options = [
        'Edit',
        'Delete',
        'Duplicate'
    ];

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
<Card>
    <Stack
    direction="row"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    >
        <CardContent
            style={{width: 150, height: 100, overflow: "hidden"}}
            >
            <CardMedia
                component="img" 
                style={{ objectFit:"contain", height: "100%"}}
                image={stock.image}
                alt={`Logo of ${stock.stockName}`}
            />  
        </CardContent>
        <CardContent>
          <Typography component="div" variant="h5">
            {stock.stockName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {stock.wkn}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {stock.isin}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography component="div" variant="h5">
            {stock.price}
          </Typography>
          <Typography component="div" variant="subtitle2">
            {stock.shares} shares
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {stock.portfolioPercentage}
          </Typography>
        </CardContent>
        <CardContent>
           <Stack
                direction={"row"}
                spacing={1}
                >
                <Typography component="div" variant="h5">
                    {stock.ecoScore} / {BEST_ECO_SCORE}
                </Typography>
           
           
                <CardMedia
                    item
                    component="img"
                    style={{ height: 40 , width: "fit-content", justifyContent: "center"}}
                    image={getClimateFriendlinessImage(stock.climateFriendliness)}
                    alt={getClimateFriendlinessText(stock.climateFriendliness)}
                /> 
            </Stack>
        </CardContent>
        <OptionsButton deleteAction={deleteStock} editAction={modifyStock}></OptionsButton>
      </Stack>
    </Card>
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