import React from "react";
import { Loading } from "./views";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";
import axios from "axios";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";
// styles
//import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.scss";
/* //fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
*/

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function getToken(getTokenSilently) {
	// add auth token to axios

	const token = await getTokenSilently();
	// set auth headers

	// auth to firebase with token
	const fireToken = (await axios.get("https://notsureyetapp.herokuapp.com/auth/firebase")).data;
	firebase.auth()
		.signInWithCustomToken(fireToken)
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			// ...
		});

	return token;
}

const Base = () => {
	const { getTokenSilently } = useAuth0();
	const { loading, user } = useAuth0();

	if (loading) {
		return <Loading />;
	}

	return <App token={getToken(getTokenSilently)} user={user} />;
};

export default Base;
