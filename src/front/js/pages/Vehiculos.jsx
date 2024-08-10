import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Vehiculos = () => {
const {store, actions} = useContext(Context)
const fetchData = async () => {
   await actions.getVehiculos()
}
const addFavouriteApi = async(favourite) =>{
    const token = localStorage.getItem('token');
    // Imprimir el token en la consola
    console.log(token);
    const dataToSend = {
        "item": favourite,
    };
    // 1. fetch al /api/login enviando en el body el dataToSend
    const uri = process.env.BACKEND_URL + '/api/favorites'
    const options = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    console.log(dataToSend, localStorage.getItem('access_token'));
    const response = await fetch(uri, options)
    if (!response.ok) {
        // Tratamos el error
        console.log('Error: ', response.status, response.statusText);
        if (response.status == 401) {
            const data = await response.json()
            console.log("Error: " + response.status + response.statusText)
        }
        else if(response.status == 409){
            console.log("El favorito ya existe");
        }
        return
    }
}
useEffect(() => {
    fetchData()
}, []);

    return (
        <div className="container text-center text-white">
           <div className="row">
            hola
             {store.vehiculos.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6 col-sm-10 mb-3">
                        <div className="card my-4" >
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                            </div>
                            <img height="280" src={`https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`} className="card-img-top" alt="..." />
                            <div className="card-body d-flex justify-content-between align-items-end">
                            <button className="btn btn-warning">+Info</button>
                            <button onClick={() => addFavouriteApi(item.name)} type="button" className="btn">
                                <i className="fa fa-heart"></i>
                            </button>
                              
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    )
  }

