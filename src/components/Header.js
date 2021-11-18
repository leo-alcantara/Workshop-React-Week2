import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Fragment>

<div id="home" className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
    <div className="container">
        <Link className="nav-link navbar-brand text-white" to="/home">REACT</Link>
       <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="container">

              <ul className="navbar-nav ml-auto" >
                  <li className="nav-item active">
                   <Link className="nav-link" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                   <Link className="nav-link" to="/person">Person</Link>
                 </li>
                  <li className="nav-item">
                   <Link className="nav-link" to="/about">About Us</Link>
                  </li>
                  <li className="nav-item">
                   <Link className="nav-link" to="/crud">CRUD</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary btn-sm mt-1">Sign Up</button>
                </li>
                </ul>
            </div>
        </div>
    </div>
</div>
           
         {/*   <div className="container">
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
            </div>*/}
           
        </Fragment>
    );
};

export default Header;