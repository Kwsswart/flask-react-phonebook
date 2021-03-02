import React from "react";

function Main(props) {
    return (
        <div>
            <p>Choose from below:</p>
            <ul className="list-group">
                <li 
                    className="list-group-item list-group-item-action"
                    onClick={()=>{props.handleState("cep")}}
                    style={{cursor: "pointer"}}>
                    Change Email/Phone Number
                </li>
                <li 
                    className="list-group-item list-group-item-action"
                    onClick={()=>{props.handleState("cpwd")}}
                    style={{cursor: "pointer"}}>
                    Change Password
                </li>
                <li 
                    className="list-group-item list-group-item-action"
                    onClick={()=>{props.handleState("del")}}
                    style={{cursor: "pointer"}}>
                    Delete Account
                </li>
            </ul>
        </div>
    );
}

export default Main;