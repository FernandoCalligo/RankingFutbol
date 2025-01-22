const fs = require('fs');

// Leer el archivo de jugadores
const getPlayers = () => {
  const data = fs.readFileSync('./src/db/players.json');
  return JSON.parse(data);
};

module.exports = (req, res) => {
  if (req.method === 'GET') {
    const players = getPlayers();
    return res.status(200).json(players);
  }
  return res.status(405).json({ message: 'Método no permitido' });
};
