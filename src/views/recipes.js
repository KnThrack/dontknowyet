// src/views/recipes.js

import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom';

const Recipes = ({ recipes, that }) => {
    return (
        <div>
            <center><h1>Recipes List</h1></center>
            {
                recipes.map(
                    (recipe) =>
                        <Card key={recipe._id.toString()} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{recipe.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{recipe.cuisine}</Card.Subtitle>
                                <Card.Text>
                                    {recipe.recipe}
                                </Card.Text>
                                <Link to={{ pathname: "/recipe/" + recipe._id.toString(), state: recipe }}>
                                        <Button variant="info" title="Go to Details">Go to Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                )
            }
        </div>
    )
};

export default Recipes;
