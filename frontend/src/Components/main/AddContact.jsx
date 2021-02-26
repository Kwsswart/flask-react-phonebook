import React, {Component} from "react";
import Alert from "../error/Alert";
import FormField from "../auth/FormField";
import {addContact} from "../../main";


class AddContact extends Component {

    state ={
        name: '',
        surname: '',
        phone: '',
        email: '',
        company: '',
        err: ''
    }

    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    });
    nameChange = this.handleChange('name');
    surnameChange = this.handleChange('surname');
    phoneChange = this.handleChange('phone');
    emailChange = this.handleChange('email');
    companyChange = this.handleChange('company');

    addContact = (e) => {
        e.preventDefault();
        addContact(
            this.state.name,
            this.state.surname,
            this.state.phone,
            this.state.email,
            this.state.company
        ).then(res =>{
            if (res.success) {
                window.location.reload();
            } else {
                this.setState({err: res.error})
            }
        })
    }

    render() {
        const {name, surname, phone, email, company, err} = this.state;

        return(
                <div className="card text-center" style={{marginTop: "3%", marginRight: "2%", width: "50%"}}>
                    <div className="card-header">
                        <h2>AddContact</h2>
                    </div>
                    <div className="card-body">
                        {err.length > 0 &&<Alert message={err} />}
                        <form onSubmit={this.addContact}>  
                            <FormField  
                                type="text"
                                label="Name" 
                                value={name}
                                fieldId="name"
                                hasChanged={this.nameChange} />
                            <FormField  
                                type="text"
                                label="Surname" 
                                value={surname}
                                fieldId="surname"
                                hasChanged={this.surnameChange} />
                            <FormField  
                                type="tel"
                                label="Phone Number" 
                                value={phone}
                                fieldId="phone"
                                hasChanged={this.phoneChange} /> 
                            <FormField  
                                type="email"
                                label="Email" 
                                value={email}
                                fieldId="email"
                                hasChanged={this.emailChange} />
                            <FormField  
                                type="text"
                                label="Company Name" 
                                value={company}
                                fieldId="company"
                                hasChanged={this.companyChange} />      
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
        );
    }
}


export default AddContact;