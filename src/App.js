import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component";
import LoginPage from "./components/login.component";
import HomePage from "./components/home.component";
import AddPage from "./components/addContent.component";
import EditPage from "./components/editContent.component";
import ShowPage from "./components/showContent.component";
import paginationPage from "./components/tablewithpagination.component"

const nav=   {navigationOptions : {
    header: null,
}};

function App() {
  return (
    <Router > 
      <Route path="/" exact component={LoginPage} nav/>
      <Navbar/>
      <br/>
      <Route path="/home" exact component={paginationPage}/>
      <Route path="/add" exact component={AddPage}/>
      <Route path="/show/:id" exact component={ShowPage}/>
      <Route path="/edit/:id" exact component={EditPage}/>
      <Route path="/alter" exact component={HomePage}/>
    </Router>
  
  );
}

 export default App;
