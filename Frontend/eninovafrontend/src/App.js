import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      pokemon1: '',
      pokemon2: '',
      result: null,
    };
  }

  componentDidMount() {
    axios
      .get('/pokemons.json')
      .then(response => {
        this.setState({ pokemonList: response.data });
      })
      .catch(error => {
        console.error('Failed to load Pokémon list:', error);
      });
  }

  handleBattle = () => {
    const { pokemon1, pokemon2 } = this.state;
    if (!pokemon1 || !pokemon2) return;

    axios
      .post('http://localhost:1800/api/battle/', { pokemon1, pokemon2 })
      .then(response => {
        this.setState({ result: response.data });
      })
      .catch(err => {
        this.setState({
          result: {
            winner: 'Error',
            explanation: err.response?.data?.error || 'Something went wrong',
          },
        });
      });
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { pokemonList, pokemon1, pokemon2, result } = this.state;

    return (
      <div style={{ padding: '2rem' }}>
        <h2>Pokémon Battle Simulator</h2>

        <div style={{ marginBottom: '1rem' }}>
          <select
            value={pokemon1}
            onChange={e => this.handleChange('pokemon1', e.target.value)}
          >
            <option value="">Select Pokémon 1</option>
            {pokemonList.map(p => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            value={pokemon2}
            onChange={e => this.handleChange('pokemon2', e.target.value)}
            style={{ marginLeft: '1rem' }}
          >
            <option value="">Select Pokémon 2</option>
            {pokemonList.map(p => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <button onClick={this.handleBattle} style={{ marginLeft: '1rem' }}>
            Battle!
          </button>
        </div>

        {result && (
          <div>
            <h3>Winner: {result.winner}</h3>
            <p>{result.explanation}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
