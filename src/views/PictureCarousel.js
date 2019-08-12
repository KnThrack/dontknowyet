import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

/**
 * @classdesc PictureCarousel renderer for the Upload class
 * @class PictureCarousel
 * @exports PictureCarousel
 * @constructor
 * @inner
 * @memberof Upload
 */
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
			<div className='pictures-outer'>
				<Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
					{pictureList.map(function picture(picture) {
						if (picture.recipe_id === recipeID) {
							return (
								<Carousel.Item className='recipe_picture' key={picture.name}>
									<img className='recipe_picture' src={picture.url} alt='First slide' />
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
