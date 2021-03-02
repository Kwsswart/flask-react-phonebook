import React, {Component} from "react";
import {logout} from "../../login";

class Logout extends Component {
    componentDidMount() {
        logout();
    }

    render() {
        return (
            <div className="container" id="main">
                <p>Logging you out...</p>
            </div>
        );
    }
}

export default Logout;