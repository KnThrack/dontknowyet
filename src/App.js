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

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = document.getElementById('bigform');
    
    fetch('https://notsureyetapp.herokuapp.com/api/recipes', {
      method: 'POST',
      body: data,
    });

  }

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
