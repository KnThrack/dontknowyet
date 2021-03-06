// src/views/NavBar.js

import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "../react-auth0-spa";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import * as T from "../declarations/globaltypes";

//import { ReactComponent as Logo } from "../assets/Logosmall.svg";
/**
 * @classdesc This class renders the navigation bar that is displayed in the header
 * @exports NavBar
 * @constructor
 */
const NavBar = (...props: { showNavs: any }[]) => {
	const { showNavs } = props[0];
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
	var enableLink = "hideit";

	let userpicture = "https://unicons.iconscout.com/release/v1.0.0/svg/user-circle.svg";
	if (isAuthenticated) {
		if (user !== undefined) {
			if (user.picture) {
				userpicture = user.picture;
				enableLink = "";
			}
		}
	}

	//in your component

	function loginout() {
		!isAuthenticated && loginWithRedirect({ redirect_uri: "" });
		isAuthenticated && logout({ returnTo: "https://dontknowyet.herokuapp.com/" });

		/*
		isAuthenticated &&
		firebase
			.auth()
			.signOut()
			.then(function() {
				// Sign-out successful.
			})
			.catch(function(error) {
				// An error happened.
			});
			*/
	}

	if (showNavs) {
		return (
			<Navbar expand='lg'>
				<Navbar.Brand href='/'>
					<img src={require("../assets/Logosmall.png")} alt='' width='50' height='50' className='d-inline-block align-top' />
					{" Dontknowyet"}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='justify-content-end' justify={true}>
						<Link className='NavLink' to='/'>
							Home
						</Link>
						<Link className={`NavLink ${enableLink}`} to='/recipes'>
							My Recipes
						</Link>
						<Link className='NavLink' to='/profile'>
							Profile
						</Link>
					</Nav>
					<Image onClick={loginout} src={userpicture} roundedCircle height='50px' />
				</Navbar.Collapse>
			</Navbar>
		);
	} else {
		return (
			<Navbar expand='lg'>
				<Navbar.Brand href='/'>
					<img src={require("../assets/Logosmall.png")} alt='' width='50' height='50' className='d-inline-block align-top' />
					{" Dontknowyet"}
				</Navbar.Brand>
			</Navbar>
		);
	}
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
