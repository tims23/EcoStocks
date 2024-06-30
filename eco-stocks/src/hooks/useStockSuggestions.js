'use clinet'

import { getStockSuggestions } from "@/services/getStockSuggestions"
import { useState, useEffect } from "react"

/**
 * logic to handle stock suggestions states
 * @param {*} query: search query
 * @returns {suggestions}: stock suggestions
 * 
 **/
export const useStockSuggestions = (query = "") => {
    // set state for suggestions
    const [suggestions, setSuggestions] = useState([])

    // set length threshold for suggestions
    const LENGTH_THRESHOLD = 2
 
    // hadle fetch on mount and when query changes
    useEffect(() => {
        if (query == null) query = ""
        if (query.length < LENGTH_THRESHOLD) { // only fetch when query is longer than threshold
            setSuggestions([])
            return
        } else if (suggestions.length > 0) { // only fetch when suggestions are empty to avoid unnecessary fetches
            return
        }

        getStockSuggestions(query)
            .then(data => {
                setSuggestions(data)
            })
        
    }, [query])  

    return suggestions
}