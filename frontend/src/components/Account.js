import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Account() {
    const { register, handleSubmit, reset } = useForm();
    const [data, setdata] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [newUtilisateurTrue, setnewUtilisateurTrue] = useState(false);
    const [updateUtilisateurTrue, setupdateUtilisateurTrue] = useState(false);
    const [listUtilisateur, setlistUtilisateur] = useState([null]);
    const [falseTrue, setfalseTrue] = useState(true);
    const [falseTruee, setfalseTruee] = useState(false);
    const [dataUtilisateur, setdataUtilisateur] = useState()
    const [enregistrer, setenregistrer] = useState(false)
    const [supprimer, setsupprimer] = useState(false)
    const [catchSignup, setcatchSignup] = useState(false)
    const [thenSignup, setthenSignup] = useState(false)
    const [catchUpdate, setcatchUpdate] = useState(false)
    const [thenUpdate, setthenUpdate] = useState(false)
    const [catchDelete, setcatchDelete] = useState(false)
    const [thenDelete, setthenDelete] = useState(false)




    if (updateUtilisateurTrue === false && falseTrue === true) {
        axios.get("http://localhost:5000/api/auth/allAccount", { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
            .then(res => {
                setfalseTrue(false)
                setlistUtilisateur([res.data.Result])
            })
            .catch(err => {setErrorMessage(err.response.data.message);})
        // list des utilisateur
    }



    const utilisateurData = listUtilisateur[0];

    if (updateUtilisateurTrue === true) {
        var list = utilisateurData.map((listUtilisateur_data, index) => {


            return (
                <option value={listUtilisateur_data.uuid} key={index}>{listUtilisateur_data.name} {listUtilisateur_data.last_name}</option>
            )
        })
    }


    useEffect(() => {

        axios.get("http://localhost:5000/api/auth/getAccount", { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
            .then(res => {
                setdata(res.data.Result[0])
            })
            .catch(err => {setErrorMessage(err.response.data.message);})

    }, []);


    const onSubmit = data => {

        const accountData = new FormData();
        accountData.append("file", data.file[0]);
        accountData.append("nom", data.nom);
        accountData.append("prenom", data.prenom);
        accountData.append("password", data.password);
        accountData.append("role", data.role);
        accountData.append("email", data.email);
        axios.post("http://localhost:5000/api/auth/signup", accountData, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                setcatchSignup(false);
                setthenSignup(true);
            })
            .catch(err => { setcatchSignup(true); setthenSignup(false) })

    };

    const onSubmitUpdate = data => {
        if (enregistrer === true) {
            const accountUpdateData = new FormData();
            accountUpdateData.append("file", data.file[0]);
            accountUpdateData.append("nom", data.nom);
            accountUpdateData.append("prenom", data.prenom);
            accountUpdateData.append("password", data.password);
            accountUpdateData.append("role", data.role);
            accountUpdateData.append("email", data.email);
            accountUpdateData.append("uuid", data.uuid);
            axios.put("http://localhost:5000/api/auth/updateAccount", accountUpdateData, { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    reset();
                    setupdateUtilisateurTrue(false)
                    setenregistrer(false)
                    setfalseTruee(!falseTruee)
                    setthenUpdate(true)
                    setcatchUpdate(false)
                    setupdateUtilisateurTrue(true)
                })
                .catch(err => { setcatchUpdate(true); setthenUpdate(false) })
        } else if (supprimer === true) {
            const accountDeleteData = { "uuid": data.uuid };
            axios.post("http://localhost:5000/api/auth/deleteAccount", accountDeleteData, { params: { ID: localStorage.getItem('userId'), accountDeleteData }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
                .then(res => {
                    reset();
                    setupdateUtilisateurTrue(false);
                    setsupprimer(false);
                    setfalseTruee(!falseTruee);
                    setthenDelete(true);
                    setcatchDelete(false);
                    setcatchUpdate(false);
                    setthenUpdate(false);
                    setupdateUtilisateurTrue(true);
                })
                .catch(err => { setcatchDelete(true); setthenDelete(false); setcatchUpdate(false); setthenUpdate(false) })
        }

    };

    const utilisateurSub = e => {
        setthenUpdate(false)
        setthenDelete(false)
        setcatchUpdate(false)
        setcatchDelete(false)
        setfalseTruee(true)
        e.preventDefault()
        const reqdataSelect = document.getElementById("users_select")
        const dataSelect = reqdataSelect.options[reqdataSelect.selectedIndex].value;
        const user_account = listUtilisateur[0].filter(function (utilisateur) {
            return utilisateur.uuid === `${dataSelect}`

        })
        reset()
        setdataUtilisateur(user_account[0])


    }

    return (
        <div>
            <Header />
            <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-lg-center mt-lg-5 mt-md-3">
                <div className="col-lg-8 d-lg-flex mt-lg-5 col-md-11 col-12">
                    <div className="col-lg-6 col-md-6 col-11 d-flex justify-content-between">
                        <img src={data.avatar} alt="img avatar" className=" col-md-5 col-lg-7 img_account"></img>
                        <ul className="ul ul_compte col-lg-10">
                            <li>Nom : {data.last_name}</li>
                            <li>Prenom : {data.name}</li>
                            <li>Role : {data.role}</li>
                        </ul>
                    </div>
                    {data.role === "admin" &&
                        <div className=" col-lg-2 col-md-4 p-2" >
                            <div className="col-lg-12 mt-lg-5 pt-lg-5">
                                <button className="btn btn-info" onClick={() => (setnewUtilisateurTrue(true), setupdateUtilisateurTrue(false), reset(), setfalseTruee(false))}>Ajouter un utilisateur</button>
                            </div>

                            <div className="col-lg-12 mt-5 pt-lg-5">
                                <button className="btn btn-warning" onClick={() => (setupdateUtilisateurTrue(true), setnewUtilisateurTrue(false), setfalseTrue(true))}>Modifier un utilisateur</button>
                            </div>
                        </div>
                    }
                    <div className=" p-md-2">{newUtilisateurTrue === true &&
                        <div className="col-lg-12 mt-lg-5 pt-lg-5 p-2">
                            <div>
                                <p className="bold">Formulaire Creation de compte :</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='formgroup'>
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" {...register('email', { required: true })} />
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputname">Prenom</label>
                                        <input type="text" className="form-control" id="Inputname" autoComplete="off" placeholder="Prenom" name="prenom" {...register('prenom', { required: true })} />
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputnom">Nom</label>
                                        <input type="text" className="form-control" id="Inputnom" autoComplete="off" placeholder="Nom" name="nom" {...register('nom', { required: true })} />
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="off" placeholder="Password" name="password" {...register('password', { required: true })} />
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputrole">Role</label>
                                        <input type="text" className="form-control" id="Inputrole" autoComplete="off" placeholder="role" name="role" {...register('role', { required: true })} />
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputfile">Role</label>
                                        <input type="file" className="form-control" id="Inputfile" autoComplete="off" placeholder="role" name="role" {...register('file')} />
                                    </div>
                                    {catchSignup === true && <p className="message_catch">Envoi du formulaire impossibles</p>}
                                    {thenSignup === true && <p className="message_then">Envoi du formulaire Réussi</p>}
                                    <button className="btn btn-primary">Enregistrer</button>
                                </form>
                                <button className="btn btn-danger" onClick={() => (setnewUtilisateurTrue(false), setcatchSignup(false), setthenSignup(false))}>Annuler</button>
                            </div>
                        </div>}
                        {updateUtilisateurTrue === true &&
                            <div className="p-md-2 p-2">
                                <div className=" col-lg-12 justify-content-between">
                                    <div className="mb-lg-3">
                                        <label htmlFor="pet-select">Choisisser un utilisateur</label>

                                        <form onSubmit={utilisateurSub}>
                                            <select name="list_users" id="users_select">
                                                <option value="null">--Utilisateur--</option>
                                                {list}
                                            </select>
                                            <button >Modifier</button>
                                            <button onClick={() => (setupdateUtilisateurTrue(false), setfalseTruee(!falseTruee), setdataUtilisateur())}>Annuller</button>
                                        </form>
                                    </div>
                                    <div>


                                        {dataUtilisateur && falseTruee === true && <div>

                                            <form onSubmit={handleSubmit(onSubmitUpdate)}>

                                                <div className='formgroup'>
                                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" autoComplete="off" aria-describedby="emailHelp" placeholder="email" name="email" {...register('email')} />
                                                </div>
                                                <div className='formgroup'>
                                                    <label htmlFor="Inputname">Prenom</label>
                                                    <input type="text" className="form-control" id="Inputname" autoComplete="off" defaultValue={`${dataUtilisateur.last_name}`} placeholder="Prenom" name="prenom" {...register('prenom')} />
                                                </div>
                                                <div className='formgroup'>
                                                    <label htmlFor="Inputnom">Nom</label>
                                                    <input type="text" className="form-control" id="Inputnom" autoComplete="off" defaultValue={`${dataUtilisateur.name}`} placeholder="Nom" name="nom" {...register('nom')} />
                                                </div>
                                                <div className='formgroup'>
                                                    <label htmlFor="exampleInputPassword1">Password</label>
                                                    <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="off" placeholder="Password" name="password" {...register('password')} />
                                                </div>
                                                <div className='formgroup'>
                                                    {dataUtilisateur.role === "user" &&
                                                        <select {...register('role')}>
                                                            <option value="user">user</option>
                                                            <option value="admin">admin</option>
                                                        </select>}
                                                    {dataUtilisateur.role === "admin" &&
                                                        <select {...register('role')}>
                                                            <option value="admin">admin</option>
                                                            <option value="user">user</option>
                                                        </select>}
                                                </div>
                                                <div className='formgroup'>
                                                    <label htmlFor="Inputuuid">uuid</label>
                                                    <input type="text" className="form-control" id="Inputuuid" autoComplete="off" defaultValue={`${dataUtilisateur.uuid}`} placeholder="uuid" name="uuid" readOnly="readOnly" {...register('uuid')} />
                                                </div>
                                                <div className='formgroup'>
                                                    <label htmlFor="Inputfile">Avatar</label>
                                                    <input type="file" className="form-control" id="Inputfile" autoComplete="off" placeholder="picture" name="file" {...register('file')} />
                                                </div>
                                                {thenUpdate === true && <p className="message_then">Utilisateur modifié</p>}
                                                {catchUpdate === true && <p className="message_catch">Utilisateur non modifé</p>}
                                                {thenDelete === true && <p className="message_then">Utilisateur supprimé</p>}
                                                {catchDelete === true && <p className="message_catch">Utilisateur non supprimé</p>}
                                                <button className="btn btn-primary" onClick={() => (setenregistrer(true), setsupprimer(false))}>Enregistrer</button>
                                                <button className="btn btn-danger" onClick={() => (setsupprimer(true), setenregistrer(false))}>Supprimer</button>
                                            </form>
                                        </div>}

                                    </div>
                                </div>
                            </div>
                        }</div>
                </div>

            </div>

        </div>

    )
}


























