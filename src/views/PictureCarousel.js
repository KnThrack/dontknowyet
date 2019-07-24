import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
const PictureCarousel = props => {
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(null);
	const { pictureList } = props[0];

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
		setDirection(e.direction);
	};

	useEffect(() => {}, []);

	return (
		<Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
			{pictureList.items.map(pictures => (
				<Carousel.Item>
					<img className='d-block w-100' src={pictures.fullPath} alt='First slide' />
					<Carousel.Caption>
						<h3>{pictures.name}</h3>
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export { PictureCarousel };
