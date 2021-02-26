import React, {useState} from "react";
import {check} from "../../login";

/**
 * Navigation Component
 */

function Navbar() {
    const [login, setLogin] = useState(false);

    check().then(r => setLogin(r))

    return (
        <nav className="navbar navbar-dark bg-dark" style={{marginBottom: "1%"}}>
            <div className="container">
                <div>
                    <a className="navbar-brand" href="/">
                        Phonebook
                    </a>
                </div>
                {login ? 
                <div className="navbar-right">
                    <ul className="nav navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>  :
                <div className="navbar-nav">
                    <ul className="nav mr-auto">
                        <li className="nav-item" >
                            <a className="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                Register
                            </a>
                        </li>
                    </ul>
                </div>}
            </div>
        </nav>
    );
}

export default Navbar;