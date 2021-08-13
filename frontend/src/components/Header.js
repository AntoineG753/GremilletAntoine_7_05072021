import React, { Component } from 'react';
import iconheader from '../../src/components/img/iconheader.png';

class Header extends Component {

    render() {
        return (
            <div>
                <div className='div_home d-flex justify-content-center'>
                    <header className='header col-lg-11 d-flex justify-content-between p-2'>    
                        <a href="http://localhost:3000/home"><img src={iconheader}  alt="logo Groupomania" className="logo_header"/></a>
                        <div className="pt-4">
                            <ul className="ul">
                                <li><a className="a_header" href="http://localhost:3000/account">Compte</a></li>
                            </ul>
                        </div>
                    </header>
                </div>
            </div>
        )
    }

}


export default Header;