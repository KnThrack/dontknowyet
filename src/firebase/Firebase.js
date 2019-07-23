import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import axios from "axios";

const firebaseConfig = {
	apiKey: "AIzaSyDqvSOYhQwSshZuNU5HyA2-THt5jmjIq8U",
	authDomain: "dontknowyet.firebaseapp.com",
	databaseURL: "https://dontknowyet.firebaseio.com",
	projectId: "dontknowyet",
	storageBucket: "",
	messagingSenderId: "1016122621793",
	appId: "1:1016122621793:web:1cdc1e8b3a26988e"
};

class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig);

		// auth to firebase with token
		const fireToken = axios({
			method: "get",
			url: "https://notsureyetapp.herokuapp.com/auth/firebase"
		});

		fireToken.then(function(result) {
			firebase.auth()
				.signInWithCustomToken(result.data.firebaseToken)
				.catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorMessage);
					// ...
				});
		});
	}
}

export default Firebase;
