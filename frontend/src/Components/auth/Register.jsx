import Axios from "axios";
import React, {Component} from "react";
import Alert from "../error/Alert";
import FormField from "./FormField";


class Register extends Component{
    state = {
        username: '',
        name: '',
        phone: '',
        email: '',
        pwd: '',
        rpwd: '',
        err: ''
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    });
    usernameChange = this.handleChange('username');
    nameChange = this.handleChange('name');
    phoneChange = this.handleChange('phone');
    emailChange = this.handleChange('email');
    pwdChange = this.handleChange('pwd');
    rpwdChange = this.handleChange('rpwd');

    register = (e) => {
        e.preventDefault();
        if (this.state.pwd != this.state.rpwd) {
            this.setState({
                err: "Passwords need to match"
            });
            return;
        } 
        Axios.post("/api/register", {
            username: this.state.username,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            pwd: this.state.pwd
        }).then(res => {
            console.log(res)
            if (res.data.error) {
                this.setState({err: res.data.error});
            } else {
                this.setState({register: true});
                window.location = "/login"
            }
        })
    }

    render() {
        const {username, name, phone, email, pwd, rpwd} = this.state;
        return (
            <div className="container" id="main">
                <div className="card text-center" style={{marginTop: "5%"}}>
                    <div className="card-header">
                        <h2>Register</h2>
                    </div>
                    <div className="card-body">
                        {this.state.err.length > 0 &&<Alert message={this.state.err} />}
                        <form onSubmit={this.register} style={{ marginBottom: "1%"}}>
                            <FormField  
                                type="text"
                                label="Username" 
                                value={username}
                                fieldId="username"
                                hasChanged={this.usernameChange} />
                            <FormField  
                                type="text"
                                label="Name" 
                                value={name}
                                fieldId="name"
                                hasChanged={this.nameChange} />
                            <FormField  
                                type="email"
                                label="Email" 
                                value={email}
                                fieldId="email"
                                hasChanged={this.emailChange} />
                            <FormField  
                                type="tel"
                                label="Phone Number" 
                                value={phone}
                                fieldId="phone"
                                hasChanged={this.phoneChange} />
                            <FormField  
                                type="password"
                                label="Password" 
                                value={pwd}
                                fieldId="pwd"
                                hasChanged={this.pwdChange} />
                            <FormField  
                                type="password"
                                label="Repeat Password" 
                                value={rpwd}
                                fieldId="rpwd"
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
                </div>
                <div className="card-footer text-muted" ></div>
                </div>
            </div>
        );
    }
}


export default Register;