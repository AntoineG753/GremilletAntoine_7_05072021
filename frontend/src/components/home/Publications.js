import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Publications(props) {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [dataUser, setdataUser] = useState([]);
    const [catchFormPublication, setcatchFormPublication] = useState(false)
    const [catchHandlePublication, setcatchHandlePublication] = useState(false)


    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/getAccount", { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
            .then(res => {
                setdataUser(res.data.Result[0])
            })
            .catch(err => {setErrorMessage(err.response.data.message);})
    }, []);

    const publicationList = props.publications[0];
    const data = publicationList.map((publication_id, index) => {

        const handleDelete = data => {
            const dataPublication = { "filename": data.picture, "publication_id": `${data.publication_id}` }
            if (data.user_id === localStorage.getItem('userId') | dataUser.role === "admin") {

                axios.post("http://localhost:5000/api/publication/deletePublication", dataPublication, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
                    .then(res => {
                        document.location.reload();
                        setcatchHandlePublication(false)
                    })
                    .catch(err => { setcatchHandlePublication(true) })
            } else {
                alert("non autorisée")
            }
        }


        return (
            <div className="div_card_publication d-flex col-lg-10 col-md-10 p-3 col-11 mb-4" key={index}>
                <div className="col-lg-2 col-md-2 photo_profile_card d-flex justify-content-center">
                    <img src={`${publication_id.avatar}`} alt="img avatar publication" className=" photo_border "></img>
                </div>
                <div className="col-lg-11 col-md-11 p-lg-3 p-md-2 col-10">
                    <div className="col-lg-11 col-md-11 p-1">
                        <div className="d-flex justify-content-between">
                            <p className="bold text_card_name">{publication_id.last_name} {publication_id.name}</p>
                            <p className=" text_card_name">{publication_id.publication_date}</p>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <p className="col-lg-12 text_overflow">{publication_id.comment}</p>
                        </div>
                        {publication_id.picture !== "" && <div>
                            <img src={`${publication_id.picture}`} alt="img publication" className="img_publication col-lg-12 col-md-12 col-12"></img>
                        </div>}
                    </div>
                    {dataUser.role === "admin" && (
                        <div>
                            <button className="btn btn-danger" id={`${publication_id.user_id}`} onClick={() => handleDelete(publication_id)}>suprimer</button>
                        </div>
                    )}
                    {publication_id.user_id === localStorage.getItem('userId') && dataUser.role === "user" && (
                        <div>
                            <button className="btn btn-danger" id={`${publication_id.user_id}`} onClick={() => handleDelete(publication_id)}>suprimer</button>
                        </div>
                    )}
                </div>
            </div>
        )
    })


    const onSubmit = data => {
        const fileData = new FormData();
        if (!data.comment && data.file.length === 0) {
            setcatchFormPublication(true)
        } else {
            setcatchFormPublication(false)
            fileData.append("file", file);
            fileData.append("userId", localStorage.getItem('userId'))
            fileData.append("comment", data.comment)
            axios.post("http://localhost:5000/api/publication/createPublication", fileData, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
                .then(res => {
                    document.location.reload();
                })
                .catch(err => {setErrorMessage(err.response.data.message);})
        }

    }

    const handleFile = e => {
        setFile(e.target.files[0]);
    }

    return (
        <div className="d-flex justify-content-center col-md-12 mt-3">
            <div className="d-lg-flex d-md-flex col-lg-11 col-md-12 col-12 justify-content-center">
                <div className="col-lg-1 col-md-2">
                    <img className="col-lg-12 col-md-12 d-none d-md-block" alt="img avatar" src={dataUser.avatar}></img>
                </div>
                <div className="col-lg-6 col-md-9 col-12 d-flex justify-content-center row m-0">
                    <div className="div_form_createPublication col-lg-11 col-md-11 mb-5 col-11">
                        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                            <textarea type="text" className="form-control border-0 col-lg-10 col-md-10 " placeholder="Quoi de neuf ?" name="comment" {...register('comment')}></textarea>
                            <div className="d-flex justify-content-between m-2">
                                <label htmlFor="picture"><i className="far fa-images" /></label>
                                <input type="file" name="file" id="picture" accept="image/*" className="input_createPublication_img" {...register('file')} onChange={(e) => handleFile(e)} />
                                <button className="btn_form_publication ">Envoyer</button>
                            </div>
                        </form>
                        {catchFormPublication === true && <p className="message_catch">Publication vide</p>}
                        {catchHandlePublication === true && <p className="message_catch">Erreur d'envoi au serveur</p>}
                    </div>
                    {data}
                </div>

            </div>
        </div>
    )
}
