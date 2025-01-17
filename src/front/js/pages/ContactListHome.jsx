import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const ContactListHome = () => {
const {store, actions} = useContext(Context)
const navigate = useNavigate()
const fetchData = async () => {
   await actions.getContacts()
}

const handleDelete = async (id) => {
    await actions.deleteContact(id)
    fetchData()

}
const handleEdit = (personas) => {
       actions.setCurrentContact(personas);
        navigate("/edit");
      }
useEffect(() => {
    fetchData()
}, []);

    return (
        <div className="container">
            <Link to="/new-contact">
            <button className="btn btn-primary mt-4">Añadir contacto</button>
            </Link>
            {store.contactos && store.contactos.map((item) =>(
            <div className="card col-3" key={item.id}>           
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>{item.address}</p>
                    </div>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="btn btn-primary" type="submit" onClick={() => handleEdit(item)} >
                    <i className="fa-solid fa-pen-to-square"></i>
                    </button>
            </div>
            ))}
        </div>
    )


}