import React, {useEffect, useState} from "react";
import {Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdmin} from "../../functions/auth";

const AdminRoute = ({children, ...rest}) => {
    const [admin, setAdmin] = useState(false)
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    setAdmin(true)
                })
                .catch(err => {
                    setAdmin(false)
                })
        }
    }, [user])

    return admin ? <Route {...rest}/> : <LoadingToRedirect/>
}

export default AdminRoute