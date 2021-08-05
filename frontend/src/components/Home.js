import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './Header'




export default function Home() {


    useEffect(() => {

        axios.get("http://localhost:5000/api/publication/realPublication", { 

            params: {ID: localStorage.getItem('userId')},
            headers : { "Authorization": "Bearer " + localStorage.getItem('token') } 
        })
        
            .then(res => {
                console.log(res.data)
                
               
            })
            .catch(err =>  {""})

    }, []);



    return (
        <div>
            <Header/>
        </div>
    )
}























