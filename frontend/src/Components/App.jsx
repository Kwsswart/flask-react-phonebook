import React, {Fragment, useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Navbar from "./display/Navbar";
import MainPage from "./MainPage";
import Footer from "./display/Footer";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Logout from "./auth/Logout";
import {check} from "../login";


function App() {
    const [login, setLogin] = useState(false);

    check().then(r => setLogin(r))
    
    return (
        <Fragment>
            <Navbar />
            <Router>
                <Route path="/" exact component={login ? MainPage : Home} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/logout" exact component={Logout} />
            </Router>
            <Footer />
        </Fragment>
    );
}

export default App;