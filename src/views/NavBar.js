// src/views/NavBar.js

import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
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

            {/* NEW - add a link to the home and profile pages */}
            {isAuthenticated && (

                <Navbar>
                    <Navbar.Brand href="#home">Dontknowyetapp Recipe </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">
                                <Link to="/">Home</Link>
                            </Nav.Link>
                            <Nav.Link href="#link">
                                <Link to="/profile">Profile</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{user.name}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>

            )}
        </div>
    );
};

export { NavBar };