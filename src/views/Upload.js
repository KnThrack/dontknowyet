import React, { useState, useEffect } from "react";
import "./upload.css";
import { Dropzone, Progress } from "./";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/storage";

const Upload = (...props) => {
	/*
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [successfullUploaded, setSuccessfullUploaded] = useState(false);
*/
	const { uploadFiles, onFilesAdded, successfullUploaded, uploadProgress, uploading, files, setFiles, setSuccessfullUploaded } = props[0];

	useEffect(() => {}, []);

	function renderProgress(file) {
		const progress = uploadProgress[file.name];
		if (uploading || successfullUploaded) {
			return (
				<div className='ProgressWrapper'>
					<Progress progress={progress ? progress.percentage : 0} />
					<img
						className='CheckIcon'
						alt='done'
						src='baseline-check_circle_outline-24px.svg'
						style={{
							opacity: progress && progress.state === "done" ? 0.5 : 0
						}}
					/>
				</div>
			);
		}
	}

	return (
		<div className='Upload'>
			<span className='Title'>Upload Files</span>
			<div className='Content'>
				<div>
					<Dropzone onFilesAdded={onFilesAdded} disabled={uploading || successfullUploaded} />
				</div>
				<div className='Files'>
					{files.map(file => {
						return (
							<div key={file.name} className='Row'>
								<span className='Filename'>{file.name}</span>
								{renderProgress(file)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export { Upload };
