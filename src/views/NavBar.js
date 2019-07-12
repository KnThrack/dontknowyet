// src/views/NavBar.js

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const NavBar = () => {
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	let userpicture = "./assets/circle.svg";
	if (isAuthenticated) {
		if (user.picture) {
			userpicture = user.picture;
		}
	}

	//in your component

	function loginout() {
		!isAuthenticated && loginWithRedirect({});
		isAuthenticated && logout();
	}

	return (
		<Navbar expand='lg'>
			<Navbar.Brand href='/'>
				<img alt='' src='./logo.svg' width='30' height='30' className='d-inline-block align-top' />
				{" Dontknowyet"}
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='justify-content-end' justify='true'>
					<Nav.Link href='/'>Home</Nav.Link>
					<Nav.Link href='/profile'>Profile</Nav.Link>
				</Nav>
				<Image onClick={loginout} src={userpicture} roundedCircle height='50px' />
			</Navbar.Collapse>
		</Navbar>
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
