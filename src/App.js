import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Recipes from './views/recipes';
import Recipe from './views/recipe';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { recipes: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

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
  handleInputChange(event) {
    // deprecated !
    /*
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
*/
  }

  handleSubmit(event) {
    // deprecated !
    /*
    event.preventDefault();
    var stateCopy = Object.assign({}, this.state);

    for (let index = 0; index < stateCopy.recipes.length; index++) {
      const element = stateCopy.recipes[index];

      axios.put('https://notsureyetapp.herokuapp.com/api/recipes/' + element._id, JSON.stringify(element));

      
      fetch('https://notsureyetapp.herokuapp.com/api/recipes/' + element._id, {
        method: "PUT",
        body: JSON.stringify(element),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      });
      
    }
    */
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
              <Route exact path="/" render={(props, recipesList) => <Recipes {...props} recipesList={recipesList} />} />
              <Route path="/recipe/:id" render={(props) => <Recipe {...props} />} />
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

