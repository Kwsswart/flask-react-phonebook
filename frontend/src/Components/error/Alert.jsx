import React from "react";

/**
 * Component designed to display any error alerts from server
 */

function Alert(props) {
    return (
        <div
            className="alert alert-danger"
            style={{ padding: "1rem", marginTop: "1rem" }}>
                {props.message}
            </div>
    );
}


export default Alert;