import React, {Fragment} from 'react'
import {removeContact} from "../../main";

const TableHeader = () => {
    return(
        <thead className="thead-dark">
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Phone Number</th>
                <th scope="col">E-mail</th>
                <th scope="col">Company</th>
                <th scope="col"></th>       
            </tr>
            </thead>
    );
}

const TableBody = (props) => {
    return (
    <tr>
        <td scope="row">{props.name}</td>
        <td>{props.surname}</td>
        <td>{props.phone}</td>
        <td>{props.email}</td>
        <td>{props.company}</td>
        <td>
            <button type="button" className="btn btn-secondary" onClick={()=>removeContact(props.id)}>Delete</button>
        </td>
     </tr>
    )        
}

const Table = (props) => {
    //table data and function passed through apps
    const {contacts} = props;
    
    return (
        <div className="table-responsive">
            {contacts.length === 0 ? 
                <h2>There aren't any contacts yet!</h2> :
                <table className="table table-hover ">
                    <TableHeader />
                    <tbody>
                    {contacts.map((item, index) => {
                        return <TableBody 
                            id={item.id}
                            name={item.name}
                            surname={item.surname}
                            email={item.email} 
                            phone={item.phone}
                            company={item.company}
                            key={index}
                            />})}
                    </tbody>            
                </table>}
        </div>
    );
}

export default Table;