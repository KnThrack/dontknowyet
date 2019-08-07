import React from "react";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";
import { NavBar, Profile, StartPage, Loading } from "./views";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// styles
//import "samples-bootstrap-theme/dist/css/auth0-theme.css";
import "./App.scss";
/* //fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
*/

async function getToken(loading, getTokenSilently) {
	// add auth token to axios
	if (!loading) {
		const token = await getTokenSilently();
		// set auth headers
		return token;
	}
}

const Base = () => {
	const { getTokenSilently } = useAuth0();
	const { loading, user } = useAuth0();

	if (loading) {
		return (
			<div className='App'>
				<Router>
					<header className='App-header'>
						<NavBar />
					</header>
					<div className='App-content'>
						<StartPage />
						<Loading />
					</div>
				</Router>
			</div>
		);
	}

	return <App token={getToken(loading, getTokenSilently)} user={user} />;
};

export default Base;
