// src/views/recipes.js
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Recipes extends Component {

    state = {
        recipes: []
    }

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }


    async callAPI() {

        // get the initial recipes
        const recipes = (await axios.get("https://notsureyetapp.herokuapp.com/api/recipes")).data;

        this.setState({
            recipes: recipes.data,
        });

    }

    async componentDidMount() {
        // get the initial recipes
        this.callAPI();
    }

    RecipeList(recipes) {
        if (recipes) {
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
        }
    }

    render() {
        return this.RecipeList(this.state.recipes);
    }
}

export default Recipes;


