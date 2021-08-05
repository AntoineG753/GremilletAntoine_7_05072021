import React, { Component } from 'react';
import Formlogin from './Formlogin';


class Login extends Component {

    render() {
        return (
            <div>
                <header>
                    <h1 className='titreh1_app'>GROUPOMANIA</h1>
                </header>

                <div className='divlogin col-lg-6'>
                    <h2 className='titreh2_login'>LOGIN</h2>
                    <Formlogin />
                </div>
            </div>
        )
    }

}


export default Login;























