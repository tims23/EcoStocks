'use client'

import { getPortfolioStats } from "@/services/getPortfolioStats";
import { useState, useEffect } from "react";


const usePortfolioStats = (depotID) => {
    const [portfolioloading, setLoading] = useState(true)
    const [portfoliostats, setstats] = useState(null)
    const [update, setupdate] = useState(false)

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

    useEffect(() => {
        if (update) {
            fetchStats()
            setupdate(false)
        }
    }, [update])

    return {portfoliostats, portfolioloading, setupdate}
}

export default usePortfolioStats;