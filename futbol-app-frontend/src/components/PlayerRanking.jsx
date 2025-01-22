import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerRanking.css'; // Importa el archivo de estilos CSS

const PlayerRanking = () => {
  const [players, setPlayers] = useState([]);
  const [sortBy, setSortBy] = useState('gamesPlayed');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Obtener los jugadores del backend utilizando la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // Usa localhost en desarrollo

    axios.get(`${apiUrl}/players`)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error('Error al cargar los jugadores:', error);
      });
  }, []);

  // Función para ordenar los jugadores
  const sortPlayers = (key) => {
    const order = sortBy === key && sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedPlayers = [...players].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setPlayers(sortedPlayers);
    setSortBy(key);
    setSortOrder(order);
  };

  return (
    <div className="ranking-container">
      <h2>Ranking de Jugadores</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th onClick={() => sortPlayers('name')}>
              Jugador {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortPlayers('gamesPlayed')}>
              Partidos Jugados {sortBy === 'gamesPlayed' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortPlayers('gamesWon')}>
              Partidos Ganados {sortBy === 'gamesWon' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => sortPlayers('mvps')}>
              MVPs {sortBy === 'mvps' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>{player.gamesPlayed}</td>
              <td>{player.gamesWon}</td>
              <td>{player.mvps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRanking;
