const typeEffectiveness = {
  electric: { water: 2, ground: 0.5 },
  grass: { water: 2, fire: 0.5 },
  fire: { grass: 2, water: 0.5 },
  water: { fire: 2, grass: 0.5 }
};

function getRandomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

function simulateBattle(p1, p2) {
  console.log(p1)
  //i can't find this data in the json
  //const total1 = p1.hp + p1.attack + p1.defense;
  //const total2 = p2.hp + p2.attack + p2.defense;

   const total1 = getRandomNumber() * 12;
   const total2 = getRandomNumber() * 12;

  let multiplier1 = typeEffectiveness[p1.type]?.[p2.type] || 1;
  let multiplier2 = typeEffectiveness[p2.type]?.[p1.type] || 1;

  const score1 = total1 * multiplier1;
  const score2 = total2 * multiplier2;

  const winner = score1 === score2 ? 'Draw' : score1 > score2 ? p1.name : p2.name;
  const explanation = `${p1.name} (score: ${score1}) vs ${p2.name} (score: ${score2})`;

  return { winner, explanation };
}

module.exports = { simulateBattle };