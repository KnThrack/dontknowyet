import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Recipes from './views/recipes';
import Recipe from './views/recipe';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: "" };

    // bind handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);

    // set the default axios stuff
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
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

  // handlers
  handleAddIngredient(event, childState) {

    const target = event.target;
    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === childState._id.toString());
    // take a copy thats mutable and update it
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes[index] = Object.assign({}, stateCopy.recipes[index]);
    stateCopy.recipe[index].ingredients.push({ _id: 1, ingredient: "", quantity: "", unit: "" });
    this.setState(stateCopy);

  }

  handleTableChange(event, childState) {

  }

  handleInputChange(event, childState) {

    // get the value and move it into the state 
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const recipeField = target.name;

    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === childState._id.toString());

    // change the one we want to fix the state
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes[index] = Object.assign({}, stateCopy.recipes[index]);
    stateCopy.recipes[index][recipeField] = value;
    this.setState(stateCopy);

  }

  handleSubmit(event, childState) {

    event.preventDefault();

    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === childState._id.toString());
    // take a copy thats mutable 
    var stateCopy = Object.assign({}, this.state);
    var recipe = stateCopy.recipes[index];

    // and put it away
    axios.put('https://notsureyetapp.herokuapp.com/api/recipes/' + recipe._id, JSON.stringify(recipe));

  }

  // handlers end 
  RecipeListApp() {

    const recipesList = this.state.recipes;

    if (recipesList) {
      return (
        <div className="App">
          <header className="App-header" />
          <Router>
            <div>
              <Route exact path="/" render={(props) => <Recipes recipesList={recipesList} {...props} />} />
              <Route path="/recipe/:id" render={(props) => <Recipe handleTableChange={this.handleTableChange} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleAddIngredient={this.handleAddIngredient} {...props} />} />
            </div>
          </Router>
        </div>);
    } else {
      return (
        <div>
          <center><h1>Recipes List</h1></center>
          <center><h1>Loading ...</h1></center>
        </div>
      )
    }
  }

  render() {
    return this.RecipeListApp();
  }
}

export default App;

