import React from "react";
import App from "./App";
import { useAuth0 } from "./react-auth0-spa";
import { NavBar, StartPage, Loading } from "./views";
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

/**
 * @classdesc this class is the very top controller of the application
 * @class Base
 * @exports Base
 * @constructor
 */
const Base = () => {
	const { getTokenSilently } = useAuth0();
	const { loading, user } = useAuth0();

	if (loading) {
		return (
			<div className='App'>
				<header className='App-header'>
					<NavBar showNavs={false} />
				</header>
				<div className='App-content'>
					<StartPage />
					<Loading />
				</div>
			</div>
		);
	}

	return <App token={getToken(loading, getTokenSilently)} user={user} />;
};

export default Base;
