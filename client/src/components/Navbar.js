import React from 'react';
import { ACCES_TOKEN_NAME } from "../constants/constant";
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link,
    withRouter
  } from "react-router-dom";
 


const NavBar = (props) => {

  const logout = () => {
    localStorage.removeItem(ACCES_TOKEN_NAME);
    props.history.push("/login");
  };

    return(
        <div className="App">
    <ReactBootStrap.Navbar  fixed="top" collapseOnSelect expand="xl" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand>CSGO-TRADEBASE</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav className="mr-auto"> 
    <Link to="/posts">
    <ReactBootStrap.Nav.Link href="#pricing">Posts</ReactBootStrap.Nav.Link>
    </Link>
    <Link to={`/users/perfil/`}>
    <ReactBootStrap.Nav.Link href="#pricing">Mi perfil</ReactBootStrap.Nav.Link>
    </Link>
      
    <div>
        <button class="btn btn-danger" onClick={() => logout()}>
          Cerrar Sesión
        </button>
    </div>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
</div>
    )
}

export default withRouter(NavBar);