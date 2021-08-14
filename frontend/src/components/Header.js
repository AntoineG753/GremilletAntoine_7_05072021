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
                <div className='div_home d-flex justify-content-center'>
                    <header className='header col-lg-11 d-flex justify-content-between p-2'>    
                        <a href="http://localhost:3000/home"><img src={iconheader}  alt="logo Groupomania" className="logo_header"/></a>
                        <div className="pt-4 col-lg-2 ">
                            <ul className="ul d-flex justify-content-between">
                                {history.location.pathname === '/home' && <li><a className="a_header" href="http://localhost:3000/account">Compte</a></li>}
                                <li><a className="a_header_deconnexion" onClick={handleDeconnexion}>Déconnexion</a></li>
                            </ul>
                        </div>
                    </header>
                </div>
            </div>
        )
    

}

