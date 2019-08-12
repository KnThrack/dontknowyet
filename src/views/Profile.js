// src/views/Profile.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

/**
 * @class Profile
 * @classdesc Profile renderer class for the user profile
 * @exports Profile
 * @constructor
 */
const Profile = () => {
	/**
	 * @inner
	 * @memberof Profile
	 * @var {Object} loading do we still load the user
	 * @var {Object} user User object
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
