import axios from "axios";
import React from "react";


function Del(props) {

    function deleteAccount(e) {
        e.preventDefault();
        let x = window.confirm("Are you sure you want to delete your account?");
        if (x) {
            axios.delete("/api/deleteaccount", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(res => {
                if (res.data.error) {
                    alert("An error occurred: " + res.data.error);
                } else {
                    alert("Your account has been successfully deleted.");
                    window.location = "/logout";
                }
            })
        }
    }
    return (
        <div>
            <h4>Delete Account</h4>
            <p style={{color:"red"}}>This cannot be undone.</p>
            <button 
                type="button" 
                className="btn btn-danger"
                onClick={deleteAccount}>DELETE ACCOUNT</button>
            <br />
            <button 
                type="button"
                className="btn btn-light"
                onClick={() => props.handleState("main")}>
                &laquo; Back
            </button>
        </div>
    )
}

export default Del;