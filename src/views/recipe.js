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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        axios.defaults.headers.put['Content-Type'] = 'application/json';
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
        const recipeID = target.name;

        var stateCopy = Object.assign({}, this.state);
        stateCopy.recipe[recipeID] = value;
        this.setState(stateCopy);

    }

    handleSubmit(event) {
        event.preventDefault();
        var stateCopy = Object.assign({}, this.state);
        var test = JSON.stringify(stateCopy.recipe);
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
                    </Form.Group>
                    <Form.Group /*controlId={recipe._id.toString()+".ControlCuisine"}*/>
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
                    </Form.Group>
                    <ButtonToolbar>
                        <Link to="/">
                            <Button variant="info" title="Go Back">Go Back</Button>
                        </Link>
                        <Button type="submit" variant="primary" onClick={this.handleSubmit}>Submit</Button>
                    </ButtonToolbar>
                </Form>
            </div >
        )
    }
}

export default Recipe;