import React from 'react';
import logo from '../../../assets/images/icons/logo.png'

const Header = () => {
    return (
        <div className="navbar bg-base-100 nav-bg">
            <div className="navbar-start">
                    
            </div>
                <div className="navbar-center">
                    <img src={logo} alt="" />
                    <a className="ml-4 text-4xl md:text-6xl family-rancho text-white">Espresso Emporium</a>
            </div>
            <div className="navbar-end">
                    
            </div>
        </div>
    );
};

export default Header;