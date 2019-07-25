import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
const PictureCarousel = (...props) => {
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(null);
	const { pictureList } = props[0];

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
		setDirection(e.direction);
	};

	useEffect(() => {}, []);

	async function getItem(picture) {
		const url = await picture.getDownloadURL();
		return (
			<Carousel.Item key={picture.name}>
				<img className='d-block w-100' src={url} alt='First slide' />
				<Carousel.Caption>
					<h3>{picture.name}</h3>
				</Carousel.Caption>
			</Carousel.Item>
		);
	}

	if (pictureList.items !== undefined) {
		return (
			<div className='pictures'>
				<Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
					{pictureList.items.map(picture => getItem(picture))}
				</Carousel>
			</div>
		);
	} else {
		return <div className='pictures' />;
	}
};

export { PictureCarousel };
