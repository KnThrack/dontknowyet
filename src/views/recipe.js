import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    const recipe = (await axios.get(`https://notsureyetapp.herokuapp.com/api/recipes/${params.recipeId}`)).data;
    this.setState({
        recipe,
    });
  }

  render() {
    const {recipe} = this.state;
    if (recipe === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{recipe.title}</h1>
            <p className="lead">{recipe.recipe}</p>
          </div>
        </div>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </div>
    )
  }
}

export default Recipe;