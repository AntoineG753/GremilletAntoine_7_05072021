import React from 'react';
import iconheader from '../../src/components/img/iconheader.png';
import { useHistory } from 'react-router-dom';

export default function Header() {

    const history = useHistory();
    const handleDeconnexion = () => {
        localStorage.clear()
        history.push('/');
    }


    return (
        <div>
            <div className='d-flex justify-content-center'>
                <header className='header col-lg-11 col-md-12 col-12 d-flex justify-content-lg-between justify-content-md-between pt-1 p-lg-2 p-md-2 p-1'>
                    <a href="http://localhost:3000/home" className="col-lg-7 col-md-7 col-6"><img src={iconheader} alt="logo Groupomania" className="logo_header col-lg-5 col-md-9 col-11" /></a>
                    <div className="pt-lg-4 p-md-3 pt-1 col-lg-2 col-md-4 col-6">
                        <ul className="ul d-flex justify-content-between ">
                            {history.location.pathname === '/home' && <li><a className="a_header" href="http://localhost:3000/account">Compte</a></li>}
                            <li><a className="a_header_deconnexion" href="/" onClick={handleDeconnexion}>Déconnexion</a></li>
                        </ul>
                    </div>
                </header>
            </div>
        </div>
    )


}

