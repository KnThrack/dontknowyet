import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Recipes from './views/recipes';
import Recipe from './views/recipe';
import NavBar from "./views/NavBar";
import Profile from "./views/Profile";
import PrivateRoute from "./views/PrivateRoute";

const util = require('util')
var _ = require('underscore');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: "", user: "" };

    // bind handlers
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleJoditInputChange = this.handleJoditInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    

    // set the default axios stuff
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.get['Content-Type'] = 'application/json';
  }


  async callAPI() {

    // get the initial recipes
    const recipes = (await axios.get("https://notsureyetapp.herokuapp.com/api/recipes?user=" + this.state.user._id)).data;

    this.setState({
      recipes: recipes.data,
    });

  }

  async componentDidMount() {

    // get the initial recipes
    await this.props.token.then(function (result) {
      axios.defaults.headers.post['Authorization'] = 'Bearer ' + result;
      axios.defaults.headers.delete['Authorization'] = 'Bearer ' + result;
      axios.defaults.headers.get['Authorization'] = 'Bearer ' + result;
      axios.defaults.headers.put['Authorization'] = 'Bearer ' + result;
    });

    // before we can get the initial list we need the user to be there. 
    let user = (await axios.get("https://notsureyetapp.herokuapp.com/api/users?email=" + this.props.user.email)).data;

    // if user is not there yet (web hooks in Auth0 dont work with google) then create it instead
    if (user.data === null || user.data === undefined) {
      // handle error / no data
      // no user is here so lets make a new one 
      let createUser = {
        name: this.props.user.name,
        email: this.props.user.email,
        auth0ID: this.props.user.sub,
      };

      const newUser = (await axios.post('https://notsureyetapp.herokuapp.com/api/users/', JSON.stringify(createUser))).data;
      user = newUser;
    }

    // handle success
    this.setState({
      user: user.data[0]
    });

    this.callAPI();
  }

  async updateIngredients(state) {

    // and put it away
    const updateRecipe = (await axios.put('https://notsureyetapp.herokuapp.com/api/recipes/' + state._id, JSON.stringify(state))).data.data;

    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === updateRecipe._id.toString());
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes[index] = updateRecipe;

    // update it
    this.setState(stateCopy);

  }

  async addRecipe(newObject) {

    // and put it away
    const newRecipe = (await axios.post('https://notsureyetapp.herokuapp.com/api/recipes/', JSON.stringify(newObject))).data.data;

    // add it in
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes.push(newRecipe);

    // update it
    this.setState(stateCopy);

  }

  // handlers

  handleAddRecipe(event) {
    const newRecipe = {
      name: _.uniqueId("newRecipe"),
      title: "",
      cuisine: "",
      ingredients: [],
      recipe: "",
      user: this.state.user._id
    }
    this.addRecipe(newRecipe);
  }

  handleAddIngredient(event, childState) {

    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === childState._id.toString());
    // take a copy thats mutable and update it
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes[index] = Object.assign({}, stateCopy.recipes[index]);
    stateCopy.recipes[index].ingredients.push({ ingredient: "", quantity: 0, unit: "" });

    //update it
    this.updateIngredients(stateCopy.recipes[index]);

  }

  handleTableChange(event, childState) {

    // get the value and move it into the state 
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const ingredientsField = target.name.split("#");

    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === childState._id.toString());

    // change the one we want to fix the state
    var stateCopy = Object.assign({}, this.state);
    stateCopy.recipes = stateCopy.recipes.slice();
    stateCopy.recipes[index] = Object.assign({}, stateCopy.recipes[index]);

    // find which one we updating
    let ingredientIndex = stateCopy.recipes[index].ingredients.findIndex(x => x._id === ingredientsField[0].toString());

    // update it
    stateCopy.recipes[index].ingredients[ingredientIndex][ingredientsField[1]] = value;
    this.setState(stateCopy);

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

  handleJoditInputChange(value, childState) {

    const recipeField = "recipe";

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

  handleDelete(event) {

    const recipeTarget = event.target.name.split("#");
    // find which one we updating
    let index = this.state.recipes.findIndex(x => x._id === recipeTarget[1]);
    // take a copy thats mutable 
    var stateCopy = Object.assign({}, this.state);
    var recipe = stateCopy.recipes[index];

    // and put it away
    axios.delete('https://notsureyetapp.herokuapp.com/api/recipes/' + recipe._id)
      .then(function (response) {
        // handle success
        this.setState(_.without(stateCopy, recipe));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }

  // handlers end  

  RecipeListApp() {

    const recipesList = this.state.recipes;

    if (recipesList) {
      return (
        <div className="App">
          <Router>
            <header className="App-header">
              <NavBar />
            </header>

            <div>
              <PrivateRoute exact path="/" render={(props) => <Recipes recipesList={recipesList} handleAddRecipe={this.handleAddRecipe} handleDelete={this.handleDelete} {...props} />} />
              <PrivateRoute path="/recipe/:id" render={(props) => <Recipe recipesList={recipesList} handleTableChange={this.handleTableChange} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleJoditInputChange={this.handleJoditInputChange} handleAddIngredient={this.handleAddIngredient} {...props} />} />
            </div>

            <Switch>
              <Route path="/" exact />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Router>
        </div>);
    } else {
      return (
        <div className="App">
          <header className="App-header" />
          <Router>
            <NavBar />
          </Router>
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

