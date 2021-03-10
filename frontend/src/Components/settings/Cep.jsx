import React, { Component } from "react";
import Axios from "axios";
import FormField from "../auth/FormField";


class Cep extends Component {
    state = {
        pwd: '',
        email: '',
        phone: ''
    }

    componentDidMount() {// get current user email and place in the state
        console.log(this.state.pwd + ' ' + this.state.phone + ' ' + this.state.email)
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, console.log(this.state));

    pwdChange = this.handleChange('pwd');
    emailChange = this.handleChange('email');
    phoneChange = this.handleChange('phone');

    handleSubmit = (e) =>{
        e.preventDefault();
        Axios.post("/api/changedetails", {
            pwd: this.state.pwd,
            email: this.state.email,
            phone: this.state.phone
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
                if (res.data.error) {
                    this.props.handleError(res.data.error);
                } else {
                    alert("Details Changed!");
                    window.location = "/";
                }
        })
    }
    render(){
        const {pwd, email, phone} = this.state
        return (
            <div>
                <h4>Change Email or Phone Number</h4>
                <form onSubmit={this.handleSubmit}>        
                    <FormField  
                        type="password"
                        label="Password" 
                        fieldId="pwd"
                        value={pwd}
                        hasChanged={this.pwdChange} />
                    <FormField  
                        type="text"
                        label="New Phone" 
                        fieldId="phone"
                        value={phone}
                        hasChanged={this.phoneChange} />
                    <FormField  
                        type="text"
                        label="Email" 
                        fieldId="email"
                        value={email}
                        hasChanged={this.emailChange} />
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
                    style={{marginTop: "1%"}}
                    className="btn btn-light"
                    onClick={() => this.props.handleState("main")}>
                    &laquo; Back
                </button>
            </div>
        )
    }
}

export default Cep;