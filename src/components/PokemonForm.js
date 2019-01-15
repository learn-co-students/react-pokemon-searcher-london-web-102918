import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      stats: [{
        'value': 0,
        'name': 'hp'
      }],
      sprites: {
        front: '',
        back: ''
      }
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleHpChange = (event) => {
    const stats = [...this.state.stats]
    console.log(stats)
    stats[0].value = event.target.value
    this.setState({stats})
    console.log(this.s)
  }

  handleImageChange = (event) => {
    const sprites = {...this.state.sprites}
    sprites[event.target.name] = event.target.value
    this.setState({sprites})
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={() => this.props.handleSubmit(this.state)}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleHpChange} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" onChange={this.handleImageChange} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" onChange={this.handleImageChange} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
