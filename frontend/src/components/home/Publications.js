import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Publications(props) {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState();
    const [dataUser, setdataUser] = useState([]);


    useEffect(() => {



        axios.get("http://localhost:5000/api/auth/getAccount", { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
            .then(res => {
                setdataUser(res.data.Result[0])
            })
            .catch(err => { "err" })

    }, []);
    console.log(dataUser);
    const publicationList = props.publications[0];
    const data = publicationList.map((publication_id, index) => {
        console.log(publication_id)
        console.log(props.publications[0])



        const handleDelete = data => {
            const dataPublication = { "filename": data.picture, "publication_id": `${data.publication_id}` }
            if (data.user_id === localStorage.getItem('userId') | dataUser.role === "admin") {

                axios.post("http://localhost:5000/api/publication/deletePublication", dataPublication, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
                    .then(res => {
                        document.location.reload();
                    })
                    .catch(err => { "erreur handleSubmit" })
            } else {
                alert("non autorisée")
            }
        }



        const handleLike = data => {
            console.log(data)
            // const dataLike = new FormData();
            // dataLike.append('publication_id', data.publication_id)
            // dataLike.append('user_id', data.user_id)
            // console.log(dataLike)
            const dataLike = { "publication_id": data.publication_id, "user_id": data.user_id, "like_user_id": dataUser.uuid }
            axios.post("http://localhost:5000/api/likes/createLike", dataLike, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
                .then(res => {

                })
                .catch(err => { "erreur handleSubmit" })
        }

        console.log(publication_id)
        return (
            <div className="div_card_publication d-flex col-lg-10 col-md-10 p-3" key={index}>
                <div className="col-lg-1 col-md-2 photo_profile_card d-flex justify-content-center">
                    <img src={`${publication_id.avatar}`} className="col-lg-12 col-md-12 img_porfile"></img>
                </div>
                <div className="col-lg-11 col-md-11 p-lg-3 p-md-2">
                    <div className="col-lg-11 col-md-11 p-1">
                        <div className="d-flex justify-content-between">
                            <p className="bold text_card_name">{publication_id.last_name} {publication_id.name}</p>
                            <p>{publication_id.publication_date}</p>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <p className="col-lg-12 text_overflow">{publication_id.comment}</p>
                        </div>
                        {publication_id.picture !== "" && <div>
                            <img src={`${publication_id.picture}`} className="img_publication col-lg-12 col-md-12"></img>
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
                    {/* <div>
                        <a onClick={() => handleLike(publication_id)}><i className="far fa-heart"></i></a>
                    </div> */}
                </div>
            </div>
        )
    })


    const onSubmit = data => {
        console.log(data)
        const fileData = new FormData();
        if (!data.comment && data.file.length === 0) {
            console.log("publication vide")
        } else {
            fileData.append("file", file);
            fileData.append("userId", localStorage.getItem('userId'))
            fileData.append("comment", data.comment)
            console.log(file)
            axios.post("http://localhost:5000/api/publication/createPublication", fileData, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })

                .then(res => {
                    document.location.reload();

                })
                .catch(err => { "erreur handleSubmit" })
        }

    }

    const handleFile = e => {
        setFile(e.target.files[0]);
    }

    return (
        <div className="d-flex justify-content-center col-md-12 mt-3">
            <div className="d-flex col-lg-11 col-md-12 justify-content-center">
                <div className="col-lg-1 col-md-2">
                    <img className="col-lg-12 col-md-12" src={dataUser.avatar}></img>
                </div>
                <div className="col-lg-6 col-md-9 d-flex justify-content-center row div_publications">
                    <div className="div_form_createPublication col-lg-11 col-md-11 mb-5">
                        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                            <textarea type="text" className="form-control border-0 col-lg-10 col-md-10" placeholder="Quoi de neuf ?" name="comment" {...register('comment')}></textarea>
                            <div className="d-flex justify-content-between mg-2">
                                <label htmlFor="picture"><i className="far fa-images" /></label>
                                <input type="file" name="file" id="picture" accept="image/*" className="input_createPublication_img" {...register('file')} onChange={(e) => handleFile(e)} />
                                <button className="btn_form_publication">Envoyer</button>
                            </div>
                        </form>
                    </div>
                    {data}
                </div>

            </div>
        </div>
    )
}
