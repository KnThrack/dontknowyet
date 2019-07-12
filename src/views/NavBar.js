// src/views/NavBar.js

import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    //in your component
    function addDefaultSrc(ev) {
        ev.target.src = "../assets/circle.svg";
    }
    function loginout() {
        !isAuthenticated && loginWithRedirect({});
        isAuthenticated && logout();
    }

    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="/">Dontknowyet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">
                            Home
                            </Nav.Link>
                        <Nav.Link href="/profile">
                            <Link to="/profile">Profile</Link>
                        </Nav.Link>
                    </Nav>
                    <Image onError={addDefaultSrc} src={user.picture} rounded onClick={loginout}> </Image>/>
                    </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export { NavBar };



/*
                        <Navbar.Text>
                            Signed in as: <a href="#login">{user.name}</a>
                        </Navbar.Text>

          {!isAuthenticated && (
                <button
                    onClick={() =>
                        loginWithRedirect({})
                    }
                >
                    Log in
        </button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            { NEW - add a link to the home and profile pages }
            {isAuthenticated && (

... DIV
  )}
                        */