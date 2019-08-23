// src/views/Loading.js
import React from "react";
import * as T from "../declarations/globaltypes";
/**
 * @classdesc render the loading circle
 * @exports Loading
 * @constructor
 */
const Loading = () => (
	<div className='spinner'>
		<img src={require("../assets/loading.svg")} alt='Loading' />
	</div>
);

export { Loading };
