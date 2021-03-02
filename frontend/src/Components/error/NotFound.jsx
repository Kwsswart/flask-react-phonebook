import React from "react";

function NotFound() {
    return (
        <div className="container" id="main">
            <div className="card text-center" style={{marginTop: "5%"}}>
                <div className="card-header">
                    <h2>404</h2>
                </div>
                <div className="card-body">
                    <p>The page you were searching for does not exist.</p>
                    <button type="button" className="btn btn-light" onClick={() => window.location = "/"}>&laquo; Back</button>
                </div>
                <div className="card-footer text-muted" ></div>
            </div>
        </div>);
}

export default NotFound;