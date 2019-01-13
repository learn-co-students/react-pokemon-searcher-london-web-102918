import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";
const URL = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
    state = {
      pokemon: [],
      sortedPokemons: [],
    }

    componentDidMount() {
      this.fetchPokemon()
    }

    fetchPokemon = () => {
      fetch(URL)
      .then(res => res.json())
      .then(pokemonCollection =>
        this.setState({
          pokemon: pokemonCollection
        })
      )
    }

    addNewPokemon = (newPokemonObject) => {
      this.savePokemonToServer(newPokemonObject)

      this.setState({
        pokemon: [...this.state.pokemon, newPokemonObject]
      })
    }

    savePokemonToServer = (newPokemonObject) => {

      fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newPokemonObject)
        })
        .then(res => console.log('saved the pokemon'))

    }


    filteredPokemonsByName = (event) => {
      event.preventDefault()
      const filteredPokemons = [...this.state.pokemon]

      let result = filteredPokemons.filter(pokemon => pokemon.name.includes(event.target.value))

      if(event.target.value.length >= 1) {
      this.setState({
        pokemon: result
      })
    } else {
      this.fetchPokemon()
    }

    }

  render() {
    console.log("this is the state of pokemon", this.state.pokemon);
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={this.filteredPokemonsByName}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemon={this.state.pokemon} />
        <br />
        <PokemonForm addNewPokemon={this.addNewPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
