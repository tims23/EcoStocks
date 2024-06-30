'use client'
import { addStock } from "@/services/addStock";
import { deleteStock } from "@/services/deleteStocks";
import { getStocks } from "@/services/getStocks";
import { EXAMPLE_STOCKS } from "@/services/mockData";
import { useState, useEffect } from "react";

/**
 * logic to handle stocks states
 * @param {*} depotID: id of depot
 * @returns {stocks, loading, error, fetchAddStock, fetchDeleteStock}: stocks, loading state, error state, fetchAddStock function, fetchDeleteStock function
 * 
 **/
const useAPIStocks = (depotID) => {
    // set states for stocks, loading and error
    const [stocks, setStocks] = useState(EXAMPLE_STOCKS)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // fetch stocks from depot + handle loading and error
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
 
    // fetch add stock to depot + handle loading and error
    const fetchAddStock = (ticker, amount) => {
        setError(null)
        setLoading(true)
        addStock(depotID, ticker, amount)
        .then((data) => {
           fetchStocks() // fetch stocks after add
        })
        .catch((error) => {
            setError(error.toString())
            setLoading(false)
        })
    }

    // fetch delete stock from depot + handle loading and error
    const fetchDeleteStock = (stock) => {
        setError(null)
        setLoading(true)
        deleteStock(depotID, stock.ticker)
        .then(() => {
           fetchStocks() // fetch stocks after delete
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    }

    // fetch stocks on mount
    useEffect(() => {
       fetchStocks()
    }, [depotID])

    // make states available to other components
    return {stocks, loading, error, fetchAddStock, fetchDeleteStock}
}

export default useAPIStocks;