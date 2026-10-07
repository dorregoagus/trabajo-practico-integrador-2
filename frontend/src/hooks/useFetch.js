import { useEffect, useState } from 'react'

function useFetch(url) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch(url, {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('Error al obtener los datos')
            }

            const result = await response.json()
            setData(result)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
    useEffect(() => {
        fetchData()
    }, [url])
    /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

    return {
        data,
        isLoading,
        error,
    }
}

export default useFetch