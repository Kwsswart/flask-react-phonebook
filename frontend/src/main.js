import Axios from "axios";

/**
 * File designed to handle contacts api requests
 */

async function removeContact(cid) {
    const res = await Axios.delete("/api/removecontact" + cid, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    return res;
}


async function addContact(name, surname, phone, email, company) {
    const res = await  Axios.post("/api/addcontact", {
        name: name,
        surname: surname,
        phone: phone,
        email: email,
        company: company
    },{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        
        }
    })
    const {data} = res
    return data;
}

export {removeContact, addContact};