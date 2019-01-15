import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";
const URL = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      searchInput: ''
    };
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    fetch(URL)
      .then(res => res.json())
      .then(pokemonCollection =>
        this.setState({
          pokemon: pokemonCollection
        })
      );
  };

  handleSearch = (event, { value }) => {
    this.setState({
      searchInput: value
    })
  }

  handleSubmit = (newPokemonData) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPokemonData),
    })
      .then(response => response.json())
      .then(() => this.fetchPokemon())
  }

  render() {
    const filteredPokemon = this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.searchInput));

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search placeholder="type here to start searching...."
          onSearchChange={_.debounce(this.handleSearch, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit}/>
        <br />
        <PokemonCollection pokemon={filteredPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
