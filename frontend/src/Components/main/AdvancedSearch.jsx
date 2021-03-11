import Axios from "axios";
import React, {Component} from "react";
import Alert from "../error/Alert";
import FormField from "../auth/FormField";


class AdvancedSearch extends Component {
    state ={
        name: '',
        surname: '',
        phone: '',
        email: '',
        company: '',
        err: '',
        username: ''
    }

    componentDidMount() {
        Axios.get("/api/getcurrentuser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => this.setState({username: res.data.username}));    
    }
    
    handleChange = (field) => (e) => this.setState({
        [field]:e.target.value
    }, () => this.search());
    nameChange = this.handleChange('name');
    surnameChange = this.handleChange('surname');
    //phoneChange = this.handleChange('phone');
    //emailChange = this.handleChange('email');
    companyChange = this.handleChange('company');

    search = () => {
        Axios.post("/api/searchcontacts/" + this.state.username,{
            name: this.state.name,
            surname: this.state.surname,
            phone: '', // need to implement in order to get advanced search working
            email: '', // with the encoded emails
            company: this.state.company,
        },{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(r => {
            if (r.data.error) {
                this.setState({err: r.data.error});
            } else {
                this.props.onHandleContacts(r.data);
            }
        });
    }

    render() {
        const {name, surname, company, err} = this.state;
        return (
                <div className="card text-center" style={{marginTop: "3%", marginleft:"2%", width:"50%"}}>
                    <div className="card-header">
                        <h2>Search</h2>
                    </div>
                    <div className="card-body">
                        {err.length > 0 &&<Alert message={err} />}
                        <form onSubmit={this.search}>  
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
                            {/*<FormField  
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
                                hasChanged={this.emailChange} />*/}
                            <FormField  
                                type="text"
                                label="Company Name" 
                                value={company}
                                fieldId="company"
                                hasChanged={this.companyChange} />      
                        </form>
                    </div>
                <div className="card-footer text-muted"></div>
            </div>
        
        );
    }
}

export default AdvancedSearch;