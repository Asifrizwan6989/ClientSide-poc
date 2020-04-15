import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//const hideNavbar=false;
export default class Navbar extends Component{

    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
                <Link to="/home" className="navbar-brand">Walt Disney</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link">Add Content</Link>
                        </li>

                    </ul>
                        <button className="btn-dark">
                            <Link to="/">LogOut</Link>
                        </button>
                    
                </div>
            </nav>
        )
    }
}