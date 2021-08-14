import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import Publications from './home/Publications';


export default function Home() {

    const [publications, setPublications] = useState([]);
    
    useEffect(() => {

        axios.get("http://localhost:5000/api/publication/realPublication", { 

            params: {ID: localStorage.getItem('userId')},
            headers : { "Authorization": "Bearer " + localStorage.getItem('token') } 
        })
        
            .then(res => {          
               setPublications([res.data.Result]);
                console.log(res)
                
            })
            .catch(err =>  {""})

    }, []);



    return (
        
        <div>
            <Header/>
            {publications.length !== 0 && <Publications publications={publications}/>}
           {publications.length === 0 && <p>ERREUR : AUCUNE PUBLICATION</p>}
        </div>
    )
}























