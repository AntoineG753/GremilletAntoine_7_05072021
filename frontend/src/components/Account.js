import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Account() {
    const { register, handleSubmit, reset } = useForm();
    const [data, setdata] = useState({});
    const [newUtilisateurTrue, setnewUtilisateurTrue] = useState(false);
    const [updateUtilisateurTrue, setupdateUtilisateurTrue] = useState(false);
    const [listUtilisateur, setlistUtilisateur] = useState([null]);
    const [falseTrue, setfalseTrue] = useState(true);
    const [falseTruee, setfalseTruee] = useState(false);
    const [dataUtilisateur, setdataUtilisateur] = useState()
    const [enregistrer, setenregistrer] = useState(false)
    const [supprimer, setsupprimer] = useState(false)




    if (updateUtilisateurTrue === false && falseTrue === true) {
        axios.get("http://localhost:5000/api/auth/allAccount", { params: { ID: localStorage.getItem('userId') }, headers: { "authorization": "Bearer " + localStorage.getItem('token') } })
            .then(res => {
                setfalseTrue(false)
                console.log(res)
                setlistUtilisateur([res.data.Result])
            })
            .catch(err => { "err" })
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
            .catch(err => { "err" })

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

                console.log("post reussi")
            })
            .catch(err => { "erreur handleSubmit" })

    };

    const onSubmitUpdate = data => {
        
        console.log(data)
        
        if(enregistrer === true) {
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
                setenregistrer(false)
                setfalseTruee(!falseTruee)
            })
            .catch(err => { "erreur handleSubmit" })
        } else if (supprimer === true) {
            // const accountDeleteData = new FormData();
            // accountDeleteData.append("uuid", data.uuid)
            const accountDeleteData = data.uuid;
            console.log(accountDeleteData)
            axios.delete("http://localhost:5000/api/auth/deleteAccount", { params: { ID: localStorage.getItem('userId'), accountDeleteData }, headers: { "authorization": "Bearer " + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                setsupprimer(false)
                setfalseTruee(!falseTruee)
            })
            .catch(err => { "erreur handleSubmit" })
        } else {
            console.log('aucun des deux')
        }

    };

    

    const utilisateurSub = e => {
        
        setfalseTruee(true)
        e.preventDefault()
        const reqdataSelect = document.getElementById("users_select")
        const dataSelect = reqdataSelect.options[reqdataSelect.selectedIndex].value;
        console.log(dataSelect)
        const user_account = listUtilisateur[0].filter(function (utilisateur) {
            return utilisateur.uuid === `${dataSelect}`

        })
        reset()
        console.log(user_account)
        setdataUtilisateur(user_account[0])
        
        
    }
console.log(falseTruee)
console.log(register)
    console.log(dataUtilisateur)

    
    return (
        <div>
            <Header />
            <div className="col-lg-12 d-flex justify-content-center mt-lg-5 mt-md-3">
                <div className="col-lg-11 d-flex justify-content-between mt-lg-5">
                    <div className="col-lg-3">
                        <img src={data.avatar}></img>
                    </div>
                    <div className="col-lg-3">
                        <ul className="ul ul_compte">
                            <li>Nom : {data.last_name}</li>
                            <li>Prenom : {data.name}</li>
                            <li>Role : {data.role}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {data.role === "admin" &&
                <div className="d-flex col-lg-1" >
                    <div className="col-lg-12 mt-5 pt-5">
                        <button className="btn btn-info" onClick={() => (setnewUtilisateurTrue(true), setupdateUtilisateurTrue(false), reset(), setfalseTruee(false))}>Ajouter un utilisateur</button>
                    </div>

                    <div className="col-lg-12 mt-5 pt-5">
                        <button className="btn btn-warning" onClick={() => (setupdateUtilisateurTrue(true), setnewUtilisateurTrue(false), setfalseTrue(true))}>Modifier un utilisateur</button>
                    </div>
                </div>
            }
            {newUtilisateurTrue === true &&
                <div className="col-lg-12 mt-5 pt-5">
                    <div className="col-lg-3">
                        <p>Formulaire Creation de compte</p>
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
                                <input type="text" className="form-control" id="Inputrole" autoComplete="off" placeholder="role"  name="role" {...register('role', { required: true })} />
                            </div>
                            <div className='formgroup'>
                                <label htmlFor="Inputfile">Role</label>
                                <input type="file" className="form-control" id="Inputfile" autoComplete="off" placeholder="role"  name="role" {...register('file')} />
                            </div>
                            <button className="btn btn-primary">Enregistrer</button>
                        </form>
                        <button className="btn btn-danger" onClick={() => setnewUtilisateurTrue(false)}>Annuler</button>
                    </div>
                </div>}
            {updateUtilisateurTrue === true &&
                <div>
                    <div className="d-flex col-lg-5 justify-content-between">
                        <div>
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
                                
                                <form id="test" onSubmit={handleSubmit(onSubmitUpdate)}>
                                    
                                    <div className='formgroup'>
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" autoComplete="off" aria-describedby="emailHelp" placeholder="email" name="email" {...register('email')}/>
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputname">Prenom</label>
                                        <input type="text" className="form-control" id="Inputname" autoComplete="off" defaultValue={`${dataUtilisateur.last_name}`} placeholder="Prenom" name="prenom" {...register('prenom')}/>
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputnom">Nom</label>
                                        <input type="text" className="form-control" id="Inputnom" autoComplete="off" defaultValue={`${dataUtilisateur.name}`} placeholder="Nom" name="nom" {...register('nom')}/>
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" autoComplete="off" placeholder="Password" name="password" {...register('password')}/>
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
                                        <input type="text" className="form-control" id="Inputuuid"  autoComplete="off" defaultValue={`${dataUtilisateur.uuid}`} placeholder="uuid" name="uuid" readOnly="readOnly" {...register('uuid')}/>
                                    </div>
                                    <div className='formgroup'>
                                        <label htmlFor="Inputfile">Avatar</label>
                                        <input type="file" className="form-control" id="Inputfile" autoComplete="off" placeholder="picture" name="file" {...register('file')}/>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => setenregistrer(true)}>Enregistrer</button>
                                    <button className="btn btn-danger" onClick={() => setsupprimer(true)}>Supprimer</button>
                                </form>
                            </div>}
                            
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}


























