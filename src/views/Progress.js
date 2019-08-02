import React from "react";
import "./progress.css";

const Progress = (...props) => {
	const { progress } = props[0];

	return (
    <div className="ProgressBar">
    <div
      className="Progress"
      style={{ width: progress + "%" }}
    />
  </div>
	);
};

export { Progress };
