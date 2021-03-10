import React, {Component} from "react";
import Alert from "./error/Alert";
import Axios from "axios";
import Main from "./settings/Main";
import Del from "./settings/Del";
import Cep from "./settings/Cep";
import Cpwd from "./settings/Cpwd";


class UserSettings extends Component {
    state ={
        currentSetting: "main",
        err: ""
    }

    componentDidMount() {
        if (!localStorage.getItem("token")) {
            window.location = "/login";
        }
    }
    handleState(s) {
        this.setState({currentSetting: s});
    }
    handleError(e){
        console.log(e)
        this.setState({err:e});
    }

    render() {
        const {currentSetting, err} = this.state;
        // card layout similar to login register, but with onn hover highlighting
        return (
            <div className="Container" id="main">
                <div className="card text-center" style={{marginTop: "5%"}}>
                    <div className="card-header">
                        <h2>Settings</h2>
                    </div>
                    <div className="card-body">
                        {err.length > 0 && <Alert message={err} />}
                        {currentSetting === "main" &&
                        <Main handleState={this.handleState.bind(this)} />
                        }
                        {currentSetting === "cep" &&
                        <Cep handleState={this.handleState.bind(this)} handleError={this.handleError.bind(this)} />
                        }
                        {currentSetting === "cpwd" &&
                        <Cpwd handleState={this.handleState.bind(this)} handleError={this.handleError.bind(this)} />
                        }
                        {currentSetting === "del" &&
                        <Del handleState={this.handleState.bind(this)} />
                        }
                    </div>
                    <div className="card-footer text-muted" ></div>
                </div>
            </div>
        );
    }
}

export default UserSettings;