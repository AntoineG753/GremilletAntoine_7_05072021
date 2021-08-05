import React, { Component } from 'react';
import iconheader from '../../src/components/img/iconheader.png';

class Header extends Component {

    render() {
        return (
            <div>
                <div className='div_home d-flex justify-content-center'>
                    <header className='header col-lg-11 d-flex justify-content-between'>
                        <h1 className='titreh1_header'>HOME</h1>
                        <img src={iconheader}  alt="logo Groupomania" className="logo_header"/>
                        <h1 className='titreh1_header'>HOME</h1>
                    </header>
                </div>
            </div>
        )
    }

}


export default Header;