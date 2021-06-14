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
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
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
    }, [dispatch])

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login"  component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/register/complete"  component={RegisterComplete}/>
                <Route path="/forgot/password"  component={ForgotPassword}/>
                <UserRoute path="/user/dashboard"  component={UserDashboard}/>
                <UserRoute path="/user/password"  component={Password}/>
                <UserRoute path="/user/wishlist"  component={Wishlist}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            </Switch>
        </>
    );
}

export default App;
