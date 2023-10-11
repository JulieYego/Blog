import { useState, useEffect } from "react"
import axios from 'axios'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw Error("Could not fetch this resource")
                }
                return response.json()})
            .then(json => {
                setData(json)
                setIsLoading(false)
                setError(null)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error.message)

            })

            return () => console.log("cleanup");
    },[url])

    return { data, isLoading, error }
}

export default useFetch;