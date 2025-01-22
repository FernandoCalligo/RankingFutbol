const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite recibir JSON en el cuerpo de las solicitudes

// Leer el archivo de jugadores
const getPlayers = () => {
  const data = fs.readFileSync('./src/db/players.json');
  return JSON.parse(data);
};

// Leer el archivo de partidos
const getMatches = () => {
  const data = fs.readFileSync('./src/db/matches.json');
  return JSON.parse(data);
};

// Guardar cambios en los archivos JSON
const savePlayers = (players) => {
  fs.writeFileSync('./src/db/players.json', JSON.stringify(players, null, 2));
};

// Guardar los partidos en el archivo matches.json
const saveMatches = (matches) => {
    console.log('Guardando partidos:', matches);  // Agrega un log aquí
    fs.writeFileSync('./src/db/matches.json', JSON.stringify(matches, null, 2), (err) => {
      if (err) {
        console.log('Error al guardar el archivo:', err);
      }
    });
  };
  
// Rutas

// Obtener jugadores
app.get('/api/players', (req, res) => {
  const players = getPlayers();
  res.json(players);
});

// Obtener partidos
app.get('/api/matches', (req, res) => {
  const matches = getMatches();
  res.json(matches);
});

// Registrar un nuevo partido
app.post('/api/matches', (req, res) => {
    const match = req.body;
    const { players, winner, mvp } = match;
  
    console.log('Datos del partido recibidos:', match);
  
    // Obtener los jugadores actuales
    let playersData = getPlayers();
  
    // Actualizar los jugadores
    playersData = playersData.map(player => {
      if (players.includes(player.name)) {
        player.gamesPlayed += 1;
      }
      if (winner.includes(player.name)) {
        player.gamesWon += 1;
      }
      if (mvp === player.name) {
        player.mvps += 1;
      }
      return player;
    });
  
    // Guardar los jugadores actualizados
    savePlayers(playersData);
  
    // Leer los partidos existentes
    let matches = getMatches();
  
    // Agregar el nuevo partido
    matches.push(match);
    console.log('Partidos después de agregar el nuevo:', matches);  // Verifica que el partido se haya agregado
  
    // Guardar los partidos actualizados
    saveMatches(matches);
  
    res.status(201).json({ message: 'Partido registrado exitosamente', match });
  });


  // Guardar los partidos en el archivo matches.json

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
