import React from "react";
import { Search } from "semantic-ui-react";

class ValueSearch extends React.Component {



  render() {
    return (
      <Search
        onSearchChange={this.props.filteredPokemonsByValue}
        showNoResults={false}
      />
    );
  }
}

export default ValueSearch;
