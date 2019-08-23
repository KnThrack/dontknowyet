// src/views/Profile.js

import React, { FunctionComponent, useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Image from "react-bootstrap/Image";
import * as T from "../declarations/globaltypes";
/**
 * @classdesc Profile renderer class for the user profile
 * @returns {Object} returns the jsx string for react
 * @exports Profile
 * @constructor
 */
const Profile: FunctionComponent<any> = () => {
	/**
	 * @memberof Profile
	 * @typedef {Object} user - User object
	 */
	/**
	 * @memberof Profile
	 * @typedef {Object} loading - do we still load the user
	 */

	const { loading, user } = useAuth0();

	useEffect(() => {
		console.log(`test`);
	}, []);

	/*
	if (loading || !user) {
		return (<div>Loading...</div>);
	}
*/
	return (
		<div>
			<Image src={user.picture} alt='Profile' fluid />
			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<code>{JSON.stringify(user, null, 2)}</code>
		</div>
	);
};

export { Profile };
