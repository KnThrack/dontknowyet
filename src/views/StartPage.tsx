import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
/**
 * @classdesc this class renders the start page of the website
 * @exports StartPage
 * @constructor
 */

 const StartPage = (...props: { setPageState: any | undefined }[]) => {
	const { setPageState } = props[0];

	useEffect(() => {
		if (setPageState !== undefined) {
			setPageState(EpageState.home);
		}
	}, []);

	return (
		<div className='App-Home'>
			<Jumbotron className='App-Jumbo'>
				<h1>Dontknowyet App</h1>
				<p>Put some text here in the future to explain what the App is etc...</p>
				<p>You need to log in to use the application !</p>
			</Jumbotron>
		</div>
	);
};

export { StartPage };

/*
			<Image
				className='Home-Picture'
				src='https://firebasestorage.googleapis.com/v0/b/dontknowyet.appspot.com/o/public%2Ffoodpicture.jpg?alt=media&token=17aed28d-eb6f-48e1-ad2b-e3a4a5fc8365'
				rounded
			/>
*/
