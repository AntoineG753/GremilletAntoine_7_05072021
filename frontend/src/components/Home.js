import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Publications from './home/Publications';


export default function Home() {

    const [publications, setPublications] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        axios.get("http://localhost:5000/api/publication/realPublication", {

            params: { ID: localStorage.getItem('userId') },
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') }
        })

            .then(res => {
                setPublications([res.data.Result]);
            })
            .catch(err => {setErrorMessage(err.response.data.message);})

    }, []);

    return (

        <div>
            <Header />
            {publications.length !== 0 && <Publications publications={publications} />}
            {publications.length === 0 && <p>ERREUR : AUCUNE PUBLICATION | {errorMessage}</p>}
        </div>
    )
}























