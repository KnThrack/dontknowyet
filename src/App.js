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

    let index = this.state.recipes.data.findIndex(x => x._id === name[0].toString());

    /*
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));

    this.setState({
      recipes: data[index].name[1]: value
    });


    this.setState({
      todoList: {
        ...this.state.todoList,
        day,
        items: []
      }
    })
    */

  }

  handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('bigform');
    /* const data = new FormData(event.target);
   
     fetch('https://notsureyetapp.herokuapp.com/api/recipes', {
       method: 'POST',
       body: data,
     });
 */
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
