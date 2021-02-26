import React, {Component} from "react";
import Alert from "../error/Alert";
import FormField from "./FormField";
import {login} from "../../login";

class Login extends Component {

    state ={
        username: '',
        pwd: '',
        err: ''
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    });
    usernameChange = this.handleChange('username');
    pwdChange = this.handleChange('pwd');

    login = (e) => {
        e.preventDefault();
        login(this.state.username, this.state.pwd)
            .then(res => {
            console.log(res);
            if (res === true) {
                this.setState({login: true});
                window.location = "/"
            } else {
                this.setState({err: res});
            }
        })
    }
    render() {
        const {username, pwd} = this.state;

        return (
            <div className="container">
                <div className="card text-center" style={{marginTop: "5%"}}>
                    <div className="card-header">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        {this.state.err.length > 0 &&<Alert message={this.state.err} />}
                        <form onSubmit={this.login}>  
                            <FormField  
                                type="text"
                                label="Username" 
                                value={username}
                                fieldId="username"
                                hasChanged={this.usernameChange} />
                            <FormField  
                                    type="password"
                                    label="Password" 
                                    value={pwd}
                                    fieldId="pwd"
                                    hasChanged={this.pwdChange} />      
                            <div className="form-group row" style={{marginTop: "3%"}}>
                            <div className="col-sm-4"></div>
                            <button 
                                type="submit"
                                className="btn btn-secondary col-sm-4">
                                Submit</button>
                            <div className="col-sm-4"></div>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted" ></div>
            </div>
        </div>
        );
    }
}

export default Login;