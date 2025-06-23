
const express = require('express');
const { simulateBattle } = require('../utils/battleLogic');
const pokemons = require('../data/pokedex.json');

const router = express.Router();

router.post('/battle', (req, res) => {
  const { pokemon1, pokemon2 } = req.body;

  const p1 = pokemons.pokemon.find(p => p.name.toLowerCase() === pokemon1.toLowerCase());
  const p2 = pokemons.pokemon.find(p => p.name.toLowerCase() === pokemon2.toLowerCase());

  if (!p1 || !p2) {
    return res.status(400).json({ error: 'One or both Pokémon not found.' });
  }

  const result = simulateBattle(p1, p2);
  res.json(result);
});

module.exports = router;
