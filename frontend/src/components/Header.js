import React, { Component } from 'react';
import iconheader from '../../src/components/img/iconheader.png';

class Header extends Component {

    render() {
        return (
            <div>
                <div className='div_home d-flex justify-content-center'>
                    <header className='header col-lg-12 d-flex justify-content-center'>    
                        <img src={iconheader}  alt="logo Groupomania" className="logo_header"/>
                    </header>
                </div>
            </div>
        )
    }

}


export default Header;