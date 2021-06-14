import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom'
import {setInterval} from "timers";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    let history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && history.push('/')
        return () => clearInterval(interval)
    }, [count, history])

    return <h1 className='d-flex justify-content-center mt-5 text-danger'>Redirecting in {count} seconds</h1>
}

export default LoadingToRedirect