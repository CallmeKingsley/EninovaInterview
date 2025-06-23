import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon1, setPokemon1] = useState('');
  const [pokemon2, setPokemon2] = useState('');
  const [result, setResult] = useState(null);

  // Load Pokemon names on mount
  useEffect(() => {
    axios.get('/pokemons.json')
      .then(response => setPokemonList(response.data))
      .catch(error => console.error('Failed to load Pokémon list:', error));
  }, []);

  const handleBattle = () => {
    if (!pokemon1 || !pokemon2) return;

    axios.post('http://localhost:1800/api/battle', { pokemon1, pokemon2 })
      .then(response => setResult(response.data))
      .catch(err => setResult({ winner: 'Error', explanation: err.response?.data?.error }));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Pokémon Battle Simulator</h2>

      <div style={{ marginBottom: '1rem' }}>
        <select value={pokemon1} onChange={e => setPokemon1(e.target.value)}>
          <option value="">Select Pokémon 1</option>
          {pokemonList.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>

        <select value={pokemon2} onChange={e => setPokemon2(e.target.value)} style={{ marginLeft: '1rem' }}>
          <option value="">Select Pokémon 2</option>
          {pokemonList.map(p => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>

        <button onClick={handleBattle} style={{ marginLeft: '1rem' }}>Battle!</button>
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

export default App;