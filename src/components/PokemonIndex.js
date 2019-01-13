import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import ValueSearch from "./ValueSearch";
import {Search} from "semantic-ui-react";
import _ from "lodash";
const URL = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      query: '',
      valueQuery: ''
    };
  }

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    fetch(URL).then(res => res.json()).then(pokemonCollection => this.setState({pokemon: pokemonCollection}));
  };

  addNewPokemon = (newPokemonObject) => {
    const updatedPokemonArray = [
      newPokemonObject, ...this.state.pokemon
    ]

    this.setState({pokemon: updatedPokemonArray})

    fetch(URL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPokemonObject)
    })

  }

  filteredPokemons = (event) => {
    event.preventDefault()
    this.setState({query: event.target.value})

    if (this.state.query.length > 1) {
      let filteredPokemonsByName = [...this.state.pokemon]
      let result
      result = filteredPokemonsByName.filter(pokemon => pokemon.name.includes(this.state.query))

      this.setState({pokemon: result})
    } else {
      this.fetchPokemon()
    }
  }



  filteredPokemonsByValue = (event) => {
    event.preventDefault()
    this.setState ({
        valueQuery: event.target.value + "0"
    })


    let filteredPokemonsByValue = [...this.state.pokemon]

    let result = filteredPokemonsByValue.filter(pokemon => (pokemon.stats[pokemon.stats.length - 1])["value"] > this.state.valueQuery)

    this.setState({
      pokemon: result
    })

  }

  render() {
    console.log("the page is being refershed");
    return (<div>
      <h1>Value Searcher</h1>
      <ValueSearch filteredPokemonsByValue={this.filteredPokemonsByValue}/>
      <h1>Pokemon Searcher</h1>
      <br/>
      <Search onSearchChange={this.filteredPokemons} showNoResults={false}/>
      <br/>
      <PokemonCollection pokemon={this.state.pokemon}/>
      <br/>
      <PokemonForm addNewPokemon={this.addNewPokemon}/>
    </div>);
  }
}

export default PokemonPage;
