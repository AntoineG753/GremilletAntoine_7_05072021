import React, { Component } from 'react';
import axios from 'axios';



class Formlogin extends Component {


    state = {
        email: '',
        password: ''
    }

    // methode qui permet d'ecrire dans le champ de saisie afain de recupé l'information et de la stocker dans le state
    handleEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
    handlePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = data => {
        data.preventDefault();
        
        axios.post("http://localhost:5000/api/auth/login", {"email": `${this.state.email}`, "password": `${this.state.password}`})
            .then(res => {console.log(res)
                sessionStorage.setItem('token', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                localStorage.setItem('name', res.data.name)
                localStorage.setItem('last_name', res.data.last_name)
                localStorage.setItem('role', res.data.role)
            })
            .catch(err => {})
       
    } 

    render () {
        return (
            <div className='divformlogin'>
                <form className="form_divform" onSubmit={this.handleSubmit}>
                    <div className='formgroup'>
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className='formgroup'>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" value={this.state.password} onChange={this.handlePassword} className="form-control"  id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit"  className="btn btn-primary">Connexion</button>
                </form>
            </div>
        )
    }
}


export default Formlogin;




















