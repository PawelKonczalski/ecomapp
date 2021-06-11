import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {currentUser} from "./functions/auth";
import '../src/style/App.scss'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await  user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then((res) => dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        }
                    }))
                    .catch()
                return () => unsubscribe()
            }
        })
    }, [])

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/register/complete" exact component={RegisterComplete}/>
                <Route path="/forgot/password" exact component={ForgotPassword}/>
            </Switch>
        </>
    );
}

export default App;
