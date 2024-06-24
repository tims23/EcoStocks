'use client'
import { addStock } from "@/services/addStock";
import { getStocks } from "@/services/getStocks";
import { EXAMPLE_STOCKS } from "@/services/mockData";
import { useState, useEffect } from "react";

const useAPIStocks = (depotID) => {
    const [stocks, setStocks] = useState(EXAMPLE_STOCKS)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchStocks = () => {
        getStocks(depotID)
        .then((data) => {
            setStocks([...data])
            setLoading(false)
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }

    const fetchAddStock = (stock) => {
        setLoading(true)
        addStock(depotID, stock)
        .then((data) => {
            setStocks([...stocks, data])
            setLoading(false)
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }

    const fetchDeleteStock = (stock) => {
        setLoading(true)
        addStock(depotID, stock)
        .then((data) => {
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

export default useAPIStocks