import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
const PictureCarousel = (...props) => {
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(null);
	const [images, setImages] = useState([]);
	const { pictureList, recipeID } = props[0];

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
		setDirection(e.direction);
	};

	useEffect(() => {}, []);

	if (pictureList.length !== 0) {
		return (
			<div className='pictures'>
				<Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
					{pictureList.map(function picture(picture) {
						if (picture.recipe_id === recipeID) {
							return (
								<Carousel.Item key={picture.name}>
									<img className='d-block w-100' src={picture.url} alt='First slide' />
									<Carousel.Caption>
										<h3>{picture.name}</h3>
									</Carousel.Caption>
								</Carousel.Item>
							);
						}
						return null;
					})}
				</Carousel>
			</div>
		);
	} else {
		return <div className='pictures' />;
	}
};

export { PictureCarousel };
