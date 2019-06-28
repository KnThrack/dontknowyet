import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipes from './views/recipes';

class App extends Component {

  state = {
    recipes: []
  }

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("https://notsureyetapp.herokuapp.com/api/recipes")
      .then(res => res.json())
      .then((data) => {
        this.setState({ recipes: data })
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    if (this.state.recipes) {
      return (
        <div className="App">
          <header className="App-header" />
          <Recipes recipes={this.state.recipes} />
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
