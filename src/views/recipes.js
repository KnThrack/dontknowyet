// src/views/recipes.js

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Recipes = ({ recipes, that }) => {
    return (
        <div>
            <center><h1>Recipes List</h1></center>
            {
                recipes.map(
                    (recipe) =>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{recipe.cuisine}</Card.Subtitle>
                                <Card.Text>
                                    {recipe.recipe}
                                </Card.Text>
                                <Button variant="info" title="Go to Details" onPress={() => that.props.navigation.navigate('Details', { recipeId: recipe._id.toString() })} />
                            </Card.Body>
                        </Card>
                )
            }
        </div>
    )
};

export default Recipes

/*old form
                        <Form id="bigform" /*controlId={recipe._id.toString()+".Form"}>
                        <Form.Group controlId={recipe._id.toString()+".ControlInput1"}>
                        <Form.Label htmlFor="title" >Recipe Title</Form.Label>
                        <Form.Control name={recipe._id.toString()+"#title"} onChange={that.handleInputChange} id="title" value={recipe.title} />
                        <Form.Label htmlFor="name">Recipe Name</Form.Label>
                        <Form.Control name={recipe._id.toString()+"#name"} onChange={that.handleInputChange} id="name" value={recipe.name} />
                    </Form.Group>
                    <Form.Group controlId={recipe._id.toString()+".ControlCuisine"}>
                        <Form.Label htmlFor="cuisine" >Cuisine</Form.Label>
                        <Form.Control name={recipe._id.toString()+"#cuisine"} onChange={that.handleInputChange} id="cuisine" value={recipe.cuisine} as="select">
                            <option>German</option>
                            <option>Chinese</option>
                            <option>Asian</option>
                            <option>French</option>
                            <option>Italian</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={recipe._id.toString()+".ControlTextarea1"}>
                        <Form.Label htmlFor="recipe">Recipe</Form.Label>
                        <Form.Control name={recipe._id.toString()+"#recipe"} onChange={that.handleInputChange} id="recipe" as="textarea" rows="10" value={recipe.recipe}/>
                    </Form.Group>
                    <Button variant="info" title="Go to Details" onPress={() => that.props.navigation.navigate('Details', { recipeId: recipe._id.toString() })} />
                </Form>



                <div key={recipe._id.toString()} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{recipe.cuisine}</h6>
                        <p className="card-text">{recipe.title}</p>
                    </div>
                </div>
*/

