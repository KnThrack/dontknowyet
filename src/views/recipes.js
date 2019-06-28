// src/views/recipes.js

import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Recipes = ({ recipes }) => {
    return (
        <div Id="bigform">
            <center><h1>Recipesss List</h1></center>
            {
                recipes.data.map((recipe) =>
                    <div key={recipe._id.toString()}>
                        <Form controlId={recipe._id.toString()+".Form"}>
                            <Form.Group controlId={recipe._id.toString()+".ControlInput1"}>
                                <Form.Label htmlFor="title" >Recipe Title</Form.Label>
                                <Form.Control id="title" value={recipe.title} />
                                <Form.Label htmlFor="name">Recipe Name</Form.Label>
                                <Form.Control id="name" value={recipe.name} />
                            </Form.Group>
                            <Form.Group controlId={recipe._id.toString()+".ControlCuisine"}>
                                <Form.Label htmlFor="cuisine" >Cuisine</Form.Label>
                                <Form.Control id="cuisine" value={recipe.cuisine} as="select">
                                    <option>German</option>
                                    <option>Chinease</option>
                                    <option>Asian</option>
                                    <option>French</option>
                                    <option>Italian</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId={recipe._id.toString()+".ControlTextarea1"}>
                                <Form.Label htmlFor="recipe">Recipe</Form.Label>
                                <Form.Control id="recipe" as="textarea" rows="10" value={recipe.recipe}/>
                            </Form.Group>
                        </Form>
                    </div>
                )
            }
        </div>
    )
};

export default Recipes

/*
                <div key={recipe._id.toString()} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{recipe.cuisine}</h6>
                        <p className="card-text">{recipe.title}</p>
                    </div>
                </div>
*/

