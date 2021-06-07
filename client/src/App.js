import React from "react";
import {Switch, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import '../src/style/App.scss'

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </>
    );
}

export default App;
