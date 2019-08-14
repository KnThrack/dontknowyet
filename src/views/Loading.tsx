// src/views/Loading.js
import React from "react";
import loading from "../assets/loading.svg";

/**
 * @classdesc render the loading circle
 * @exports Loading
 * @constructor
 */
const Loading = () => (
	<div className='spinner'>
		<img src={loading} alt='Loading' />
	</div>
);

export { Loading };
