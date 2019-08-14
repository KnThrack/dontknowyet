import React, { FunctionComponent, useEffect } from "react";
import "./upload.css";
import { Dropzone, Progress } from ".";
// Add the Firebase products that you want to use
import "firebase/storage";

/**
 * @classdesc The Upload class takes care of all the upload functionalities and propagates most of the actual function to the app class
 * @class Upload
 * @exports Upload
 * @constructor
 */

const Upload : FunctionComponent<any> = (...props) => {
	/*
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [successfullUploaded, setSuccessfullUploaded] = useState(false);
*/
	const { onFilesAdded, successfullUploaded, uploadProgress, uploading, files } = props[0];

	useEffect(() => {}, []);

	/**
	 * @function renderProgress renders the progress of the file upload
	 * @param {Object} file - The file being uploaded.
	 * @inner
	 * @memberof Upload
	 */
	function renderProgress(file: { name: React.ReactText; }) {
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
		<div className='upload'>
			<div className='upload-content'>
				<div>
					<Dropzone onFilesAdded={onFilesAdded} disabled={uploading || successfullUploaded} />
				</div>
				<div className='Files'>
					{files.map((file: { name: string; }) => {
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
