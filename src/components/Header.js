import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Fragment>
           
            <div className="container">
            <ul className="nav nav-pills nav-fill bg-dark">
                <li className="navbar-brand">
                    <Link className="nav-link text-white" to="/home">REACT</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white mt-2" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white mt-2" to="/person">Person</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white mt-2" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                    <button className="btn btn-primary btn-sm mt-2">Sign Up</button>
                </li>
            </ul>
            </div>
           
        </Fragment>
    );
};

export default Header;