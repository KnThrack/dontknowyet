// src/views/recipe.js
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Recipe extends Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            recipe: null,
        };
        */
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleJoditInputChange = this.handleJoditInputChange.bind(this);
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        /*
        const recipe = this.props.location.state;

        this.setState({
            recipe
        });
        */
    }

    // handlers
    handleAddIngredient(event) {
        this.props.handleAddIngredient(event, this.props.location.state);
    }

    handleTableChange(event) {
        this.props.handleTableChange(event, this.props.location.state);
    }

    handleInputChange(event) {
        this.props.handleInputChange(event, this.props.location.state);
    }

    handleJoditInputChange(event) {
        this.props.handleJoditInputChange(event, this.props.location.state);
    }

    handleSubmit(event) {
        // submit the changes to the backend
        this.props.handleSubmit(event, this.props.location.state);
    }
    // handlers end

    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => this.jodit = jodit;

    config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    render() {
        // find which one we looking at
        let index = this.props.recipesList.findIndex(x => x._id === this.props.location.state._id.toString());

        const myRecipe = this.props.recipesList[index];
        if (myRecipe === null) return <p>Loading ...</p>;
        return (
            <div key={myRecipe._id.toString()} className="container">
                <Form id="bigform" /*controlId={recipe._id.toString()+".Form"}*/>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlInput1"}*/>
                        <Form.Label htmlFor="title" >Recipe Title</Form.Label>
                        <Form.Control name="title" onChange={this.handleInputChange} id="title" value={myRecipe.title} />
                        <Form.Label htmlFor="name">Recipe Name</Form.Label>
                        <Form.Control name="name" onChange={this.handleInputChange} id="name" value={myRecipe.name} />
                        <Form.Label htmlFor="cuisine" >Cuisine</Form.Label>
                        <Form.Control name="cuisine" onChange={this.handleInputChange} id="cuisine" value={myRecipe.cuisine} as="select">
                            <option>German</option>
                            <option>Chinese</option>
                            <option>Asian</option>
                            <option>French</option>
                            <option>Italian</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlTextarea1"}*/>
                        <JoditEditor
                            editorRef={this.setRef}
                            value={myRecipe.recipe}
                            config={this.config}
                            onChange={this.handleJoditInputChange}
                        />
                        <Form.Label htmlFor="recipe">Recipe</Form.Label>
                        <Form.Control name="recipe" onChange={this.handleInputChange} id="recipe" as="textarea" rows="10" value={myRecipe.recipe} />
                    </Form.Group>
                    <Form.Group>
                        <Table responsive variant="dark">
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                </tr>
                            </thead>
                            {
                                myRecipe.ingredients.map(
                                    (ingredient) =>
                                        <tbody key={(ingredient._id) ? ingredient._id : 1}>
                                            <tr key={(ingredient._id) ? ingredient._id : 1}>
                                                <td><input name={((ingredient._id) ? ingredient._id : 1) + "#ingredient"} type="text" value={ingredient.ingredient} onChange={this.handleTableChange} /></td>
                                                <td><input name={((ingredient._id) ? ingredient._id : 1) + "#quantity"} type="number" value={ingredient.quantity} onChange={this.handleTableChange} /></td>
                                                <td><input name={((ingredient._id) ? ingredient._id : 1) + "#unit"} type="text" value={ingredient.unit} onChange={this.handleTableChange} /></td>
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
                        <Button type="button" variant="primary" onClick={this.handleAddIngredient}>Add Ingredient</Button>
                    </ButtonToolbar>
                </Form>
            </div >
        )
    }
}

export {Recipe};