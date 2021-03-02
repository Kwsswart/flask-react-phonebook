import React from "react";


function Footer() {
    return (
        <footer
            className="navbar bg-dark text-white" 
            id="footer"
            style={{
                width: "100%",
                height:"3rem",
                display: "inline-block",
                textAlign: "center"}}>
            <div className="col-sm-4"></div>
            <h6 className="nav-link" style={{fontFamily: "Helvetica Neue", paddingTop:"1%"}}>Made by Kieron William Spearing</h6>
            <div className="col-sm-4"></div>
        </footer>
    );
}


export default Footer;