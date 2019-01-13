import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    allPokemons: [],
    sprite: this.props.pokemon.sprites.front
  }

  findHpOfPokemon = () => {
    return this.props.pokemon.stats.find(stat => stat.name === "hp").value;
  };

  handleClick = () => {
  if (this.state.sprite === this.props.pokemon.sprites.front) {
    this.setState({
    sprite: this.props.pokemon.sprites.back
  })
  } else {
    this.setState ({
      sprite: this.props.pokemon.sprites.front
    })
  }

  }

  render() {
    return (
      <Card>
        <div>
          <div className="image">
            <img alt="oh no!"  onClick={this.handleClick} src={this.state.sprite}/>
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.findHpOfPokemon()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
