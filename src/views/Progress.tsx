import React from "react";
import "./progress.css";

/**
 * @classdesc Progress renderer for the Upload class
 * @exports Progress
 * @constructor
 * @inner
 * @memberof Upload
 */
const Progress = (...props: { progress: any; }[]) => {
	const { progress } = props[0];

	return (
		<div className='ProgressBar'>
			<div className='Progress' style={{ width: progress + "%" }} />
		</div>
	);
};

export { Progress };
