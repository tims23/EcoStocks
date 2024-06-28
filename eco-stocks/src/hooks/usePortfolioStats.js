'use client'

import { getPortfolioStats } from "@/services/getPortfolioStats";
import { useState, useEffect } from "react";


const usePortfolioStats = (depotID) => {
    const [portfolioloading, setLoading] = useState(true)
    const [portfoliostats, setstats] = useState(null)

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

    useEffect(() => {
       fetchStats()
    }, [])

    return {portfoliostats, portfolioloading}
}

export default usePortfolioStats;