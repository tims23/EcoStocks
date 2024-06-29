'use client'
import { addStock } from "@/services/addStock";
import { deleteStock } from "@/services/deleteStocks";
import { getStocks } from "@/services/getStocks";
import { EXAMPLE_STOCKS } from "@/services/mockData";
import { useState, useEffect } from "react";

const useAPIStocks = (depotID) => {
    const [stocks, setStocks] = useState(EXAMPLE_STOCKS)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchStocks = () => {
        setError(null)
        setLoading(true)
        getStocks(depotID)
        .then((data) => {
            setStocks([...data])
            setLoading(false)
        })
        .catch((error) => {
            setError(error.toString())
            setStocks([])
            setLoading(false)
        })
    }

    const fetchAddStock = (ticker, amount) => {
        setError(null)
        setLoading(true)
        addStock(depotID, ticker, amount)
        .then((data) => {
           fetchStocks()
        })
        .catch((error) => {
            setError(error.toString())
            setLoading(false)
        })
    }

    const fetchDeleteStock = (stock) => {
        setError(null)
        setLoading(true)
        deleteStock(depotID, stock.ticker)
        .then(() => {
            setStocks(stocks.filter(s => s !== stock))
            setLoading(false)
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }

    useEffect(() => {
       fetchStocks()
    }, [depotID])

    return {stocks, loading, error, fetchAddStock, fetchDeleteStock}
}

export default useAPIStocks;