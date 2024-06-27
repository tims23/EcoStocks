'use clinet'

import { useState, useEffect } from "react"

export async function getStockSuggestions(ticker) {
    return await fetch(`/api/search?ticker=${ticker}`)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } 
        throw new Error(response.statusText)
    })
}

export const useStockSuggestions = (query = "") => {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        if (query == null) query = ""
        if (query.length < 2) {
            setSuggestions([])
            return
        } else if (suggestions.length > 0) {
            return
        }

        getStockSuggestions(query)
            .then(data => {
                console.log("DATA", data)
                setSuggestions(data)
            })
        
    }, [query])  

    return suggestions
}