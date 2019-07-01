import React, { Component } from 'react';
import './App.css';
import Recipes from './views/recipes';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends Component {

  state = {
    recipes: []
  }

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  callAPI() {
    fetch("https://notsureyetapp.herokuapp.com/api/recipes")
      .then(res => res.json())
      .then((data) => {
        this.setState({ recipes: data.data })
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  // handlers
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

  handleSubmit(event) {
    event.preventDefault();
    var stateCopy = Object.assign({}, this.state);

    for (let index = 0; index < stateCopy.recipes.length; index++) {
      const element = stateCopy.recipes[index];
    
      fetch('https://notsureyetapp.herokuapp.com/api/recipes/' + element._id, {
        method: "PUT",
        body: JSON.stringify(element),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      });
    }
  }

  // handlers end 

  render() {
    if (this.state.recipes) {
      return (
        <div className="App">
          <header className="App-header" />
          <Recipes recipes={this.state.recipes} that={this} />
          <ButtonToolbar>
            <Button type="submit" variant="outline-primary" onClick={this.handleSubmit}>Submit</Button>
          </ButtonToolbar>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header" />
        </div>
      );
    }
  }
}

export default App;
