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
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub-category/SubCreate";
import SubUpdate from "./pages/admin/sub-category/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
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
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/register/complete" exact component={RegisterComplete}/>
                <Route path="/forgot/password" exact component={ForgotPassword}/>
                <UserRoute path="/user/dashboard" exact component={UserDashboard}/>
                <UserRoute path="/user/password" exact component={Password}/>
                <UserRoute path="/user/wishlist" exact component={Wishlist}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/admin/category" exact component={CategoryCreate}/>
                <AdminRoute path="/admin/category/:slug" exact component={CategoryUpdate}/>
                <AdminRoute path="/admin/sub/" exact component={SubCreate}/>
                <AdminRoute path="/admin/sub/:slug" exact component={SubUpdate}/>
                <AdminRoute path="/admin/product" exact component={ProductCreate}/>
            </Switch>
        </>
    );
}

export default App;
