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
                    <header className='header col-lg-11 col-md-12 col-12 d-flex justify-content-lg-between justify-content-md-between pt-1 p-lg-2 p-md-2'>    
                        <a href="http://localhost:3000/home" className="col-7"><img src={iconheader}  alt="logo Groupomania" className="logo_header col-lg-6 col-md-9 col-9"/></a>
                        <div className="pt-lg-4 p-md-3 pt-1 col-lg-2 col-md-4 col-2">
                            <ul className="ul d-flex justify-content-between ">
                                {history.location.pathname === '/home' && <li><a className="a_header" href="http://localhost:3000/account">Compte</a></li>}
                                <li><a className="a_header_deconnexion" onClick={handleDeconnexion}>Déconnexion</a></li>
                            </ul>
                        </div>
                    </header>
                </div>
            </div>
        )
    

}

