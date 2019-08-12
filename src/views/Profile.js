// src/views/Profile.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

/**
 * @classdesc Profile renderer class for the user profile
 * @exports Profile
 * @constructor
 */
const Profile = () => {
	/**
	 * @memberof Profile
	 * @typedef {Object} user User object
	 */
	/**
	 * @memberof Profile
	 * @typedef {Object} loading do we still load the user
	 */

	const { loading, user } = useAuth0();

	if (loading || !user) {
		return "Loading...";
	}

	return (
		<>
			<img src={user.picture} alt='Profile' />

			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<code>{JSON.stringify(user, null, 2)}</code>
		</>
	);
};

export { Profile };
