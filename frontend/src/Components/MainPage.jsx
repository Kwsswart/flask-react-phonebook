import React, {Component} from "react";
import Axios from "axios";
import AddContact from "./main/AddContact";
import Alert from "./error/Alert";
import AdvancedSearch from "./main/AdvancedSearch";
import Table from "./main/Table";
import {check} from "../login";


class MainPage extends Component {

    state ={
        contacts: [],
        username: '',
        err:''
    }

    componentDidMount(){
        check().then(r => r ? console.log(r) : window.location.reload())
        Axios.get("/api/getcurrentuser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            this.setState({username: res.data.username}, () =>{
                Axios.get("/api/contacts/" + this.state.username).then(res => {
                    if (res.data.error) {
                        this.setState({err: res.error});
                    } else {
                        this.setState({contacts: res.data});
                    }
                });})
        }, 500)
    }

    handleContacts = (contactData) => {
        this.setState({contacts: contactData}, () => {
            console.log(this.state.contacts)
            if (this.state.contacts.length === 0) {
                Axios.get("/api/contacts/" + this.state.username).then(res => {
                    if (res.data.error) {
                        this.setState({err: res.error});
                    } else {
                        this.setState({contacts: res.data});
                    }
                })
            }
        });
    }

    render() {
        const {contacts, err} = this.state;

        return (
            <div className="container" id="main">
                <div className="card text-center" style={{marginTop: "5%"}}>
                    <div className="card-header">
                        <h2>Contacts</h2>
                    </div>

                    <div className="card-body">
                        {err.length > 0 &&<Alert message={err} />}
                        <Table contacts={contacts}/>
                    </div>
                    <div className="card-footer text-muted"></div>
                </div>
                <div className="container">
                    <div className="card-columns d-flex justify-content-center">
                        <AddContact />
                        <AdvancedSearch onHandleContacts={this.handleContacts} username={this.state.username} />
                    </div>
                </div>
            </div>
        )
    }
}


export default MainPage;