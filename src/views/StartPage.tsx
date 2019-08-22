import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import "../declarations/globaltypes"
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
				<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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
