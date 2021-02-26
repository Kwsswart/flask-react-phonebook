import React, {Component} from 'react';


class Home extends Component {
    
    render() {
        
        return (
            <div className='container'>
                <h1 style={{textAlign: 'center'}}>Welcome to the React - Flask - Phonebook</h1>
                
                <div>
                    <h3>Features:</h3>
                    <div>
                        <p>This is a simple web application made using Python - Flask and ReactJS alongside MongoDB.</p>
                        <p>It is intended to be used to store a personalized phonebook for anybody who requires this free of charge.</p>
                    </div>
                </div>

                <div>
                    <h3>Usage:</h3>
                    <div>
                    <p>In order to use this application it is essential to register with it at first. I have not placed any true restrictions, thus not enforcing the usage of valid Phone Numbers, or Email, this was done to allow free access to this software no matter who you are.</p>

                    <p>Once registered it is as simple as logging in and using the application as you desire.</p>
                    </div>
                </div>
                <div>
                    <h3>Copyright:</h3>
                    <div>
                    <p>This software falls under the <a href="https://choosealicense.com/licenses/mit/">MIT license</a>.</p>

                    <p>This is 100% free for use as required, <a href="https://github.com/Kwsswart/flask-react-phonebook">you may download the source code</a> & play with the app as needed .</p>
                    </div>
                </div>
            </div>);
    }
}

export default Home