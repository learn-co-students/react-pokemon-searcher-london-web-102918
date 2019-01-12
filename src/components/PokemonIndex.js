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
      filteredPokemons: []
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

  filteredPokemons = (event) => {
    console.log(event.target.value)


    let filteredPokemonsByName = [...this.state.pokemon]

    filteredPokemonsByName.filter(pokemon => pokemon.name.includes(event.target.value))

    this.setState({
      pokemon: filteredPokemonsByName
    })
    event.preventDefault()
  }

  render() {
    console.log("the page is being refershed");
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={this.filteredPokemons}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
        <br />
        <PokemonForm />
      </div>
    );
  }
}

export default PokemonPage;
