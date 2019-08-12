import React, { useState, useRef } from "react";
import "./upload.css";

/**
 * @classdesc Dropzone renderer for the Upload class
 * @class Dropzone
 * @exports Dropzone
 * @constructor
 * @inner
 * @memberof Upload
 */
const Dropzone = (...props) => {
	const [hightlight, setHightlight] = useState(false);
	const { onFilesAdded, disabled } = props[0];
	const fileInputRef = useRef(null);

	function openFileDialog() {
		if (disabled) return;
		fileInputRef.current.click();
	}

	function onFilesAddedlocal(evt) {
		if (disabled) return;
		const files = evt.target.files;
		if (onFilesAdded) {
			const array = fileListToArray(files);
			onFilesAdded(array);
		}
	}

	function onDragOver(event) {
		event.preventDefault();
		if (disabled) return;
		setHightlight(true);
	}

	function onDragLeave(event) {
		setHightlight(false);
	}

	function onDrop(event) {
		event.preventDefault();
		if (disabled) return;
		const files = event.dataTransfer.files;
		if (onFilesAdded) {
			const array = fileListToArray(files);
			onFilesAdded(array);
		}
		setHightlight(false);
	}

	function fileListToArray(list) {
		const array = [];
		for (var i = 0; i < list.length; i++) {
			array.push(list.item(i));
		}
		return array;
	}

	return (
		<div
			className={`Dropzone ${hightlight ? "Highlight" : ""}`}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onClick={openFileDialog}
			style={{ cursor: disabled ? "default" : "pointer" }}
		>
			<input ref={fileInputRef} className='FileInput' type='file' multiple onChange={onFilesAddedlocal} />
			<img alt='upload' className='Icon' src='https://unicons.iconscout.com/release/v1.0.0/svg/upload.svg' />
			<span>Upload Files</span>
		</div>
	);
};

export { Dropzone };
