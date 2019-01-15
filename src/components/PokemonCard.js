import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentImage: props.pokemon.sprites.front
    };
  }

  findHpOfPokemon = () => {
    return this.props.pokemon.stats.find(stat => stat.name === "hp").value;
  };

  handleCardClick = () =>{
    this.state.currentImage === this.props.pokemon.sprites.front
    ?this.setState({
      currentImage: this.props.pokemon.sprites.back
    })
    :this.setState({
      currentImage: this.props.pokemon.sprites.front
    })
  }


  render() {
    return (
      <Card>
        <div onClick={this.handleCardClick}>
          <div className="image">
            <img alt="oh no!" src={this.state.currentImage} />
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
