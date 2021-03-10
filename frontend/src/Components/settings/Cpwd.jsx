import React, { Component} from "react";
import Axios from "axios";
import FormField from "../auth/FormField";


class Cpwd extends Component {

    state ={
        pwd: '',
        npwd: '',
        rpwd: ''
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, console.log(this.state));
    pwdChange = this.handleChange('pwd');
    npwdChange = this.handleChange('npwd');
    rpwdChange = this.handleChange('rpwd');

    handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("/api/changepassword", {
            pwd: this.state.pwd,
            npwd: this.state.npwd,
            rpwd: this.state.rpwd
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                if (res.data.error) {
                    this.props.handleError(res.data.error);
                } else {
                    alert("Password Changed! Please log back in!");
                    window.location = "/logout";
                }
        })
    }
    render() {
        const {pwd, npwd, rpwd} = this.state;

        return (
            <div>
                <h4>Change Password</h4>
                <form onSubmit={this.handleSubmit}>                       
                    <FormField  
                        type="password"
                        label="Password" 
                        fieldId="pwd"
                        value={pwd}
                        hasChanged={this.pwdChange} />
                    <FormField  
                        type="password"
                        label="New Password" 
                        fieldId="npwd"
                        value={npwd}
                        hasChanged={this.npwdChange} />
                    <FormField  
                        type="password"
                        label="Repeat New Password" 
                        fieldId="rpwd"
                        value={rpwd}
                        hasChanged={this.rpwdChange} />
                        <div className="form-group row" style={{marginTop: "3%"}}>
                        <div className="col-sm-4"></div>
                        <button 
                            type="submit"
                            className="btn btn-secondary col-sm-4">
                            Submit</button>
                        <div className="col-sm-4"></div>
                    </div>
                </form>
                <button 
                    type="button"
                    className="btn btn-light"
                    style={{marginTop: "1%"}}
                    onClick={() => this.props.handleState("main")}>
                    &laquo; Back
                </button>
            </div>
        );
    }
}

export default Cpwd;