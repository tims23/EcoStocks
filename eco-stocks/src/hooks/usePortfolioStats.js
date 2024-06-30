'use client'

import { getPortfolioStats } from "@/services/getPortfolioStats";
import { useState, useEffect } from "react";


/**
 * logic to handle portfolio stats states
 * @param {*} depotID: id of depot
 * @returns {portfoliostats, portfolioloading, setupdate}: portfolio stats, loading state, update function
 * 
 **/
const usePortfolioStats = (depotID) => {
    // set states for portfolio stats, loading and update
    const [portfolioloading, setLoading] = useState(true)
    const [portfoliostats, setstats] = useState(null)
    const [update, setupdate] = useState(false) // update state to trigger re-fetch

    // fetch portfolio stats from depot + handle loading
    const fetchStats = () => {
        getPortfolioStats(depotID)
        .then((data) => {
            console.log("STATS", data)
            setstats(data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching portfolio stats", error)
            setLoading(false)
        })
    }

    // fetch portfolio stats on mount
    useEffect(() => {
       fetchStats()
    }, [])

    // fetch portfolio stats on update
    useEffect(() => {
        if (update) {
            fetchStats()
            setupdate(false)
        }
    }, [update])

    // make states available to other components
    return {portfoliostats, portfolioloading, setupdate}
}

export default usePortfolioStats;