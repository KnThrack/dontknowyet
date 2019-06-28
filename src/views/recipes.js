// src/views/recipes.js

import React from 'react'
import Form from 'react-bootstrap/Form'

const Recipes = ({ recipes }) => {
    return (
        <div>
            <center><h1>Recipesss List</h1></center>
            {
                recipes.data.map((recipe) =>
                    <div key={recipe._id.toString()}>
                        <Form>
                            <Form.Group controlId={recipe._id.toString()+".ControlInput1"}>
                                <Form.Label>Recipe Title</Form.Label>
                                <Form.Control value={recipe.title} />
                                <Form.Label>Recipe Name</Form.Label>
                                <Form.Control value={recipe.name} />
                            </Form.Group>
                            <Form.Group controlId={recipe._id.toString()+".ControlCuisine"}>
                                <Form.Label>Cuisine</Form.Label>
                                <Form.Control value={recipe.cuisine} as="select">
                                    <option>German</option>
                                    <option>Chinease</option>
                                    <option>Asian</option>
                                    <option>French</option>
                                    <option>Italian</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId={recipe._id.toString()+".ControlTextarea1"}>
                                <Form.Label>Recipe</Form.Label>
                                <Form.Control as="textarea" rows="10" value={recipe.recipe}/>
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

