import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from 'axios';







 function Formlogin() {
    
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const dispatch = useDispatch();
    const [uuidUser, setuuidUser] = useState();
    const [ctachConnect, setcatchConnect] = useState(false)




    const onSubmit = data => {
        
        axios.post("http://localhost:5000/api/auth/login", {"email": `${data.email}`, "password": `${data.password}`})
            .then(res => {
                dispatch({ type: 'connected' })
                console.log(res)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('last_name', res.data.last_name)
                localStorage.setItem('role', res.data.role)
                localStorage.setItem('avatar', res.data.avatar)
                setuuidUser(res.data.userId)
               
                history.push('/home');
            })
            .catch(err =>  {setcatchConnect(true)})
       
    };
    
        return (
            <div className='divformlogin'>
                <form className="form_divform" onSubmit={handleSubmit(onSubmit)}>
                    <div className='formgroup'>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" {...register('email', {required:true})}/>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control"  id="exampleInputPassword1" autoComplete="off" placeholder="Password" name="password" {...register('password', {required:true})}/>
                    </div>
                    <button className="btn btn-primary">Connexion</button>
                    { ctachConnect === true && <p className="message_catch">Email ou Password incorrect</p> }
                </form>
            </div>
        )
    };


export default Formlogin;


















