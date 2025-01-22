const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Habilitar CORS para todos los orígenes
const corsOptions = {
  origin: '*', // Permite solicitudes desde cualquier origen (o cambia a tu dominio específico)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(cors(corsOptions)); // Usar CORS con las opciones configuradas
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
app.get('/api
