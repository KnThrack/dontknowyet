import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onTableChange = this.onTableChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const recipe = this.props.location.state;

        this.setState({
            recipe
        });
    }

    // handlers
    handleAddIngredient(event) {
        const target = event.target;
        // take a copy thats mutable 
        var stateCopy = Object.assign({}, this.state);
        stateCopy.recipe.ingredients.push({ _id:1, ingredient: "", quantity: "",  unit: "" });
        this.setState(stateCopy);
    }

    onTableChange(event) {
        const target = event.target;

    }

    handleInputChange(event) {
        // get the value and move it into the state 
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        // take a copy thats mutable 
        var stateCopy = Object.assign({}, this.state);
        stateCopy.recipe[target.name] = value;
        // set back the mutated copy into the state
        this.setState(stateCopy);

    }

    handleSubmit(event) {
        // submit the changes to the backend
        event.preventDefault();
        // take a copy thats mutable 
        var stateCopy = Object.assign({}, this.state);
        axios.put('https://notsureyetapp.herokuapp.com/api/recipes/' + stateCopy.recipe._id, JSON.stringify(stateCopy.recipe));

    }

    render() {
        const { recipe } = this.state;
        if (recipe === null) return <p>Loading ...</p>;
        return (
            <div key={recipe._id.toString()} className="container">
                <Form id="bigform" /*controlId={recipe._id.toString()+".Form"}*/>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
                        <Form.Label htmlFor="title" >Recipe Title</Form.Label>
                        <Form.Control name="title" onChange={this.handleInputChange} id="title" value={recipe.title} />
                        <Form.Label htmlFor="name">Recipe Name</Form.Label>
                        <Form.Control name="name" onChange={this.handleInputChange} id="name" value={recipe.name} />
                        <Form.Label htmlFor="cuisine" >Cuisine</Form.Label>
                        <Form.Control name="cuisine" onChange={this.handleInputChange} id="cuisine" value={recipe.cuisine} as="select">
                            <option>German</option>
                            <option>Chinese</option>
                            <option>Asian</option>
                            <option>French</option>
                            <option>Italian</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
                        <Form.Label htmlFor="recipe">Recipe</Form.Label>
                        <Form.Control name="recipe" onChange={this.handleInputChange} id="recipe" as="textarea" rows="10" value={recipe.recipe} />
                        <Table responsive variant="dark">
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            {
                                recipe.ingredients.map(
                                    (ingredient) =>
                                        <tbody>
                                            <tr key={ingredient._id}>
                                                <td><input name={ingredient._id.toString()+"ingredient"} type="text" value={ingredient.ingredient} onChange={this.onTableChange} /></td>
                                                <td>{ingredient.quantity}</td>
                                                <td>{ingredient.unit}</td>
                                            </tr>
                                        </tbody>
                                )
                            }
                        </Table>
                    </Form.Group>
                    <ButtonToolbar>
                        <Link to="/">
                            <Button variant="info" title="Go Back">Go Back</Button>
                        </Link>
                        <Button type="submit" variant="primary" onClick={this.handleSubmit}>Submit</Button>
                        <Button type="submit" variant="primary" onClick={this.handleAddIngredient}>Add Ingredient</Button>
                    </ButtonToolbar>
                </Form>
            </div >
        )
    }
}

export default Recipe;