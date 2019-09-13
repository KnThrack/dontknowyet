import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import * as types from "../declarations/globaltypes";
/**
 * @classdesc this class renders the start page of the website
 * @exports StartPage
 * @constructor
 */

const StartPage = (...props: { setPageState: any | undefined }[]) => {
	const { setPageState } = props[0];

	useEffect(() => {
		if (setPageState !== undefined) {
			setPageState(types.EpageState.home);
		}
	}, []);

	return (
		<div className='App-Home'>
			<div className='App-Home_1'>
				<Jumbotron className='App-Jumbo'>
					<h1>Dontknowyet App</h1>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					</p>
				</Jumbotron>
			</div>
			<div className='App-Home_2'>
				<div className='App-Home2-text'>
					<p>Dont know yet is your Cookbook reinvented !</p>
				</div>
			</div>
			<div className='App-Home_3'>
				<div className='App-Home3-picture'></div>
				<div className='App-Home3-text'>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
						voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
					</p>
				</div>
			</div>
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
