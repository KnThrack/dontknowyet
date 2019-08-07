import React, { useEffect } from "react";
import Background from "../assets/background.svg";

const StartPage = (...props) => {
	const { setPageState } = props[0];

	useEffect(() => {
		if (setPageState !== undefined) {
			setPageState({ page: "home" });
		}
	}, []);

	return (
		<div className='App-Home'>
			<h1>Hello world!</h1>
		</div>
	);
};

export { StartPage };
