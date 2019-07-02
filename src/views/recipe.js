import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const recipe = this.props.location.state;
        // const recipe = (await axios.get(`https://notsureyetapp.herokuapp.com/api/recipes/${params.recipeId}`)).data;
        this.setState({
            recipe
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name.split("#");
        const recipeID = name[0];
        const recipeField = name[1];

        let index = this.state.recipes.findIndex(x => x._id === recipeID.toString());

        var stateCopy = Object.assign({}, this.state);
        stateCopy.recipes = stateCopy.recipes.slice();
        stateCopy.recipes[index] = Object.assign({}, stateCopy.recipes[index]);
        stateCopy.recipes[index][recipeField] = value;
        this.setState(stateCopy);

    }

    render() {
        const { recipe } = this.state;
        if (recipe === null) return <p>Loading ...</p>;
        return (
            <div key={recipe._id.toString()} className="container">
                <Form id="bigform" /*controlId={recipe._id.toString()+".Form"}*/>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
                        <Form.Label htmlFor="title" >Recipe Title</Form.Label>
                        <Form.Control name={recipe._id.toString() + "#title"} onChange={this.handleInputChange} id="title" value={recipe.title} />
                        <Form.Label htmlFor="name">Recipe Name</Form.Label>
                        <Form.Control name={recipe._id.toString() + "#name"} onChange={this.handleInputChange} id="name" value={recipe.name} />
                    </Form.Group>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlCuisine"}*/>
                        <Form.Label htmlFor="cuisine" >Cuisine</Form.Label>
                        <Form.Control name={recipe._id.toString() + "#cuisine"} onChange={this.handleInputChange} id="cuisine" value={recipe.cuisine} as="select">
                            <option>German</option>
                            <option>Chinese</option>
                            <option>Asian</option>
                            <option>French</option>
                            <option>Italian</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
                        <Form.Label htmlFor="recipe">Recipe</Form.Label>
                        <Form.Control name={recipe._id.toString() + "#recipe"} onChange={this.handleInputChange} id="recipe" as="textarea" rows="10" value={recipe.recipe} />
                    </Form.Group>
                    <Link to="/">
                            <Button variant="info" title="Go Back">Go Back</Button>
                    </Link>
                </Form>
            </div >
        )
    }
}

export default Recipe;