import React, { useState, useEffect } from "react";
import "./upload.css";
import { Dropzone, Progress } from "./";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/storage";

const Upload = (...props) => {
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const [successfullUploaded, setSuccessfullUploaded] = useState(false);
	const { firebaseApp } = props[0];

	useEffect(() => {}, []);

	function onFilesAdded(newfile) {
		setFiles(files.concat(newfile));
	}

	async function uploadFiles() {
		setUploadProgress({});
		setUploading(true);
		const promises = [];
		files.forEach(file => {
			promises.push(sendRequest(file));
		});
		try {
			await Promise.all(promises);
			setSuccessfullUploaded(true);
			setUploading(false);
		} catch (e) {
			// Not Production ready! Do some error handling here instead...
			setSuccessfullUploaded(true);
			setUploading(false);
		}
	}

	function sendRequest(file) {
		return new Promise((resolve, reject) => {
			var storageRef = firebaseApp.storage().ref();

			var metadata = {
				contentType: file.type
			};

			const copy = { ...uploadProgress };
			copy[file.name] = { state: "done", percentage: 0 };
			setUploadProgress(copy);

			storageRef
				.child("users/" + firebaseApp.auth().currentUser.uid + "/" + file.name)
				.put(file, metadata)
				.on(
					firebase.storage.TaskEvent.STATE_CHANGED,
					function(snapshot) {
						// progress
						var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(percent + "% done");
						// Do whatever you want with the native progress event
						const copy = { uploadProgress };
						copy[file.name] = {
							state: "pending",
							percentage: percent
						};
						setUploadProgress(copy);
					},
					function(error) {
						// [START onfailure]
						console.error("Upload failed:", error);
						//handle error
						const copy = { ...uploadProgress };
						copy[file.name] = { state: "error", percentage: 0 };
						setUploadProgress(copy);
						reject(error);
						// [END onfailure]
					},
					function(snapshot) {
						// success !!
						console.log("Uploaded", snapshot.totalBytes, "bytes.");
						console.log("File metadata:", snapshot.metadata);
						// Let's get a download URL for the file.
						snapshot.ref.getDownloadURL().then(function(url) {
							console.log("File available at", url);
						});

						//handle success
						const copy = { ...uploadProgress };
						copy[file.name] = { state: "done", percentage: 100 };
						setUploadProgress(copy);
						resolve(snapshot);
					}
				)
				.catch(function(error) {
					// [START onfailure]
					console.error("Upload failed:", error);
					//handle error
					const copy = { ...uploadProgress };
					copy[file.name] = { state: "error", percentage: 0 };
					setUploadProgress(copy);
					reject(error);
					// [END onfailure]
				});
		});
	}

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

	function renderActions() {
		if (successfullUploaded) {
			return (
				<button
					onClick={() => {
						setFiles([]);
						setSuccessfullUploaded(false);
					}}
				>
					Clear
				</button>
			);
		} else {
			return (
				<button disabled={files.length < 0 || uploading} onClick={uploadFiles}>
					Upload
				</button>
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
			<div className='Actions'>{renderActions()}</div>
		</div>
	);
};

export { Upload };
