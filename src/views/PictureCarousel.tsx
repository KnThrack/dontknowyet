import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import * as T from "../declarations/globaltypes";
/**
 * @classdesc PictureCarousel renderer for the Upload class
 * @exports PictureCarousel
 * @constructor
 * @inner
 * @memberof Upload
 */

const PictureCarousel = (...props: { pictureList: T.Ipicture[]; recipeID: string; }[]) => {

	//const [images, setImages] = useState([]);
	const { pictureList, recipeID } = props[0];

	useEffect(() => {}, []);

	if (pictureList.length !== 0) {
		return (
			<div className='pictures-outer'>
				<Carousel>
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
