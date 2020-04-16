import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//const hideNavbar=false;
export default class Navbar extends Component{

    render(){
        return(
            //
            <nav className="navbar navbar-success navbar-expand-lg" style={{backgroundColor:'#7185fe'}}>

{/* <div class="navbar-brand w-25 p-3"><Link to="/home"><img src="http://pngimg.com/uploads/walt_disney/walt_disney_PNG26.png" style={{width:"16%"}} alt="Walt Disney"/></Link></div> */
}
<Link to="/home" className="navbar-brand text-white">Walt Disney</Link>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link text-white">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/add" className="nav-link text-white">Add Content</Link>
                        </li>

                    </ul>
                        
                            <Link to="/" className="text-white">LogOut</Link>
                   
                    
                </div>
            </nav>
        )
    }
}